import React, {useState} from 'react';

const Question = (props)=>{
	
	function styleQuestion(){
		return{
			display: "flex",
			flexDirection: "column"
			
		};
		
		
	}
	
	function styleAnswer(answer){
		if(answer === null){
			return {};
			
		}
		
		if(answer === props.marked && answer === props.solution && props.didSubmit){
			
			return {
				fontWeight: "bold",
				color: "lightseagreen"
				
			};
		}
		
		if(answer === props.marked && props.didSubmit){
			return {
				fontWeight: "bold",
				color: "crimson"
					
				
			};
			
		}
		
		if(props.didSubmit && answer === props.solution){
				return{
					fontWeight: "bold",
					color: "lightseagreen"
					
				}

			
		}
		
	}
	
	return (
		<div style={styleQuestion()}>
			<h3 style={{margin: "20px 0px 0px 0px"}}>Question {props.index + 1}</h3>
			<p style={{margin: "10px 0px 10px 0px"}} >{props.question}</p>
			
			<div>
				<input data-value={props.answer_1} onChange={()=>props.markAnswer(props.index, "answer_1")} type="radio" name={props.index}/>
				<label style={styleAnswer("answer_1")} for="">{props.answer_1}</label>
			</div>
			
			<div>
				<input data-value={props.answer_2} onChange={()=>props.markAnswer(props.index, "answer_2")} type="radio" name={props.index}/>
				<label style={styleAnswer("answer_2")} for="">{props.answer_2}</label>
			</div>									

			<div>
				<input data-value={props.answer_3} onChange={()=>props.markAnswer(props.index, "answer_3")} type="radio" name={props.index}/>
				<label style={styleAnswer("answer_3")} for="">{props.answer_3}</label>
			</div>									

			<div>
			<input data-value={props.answer_4} onChange={()=>props.markAnswer(props.index, "answer_4")} type="radio" name={props.index}/>
			<label style={styleAnswer("answer_4")} for="">{props.answer_4}</label>
			</div>									
									
												
		</div>
	
	);
	
}

export default Question;