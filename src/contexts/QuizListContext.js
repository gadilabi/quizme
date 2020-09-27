import React, { useState, createContext } from 'react';

export const QuizListContext = createContext();

const QuizListContextProvider = (props)=>{
	
	const [quizList, setQuizList] = useState([
		
		{title: "Wars in the middle east", id: 1, questions:null},
		{title: "American civil wars", id: 2, questions:null},
		{title: "The life of Van Goch", id: 3, questions:null},

	]);

	return(
		<QuizListContext.Provider value={{quizList, setQuizList}}>
			{props.children}
		</QuizListContext.Provider>
		
	);
	
}

export default QuizListContextProvider;