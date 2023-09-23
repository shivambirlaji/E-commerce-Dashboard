
const express = require("express");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send("Welcome to API");
});
 
app.post("/upload", upload.single("myFile"), (req, res) => {
    console.log("Body: ", req.body);
    console.log("File: ", req.file);
    res.send("File successfully uploaded.");

   
   
   // Configure storage engine instead of dest object.
   const upload = multer({ storage: storage })
   
});

let storage = multer.diskStorage({  
    file = req.file

    destination : function(req , file , cb) { 
    // destination is used to specify the path of the directory in which the files have to be stored
    cb(null, './uploads');    
  }, 
  filename: function (req, file, cb) { 
// It is the filename that is given to the saved file.
     cb(null , file.originalname);   
  }
});
 
app.listen(PORT, () => {
    console.log(`Server started on port : ${PORT}`);
});  
