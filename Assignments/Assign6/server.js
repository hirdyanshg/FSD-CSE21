import express from "express";
import multer from 'multer';
const app = express();
app.use(express.static('public'));
const upload = multer({dest:'uploads/'});
app.