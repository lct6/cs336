
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
    var first = this.state.firstName.trim();
    var last = this.state.lastName.trim();
    var login = this.state.loginID.trim();
    var start = this.state.startDate.trim();
    if (!first || !last || !login || !start) {
      return;
    }
    this.props.onPersonSubmit({firstName: first, lastName: last, loginID: login, startDate: start});
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

        <input type="submit" value="post" />
      </form>
    );
  }
});