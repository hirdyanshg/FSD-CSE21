const express = require("express");
const fs = require("fs");

const app = express();
const PORT = 3002;
const FILE = "products.json";

// Middleware
app.use(express.json());


// Read products
function getProducts() {

    const data = fs.readFileSync(FILE, "utf8");

    return JSON.parse(data);
}


// Save products
function saveProducts(products) {

    fs.writeFileSync(
        FILE,
        JSON.stringify(products, null, 2)
    );
}


// Home route
app.get("/", (req, res) => {

    res.send(`
        <h1>Products REST API</h1>

        <p>This API contains 100 products.</p>

        <h3>Available Routes:</h3>

        <ul>
            <li>GET /api/products</li>
            <li>GET /api/products/:id</li>
            <li>POST /api/products</li>
            <li>PUT /api/products/:id</li>
            <li>DELETE /api/products/:id</li>
            <li>GET /api/products/search/:name</li>
        </ul>
    `);

});


// GET - All Products
app.get("/api/products", (req, res) => {

    const products = getProducts();

    res.json(products);

});


// GET - Product by ID
app.get("/api/products/:id", (req, res) => {

    const products = getProducts();

    const id = parseInt(req.params.id);

    const product = products.find(
        product => product.id === id
    );

    if (!product) {

        return res.status(404).json({
            message: "Product not found"
        });

    }

    res.json(product);

});


// POST - Add Product
app.post("/api/products", (req, res) => {

    const products = getProducts();

    const newProduct = {
        id: products.length + 1,
        name: req.body.name,
        category: req.body.category,
        price: req.body.price
    };

    products.push(newProduct);

    saveProducts(products);

    res.status(201).json({
        message: "Product added successfully",
        product: newProduct
    });

});


// PUT - Update Product
app.put("/api/products/:id", (req, res) => {

    const products = getProducts();

    const id = parseInt(req.params.id);

    const index = products.findIndex(
        product => product.id === id
    );

    if (index === -1) {

        return res.status(404).json({
            message: "Product not found"
        });

    }

    products[index] = {
        id: id,
        name: req.body.name,
        category: req.body.category,
        price: req.body.price
    };

    saveProducts(products);

    res.json({
        message: "Product updated successfully",
        product: products[index]
    });

});


// DELETE - Product
app.delete("/api/products/:id", (req, res) => {

    const products = getProducts();

    const id = parseInt(req.params.id);

    const index = products.findIndex(
        product => product.id === id
    );

    if (index === -1) {

        return res.status(404).json({
            message: "Product not found"
        });

    }

    const deletedProduct = products.splice(index, 1)[0];

    saveProducts(products);

    res.json({
        message: "Product deleted successfully",
        product: deletedProduct
    });

});


// SEARCH - Product by name
app.get("/api/products/search/:name", (req, res) => {

    const products = getProducts();

    const name = req.params.name.toLowerCase();

    const results = products.filter(product =>
        product.name.toLowerCase().includes(name)
    );

    res.json(results);

});


// 404
app.use((req, res) => {

    res.status(404).json({
        message: "Route not found"
    });

});


// Start server
app.listen(PORT, () => {

    console.log(
        `Server running at http://localhost:${PORT}`
    );

});