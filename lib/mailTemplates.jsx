import React from 'react'

const sitename = process.env.SITENAME;
const website = process.env.WEBSITE_URL;
const company = process.env.COMPANY_SHORT_NAME;

export const mailTemplates = (mailTemplateOptions) => {

const {user , templateName} = mailTemplateOptions;

var { username, firstname, lastname, image, email, gender, }=user;


if(!firstname)firstname = username;
switch (templateName){

    case 'activationDone': const sendMailOptions={

email,
subject: `Successful Account Activation on ${sitename}, Weldone!`,
message:`

Dear ${firstname},

We are delighted to inform you that your account with [Your Company Name] has been successfully activated. You can now enjoy all the benefits and features of our platform.

Thank you for choosing ${sitename} . Your account is now ready to use, and you can log in using your registered email address and the password you created during the registration process.

In case you encounter any issues or have any questions about our platform, please don't hesitate to reach out to our support team at suppor@${website} . We are here to assist you and ensure you have a seamless experience.

Once again, welcome to [Your Company Name]. We appreciate your trust in us and look forward to serving you.

Best regards,

Admin
${sitename}
admin@${website}`

 };

break;






}


  return sendMailOptions;

}