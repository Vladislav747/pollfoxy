//Модели проекта 

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//Создание схемы данных
const VoteSchema = new Schema({
  os: {
    type: String,
    required: true
  },
  point: {
    type: String,
    required: true
  }
});

// Create collection and add schema
const Vote = mongoose.model('Vote', VoteSchema);

//Потом вызывать эту Модель
module.exports = Vote;