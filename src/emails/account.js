const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email, name)=>{
    sgMail.send({
        to:email,
        from:'chukwurahb@outlook.com',
        subject:'Thanks for joining!!',
        text:`Welcome to the app, ${name}. Please do report all issues.`
    })
}


const sendCancelationEmail = (email, name)=>{
    sgMail.send({
        to:email,
        from:'chukwurahb@outlook.com',
        subject:'Sorry to see you go!!',
        text:`Please ${name} send feed back on why you cancelled`
    })
}
module.exports = {
    sendWelcomeEmail,
    sendCancelationEmail
}