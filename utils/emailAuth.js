const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host:"smtp.ethereal.email",
    port:587,
    secure:false,
    auth:{
        user:'brandi.rempel39@ethereal.email',
        pass:'3T4QmG1gufrNuuWpvn'
    }
});
const sendmail= async(email,subject,text)=>{
    await transporter.sendMail({
        from:'"Slate" <brandi.rempel39@ethereal.email>',
        to:email,
        subject:subject,
        text:text,
    })
}

module.exports=sendmail;