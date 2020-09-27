import React from 'react';

const QuestionForm = (props)=>{
	
	const styleForm = () => {
		
		return {
			
			display: "grid",
			gridTemplateAreas: `
				"header header header"
				"question answer_1 answer_2 "
				"question answer_3 answer_4"
				"solution ... ..."
				`,
			gridGap: "3px"
		};
		
	}
	
	return (
		<div style={styleForm()} >
		
			<h3 onChange={props.updateTitle} style= {{gridArea:"header"}} >Qustion {props.index + 1}</h3>
			<textarea onChange={(e) => props.updateQuiz(e, props.index, "question")} style={{gridArea: "question"}} name="" id="" ></textarea>
			<input onChange={(e) => props.updateQuiz(e, props.index, "answer_1")} style={{gridArea: "answer_1"}} type="text" placeholder="answer-1" />
			<input onChange={(e) => props.updateQuiz(e, props.index, "answer_2")} style={{gridArea: "answer_2"}} type="text" placeholder="answer-2" />
			<input onChange={(e) => props.updateQuiz(e, props.index, "answer_3")} style={{gridArea: "answer_3"}} type="text" placeholder="answer-3" />
			<input onChange={(e) => props.updateQuiz(e,props.index, "answer_4")} style={{gridArea: "answer_4"}} type="text" placeholder="answer-4" />
			
			<select onChange={(e) => props.updateQuiz(e, props.index, "solution")} style={{gridArea: "solution"}} required name="" id="">
				<option disabled selected value="">Correct Answer</option>
				<option value="answer_1">Answer 1</option>
				<option value="answer_2">Answer 2</option>
				<option value="answer_3">Answer 3</option>
				<option value="answer_4">Answer 4</option>
				
			</select>
			
		</div>
	
	);
	
}

export default QuestionForm;