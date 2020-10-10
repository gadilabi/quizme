import React, {useState, useContext, useEffect} from 'react';
import { QuizListContext } from '../contexts/QuizListContext';
import Question from './Question.js';
import loading from '../img/loading.svg';

const Quiz = (props)=>{
	
	//decide if spinner or render
	const [isLoading, setIsLoading] = useState(true);
	
	//Get the shared state from the context
	const {quizList, setQuizList, fetched, setFetched} = useContext(QuizListContext);
	
	//The grade the user got in the quiz
	const [grade, setGrade] = useState("0");
	
	//Did the user submit the quiz
	const [didSubmit, setSubmit] = useState(false);
	
	//The quiz id taken from the url
	const quizId = props.match.params.id;
	
	//The find the quiz in the quiz list by id
	const quiz = quizList.find((quiz)=> quiz.id == quizId);
	
	//Destructure the quiz if the quizList was already fetched or set deault values if not
	const {title, questions, id} = (quizList.length > 0) ? quiz : {title: "", questions: [{}], id: 1};
	
	//hold the currently marked answers by the user
	const [solution, setSolution] = useState(new Array(questions.length).fill({marked: null, correct:null}));
	
	//Update the solution when user marks an answer
	const markAnswer = (questionNumber, answer)=>{
		let solutionCopy = [...solution];
		const checkAnswer = (answer == questions[questionNumber].solution) ? true : false;
		solutionCopy[questionNumber] = {marked: answer, correct: checkAnswer};
		
		setSolution(solutionCopy);
		
	};
		
	//Fetch data if not already fetched
	useEffect(()=>{
		if(fetched) return;
		fetch('/get_quizes')
		.then((data)=> data.json() )
		.then((quizes)=>{
			setFetched(true);
			setQuizList(quizes.data);
		}).catch(err=>console.log(err));
	}, []);

	//Style the entire page
	const styleQuizPage = ()=>{
		return {
			display: "flex",
			justifyContent: "center",
			minHeight: "100vh",
			backgroundColor: "ghostwhite",
			paddingTop: "1px"
			
		};
		
	};

	//Style the quiz container
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
			boxSizing: "border-box",
			maxWidth: "90%"
			
		};
		
	}
	
	//Style the title
	function styleTitle(){
		
		return {
			
			textAlign: "center",
			margin: "10px 0px 20px 0px",
			
		};
	}

	//hide or show the spinner
	function styleLoading(loadingStatus){
	if (loadingStatus) return {display: "block"};
	else return {};
		
	}
	
	//Style the submit button
	function styleSubmitBtn(){
		
		const style = {
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
		
		//Hide or show the spinner 
		if(!didSubmit){
			return style;	
		}
		else{
			style.display = "none";
			return style;
		}
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

	
	//Style the form
	function styleForm(){
		return {
			display: "flex",
			flexDirection: "column"
			
		};
		
	}
	
	//Submit the quiz
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

	/* RENDERING */
	
	if(quizList.length === 0){
		console.log("loading");
		//If the data was not fetched yet render loading animation
		return (
			<div style={{minHeight: "100vh", display: "grid", placeItems: "center"}}>
				<img className="post-quiz-loading" style={styleLoading(isLoading)} src={loading} alt=""/>
			</div>
		);
		
	}
	
	//If the data was fetched...
	else{
		
		//Create jsx of the questions
		const questionsJSX = questions.map((question, index)=>{
		return(
		<Question didSubmit={didSubmit} markAnswer={markAnswer} marked={solution[index].marked} key={index} index={index} question={question.question} answer_1={question.answer_1} answer_2={question.answer_2} answer_3={question.answer_3} answer_4={question.answer_4} solution={question.solution}  />
	);
	});

		//Return the JSX
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
	
}

export default Quiz;