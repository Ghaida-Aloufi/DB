import express from "express";
import mongoose from "mongoose";
import Book from "./models/book.js"; 
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(express.json());


main().catch(err => console.log(err));
async function main() {
  await mongoose.connect(process.env.MONGO_URI);

  
}


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
  console.log('Server is running on ');
});
