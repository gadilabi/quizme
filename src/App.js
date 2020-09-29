import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import './App.css';
import Nav from './components/Nav.js';
import QuizList from './components/QuizList.js';
import PostQuiz from './components/PostQuiz.js';
import Quiz from './components/Quiz.js';
import QuizListContextProvide from './contexts/QuizListContext.js';


function App() {
  return (
	<BrowserRouter>
		<div className="app">
		<QuizListContextProvide>
			<Nav />
			<Route exact path="/" component={QuizList} />
			<Route exact path="/post_quiz" component={PostQuiz} />
			<Route exact path="/quiz/:id" component={Quiz} />
		</QuizListContextProvide>
		</div>
		
	</BrowserRouter>
  );
}

export default App;
