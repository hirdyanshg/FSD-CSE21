import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

const PORT = 5002;


// Get current folder path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// JSON file location
const FILE = path.join(__dirname, "requests.json");


// Middleware
app.use(cors());
app.use(express.json());


// ======================================
// READ REQUESTS
// ======================================

function getRequests() {

    try {

        const data = fs.readFileSync(FILE, "utf8");

        if (!data.trim()) {
            return [];
        }

        return JSON.parse(data);

    } catch (error) {

        console.log("Error reading file:", error.message);

        return [];

    }
}


// ======================================
// SAVE REQUESTS
// ======================================

function saveRequests(requests) {

    fs.writeFileSync(
        FILE,
        JSON.stringify(requests, null, 2)
    );

}


// ======================================
// GET ALL REQUESTS
// ======================================

app.get("/api/requests", (req, res) => {

    const requests = getRequests();

    res.json(requests);

});


// ======================================
// GET REQUEST BY ID
// ======================================

app.get("/api/requests/:id", (req, res) => {

    const requests = getRequests();

    const id = Number(req.params.id);

    const request = requests.find(
        item => item.id === id
    );


    if (!request) {

        return res.status(404).json({
            message: "Request not found"
        });

    }


    res.json(request);

});


// ======================================
// POST NEW REQUEST
// ======================================

app.post("/api/requests", (req, res) => {

    console.log("POST /api/requests");

    console.log("Received data:", req.body);


    const requests = getRequests();


    const {
        studentName,
        email,
        category,
        description,
        priority
    } = req.body;


    if (
        !studentName ||
        !email ||
        !category ||
        !description ||
        !priority
    ) {

        return res.status(400).json({
            message: "All fields are required"
        });

    }


    const newRequest = {

        id: requests.length > 0
            ? requests[requests.length - 1].id + 1
            : 1,

        studentName,
        email,
        category,
        description,
        priority

    };


    requests.push(newRequest);

    saveRequests(requests);


    console.log("Request saved:", newRequest);


    res.status(201).json(newRequest);

});


// ======================================
// PUT - UPDATE REQUEST
// ======================================

app.put("/api/requests/:id", (req, res) => {

    const requests = getRequests();

    const id = Number(req.params.id);


    const index = requests.findIndex(
        item => item.id === id
    );


    if (index === -1) {

        return res.status(404).json({
            message: "Request not found"
        });

    }


    const {
        studentName,
        email,
        category,
        description,
        priority
    } = req.body;


    requests[index] = {

        id,

        studentName,
        email,
        category,
        description,
        priority

    };


    saveRequests(requests);


    res.json(requests[index]);

});


// ======================================
// DELETE REQUEST
// ======================================

app.delete("/api/requests/:id", (req, res) => {

    const requests = getRequests();

    const id = Number(req.params.id);


    const newRequests = requests.filter(
        item => item.id !== id
    );


    if (newRequests.length === requests.length) {

        return res.status(404).json({
            message: "Request not found"
        });

    }


    saveRequests(newRequests);


    res.json({
        message: "Request deleted successfully"
    });

});


// ======================================
// START SERVER
// ======================================

app.listen(PORT, () => {

    console.log(
        `Campus Help Desk server running at http://localhost:${PORT}`
    );

});