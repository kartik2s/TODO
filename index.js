import express from "express";
import pg from "pg";

const port = 3000;
const app = express():

const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "TODO",
    password: "123456",
    port: 5432
});
db.connect();

app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", async(req, res){
    try {
        const result = await db.query("SELECT * FROM items ORDER BY id ASC");
        items = result.rows;
        res.render("index.ejs",{
            listTitle: "Today",
            listItems: items
        });
    } catch (error) {
        console.log(err);
    }
});

app.post("/add", async(req, res) =>{
    const item = req.body.newItem;
    try {
        await db.query("INSERT INTO items (title) VALUES ($1)", [item]);
        res.redirect("/");
    } catch (error) {
        console.log(err);
    }
});

app.post("/edit", async(req, res) =>{
    const item = req.body.updatedItemTitle;
    const id = req.body.updatedItemId;
    try {
        await db.query("UPDATE items SET title = ($1) WHERE ID = $2", [item, id]);
        res.redirect("/");
    } catch (error) {
        console.log(err);
    }
});

app.post("/delete", async(req, res) =>{
    const id = req.body.deleteItemId;
    try {
        await db.query("DELETE * FROM items WHERE id = $1", [id]);
        res.redirect("/");
    } catch (error) {
        console.log(err);
    }
});

app.listen(port, ()=>{
    console.log(`Server running at http://localhost:${port}`);
});