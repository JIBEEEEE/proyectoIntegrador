const path = require("path");

const mainController = {
    index: function (req,res){
        res.render("index")
        //res.sendFile(path.resolve (__dirname, "../views/index.ejs"))
    }
}

module.exports = mainController;