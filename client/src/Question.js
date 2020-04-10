import React, { Component } from "react";
import { Link } from "@reach/router";
import PostAnswer from "./PostAnswer";

class Question extends Component {
  constructor(props) {
    super(props);
    this.onVote = this.onVote.bind(this);
  }

  onVote(event) {
    this.props.onVote(this.props.id, event.currentTarget.dataset.id);
  }

  render() {
    let title = "";
    let answ = "";
    const question = this.props.getQuestion(this.props.id);
    if (question) {
      title = question.question;
      if (question.answers) {
        console.log(question.answers);
        answ = question.answers.map((answer, id) => (
          <div key={answer._id} id={answer._id} className="list-group ">
            <div className="row mb-5 flex-column">
              <div className="list-group-item font-weight-bold">{answer.answer}</div>
              <div className="text-center d-flex align-items-center">
                <div className="text-center font-italic">
                  Votes <b>{answer.votes}</b>
                </div>
                <div class="ml-2  "onClick={() =>
                    this.props.onVote(this.props.id, answer._id)}>
                    <i className="fa fa-heart fa-1x"></i></div>
              </div>
            </div>
          </div>
        ))
        return(
          <div className="col-md-6 mx-auto">
          <div class="toast-header m-auto d-flex justify-content-center rounded w-70 background-img">
          </div>
            <div className="row col-md-12 flex-column justify-content-center">
           <h2 className="mx-auto"> {title}</h2>
            </div>
            <div>
            <h4>Answers</h4>
            <div>
            {answ.length === 0 ? <p>No Answers!</p> : answ}
            </div>

          <div>
            <PostAnswer
              qid={this.props.id}
              postAnswer={(questionId, text) =>
                this.props.postAnswer(questionId, text)
              }
            />
          </div>
        </div>
        <div className="mt-5">
          <Link to="/">
            Go back
          </Link>
        </div>
      </div>
          
          
        );
        
      }
    }
    return (
     <div>No content</div>
    );
  }
}

export default Question;
