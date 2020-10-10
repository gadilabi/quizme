import React, {useState, useContext, useEffect} from 'react';
import { QuizListContext } from  '../contexts/QuizListContext.js';
import QuizListItem from './QuizListItem.js';
import {Link} from 'react-router-dom';

const QuizList = (props)=>{
	
	const { quizList, setQuizList, fetched, setFetched, subjects } = useContext(QuizListContext);
	const [subject, setSubject] = useState("all");

	//Fetch data from server
	useEffect(()=>{
		if(fetched) return;
		fetch('/get_quizes')
		.then((data)=> data.json() )
		.then((quizes)=>{
			setFetched(true);
			setQuizList(quizes.data);
		}).catch(err=>console.log(err));
	}, []);

	const quizListElements = quizList.map((quiz)=>{

		console.log(subject, quiz.subject);
		if(quiz.subject === subject || subject === "all"){
			console.log("inside");	
			const color = subjects.reduce((a, subject)=>{
				if(subject.name === quiz.subject)
					return subject.color;
				else
					return a;
			}, "");

			return(
				<QuizListItem length={quiz.questions.length} to={"/quiz/" + quiz.id} subject={{name: quiz.subject, color: color}} title={quiz.title} key={quiz.id} />
			);
			
		}
		
		return ;
		
		
	});
	
	function styleQuizListPage(){
		return {
			minHeight: "100vh", 
			backgroundColor: "ghostwhite",
			paddingTop: "1px",
			display:"flex",
			flexDirection: "column",
			alignItems: "center",
		
		};
		
	}
	
	function styleQuizListWrapper(){
		
		let styles = {
			
			display: "grid",
			gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
			gridAutoRows:"150px",
			marginTop: "20px",
			borderRadius: "6px",
			justifyContent: "center"
			
		}
		
		if(window.innerWidth > 800)
			styles.width = "50%";
		else
			styles.width = "90%";
		
		return styles;
	}
	
	
	function styleAddQuizBtn(){
		return {
			position:"relative",
			display: "flex",
			justifyContent: "center",
			alignItems: "center",
			borderRadius: "100%",
			backgroundColor: "salmon",
			width: "60px",
			height: "60px",
			textDecoration: "none",
			color: "ghostwhite",
			fontSize: "40px",
			padding: "0",
			verticalAlign: "middle",
			boxShadow: "1px 3px 8px 0 rgba(0, 0, 0, 0.5)"
			
			
		};
		
	}
		
		const subjectsJSX = subjects.map((subject)=>{
			return(
			
				<button onClick={selectSubject} className="subject-btn" style={{backgroundColor: subject.color}}>{subject.name}</button>
			);
			
		});
		
	
	function selectSubject(e){
		setSubject(e.target.textContent);
		
	}
	
	return (
		
		<div style={styleQuizListPage()}>
		
			<div id="subjects">
				{subjectsJSX}
				
			</div>
		
			<Link className="post-quiz-link" style={styleAddQuizBtn()} to="/post_quiz"><span style={{verticalAlign: "middle", transform: "translateY(-3px)"}} >+</span></Link>
			<div style={styleQuizListWrapper()} >

				{ quizListElements }

			</div>

		</div>

	
	);
	
}

export default QuizList;