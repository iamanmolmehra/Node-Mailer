const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser());

app.get('/', (req, res) => {

    res.sendFile(__dirname + "/views/mail.html")
})
app.post('/mail', (req, res) => {
    var content = req.body
    console.log(content);

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: content.user,
            pass: content.password
        }
    });

    var mailer = {
        from: content.user,
        to: content.emailid,
        subject: content.subject,
        text: content.text
    };

    transporter.sendMail(mailer, (error, result) => {
        if (error) {
            console.log(error, "error occured in the end");
            // res.send("error occured in the end")
            res.sendFile(__dirname + "/views/error.html")
        }
        else {
            console.log("Mail Successfully delivered");
            console.log(mailer);
            // res.send("Mail Successfully delivered");
            res.sendFile(__dirname + "/views/success.html")
        }
    })
});

const PORT = 2021
app.listen(PORT, () => {
    console.log(`You are connected to PORT ${PORT}`);
})