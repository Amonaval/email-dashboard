import React, { Component } from 'react';

class ComposeEmail extends Component {

  constructor(props) {
    super(props);

    this.state = {
        to: '',
        address: '',
        time: '',
        from: '',
        subject: '',
        message: ''
    }
    this.handleEmailSend = this.handleEmailSend.bind(this);
  }

  handleEmailSend() {
    const newItem = {...this.state};
    this.props.newItemSend(newItem);
  }

  render() {

    return (
      <form className="container mail-compose">
        <div className="form-group">
          <label htmlFor="toInput" className="form-label">To: </label>
          <input
            className="form-input"
            id="toInput"
            name="toInput"
            type={this.props.type}
            value={this.state.to}
            onChange={(e) => {this.setState({to: e.target.value})}}
            placeholder={this.props.placeholder} 
          />
        </div>
        <div className="form-group">
          <label htmlFor="subjectInput" className="form-label">Subject: </label>
          <input
            className="form-input"
            id="subjectInput"
            name="subjectInput"
            type="text"
            value={this.state.subject}
            onChange={(e) => {this.setState({subject: e.target.value})}}
            placeholder={this.props.placeholder} 
          />
        </div>
        <div className="form-group">
          <label htmlFor="mailBody" className="form-label">MailBody: </label>
          <textarea
            rows="4" cols="50"
            className="form-input"
            id="mailBody"
            name="mailBody"
            value={this.state.message}
            onChange={(e) => {this.setState({message: e.target.value})}}
            placeholder={this.props.placeholder} 
          />
        </div>
        <input className="send-mail-btn" type="button" onClick={this.handleEmailSend} value="Send Email" />
      </form>
    );
  }

}

export default ComposeEmail;