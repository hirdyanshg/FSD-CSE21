//product API (ProductretsAPI)
//Create a REST API for products. Test all APIs using Thunder Client
//DELETE
app.delete("/users/:id", (req, res) => {
    users=users.filter(u=> u.id != req.params.id);
    res.send("user deleted");
});