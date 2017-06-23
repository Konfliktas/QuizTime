/* eslint no-console: "off"*/
'use strict'
import path from 'path';
import { Server } from 'http';
import Express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { App } from './components/App';
import { StaticRouter as Router } from 'react-router-dom';
import { quizSize } from '.././quizConfig';
import express from 'express';
import Question from './model/questions';
import SolvedQuiz from './model/solvedQuizes';
import bodyParser from 'body-parser';


var mongoose = require('mongoose');
var mongoDB = 'mongodb://quizadmin:quizadmin@ds031257.mlab.com:31257/quizdb';
mongoose.connect(mongoDB);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const app = new Express();
const server = new Server(app);
var router = express.Router();


//now we should configure the APi to use bodyParser and look for JSON data in the body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//To prevent errors from Cross Origin Resource Sharing, we will set our headers to allow CORS with middleware like so:
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');

  //and remove cacheing so we get the most recent questions
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

//now  we can set the route path & initialize the API
router.get('/', function(req, res) {
  res.json({ message: 'API Initialized!'});
});

router.route('/solvedByUser')
.get(function(req, res) {
  var name = req.query.userName;
  SolvedQuiz.findOne({userName: name}, function(err, solvedQuizes) {
    if (err)
      res.send(err);
    //responds with a json object of our database questions.
    res.json(solvedQuizes)
  });
})

//adding the /solvedQuizes route to our /api router
router.route('/solvedQuizes')
  //retrieve all questions from the database
  .get(function(req, res) {
    //looks at our Question Schema
    SolvedQuiz.find(function(err, solvedQuizes) {
      if (err)
        res.send(err);
      //responds with a json object of our database questions.
      res.json(solvedQuizes)
    });
  })
  .post(function(req, res) {
      var userName = req.query.userName;
      var dateStarted = req.query.dateStarted;
      var solvedQuiz = new SolvedQuiz();
      var i = 0;
      (userName) ? solvedQuiz.userName = userName : null;
      (dateStarted) ? solvedQuiz.dateStarted = dateStarted : null;
      req.body.forEach(function(element) {
        solvedQuiz.questionsSet[i] = SolvedQuiz().questionsSet;
        (element.questionTitle) ? solvedQuiz.questionsSet[i].questionTitle = element.questionTitle : null;
        (element.optionA) ? solvedQuiz.questionsSet[i].optionA = element.optionA : null;
        (element.optionB) ? solvedQuiz.questionsSet[i].optionB = element.optionB : null;
        (element.optionC) ? solvedQuiz.questionsSet[i].optionC = element.optionC : null;
        (element.optionD) ? solvedQuiz.questionsSet[i].optionD = element.optionD : null;
        //(element.correct) ? solvedQuiz.questionsSet[i].correct = element.correct: null;
        (element._id) ? solvedQuiz.questionsSet[i]._id = element._id: null;
         i++;
      });

      solvedQuiz.save(function(err) {
        if (err)
          res.send(err);
        res.json({ solvedQuiz });
      });
  });

router.route('/solvedQuizes/:solvedQuizID')

  .put(function(req, res) {

    var putPurpose = req.query.putPurpose;
    var dateFinished = req.query.dateFinished;
    console.log("---- 0 Quiz ID---");
    console.log(req.params.solvedQuizID);
    console.log("---- 0 req.body--");
    console.log(req.body);
    //-----------------SAVING SELECTED OPTIONS-------------
    if(putPurpose == 0){
      SolvedQuiz.findById(req.params.solvedQuizID, function(err, solvedQuiz) {
        (dateFinished) ? solvedQuiz.dateFinished = dateFinished : null;
        if (err)
          res.send(err);
          var i = 0;
          req.body.forEach(function(element) {
             solvedQuiz.selections[i] = SolvedQuiz().selections;
             (element.questionID) ? solvedQuiz.selections[i].questionID = element.questionID : null;
             (element.selectedOption) ? solvedQuiz.selections[i].selectedOption = element.selectedOption : null;
             i++;
          });
        //save question
        solvedQuiz.save(function(err) {
          if (err)
            res.send(err);
          res.json({ message: 'solvedQuiz has been updated' });
        });
      });
    //-----------------SAVING RESULT-------------
    } else if(putPurpose == 1){
      SolvedQuiz.findById(req.params.solvedQuizID, function(err, solvedQuiz) {
        console.log("----Quiz ID---");
        console.log(req.params.solvedQuizID);
        console.log("----result---");
        console.log(req.body);
        if (err)
          res.send(err);
        (req.body.result) ? solvedQuiz.result = req.body.result : null;
        //save result
        solvedQuiz.save(function(err) {
          if (err)
            res.send(err);
          res.json({ message: 'solvedQuiz has been updated' });
        });
      });
    }

  })

