var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){
	res.render('index', {title: 'Integrate Cloud Solutions with Business'});
});

app.get('/about', function(req, res){
	res.render('about');
});

app.get('/services', function(req, res){
	res.render('services');
});

app.get('/contact', function(req, res){
	res.render('contact');
});

app.post('/contact/send', function(req, res){
	var transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			//type: 'login',
			user: 'noor.ahmed.farid@gmail.com',
			pass: ''
		}
	});

	var mailOptions = {
		from: 'Noor Farid <noor.ahmed.farid@gmail.com>',
		to: 'ahmedfd235@gmail.com',
		subject: 'Website Submission',
		text: 'You have a submission with the following details... Name: '+req.body.name+'Email: '+req.body.email+'Message: '+req.body.message,
		html: '<p>You have a submission with the following details...</p><ul><li>'+req.body.name+'</li><li>Email: '+req.body.email+'</li><li>Message: '+req.body.message+'</li></ul>'
	};

	transporter.sendMail(mailOptions, function(error, info){
		if(error){
			console.log(error);
			res.redirect('/');
		} else {
			console.log('Message Sent: '+info.response);
			res.redirect('/');
		}
	});
});

app.listen(3000);
console.log('Server is running on port 3000');