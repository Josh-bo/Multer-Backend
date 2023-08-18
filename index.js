const express = require("express");
require('dotenv').config()
const PORT = process.env.PORT || 5001
const mongoose = require('mongoose');
let URI = process.env.MONGO_URI
mongoose.connect(URI)
.then(()=>console.log("MongoDB connected"))
.catch((err)=>console.log(err))
// const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const userModel = require('./models/user.model');
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'))

// mongoose.connect('mongodb+srv://JOSHBAM:OLAYINKA1@cluster0.whles85.mongodb.net/Zazuu?retryWrites=true&w=majority')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/Images')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage: storage
})

app.post('/upload', upload.single('file'), (req, res) => {
    userModel.create({image: req.file.filename})
    .then(result => res.json(result))
    .catch(err => console.log(err))
})

app.get('/getImage', (req, res) => {
    userModel.find()
    .then(users => res.json(users))
    .catch(err => console.log(err))
})

app.listen(PORT, () => {
    console.log("Server Is Running at port 3001");
})