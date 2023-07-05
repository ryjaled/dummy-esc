const express = require('express');
const { Client } = require('pg');
const app = express();
const port = 3000;

app.use(express.json()); // for parsing application/json

const client = new Client({
    host: 'dpg-ciic1emnqql0tc3lgupg-a.oregon-postgres.render.com',
    user: 'escalation_dummy_user',
    password: '50LGuVvH154bmUMsU8vhwVqbeXVcOosp',
    database: 'escalation_dummy',
    port: 5432, // default PostgreSQL port
    ssl: {
        rejectUnauthorized: false,
    }
});

client.connect();

app.post('/users', async (req, res) => {
    const { first_name, last_name, email } = req.body;

    const text = 'INSERT INTO users (first_name, last_name, email) VALUES($1, $2, $3)';
    const values = [first_name, last_name, email];

    try {
        await client.query(text, values);
        res.status(200).send('User inserted successfully');
    } catch (err) {
        console.error(err.stack);
        res.status(500).send('Error inserting user');
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
