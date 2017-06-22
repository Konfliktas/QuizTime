'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var QuestionsSchema = new Schema({
  questionTitle: String,
  optionA: String,
  optionB: String,
  optionC: String,
  optionD: String,
  correct: String,
});

module.exports = mongoose.model('Question', QuestionsSchema);
