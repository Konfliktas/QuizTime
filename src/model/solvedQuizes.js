'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SolvedQuizesSchema = new Schema({
  userName: String,
  dateStarted: Number,
  dateFinished: Number,
  selections: [{
    questionID: String,
    selectedOption: String
  }],
  questionsSet: [{
    questionTitle: String,
    optionA: String,
    optionB: String,
    optionC: String,
    optionD: String,
  }],
  result: Number
});

module.exports = mongoose.model('SolvedQuiz', SolvedQuizesSchema);
