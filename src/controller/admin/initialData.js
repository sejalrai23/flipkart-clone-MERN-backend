const Category = require('../../models/category');
const Product = require("../../models/product");
const Page = require("../../models/page");

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
      parentId: cate.parentId,
      type: cate.type,
      children: createCategories(categories, cate._id)
    });
  }

  return categorylist;

};

exports.initialData = async (req, res) => {

  const categories = await Category.find({}).exec();
  const page = await Page.find({}).exec();
  const products = await Product.find({}).select('_id name description price quantity productPics category').populate({ path: 'category', select: '_id name' }).exec();
  const catergorylist = createCategories(categories);

  res.status(200).json({
    categories: catergorylist,
    products,
    page
  })


}