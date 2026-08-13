const fs = require("fs");
//CREATE - create a file
fs.writeFileSync("student.txt","Name: HIRDYANSH\nRoll No: 570");
console.log("File created successfully");
//READ - Read the file
let data = fs.readFile("student.txt","utf-8");
console.log("\nFile Content:");
console.log(data);
//UPDATE - add new data to the file
fs.appendFile("student.txt","\nBranch: CSE");
console.log("\nFile updated successfully");