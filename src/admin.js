import * as admin from 'firebase-admin';

// initialize Firebase Admin SDK with your service account credentials
const serviceAccount = require('./fbase.json');

try{
    admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    //databaseURL: 'localhost:3000'
});
} catch (error){
    console.error("Error initializing Firebase Admin: ", error.message);
    process.exit(1); // exit the process if initialization fails
}

// middleware
const authenticate = async (req,res,next)=> {
    // if authorization header contains bear, extract the token part
    const idToken = req.headers.authorization.split(' ')[1];

    try{
        const decodedToken = await admin.auth().verifyIdToken(idToken);
        req.user= decodedToken;
        next();
    } catch (error){
        res.status(401).send('Unauthorized');
    }
};

export {authenticate};