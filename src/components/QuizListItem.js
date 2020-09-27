import React, {useState} from 'react';
import { Link } from 'react-router-dom';

const QuizListItem = (props)=>{
	
	const styleWrapper = ()=>{
		return {
			padding: "5px 10px",
			backgroundColor: "lightslategrey",
			margin: "10px",
			borderRadius: "6px"
		};
		
	};
	
	const styleLink = ()=>{
		
		return {
			textDecoration: "none",
			color: "white"
			
		}
	}
	
	return (
		<div style={styleWrapper()} >
			<Link style={styleLink()}>{props.title}</Link>
			
		</div>
	
	);
	
}

export default QuizListItem;