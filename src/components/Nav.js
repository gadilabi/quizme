import React from 'react';
import { Link } from 'react-router-dom';
 
const Nav = (props)=>{
	
	const styleLink = (type)=>{
		
		if(type === "logo"){
			
			return {
				textDecoration: "none",
				color:"white",
				marginRight: "auto",
				marginLeft: "40px",
				fontWeight: "bold",

			};
			
		}

			
			
			
		return {
			textDecoration: "none",
			color:"white",
			marginRight: "40px"
			
		};
		
	}
	
	return (
		<div style={{fontSize: "25px", backgroundColor: "lightseagreen", display: "flex", alignItems: "center", color: "white", height: "80px"}} >
		
			<Link  style={styleLink("logo")} to="/">QuizMe</Link>
			<Link  style={styleLink()} to="/post_quiz">Post Quiz</Link>
			<Link  style={styleLink()} to="/">Quizes</Link>
			
		</div>
	
	);
	
}

export default Nav;