var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'wongsathornthongrod@gmail.com',
        pass: 'a$f51WAbSC0*emQ08ihwp$jz*U8*$M'
    }
});
  
var mailOptions = {
from: 'wongsathornthongrod@gmail.com',
to: 'thongrodw@gmail.com',
subject: 'Document Sucessfully Approved',
text: 'All Users has approved the document'
};


exports.sendMail = function(){
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent sucessfully!' );
        }
        });
}
