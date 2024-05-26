const express = require('express');
const path = require('path');
const nodemailer = require('nodemailer');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname)));
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/', (req, res) => {
    console.log(req.body);

    require('dotenv').config();
    
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        host:"smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: 'm.mohamed.shinan@gmail.com',
            pass: 'wkwj dqum snfh rzpq' 
        }
    });

    const mailOptions = {
        from: req.body.email,
        to: 'm.mohamed.shinan@gmail.com',
        subject: 'New Contact Form Submission',
        text: `Name: ${req.body.name}\nEmail: ${req.body.email}\nContact Number: ${req.body.contactNumber}\nMessage: ${req.body.message}`
    };
    

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.send('error');
        } else {
            console.log('Email sent: ' + info.response);
            res.send('success');
        }
    });
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Server running on port ${port}`);
});
