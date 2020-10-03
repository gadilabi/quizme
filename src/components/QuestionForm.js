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
			gridGap: "10px",
			gridTemplateRows: "auto 60px 60px 40px"
			
		};
		
	};
		
	return (
		<div className="question-form-wrapper" style={styleForm()} >
		
			<h3 style= {{gridArea:"header", marginBottom: "0px"}} >Qustion {props.index + 1}</h3>
		
			<div className="input-wrapper" style={{gridArea: "question"}}>
				
				<textarea className="field" style={{height:"80%"}} placeholder="Question" onChange={(e) => props.updateQuiz(e, props.index, "question")}  name="" id="" ></textarea>
				<label for="">Question</label>				
				
			</div>			
			
			<div class="input-wrapper">
				<input className="field" onChange={(e) => props.updateQuiz(e, props.index, "answer_1")} style={{gridArea: "answer_1"}} type="text" placeholder="answer-1" />
				<label for="">answer 1</label>				
			</div>
			<div class="input-wrapper">
				<input className="field" onChange={(e) => props.updateQuiz(e, props.index, "answer_2")} style={{gridArea: "answer_2"}} type="text" placeholder="answer-2" />
				<label for="">answer 2</label>
				
			</div>
			
			<div class="input-wrapper">
				<input className="field" onChange={(e) => props.updateQuiz(e, props.index, "answer_3")} style={{gridArea: "answer_3"}} type="text" placeholder="answer-3" />
				<label for="">answer 3</label>
				
			</div>			
			
			<div class="input-wrapper">
				<input className="field" onChange={(e) => props.updateQuiz(e,props.index, "answer_4")} style={{gridArea: "answer_4"}} type="text" placeholder="answer-4" />
				<label for="">answer 4</label>
				
			</div>			
			
			
			<select onChange={(e) => props.updateQuiz(e, props.index, "solution")} style={{gridArea: "solution"}} required name="" id="">
				<option disabled selected value="">Solution</option>
				<option value="answer_1">Answer 1</option>
				<option value="answer_2">Answer 2</option>
				<option value="answer_3">Answer 3</option>
				<option value="answer_4">Answer 4</option>
				
			</select>
			
		</div>
	
	);
	
}

export default QuestionForm;