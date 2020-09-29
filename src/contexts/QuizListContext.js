import React, { useState, createContext } from 'react';

export const QuizListContext = createContext();

const QuizListContextProvider = (props)=>{
	
	const [quizList, setQuizList] = useState([
		
		{title: "Wars in the middle east", id: 1, questions:[{question: "When did the sixth day war occured?", answer_1: "1978", answer_2: "1936", answer_3: "1976", answer_4: "1967", solution: "answer_4"}, {question: "Who won the sixth day war?", answer_1: "Israel", answer_2: "The Moops", answer_3: "Egypt", answer_4: "Klingons", solution: "answer_1"}]},
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