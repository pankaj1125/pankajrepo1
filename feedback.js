const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const port = process.env.PORT || 3020;
const app = express();

// Static files middleware
app.use(express.static(__dirname));
app.use(express.urlencoded({ extended: true }));

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/students');
const db = mongoose.connection;
db.once('open', () => {
    console.log("MongoDB connection success");
});

// Mongoose model for feedback
const feedbackSchema = new mongoose.Schema({
    name: String,
    email: String,
    feedback: String
});
const Feedback = mongoose.model("Feedback", feedbackSchema);

// Route to handle feedback form submission
app.post('/feedback/post', async (req, res) => {
    try {
        const { name, email, feedback } = req.body;
        
        // Save feedback to the database
        const feedbackData = new Feedback({
            name,
            email,
            feedback
        });
        await feedbackData.save();
        
        console.log(feedbackData);
        res.send('Thank you for your feedback!');
    } catch (error) {
        console.error('Error saving feedback:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Start the server
app.listen(port, () => {
    console.log("Server started");
});
