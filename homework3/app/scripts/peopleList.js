import React from 'react';
import $ from 'jquery';
import Remarkable from 'remarkable';

import person from './person';


module.exports = React.createClass({
  render: function() {
    var personNodes = this.props.data.map(function(person) {
      return (
        <person firstName={person.firstName} lastName={person.lastName} key={person.loginID}>
          {person.startDate}
        </person>
      );
    });
    return (
      <div className="peopleList">
        {personNodes}
      </div>
    );
  }
});
