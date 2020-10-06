const express = require('express');
const path = require('path');

var admin = require("firebase-admin");

//get the api key:
//in dev- get the key from the key.json file
//in production- get the key from the heroku config variables
var serviceAccount = (process.env.FIREBASE_KEY) ? JSON.parse(process.env.FIREBASE_KEY) : require(path.join(__dirname, 'key.json'));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://quizme-85367.firebaseio.com"
});


const db = admin.firestore();

//get port in environmet else use port 8080
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
		
	
});

//route for users to post new quizes
app.post('/post_quiz', function (req, res) {
	
	const quiz = req.body;
	
	//Add quiz to collection
	db.collection('quizes').add(quiz)
		.then((doc)=> res.json({status:"success", id: doc.id}))
		.catch((err)=> res.json({status: "failure"}) );
	
});

//catch all route so whenever user refreshes a page the index.html is going to be served
app.get('*', (req, res)=>{
	console.log(req.url);
	res.sendFile(path.join(__dirname, "client", "build", "index.html"));
	
});

