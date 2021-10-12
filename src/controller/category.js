const Category = require("../models/category");
const slugify = require('slugify');
const shortid = require("shortid");

function createCategories(categories, parentId = null) {
    const categorylist = [];
    let cat;
    if (parentId == null) {
        cat = categories.filter(cat => cat.parentId == undefined);
    } else {
        cat = categories.filter(cat => cat.parentId == parentId);
    }

    for (let cate of cat) {
        categorylist.push({
            _id: cate._id,
            name: cate.name,
            slug: cate.slug,
            type: cate.type,
            parentId: cate.parentId,
            children: createCategories(categories, cate._id)
        });
    }

    return categorylist;

};

exports.addCategory = (req, res) => {

    console.log(req.body.name)

    const categoryObj = {
        name: req.body.name,
        slug: `${slugify(req.body.name)}-${shortid.generate()}`,



    };
    if (req.file) {
        categoryObj.categoryImage = "http://localhost:2000/public/" + req.file.filename;
    }

    if (req.body.parentId) {
        categoryObj.parentId = req.body.parentId;
    }

    const cat = new Category(categoryObj);
    cat.save((error, cat) => {
        if (error) {
            return res.status(400).json({ error });
        }
        if (cat) {
            return res.status(201).json({ cat });
        }
    });
}


exports.getCategory = (req, res) => {
    Category.find({}).exec((error, cats) => {
        if (error) {
            return res.status(400).json({ error });
        }
        if (cats) {
            const catergorylist = createCategories(cats);
            return res.status(201).json({ catergorylist });
        }
    })
}

exports.updateCategory = async (req, res) => {
    const { _id, name, parentId, type } = req.body;
    const updatedCategories = [];

    if (name instanceof Array) {
        for (let i = 0; i < name.length; i++) {
            const category = {
                name: name[i],
                type: type[i]
            };
            if (parentId[i] !== "") {
                category.parentId = parentId[i];

            }
            const updatedCategory = await Category.findOneAndUpdate({ _id: _id[i] }, category, { new: true });
            updatedCategories.push(updatedCategory);

        }
        return res.status(201).json({ updatedCategories: updatedCategories });
    } else {
        const category = {
            name,
            type
        };
        if (parentId !== "") {
            category.parentId = parentId;
        }
        const updatedCategory = await Category.findOneAndUpdate({ _id }, category, { new: true });
        return res.status(201).json({ updatedCategory });
    }

}

exports.deleteCategory = async (req, res) => {
    const { ids } = req.body.payload;
    const deletedCategories = [];
    for (let i = 0; i < ids.length; i++) {
        const deleteCategory = await Category.findOneAndDelete({ _id: ids[i]._id });
        deletedCategories.push(deleteCategory);
    }

    if (deletedCategories.length == ids.length) {
        res.status(201).json({ message: "categories removed" });
    } else {

        res.status(400).json({ message: "something went wrong" })

    }


}

