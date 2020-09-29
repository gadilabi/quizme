import React, {useState, useContext} from 'react';
import { QuizListContext } from '../contexts/QuizListContext'
import Question from './Question.js';

const Quiz = (props)=>{
	
	const [grade, setGrade] = useState("0");
	const [didSubmit, setSubmit] = useState(false);
	const {quizList, setQuizList} = useContext(QuizListContext);
	const quizId = props.match.params.id;
	const quiz = quizList.find((quiz)=> quiz.id == quizId);
	const {title, questions, id} = quiz;
	const [solution, setSolution] = useState(new Array(questions.length).fill({marked: null, correct:null}));
	
	
	const markAnswer = (questionNumber, answer)=>{
		let solutionCopy = [...solution];
		const checkAnswer = (answer == questions[questionNumber].solution) ? true : false;
		solutionCopy[questionNumber] = {marked: answer, correct: checkAnswer};
		
		setSolution(solutionCopy);
		
	};
	
	const questionsJSX = questions.map((question, index)=>{
		return(
		<Question didSubmit={didSubmit} markAnswer={markAnswer} marked={solution[index].marked} key={index} index={index} question={question.question} answer_1={question.answer_1} answer_2={question.answer_2} answer_3={question.answer_3} answer_4={question.answer_4} solution={question.solution}  />
	);
	});
	
	const styleQuizPage = ()=>{
		return {
			display: "flex",
			justifyContent: "center",
			minHeight: "100vh",
			backgroundColor: "ghostwhite",
			paddingTop: "1px"
			
			
		};
		
		
	};
	
	function styleQuizContainer(){
		
		return{
			padding: "20px",
			backgroundColor: "white",
			marginTop: "20px",
			width: "600px",
			alignSelf: "flex-start",
			borderRadius: "6px",
			display: "flex",
			flexDirection: "column",
			
		};
		
	}
	
	function styleTitle(){
		
		return {
			
			textAlign: "center",
			margin: "10px 0px 20px 0px",
			
		};
	}
	
	function styleSubmitBtn(){
		
		return {
			all: "unset",
			alignSelf: "center",	
			borderRadius: "3px",
			backgroundColor: "lightseagreen",
			color: "white",
			padding: "5px 10px",
			marginTop: "40px",
			cursor: "pointer",
			fontSize: "25px"
			
		};
	}
	
	function styleForm(){
		return {
			display: "flex",
			flexDirection: "column"
			
		};
		
	}
	
	function submitQuiz(e){
		e.preventDefault();
		setSubmit(true);
		let correctAns = solution.reduce((a, answer)=>{
			if(answer.correct)
				return a+=1;
			else
				return a;
			
		}, 0);
		
		setGrade(`${correctAns}/${solution.length}`);
		
	}
	
	function styleGrade(){
		if(didSubmit){
			
			return{
				display: "block",
				alignSelf: "center",
				border: "1px solid rgb(100,100,100)",
				padding: "5px 10px",
				fontSize: "25px"
				
			};
		}
		
		return {
			display: "none"	
			
		};
		
	}
	
	return (
		<div style={styleQuizPage()}>
			
			<div style={styleQuizContainer()}>
				
				<h2 style={styleTitle()}>{title}</h2>
				<form style={styleForm()} action="">

					{questionsJSX}
					
					
					<div style={styleGrade()}>Score: {grade}</div>
					<button onClick={submitQuiz} style={styleSubmitBtn()} >Submit</button>

				</form>
				
				
			</div>
			
		</div>
	
	);
	
}

export default Quiz;