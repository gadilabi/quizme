import React, {useState} from 'react';
import { Link } from 'react-router-dom';

const QuizListItem = (props)=>{
	const styleWrapper = ()=>{
		return {
			padding: "5px 10px",
			backgroundColor: props.subject.color ,
			margin: "10px",
			borderRadius: "6px",
			display: "flex",
			justifyContent: "center",
			alignItems: "center",
			flexDirection: "column",
			color: "white"
		};
		
	};
	
	const styleLink = ()=>{
		
		return {
			textDecoration: "none",
			color: "white",
			fontSize: "20px",
			marginBottom: "10px",
			textAlign: "center",
			
		};
	}
	
	return (
		<div style={styleWrapper()} >
			<Link to={props.to} style={styleLink()}>{props.title}</Link>
			<span>{props.subject.name}</span>
			<span>{props.length} Questions</span>
		</div>
	
	);
	
}

export default QuizListItem;