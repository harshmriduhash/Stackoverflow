import React, { Component } from "react";
import NewQ from "./NewQ";
import { Link } from "@reach/router";

class Questions extends Component {
  render() {

    return (
      <div class="col-md-12">
      <div class="toast-header m-auto d-flex justify-content-center rounded w-70 background-img">
      </div>
        <div class="col-md-6 mx-auto">
          <NewQ askQuestion={text => this.props.askQuestion(text)} />
        </div>
        <h3 class="text-center pt-3">Other questions</h3>
        <ul> {this.props.questions.map(question => (
          <li class="list-group-item">
            <h5 class="">
              <Link to={`/question/${question._id}`}>{question.question}</Link>
            </h5>
          </li>
        ))}
        </ul>

      </div>
    );
  }
}

export default Questions;
