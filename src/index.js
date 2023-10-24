import express from 'express';
import cors from 'cors';
import dal from './dal.js'
import bodyParser from 'body-parser';
import { authenticate } from './admin.js';

const app = express();

app.use(cors());
app.use(bodyParser.json()); 
app.use(authenticate);
app.use(express.static('public'));

//create user account
app.post('/account/create', async (req, res)=>{
  const {name, email, password} = req.body; 
  //destructuring from request body

  try { 
    const users = await dal.find(email);
    if(users.length>0){
      return res.status(400).json({message: 'User already exists'})
    }

    const user = await dal.create(name, email, password);
    res.json(user);
  } catch(error){
    res.status(500).json({message: 'Server error', error: error.message});
  }
  });


app.post('/account/login', async (req, res)=> {
  const {email, password} =req.body;
  
  try {
    const user = await dal.find(email);
    if(user.length > 0 && user[0].password === password){
      res.json(user[0]);
    } else {
      res.status(400).json({message: 'Login Failed, try again'});
    }
  } catch (error) {
    res.status(500).json({message: 'Server error', error: error.message});
    }
  });
  
  

app.get('/account/alldata', async (req, res) => {
  try {
    const docs = await dal.alldata();
    res.json(docs);
  } catch (error){
    res.status(500).json({message: 'Server error', error: error.message});
  }
  }); 

  app.post('/account/find', async (req, res)=> {
    const {email}=req.body;
    
    try{
      const user = await dal.find(email);
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: 'Server error',
      error: error.message});
    }
  });
   


  app.put('/account/update',async (req, res)=> {
    const {email, amount}=req.body;
     try { 
      const response = await dal.update(email, Number(amount));
      res.json(response);
     } catch (error){
      res.status(500).json({message: 'Server error', error: error.message});
     }
    });
  
const port =process.env.PORT || 3000;
app.listen(port, ()=> {
  console.log('Running on port '+port);
});

