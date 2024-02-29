import React from 'react'

const mailsend_host =process.env.EMAIL_HOST;
const mailsend_port =process.env.EMAIL_PORT ;
const mailsend_user =process.env.EMAIL_AUTH_USER;
const mailsend_pass =process.env.EMAIL_AUTH_PASS;

//const website       =process.env.WEBSITE;

export async function sendMail (sendMailOptions){
    const { email, subject , firstname, lastname , message, from  } = sendMailOptions;

    if(!htmlMessage)htmlMessage= message;//inclused a templating format
    if(!textMessage)textMessage = message;
  sender=(from)? from : process.env.DEFAULT_HOST_EMAIL

  
    // create reusable transporter object using the default SMTP transport


    let transporter = nodemailer.createTransport({
      host:mailsend_host,
      port: mailsend_port,
      auth: {
        user: mailsend_user,
        pass: mailsend_pass
      }
    });
  
    // setup email data with unicode symbols
    let mailOptions = {
        from: 'iMediaPORT Contact, admin@imediaport.com', // sender address
        to: email , adminEmail , // list of receivers
        cc: ccemail,
        bcc: bccemail,
        subject: subject, // Subject line
        text: textMessage ,// plain text body
        html: htmlMessage// html body
    };
  
    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
           console.log(error);
           return {status: 0, error};
        }
        console.log('Message sent: %s', info.messageId);   
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  
       return {status: 1, message :'Email has been sent'};
    });
   
};


export const u ={
mailsend_host :process.env.EMAIL_HOST,
mailsend_port :process.env.EMAIL_PORT ,
mailsend_user :process.env.EMAIL_AUTH_USER,
mailsend_pass :process.env.EMAIL_AUTH_PASS,
website       :process.env.WEBSITE,

 Turn : function(goto)
{
  const trace=true;

if(!hostpage)hostpage ="login/";
var website = this.website;
  
 if(trace){

    let ix=(goto.includes('/'))? this.website+goto: this.website+this.hostpage+goto;
  console.log("uTurn Request to ======Uturn=======>>",ix);
  
  }

  return (goto.includes('/'))? website+goto: website+hostpage+goto;

  

},

mail: async function  (sendMailOptions){
  const { email, subject , firstname, lastname , message, from  } = sendMailOptions;

  if(!htmlMessage)htmlMessage= message;//inclused a templating format
  if(!textMessage)textMessage = message;
sender=(from)? from : process.env.DEFAULT_HOST_EMAIL


  // create reusable transporter object using the default SMTP transport


  let transporter = nodemailer.createTransport({
    host:mailsend_host,
    port: mailsend_port,
    auth: {
      user: mailsend_user,
      pass: mailsend_pass
    }
  });

  // setup email data with unicode symbols
  let mailOptions = {
      from: 'iMediaPORT Contact, admin@imediaport.com', // sender address
      to: email , adminEmail , // list of receivers
      cc: ccemail,
      bcc: bccemail,
      subject: subject, // Subject line
      text: textMessage ,// plain text body
      html: htmlMessage// html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
         console.log(error);
         return {status: 0, error};
      }
      console.log('Message sent: %s', info.messageId);   
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

     return {status: 1, message :'Email has been sent'};
  });
 
}
}