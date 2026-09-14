const express = require("express");
const fs = require("fs");

const app = express();
const PORT = 3001;
const FILE = "students.json";

// Middleware to read form data
app.use(express.urlencoded({ extended: true }));

// Home Page
app.get("/", (req, res) => {

    res.send(`
    <!DOCTYPE html>
    <html>
    <head>
        <title>Student Records</title>
    </head>

    <body>

        <h1>Student Record Management</h1>

        <form method="POST" action="/add">

            <label>Student Name:</label>
            <input type="text" name="name" required>

            <br><br>

            <label>Roll Number:</label>
            <input type="text" name="roll" required>

            <br><br>

            <label>Course:</label>
            <input type="text" name="course" required>

            <br><br>

            <label>Email:</label>
            <input type="email" name="email" required>

            <br><br>

            <button type="submit">
                Add Student
            </button>

        </form>

        <br>

        <a href="/students">
            View Student Records
        </a>

    </body>
    </html>
    `);
});


// Add Student
app.post("/add", (req, res) => {

    const student = {
        name: req.body.name,
        roll: req.body.roll,
        course: req.body.course,
        email: req.body.email
    };

    fs.readFile(FILE, "utf8", (err, data) => {

        let students = [];

        // If file exists, read existing records
        if (!err && data) {

            try {
                students = JSON.parse(data);
            }

            catch (error) {
                students = [];
            }
        }

        // Add new student
        students.push(student);

        // Save records
        fs.writeFile(
            FILE,
            JSON.stringify(students, null, 2),
            (err) => {

                if (err) {

                    return res.status(500).send(`
                        <h1>Error</h1>
                        <p>Unable to save student record.</p>
                        <a href="/">Go Back</a>
                    `);

                }

                // Redirect to student records
                res.redirect("/students");
            }
        );

    });

});


// View Students
app.get("/students", (req, res) => {

    fs.readFile(FILE, "utf8", (err, data) => {

        let students = [];

        if (!err && data) {

            try {
                students = JSON.parse(data);
            }

            catch (error) {
                students = [];
            }
        }


        let html = `
        <!DOCTYPE html>

        <html>

        <head>

            <title>Student Records</title>

        </head>

        <body>

            <h1>Student Records</h1>

            <table border="1" cellpadding="10">

                <tr>

                    <th>Name</th>
                    <th>Roll Number</th>
                    <th>Course</th>
                    <th>Email</th>

                </tr>
        `;


        // Display each student
        students.forEach((student) => {

            html += `
                <tr>

                    <td>${student.name}</td>

                    <td>${student.roll}</td>

                    <td>${student.course}</td>

                    <td>${student.email}</td>

                </tr>
            `;

        });


        html += `
            </table>

            <br>

            <a href="/">
                Add Another Student
            </a>

        </body>

        </html>
        `;


        res.send(html);

    });

});


// 404 Page
app.use((req, res) => {

    res.status(404).send(`

        <h1>404 - Page Not Found</h1>

        <a href="/">
            Go Home
        </a>

    `);

});


// Start Server
app.listen(PORT, () => {

    console.log(
        `Server running at http://localhost:${PORT}`
    );

});