router.route('/quiz')
.get(function(req, res) {
    Question.aggregate([ { $sample: { size: quizSize } } ]).exec((err, questions) => {
      if (err)
        res.send(err);
      console.log(questions);
      res.json(questions)
  });
})

//adding the /questions route to our /api router
router.route('/questions')
.get(function(req, res) {
  //looks at our Question Schema
  Question.find(function(err, questions) {
    if (err)
      res.send(err);
    //responds with a json object of our database questions.
    res.json(questions)
  });
})
  //post new question to the database
  .post(function(req, res) {
    var question = new Question();
    (req.body.questionTitle) ? question.questionTitle = req.body.questionTitle : null;
    (req.body.optionA) ? question.optionA = req.body.optionA : null;
    (req.body.optionB) ? question.optionB = req.body.optionB : null;
    (req.body.optionC) ? question.optionC = req.body.optionC : null;
    (req.body.optionD) ? question.optionD = req.body.optionD : null;
    (req.body.correct) ? question.correct = req.body.correct: null;

    //var document = {question};
    db.collection('questions').insert(question, function(err, questionInserted){
      if (err)
         res.send(err);
      res.json({ question: questionInserted.ops[0] });
      (questionInserted.ops[0]._id) ? question._id = questionInserted.ops[0]._id : Date.now();
    });
  });

//Adding a route to a specific question based on the database ID
router.route('/questions/:question_id')
//The put method gives us the chance to update our question based on the ID passed to the route
  .put(function(req, res) {
    Question.findById(req.params.question_id, function(err, question) {
      if (err)
        res.send(err);

      (req.body.questionTitle) ? question.questionTitle = req.body.questionTitle : null;
      (req.body.optionA) ? question.optionA = req.body.optionA : null;
      (req.body.optionB) ? question.optionB = req.body.optionB : null;
      (req.body.optionC) ? question.optionC = req.body.optionC : null;
      (req.body.optionD) ? question.optionD = req.body.optionD : null;
      (req.body.correct) ? question.correct = req.body.correct: null;
      //save question
      question.save(function(err) {
        if (err)
          res.send(err);
        res.json({ message: 'Question has been updated' });
      });
    });
  })
  //delete method for removing a question from our database
  .delete(function(req, res) {
    //selects the question by its ID, then removes it.
    Question.remove({ _id: req.params.question_id }, function(err, question) {
      if (err)
        res.send(err);
      res.json({ message: 'Question has been deleted' })
    })
  });

//Use our router configuration when we call /api
app.use('/api', router);

// use ejs templates
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// define the folder that will be used for static assets
app.use(Express.static(path.join(__dirname, 'static')));

// universal routing and rendering
app.get('*', (req, res) => {
  let markup = '';
  let status = 200;

  if (process.env.UNIVERSAL) {
    const context = {};
    markup = renderToString(
      <Router location={req.url} context={context}>
        <App />
      </Router>,
    );

    // context.url will contain the URL to redirect to if a <Redirect> was used
    if (context.url) {
      return res.redirect(302, context.url);
    }

    if (context.is404) {
      status = 404;
    }
  }

  return res.status(status).render('index', { markup });
});

// start the server
const port = process.env.PORT || 3000;
const env = process.env.NODE_ENV || 'production';
server.listen(port, (err) => {
  if (err) {
    return console.error(err);
  }
  return console.info(
    `
      Server running on http://localhost:${port} [${env}]
      Universal rendering: ${process.env.UNIVERSAL ? 'enabled' : 'disabled'}
    `);
});
