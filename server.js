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
const quiz = {title: "trial", questions: [{question: "am i stupid", answer_1: "yes", answer_2: "no", answer_3: "i dont kno", answer_4: "i dont care", solution: "answer_1"}]};


//Port
const PORT = process.env.PORT || 8080;

//Initialize express app
const app = express();

//Set the view engine as ejs
app.set('view engine', 'ejs');

//Set the public folder as static
app.use(express.static(path.join(__dirname,'build')));

//Start listening
app.listen(PORT, (err) => {
    if (err)
        console.log('Error:' + err);
    else
        console.log('Listening on port ' + PORT);
});

app.use(express.json());
app.use(express.urlencoded({
    extended:false
}));

//Homepage
app.get('/get_quizes', function (req, res) {

	
//	db.collection('quizes').get()
//		.then((snapshot)=>{
//			let payload = {data:null};
//			let quizes = [];
//		snapshot.docs.forEach((doc)=>{
//			let data = doc.data();
//			data.id = doc.id;
//			quizes.push(data);
//			
//		});
//		payload["data"] = quizes;
//		
//		res.json(payload);
//		
//	}).catch(err=>console.log(err));
//	;

	let data = [
			{
			title: "silly googse",
			 id: 1,
			 questions: 
			[
				{
				 question: "Who will be the next nba champions?",
				 answer_1: "me",
				 answer_2: "lakers",
				 answer_3: "miami heat",
				 answer_4: "Clippers",
				 solution:"answer_3"
			 
			 	} 
			  
			  ] 
			},
		
			{
			title: "silly googse",
			 id: 2,
			 questions: 
			[
				{
				 question: "Who will be the next nba champions?",
				 answer_1: "me",
				 answer_2: "lakers",
				 answer_3: "miami heat",
				 answer_4: "Clippers",
				 solution:"answer_3"
			 
			 	} 
			  
			  ] 
			},
		
			{
			title: "silly googse",
			 id: 3,
			 questions: 
			[
				{
				 question: "Who will be the next nba champions?",
				 answer_1: "me",
				 answer_2: "lakers",
				 answer_3: "miami heat",
				 answer_4: "Clippers",
				 solution:"answer_3"
			 
			 	} 
			  
			  ] 
			},
		
			{
			title: "silly googse",
			 id: 4,
			 questions: 
			[
				{
				 question: "Who will be the next nba champions?",
				 answer_1: "me",
				 answer_2: "lakers",
				 answer_3: "miami heat",
				 answer_4: "Clippers",
				 solution:"answer_3"
			 
			 	} 
			  
			  ] 
			},
		
			{
			title: "silly googse",
			 id: 5,
			 questions: 
			[
				{
				 question: "Who will be the next nba champions?",
				 answer_1: "me",
				 answer_2: "lakers",
				 answer_3: "miami heat",
				 answer_4: "Clippers",
				 solution:"answer_3"
			 
			 	} 
			  
			  ] 
			},
		
			{
			title: "silly googse",
			 id: 6,
			 questions: 
			[
				{
				 question: "Who will be the next nba champions?",
				 answer_1: "me",
				 answer_2: "lakers",
				 answer_3: "miami heat",
				 answer_4: "Clippers",
				 solution:"answer_3"
			 
			 	} 
			  
			  ] 
			},
		
		
	]
	
	let payload = {data};
	console.log("touch");
	res.json(payload);
	
	
});

app.post('/post_quiz', function (req, res) {
	db.collection('quizes').add(quiz).then(()=> console.log("added")).catch(()=>console.log("you missed it by one mile"));
	
});



