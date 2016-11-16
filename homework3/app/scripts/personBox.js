//copied from lab10
import React from 'react';
import $ from 'jquery';

import peopleList from './peopleList';
import personForm from './personForm';

module.exports = React.createClass({
    getInitialState: function() {
        return {data: []};
    },    


  loadPeopleFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
    handlePersonSubmit: function(person) {
          var people = this.state.data;
    var newPerson = people.concat([person]);
    this.setState({data: newPerson});
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: person,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        this.setState({data: people});
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    this.loadPeopleFromServer();
    setInterval(this.loadPeopleFromServer, this.props.pollInterval);
  },
  render: function() {
    return (
      <div className="personBox">
        <h1>People</h1>
        <peopleList data={this.state.data} />
        <personForm onPersonSubmit={this.handlePersonSubmit} />
      </div>
    );
  }
});