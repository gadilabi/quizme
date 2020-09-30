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
		
	
	return (
		
		<div style={styleQuizListPage()}>
			<div style={styleQuizListWrapper()} >

				{ quizListElements }

			</div>

		</div>

	
	);
	
}

export default QuizList;