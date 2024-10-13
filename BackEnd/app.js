import express from "express";
import mongoose from "mongoose";
import Book from "./models/book.js"; 
import dotenv from 'dotenv';
import User from "./models/userSchema.js";
import bcrypt from 'bcrypt'

dotenv.config();

const app = express();
app.use(express.json());


main().catch(err => console.log(err));
async function main() {
  await mongoose.connect(process.env.MONGO_URI);

  
}



app.post('/signup', async (req, res) => { 

 
 const { username, email, password } = req.body; 

 
 const existingUser = await User.findOne({ email }); 

 if (existingUser) { 

 return res.status(400).json({ message: 'Email already in use' }); 

 }
 const hashedPassword = await bcrypt.hash(password, 10); 

 const newUser = new User({ 

 username, 

 email, 

 password: hashedPassword 

 }); 

 await newUser.save(); 

 }); 


app.post("/addBook", (req, res) => {
  const book = new Book({
    title: req.body.title,
    author: req.body.author,
    editionNumber: req.body.editionNumber,
    publishDate: req.body.publishDate,
    hasEbook: req.body.hasEbook,
    price: req.body.price,
    supportedLanguages: req.body.supportedLanguages,
    category: req.body.category,
  });
  book.save()
    .then((result) => {
      res.send(result);
    })

});

app.get('/addBook', (req, res) => {
  Book.find()  
    .then((books) => {
      res.send(books);
    })  
});


app.delete("/addBook/:id", (req, res) => {
  const { id } = req.params;
  Book.findByIdAndDelete(id)
    .then((result) => {
      res.send(result); 
    })

});



app.patch("/addBook/:id",(req,res)=>{
  const {id} = req.params
  Book.findByIdAndUpdate(id , req.body,{new:true,runValidators:true})
  .then((result)=>{
      res.send(result)
  })
  })


app.listen(8000, () => {
  console.log('Server is running on port 8000');

});
