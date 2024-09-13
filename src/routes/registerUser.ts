import express from 'express';
import bcrypt from 'bcrypt';
import { createUser } from '../db/db';  // Ensure correct import path

const router = express.Router();

router.post('/register', async (req, res) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).send('Email and password are required');
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await createUser(email, hashedPassword);  // Save hashed password to DB
    res.redirect('/login');
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).send('Internal Server Error');
  }
});

export default router;