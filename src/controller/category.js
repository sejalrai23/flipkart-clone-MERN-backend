const Category = require("../models/category");
const slugify = require('slugify');

function createCategories(categories, parentId = null) {
    const categorylist = [];
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
            parentId:cate.parentId,
            children: createCategories(categories, cate._id)
        });
    }

    return categorylist;

};

exports.addCategory = (req, res) => {

    console.log(req.body.name)

    const categoryObj = {
        name: req.body.name,
        slug: slugify(req.body.name),



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