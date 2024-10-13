import mongoose from 'mongoose';
const { Schema } = mongoose; 

const bookSchema = new mongoose.Schema({

  title: {
    type: String,
    required: true  
  },
  author: {
    type: String,
    required: true  
  },
  editionNumber: {
    type: String, 
    required: true
  },
  publishDate: {
    type: Date,  
    required: true
  },
  hasEbook: {
    type: Boolean,  
    default: false
  },
  price: {
    type: Number,  
    required: true
  },
  supportedLanguages: {
    type: String,  
    required: true
  },
  category: {
    type: String,  
    required: true
  },

    books: [{type: mongoose.Schema.Types.ObjectId,ref: 'User'}]

});

const Book = mongoose.model('Book', bookSchema);

export default Book;
