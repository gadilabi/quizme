const express = require('express');
const path = require('path');

var admin = require("firebase-admin");
var serviceAccount = require(path.join(__dirname, 'key.json'));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://quizme-85367.firebaseio.com"
});


//const {Firestore} = require('@google-cloud/firestore');

const db = admin.firestore();

//Port
const PORT = process.env.PORT || 8080;

//Initialize express app
const app = express();

//Start listening
app.listen(PORT, (err) => {
    if (err)
        console.log('Error:' + err);
    else
        console.log('Listening on port ' + PORT);
});

//Set the public folder as static
app.use(express.static('client/build'));


app.use(express.json());
app.use(express.urlencoded({
    extended:false
}));


//API endpoint get all the quizes
app.get('/get_quizes', function (req, res) {

	let payload = {};
	let quizes = [];
	
	db.collection('quizes').get()
		.then((snapshot)=>{
			snapshot.docs.forEach((doc)=>{
				let data = doc.data();
				data.id = doc.id;
				quizes.push(data);
			
		});
		
		payload["data"] = quizes;
		
		res.json(payload);
		
	}).catch(err=>console.log(err));
	;
	
//	let data = [
//			{
//			title: "silly googse",
//			 id: 1,
//			 questions: 
//			[
//				{
//				 question: "Who will be the next nba champions?",
//				 answer_1: "me",
//				 answer_2: "lakers",
//				 answer_3: "miami heat",
//				 answer_4: "Clippers",
//				 solution:"answer_3"
//			 
//			 	} 
//			  
//			  ] 
//			},
//		
//			{
//			title: "silly googse",
//			 id: 2,
//			 questions: 
//			[
//				{
//				 question: "Who will be the next nba champions?",
//				 answer_1: "me",
//				 answer_2: "lakers",
//				 answer_3: "miami heat",
//				 answer_4: "Clippers",
//				 solution:"answer_3"
//			 
//			 	} 
//			  
//			  ] 
//			},
//		
//			{
//			title: "silly googse",
//			 id: 3,
//			 questions: 
//			[
//				{
//				 question: "Who will be the next nba champions?",
//				 answer_1: "me",
//				 answer_2: "lakers",
//				 answer_3: "miami heat",
//				 answer_4: "Clippers",
//				 solution:"answer_3"
//			 
//			 	} 
//			  
//			  ] 
//			},
//		
//			{
//			title: "silly googse",
//			 id: 4,
//			 questions: 
//			[
//				{
//				 question: "Who will be the next nba champions?",
//				 answer_1: "me",
//				 answer_2: "lakers",
//				 answer_3: "miami heat",
//				 answer_4: "Clippers",
//				 solution:"answer_3"
//			 
//			 	} 
//			  
//			  ] 
//			},
//		
//			{
//			title: "silly googse",
//			 id: 5,
//			 questions: 
//			[
//				{
//				 question: "Who will be the next nba champions?",
//				 answer_1: "me",
//				 answer_2: "lakers",
//				 answer_3: "miami heat",
//				 answer_4: "Clippers",
//				 solution:"answer_3"
//			 
//			 	} 
//			  
//			  ] 
//			},
//		
//			{
//			title: "silly googse",
//			 id: 6,
//			 questions: 
//			[
//				{
//				 question: "Who will be the next nba champions?",
//				 answer_1: "me",
//				 answer_2: "lakers",
//				 answer_3: "miami heat",
//				 answer_4: "Clippers",
//				 solution:"answer_3"
//			 
//			 	} 
//			  
//			  ] 
//			},
//		
//		
//	]
	
	
	
});

app.post('/post_quiz', function (req, res) {
	
	const quiz = req.body;
	
	//Add quiz to collection
	db.collection('quizes').add(quiz)
		.then((doc)=> res.json({status:"success", id: doc.id}))
		.catch((err)=> res.json({status: "failure"}) );
	
});


app.get('/', (req, res)=>{
	console.log(req.url);
	res.sendFile(path.join(__dirname, "client", "build", "index.html"));
	
});

