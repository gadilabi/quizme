import React, {useState, useContext} from 'react';
import QuestionForm from './QuestionForm.js';
import { QuizListContext } from  '../contexts/QuizListContext.js';
import loading from '../img/loading.svg';
const Quiz = (props)=>{
	
	//List of all quizes
	const { quizList, setQuizList, subjects } = useContext(QuizListContext);
	
	//Number of questions in currently created quiz
	const [numberOfQuestions, setNumberOfQuestions] = useState(1);	
	//Is the page loading? set to true after posting the quiz
	const [isLoading, setIsLoading] = useState(false);
	
	const [error, setError] = useState({didError: false, msg: ""});
	
	//The title of the currently created quiz
	const [title, setTitle] = useState("");
	
	//The subject of the quiz
	const [subject, setSubject] = useState("");
	
	//The questions array of the currently created quiz
	const [quiz, setQuiz] = useState([
		{
			question: null,
			answer_1: null,
			answer_2: null,
			answer_3: null,
			answer_4: null,
			solution: null
		
		}]);
		
	//Update the title of the quiz
	const updateTitle = (e) =>{
		const title = e.target.value;
		
		setTitle(title);
	};
	
	
	//Update the currently created quiz
	const updateQuiz = (e, index, fieldType)=>{
		const field = e.target;
		const value = e.target.value;
		const quizCopy = [...quiz];
		quizCopy[index][fieldType] = value;
		
		setQuiz(quizCopy);
		
	};
	
	//Create the html for question forms
	let questionForms = [];
	for(let i=0; i<numberOfQuestions; i++){
		
		questionForms.push(<QuestionForm updateQuiz={updateQuiz} index={i}/>)
		
	}
	
	//Style the post quiz button and the add question button
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
			display: "flex",
			justifyContent: "center",
			alignItems: "center"
			

		};
		
		
	}
	
	//Add question form to the dom
	const addQuestion = (e)=>{

		setNumberOfQuestions(numberOfQuestions + 1);
		
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
	
	//Send quiz to server and update the dom
	const postQuiz = (e)=>{
		
		//Start loading animation
		setIsLoading(true);
		
		//Create the quiz object which will be sent in the body of the request
		const body = {
			title: title,
			subject: subject,
			questions: quiz,
			
		} ;
		
		//Turn quiz object to json
		const bodyJSON = JSON.stringify(body);
		
		//Post to server
		fetch('/post_quiz', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: bodyJSON
        })
			.then((res) => res.json())
			.then((payload) => {
				//If the quiz was successfuly added to the db then...
				if (payload.status === 'success') {
					//Update dom with the newly created quiz
					setQuizList([...quizList, {title: title, subject: subject, questions: quiz, id: payload.id}]);
					
					//Redirect to /
					props.history.push('/');

				} else if (payload.status === 'failure') {
					//Show failed message
					setError({didError: true, msg: "Server failed to save quiz to db"})
                } 
            })
			.catch((err) => {
			
				//hide animation
				setIsLoading(false);
	
				//show failure message
				setError({didError: true, msg: "Network failure could not send request to server"})
				
			});

	};
	
	function styleLoading(loadingStatus){
		if (loadingStatus) return {display: "block"};
		else return {};
		
	}
	
	function styleError(error){
		if(error.didError)
			return {display: "block", textAlign: "center", color: "crimson"};
		else
			return {display: "none"};
		
	}
	
	function selectSubject(e){
		const select = e.target;
		const selectedIndex = select.options.selectedIndex;
		const selectedOption = select[selectedIndex];
		const selectedValue = selectedOption.value;
		
		select.style.backgroundColor = selectedOption.style.backgroundColor;
		
		
		setSubject(selectedValue);
		
	}
	
	function stylePostQuizPage(){
		
		return {
			minHeight: "100vh",
			backgroundColor: "ghostwhite",
			display: "flex",
			flexDirection:"column",
			alignItems: "center"
		};
	}
	
	function styleFormWrapper(){
		return {
			backgroundColor: "white",
			width: "800px",
			maxWidth: "80%",
			marginTop: "40px",
			borderRadius: "10px",
			padding: "20px",
			display:"flex",
			flexDirection: "column"
		};
		
	}
	
	function styleSelectSubject(){
		
		if(window.innerWidth < 600){
			return {
				width: "100%",
				height: "40px",
				marginTop: "20px"
		};
			
		}
		
			return {
				width: "270px",
				height: "40px",
				marginTop: "20px"
		};
		
	}
	
	const subjectsJSX = subjects.map((subject)=>{
		return (
			<option value={subject.name} style={{backgroundColor: subject.color}} >{subject.name}</option>
		);
	});
	
	return (
		<div style={stylePostQuizPage()} >
		
			<div style={styleFormWrapper()}>
				<h2 style={{fontSize: "40px", marginBottom: "0px", textAlign: "center"}} >Create Quiz</h2>
				<form style={{marginTop: "20px", borderRadius: "6px", display:"flex", flexDirection: "column"}} action="">
					
					<div style={{height: "60px"}} className="input-wrapper">
						<input className="field" onChange={updateTitle} type="text" name="title" placeholder="Title" />
						<label htmlFor="">Title</label>
					</div>
					
					<select onChange={selectSubject} style={styleSelectSubject()}>
						{subjectsJSX}
						
					</select>
					
						{questionForms}
				</form>

				<button onClick={addQuestion} style={styleBtn("add")} >Add Question</button>
				
				<div style={styleError(error)}>
					{error.msg}
					
				</div>
				
				<button onClick={postQuiz} style={styleBtn()} >
					<img className="post-quiz-loading" style={styleLoading(isLoading)} src={loading} alt=""/>
					Post Quiz
				
				</button>
			</div>
		</div>
	
	);
	
}

export default Quiz;