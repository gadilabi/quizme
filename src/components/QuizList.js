import React, {useState, useContext, useEffect} from 'react';
import { QuizListContext } from  '../contexts/QuizListContext.js';
import QuizListItem from './QuizListItem.js';
import {Link} from 'react-router-dom';

const QuizList = (props)=>{
	
	const { quizList, setQuizList, fetched, setFetched } = useContext(QuizListContext);
	
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
		
		return(
			<QuizListItem length={quiz.questions.length} to={"/quiz/" + quiz.id} title={quiz.title} key={quiz.id} />
		);
		
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
		return {
			display: "grid",
			gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
			gridAutoRows:"150px",
			marginTop: "20px",
			width: "50%",
			borderRadius: "6px",
			
		
		}
		
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
		
	
	return (
		
		<div style={styleQuizListPage()}>
		
		
			<Link class="post-quiz-link" style={styleAddQuizBtn()} to="/post_quiz"><span style={{verticalAlign: "middle", transform: "translateY(-3px)"}} >+</span></Link>
			<div style={styleQuizListWrapper()} >

				{ quizListElements }

			</div>

		</div>

	
	);
	
}

export default QuizList;