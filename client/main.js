'use strict';

var React = require('react');
var ReactDOM = require('react-dom');

//components
var CommentBox = require('./comment-box');

//render comments box
ReactDOM.render(
    <CommentBox url="/api/comments" pollInterval={2000}/>,
    document.getElementById('content')
);

module.exports = React;