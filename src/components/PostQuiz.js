import React, {useState, useContext} from 'react';
import QuestionForm from './QuestionForm.js';
import { QuizListContext } from  '../contexts/QuizListContext.js';

const Quiz = (props)=>{
	
	const { quizList, setQuizList } = useContext(QuizListContext);

	const [state, setState] = useState({
		
		numberOfQuestions: 1,
	});
	
	const [title, setTitle] = useState("");
	
	const [quiz, setQuiz] = useState([
		{
			question: null,
			answer_1: null,
			answer_2: null,
			answer_3: null,
			answer_4: null,
			solution: null
		
		}]);
	
	const updateTitle = (e) =>{
		const title = e.target.value;
		
		setTitle(title);
	};
	
	const updateQuiz = (e, index, fieldType)=>{
		const field = e.target;
		const value = e.target.value;
		const quizCopy = [...quiz];
		quizCopy[index][fieldType] = value;
		
		setQuiz(quizCopy);
		
	};
	
	let questionForms = [];
	
	for(let i=0; i<state.numberOfQuestions; i++){
		
		questionForms.push(<QuestionForm updateQuiz={updateQuiz} index={i}/>)
		
	}
	
	const styleBtn = (type)=>{
		
		if(type === "add"){
			
			return {
				all: "unset",
				backgroundColor: "ghostwhite",
				padding: "5px 10px",
				border: "1px solid rgba(150,150,150, 0.5)",
				borderRadius: "3px",
				marginTop: "10px",
				alignSelf: "flex-start",
				cursor: "pointer"
			};
			
		}
		
		return {
			all: "unset",
			backgroundColor: "lightseagreen",
			color: "white",
			padding: "5px 10px",
			border: "1px solid rgba(150,150,150, 0.5)",
			borderRadius: "3px",
			marginTop: "10px",
			alignSelf: "center",
			fontSize: "35px",
			cursor: "pointer",
			

		};
		
		
	}
	
	const addQuestion = (e)=>{
		setState({
			numberOfQuestions: state.numberOfQuestions + 1
			
		});
		
		setQuiz(
			[...quiz, {
				question: null,
				answer_1: null,
				answer_2: null,
				answer_3: null,
				answer_4: null,
				solution: null
			}]
		);
		
	};
	
	const postQuiz = (e)=>{
		setQuizList([...quizList, {title: title, questions: quiz, id: Math.round(Math.random()*100000)}]); 
		
	};
	
	
	return (
		<div style={{minHeight: "100vh", backgroundColor: "ghostwhite", display: "flex", flexDirection:"column", alignItems: "center"}} >
		
			<div style={{backgroundColor: "white", width: "800px", marginTop: "40px", borderRadius: "10px", padding: "20px", display:"flex", flexDirection: "column"}}>
				<h2 style={{fontSize: "40px", marginBottom: "0px", textAlign: "center"}} >Create Quiz</h2>
				<form style={{marginTop: "20px", borderRadius: "6px", display:"flex", flexDirection: "column"}} action="">
					<input onChange={updateTitle} type="text" name="title" placeholder="Enter quiz name" />

					{questionForms}

				</form>

				<button onClick={addQuestion} style={styleBtn("add")} >Add Question</button>
				<button onClick={postQuiz} style={styleBtn()} >Post Quiz</button>
			</div>
		</div>
	
	);
	
}

export default Quiz;