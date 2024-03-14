const express = require('express');
const nodemailer = require('nodemailer');

const app = express();
const PORT = 3000; // Set your desired port

app.use(express.json());

app.post('/api/send-email', (req, res) => {
    const { content } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'smtp.gmail.com', // e.g., 'gmail'
        auth: {
            user: 'martand.mahajan@mitaoe.ac.in',
            pass: '31122003'
        }
    });

    const mailOptions = {
        from: 'martand.mahajan@mitaoe.ac.in',
        to: 'ashutosh.rajput@03',
        subject: 'Invoice from Eshop',
        html: content
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            res.status(500).json({ error: 'Error sending email' });
        } else {
            console.log('Email sent:', info.response);
            res.json({ message: 'Email sent successfully' });
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
