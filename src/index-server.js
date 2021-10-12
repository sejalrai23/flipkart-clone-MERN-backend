const express = require('express');
const env = require('dotenv');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const userRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin/auth');
const categoryRoutes = require('./routes/category');
const productRoutes = require("./routes/product");
const cartRoutes = require("./routes/cart");
const initialData = require("./routes/admin/initialData");
const pageRoutes = require("./routes/admin/page");
const path = require("path");
const cors = require('cors');

//env variable pr constants
env.config();

//mongodb connection: 
mongoose.connect(
    `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.wltiz.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }
).then(() => {
    console.log("database connected");
});


app.use(cors());
app.use(express.json());
app.use('/public', express.static(path.join(__dirname, 'uploads')));


app.use('/', userRoutes);
app.use('/', adminRoutes);
app.use('/', categoryRoutes);
app.use('/', productRoutes);
app.use('/', cartRoutes);
app.use('/', initialData);
app.use('/', pageRoutes);
app.listen(process.env.PORT, () => {
    console.log(`server is running on port ${process.env.PORT}`);
});

app.exports = app;