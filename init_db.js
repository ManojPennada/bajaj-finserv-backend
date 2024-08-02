const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('./database.db');

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        full_name TEXT,
        dob TEXT,
        email TEXT,
        roll_number TEXT,
        user_id TEXT UNIQUE
    )`);

    db.run(`DELETE FROM users`); 

    db.run(`INSERT INTO users (full_name, dob, email, roll_number, user_id) VALUES 
        ('John Doe', '17091999', 'john@xyz.com', 'ABCD123', 'john_doe_17091999'),
        ('Jane Smith', '01012000', 'jane@abc.com', 'EFGH456', 'jane_smith_01012000'),
        ('Alice Johnson', '23121995', 'alice@xyz.com', 'IJKL789', 'alice_johnson_23121995')
    `);
});

db.close();
