const express = require("express");
const path = require("path");

const app = express();

const PORT = 3000;


// Middleware

app.use(express.json());

app.use(express.urlencoded({
    extended: true
}));


// Serve portfolio

app.use(express.static(
    path.join(__dirname, "public")
));


// Contact API

app.post("/api/contact", (req, res) => {

    const {
        name,
        email,
        message
    } = req.body;


    if (!name || !email || !message) {

        return res.status(400).json({

            success: false,

            message: "Please fill all fields."

        });

    }


    console.log("\n======================");

    console.log("NEW CONTACT MESSAGE");

    console.log("======================");

    console.log("Name:", name);

    console.log("Email:", email);

    console.log("Message:", message);

    console.log("======================\n");


    res.json({

        success: true,

        message: "Message received successfully."

    });

});


// 404

app.use((req, res) => {

    res.status(404).send(`
    
        <h1>404</h1>

        <p>Page not found.</p>

        <a href="/">Go back home</a>

    `);

});


// Start server

app.listen(PORT, () => {

    console.log(
        `Portfolio running at http://localhost:${PORT}`
    );

});