const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());


const user = {
    full_name: 'John Doe',
    dob: '17091999',
    email: 'john@xyz.com',
    roll_number: 'ABCD123'
};


function processData(data) {
    let numbers = [];
    let alphabets = [];

    data.forEach(item => {
        if (/^\d+$/.test(item)) {
            numbers.push(item);
        } else if (/^[a-zA-Z]$/.test(item)) {
            alphabets.push(item);
        }
    });

    let highestAlphabet = alphabets.length 
        ? [alphabets.reduce((max, char) => char.toUpperCase() > max.toUpperCase() ? char : max)]
        : [];

    return {
        numbers,
        alphabets,
        highest_alphabet: highestAlphabet
    };
}


app.post('/bfhl', (req, res) => {
    const { data } = req.body;
    if (!data || !Array.isArray(data)) {
        return res.status(400).json({ is_success: false, message: 'Invalid input' });
    }

    const processed = processData(data);
    res.json({
        is_success: true,
        user_id: `${user.full_name.replace(/\s+/g, '_').toLowerCase()}_${user.dob}`,
        email: user.email,
        roll_number: user.roll_number,
        numbers: processed.numbers,
        alphabets: processed.alphabets,
        highest_alphabet: processed.highest_alphabet
    });
});


app.get('/bfhl', (req, res) => {
    res.json({ operation_code: 1 });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
