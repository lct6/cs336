//Lisa Terwilliger
//homework 3

import React from 'react';
import ReactDOM from 'react-dom';

import personBox from './personBox';

import '../css/base.css';



ReactDOM.render(
  <personBox url="/people" pollInterval={2000} />,
  document.getElementById('content')
);