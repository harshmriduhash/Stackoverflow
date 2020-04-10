const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const appName = "Stackoverflow";
const app = express();
const port = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(cors());
app.use(express.static("../client/build"));



app.get("/api/questions", (req, res) => {
  db.allQuestions().then(q => res.json(q));
});

app.post("/api/questions", (req, res) => {
  let question = {
    answers: [],
    question: req.body.question
  };
  db.postQuestion(question).then(newQuestion => res.json(newQuestion));
});

app.get("/api/questions/:questionId", (req, res) => {
  const qId = request.params.questionId;
  db.getQuestion(qId).then(q => response.json(q));
});

app.put("/api/questions/:questionId/answers/:answerId/vote", (req, res) => {
    db.vote(req.params.questionId, req.params.answerId)
      .then(x => res.json(x));
  }
);

app.post("/api/questions/:questionId/answers", (req, res) => {
  console.log(req.body);

  db.postAnswer(req.params.questionId, req.body) 
    .then(x => res.json(x));
});


let db = {};

require("./db")
  .connectDb()
  .then(async dbObject => {
    db = dbObject; 
    app.listen(port, () => {
      console.log(`${appName} API running on port ${port}!`);
    });
  })
  .catch(error => console.error(error));
