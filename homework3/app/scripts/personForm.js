
import React from 'react';
import $ from 'jquery'


module.exports = React.createClass({
  getInitialState: function() {
    return {firstName: '', lastName: '', loginID: '', startDate: ''};
  },
  handleFirstNameChange: function(e) {
    this.setState({firstName: e.target.value});
  },
  handleLastNameChange: function(e) {
    this.setState({lastName: e.target.value});
  },
    handleLoginIDChange: function(e) {
    this.setState({loginID: e.target.value});
  },
  handleStartDateChange: function(e) {
    this.setState({startDate: e.target.value});
  },
   handleSubmit: function(e) {
    e.preventDefault();
    var firstName = this.state.firstName.trim();
    var lastName = this.state.lastName.trim();
    var loginID = this.state.loginID.trim();
    var startDate = this.state.startDate.trim();
    if (!text || !author) {
      return;
    }
    this.props.onPersonSubmit({firstName: firstName, lastName: lastName, loginID: loginID, startDate: startDate});
    this.setState({firstName: '', lastName: '', loginID: '', startDate: ''});
  },
  render: function() {
    return (
       <form className="personForm" onSubmit={this.handleSubmit}>
        <input
          type="text"
          placeholder="First name"
          value={this.state.firstName}
          onChange={this.handleFirstNameChange}
        />
        <input
          type="text"
          placeholder="Last name"
          value={this.state.lastName}
          onChange={this.handleLastNameChange}
        />
        <input
          type="text"
          placeholder="Login ID"
          value={this.state.loginID}
          onChange={this.handleLoginIDChange}
        />
        <input
          type="date"
          placeholder="start Date"
          value={this.state.startDate}
          onChange={this.handleStartDateChange}
        />

        <input type="submit" value="Post" />
      </form>
    );
  }
});