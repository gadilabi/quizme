import React from 'react';
import { Link } from 'react-router-dom';
 
const Nav = (props)=>{
	
	const styleLink = (type)=>{
		
		if(type === "logo"){
			
			return {
				textDecoration: "none",
				color:"white",
				marginRight: "40px",
				marginLeft: "40px",
				fontWeight: "bold",
				fontSize: "40px"

			};
			
		}
		
		if(type === "sign in"){
			
			return{
				textDecoration: "none",
				color:"white",
				margin: "0px 20px 0px auto",
				
				
			}
			
		}

			
			
			
		return {
			textDecoration: "none",
			color:"white",
			marginRight: "40px"
			
		};
		
	}
	
	return (
		<div style={{fontSize: "25px", backgroundColor: "lightseagreen", display: "flex", alignItems: "center", justifyContent: "center", color: "white", height: "80px"}} >
		
			<Link  style={styleLink("logo")} to="/">QuizMe</Link>
			
		</div>
	
	);
	
}

export default Nav;