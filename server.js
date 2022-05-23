require('dotenv').config();

const mongoose = require ('mongoose');
const express = require ('express');

const app = express();
const PORT = process.env.PORT || 3001;

app.get("/",(req, res) => {
    res.send('<h1> Social Network API </h1>');
});

const startApp = async()=>{
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/social-network-api', {
        useFindAndModify: false,
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    app.listen(PORT, () => console.log(` Connected on localhost:${PORT}`));
}

startApp()