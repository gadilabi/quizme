import React, {useState, useContext} from 'react';
import { QuizListContext } from  '../contexts/QuizListContext.js';
import QuizListItem from './QuizListItem.js';
import {Link} from 'react-router-dom';

const QuizList = (props)=>{
	
	const { quizList, setQuizList } = useContext(QuizListContext);
	
//	const [state, setState] = useState({
//		
//		quizes: [
//			{title: "Wars in the middle east", id: 1},
//			{title: "American civil wars", id: 2},
//			{title: "The life of Van Goch", id: 3},
//			
//		]
//		
//	});
	
	const quizListElements = quizList.map((quiz)=>{
		
		return(
			<QuizListItem to={"/quiz/" + quiz.id} title={quiz.title} key={quiz.id} />
		);
		
	});
	
	
//	const quizList = state.quizes.map((quiz)=>{
//		
//		return(
//			<QuizListItem to={quiz.id} title={quiz.title} key={quiz.id} />
//		);
//		
//	});
	
	return (
		
		<div style={{minHeight: "100vh", backgroundColor: "ghostwhite", paddingTop: "1px", display:"flex", flexDirection: "column", alignItems: "center"}}>
			<div style={{backgroundColor: "white", marginTop: "20px", width: "50%", borderRadius: "6px"}} >

				{ quizListElements }

			</div>

		</div>

	
	);
	
}

export default QuizList;