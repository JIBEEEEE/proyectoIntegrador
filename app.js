const express = require ("express");
const path = require ("path");
const app = express ();

const publicPath = path.resolve (__dirname, "./public" );

console.log(publicPath)

app.use (express.static (publicPath));

app.listen(3100, () => {
    console.log("Servidor corriendo en el puerto 3100")
})

app.get("/", (req,res) => {
    res.sendFile(path.resolve (__dirname, "./views/index.html"))
})

app.get("/views/login.html", (req,res) => {
    res.sendFile(path.resolve (__dirname, "./views/login.html"))
})

