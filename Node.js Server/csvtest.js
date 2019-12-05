var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'mi.library.djelfa.university@gmail.com',
    pass: 'Vn"^Ks-QN6kNh`ks'
  }
});
var mailOptions = {
	from: 'mi.library.djelfa.university',
	to: 'gpscrambor.4862500@gmail.com',
	subject: 'test',
	text: 'how are u',
	html: ''
  };
  /**
   * 
   * @param {String} email 
   */
  function isValid(email){
	var low = email.toLowerCase();
	if(/\*@gmail.com/i.test(low)){
		if(/^[\w\d]((?!\.\.)([\w\d\.])){4,28}[\w\d]@google.com$/i.test(low)&& !/(?=\.\.)/.test(low)){
			return true;
		}
	}else if(/\*@yahoo.com/i.test(low)){
		if(/^[\w]((?!\.\.)([\w\d\._])){3,30}[\w\d]@yahoo.com$/i.test(low)&& !/(?=\.\.)/.test(low)){
			return true;
		}
	}else if(/\*@outlook.com/i.test(low)){
		if(/^[\w]((?!\.\.)([\w\d\._])){0,62}[\w\d_](@outlook.com|hotmail.com)$/i.test(low)&& !/(?=\.\.)/.test(low)){
			return true;
		}
	}
	return false;
  }
  /**
   * 
   * @param {String} to 
   */
  
function sendMail(to){
	if(!isValid(to)){

	}
	mailOptions.to = to;
	transporter.sendMail(mailOptions, function(error, info){
		if (error) {
		  console.log(error);
		} else {
		  console.log('Email sent: ' + info);
		}
	});
}


