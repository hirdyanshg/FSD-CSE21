import express from "express";
import cors from cors;
import fs from fs;
const app=express();
app.use(cors());
app.use(express.json());
app.get("/products",(req,res)=>{
    const data=fs.readFile("products.json", "utf8")
    const product=JSON.parse(data);
});
app.post("/products",(req,res)=>{
const data=fs.readFile("products.json", "utf8")
    const product=JSON.parse(data);
    const newProduct={
        id: product.length + 1,
        name: req.body.name,
        price: req.body.price
    }
    produuct.push(newProduct);
    fs.writeFile("products.json", JSON.stringify(product, null, 2)
    
});
app.post();
app.listen(4000, () => {
    console.log("Server is running on port 4000");
})