import React, { Component } from "react";
import { Router } from "@reach/router";
import Question from "./Question";
import Questions from "./Questions";

class App extends Component {
  
  API_URL = process.env.REACT_APP_API_URL;
  constructor(props) {
    super(props);
    this.state = {
      questions: []
    };
  }

  async getData() {
    const url = `${this.API_URL}/questions`; 
    const res = await fetch(url); 
    return this.setState({
      questions: await res.json()
    });
  }

  componentDidMount() {
    this.getData();
    this.setState({header : new Headers({
      "Content-Type": "application/json"
    })})
  }

  postAnswer(questionId, text) {
    let url = `${this.API_URL}/questions/`
      .concat(questionId)
      .concat("/answers");

    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        answer: text 
      }),
      headers: this.state.header
    })
      .then(response => response.json())
      .then(data => {
        this.getData();
      });
  }

  getQuestion(id) {
    return this.state.questions.filter(e => e._id === id)[0];
  }

  async vote(questionId, answerId) {
    let url = `${this.API_URL}/questions/${questionId}/answers/${answerId}/vote`
    fetch(url, {
      method: "PUT",
      headers: this.state.header
    })
      .then(res => res.json())
      .then(() => {
        this.getData();
      });
  }

  askQuestion(text) {
    this.postData(text);
  }

  onVote(questionId, answerId) {
    this.vote(questionId, answerId);
  }
  postData(text) {
    let url = `${this.API_URL}/questions/`;
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        question: text
      }),
      headers: this.state.header
    })
      .then(response => response.json())
      .then(json => {
        this.getData();
      });
  }


  render() {
    return (
      <div class="wrapper">
        <Router class="col-md-12">
          <Question path="/question/:id" getQuestion={id => this.getQuestion(id)} onVote={(questionId, answerId) => this.onVote(questionId, answerId)} postAnswer={(questionId, text) => this.postAnswer(questionId, text)}/>
          <Questions path="/" questions={this.state.questions} askQuestion={text => this.askQuestion(text)}/>
        </Router>
      </div>
    );
  }
}
export default App;
