const express = require('express');
const app = express();
const routes = require('./route'); 
app.use(express.json());
app.use(routes); 

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the API' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
