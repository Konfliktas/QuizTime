//Name of the admin to authorise who can manage the quiz questions
const adminName = "adminML"
//Number of questions Quiz consists of
const quizSize = 10;
//Number of questions each Admin Page Section consists of
const sectionOfQuestionsSize = 4;
//Period of seconds to solve the quiz
const quizTimer = 100;
//Api to get random set of questions for Quiz
const quizUrl = '/api/quiz';
//Api to get/post solved Quizes
const solvedQuizesUrl = '/api/solvedQuizes';
//Api to Deal with questions
const questionsUrl = '/api/questions';
//Api to get all solved Quizes
const solvedByUserUrl = '/api/solvedByUser';


export { adminName, quizSize, sectionOfQuestionsSize, quizTimer, quizUrl, solvedQuizesUrl, questionsUrl, solvedByUserUrl };
