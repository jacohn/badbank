const MongoClient = require('mongodb').MongoClient;
const bcrypt = require('bcrypt');
const url = process.env.MONGODB_URL || 'mongodb://localhost:27017';
let db = null;

// connect to mongo
MongoClient.connect(url, { useUnifiedTopology: true }, function (err, client) {
    if(err){
        console.error('Failed to connect to db server: ', err);
        return;
    }
    console.log("Connected successfully to db server");

    // connect to myproject database
    db = client.db(process.env.DB_NAME || 'myproject');
});


/**
 * Create a new user account.
 * @param {string} name - Name of the user.
 * @param {string} email - Email of the user.
 * @param {string} password - Password of the user (will be hashed before storage).
 * @returns {Promise} Resolves with created document, or rejects with an error.
 */

async function create(name, email, password) {
    return new Promise(async (resolve, reject)=>{
        const userCollection = db.collection('users');
        const hashedPassword = await bcrypt.hash(password, 10); // hash the password
        const doc= {name, email, password: hashedPassword, balance:0};
        userCollection.insertOne(doc, {w:1}, function(err, result){
            err ? reject(err): resolve(doc);
        });
    });
}

/**
 * Find a user by email.
 * @param {string} email - Email of the user to find.
 * @returns {Promise} Resolves with found documents, or rejects with an error.
 */
function find(email) {
    return new Promise((resolve, reject) => {
        const userCollection = db.collection('users')
        userCollection.find({email}).toArray(function (err, docs) {
                err ? reject(err) : resolve(docs);
            });
    });
}

/**
 * Update user's balance by depositing or withdrawing an amount.
 * @param {string} email - Email of the user to update.
 * @param {number} amount - Amount to deposit (positive) or withdraw (negative).
 * @returns {Promise} Resolves with updated document, or rejects with an error.
 */

function update(email, amount) {
    return new Promise((resolve, reject) => {
        const userCollection = db.collection('users');
        userCollection.findOneAndUpdate(
                { email },
                { $inc: { balance: amount } },
                { returnOriginal: false },
                function (err, documents) {
                    err ? reject(err) : resolve(documents);
                }
            );


    });
}

// return all users by using the collection.find method
function alldata() {
    return new Promise((resolve, reject)=>{
        const userCollection = db.collection('users');
        userCollection.find({}).toArray(function(err, docs){
                err ? reject(err) : resolve(docs);
            });
    });
}

function close(){
    if(db && db.serverConfig.isConnected()){
        db.close();
    }
}


module.exports = { create, find, update, alldata, close };