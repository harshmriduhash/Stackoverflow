import React, { Component } from "react";

class AskQuestion extends Component {
  constructor(props) {
    super(props); 

    this.state = {
      content: ""
    };
  }
  onClick(event) {
    event.preventDefault();
    this.props.askQuestion(this.state.content)
  }

  onChange(event) {
    this.setState({
      content: event.target.value
    });
  } 

  render() {
    return (
      <div class="col-md-12">
            <div className="justify-content-between d-flex">
                <input
                  onChange={event => this.onChange(event)}
                  type="text"
                  placeholder="Question"
                  className="form-control" />
                <button class="btn btn-danger col-md-3 ml-5" onClick={event => this.onClick(event)}> Ask </button>
            </div>
      </div>
    );
  }
}

export default AskQuestion;
