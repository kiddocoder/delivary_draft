// authController.js;
import { hash, compare } from 'bcryptjs';
import { jwt } from 'jsonwebtoken';
import User, { findOne } from '../models/User';

const register = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if user already exists;
    let user = await findOne({ username });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password;
    const hashedPassword = await hash(password, 10);

    // Create new user;
    user = new User({
      username,
      password: hashedPassword,
    });

    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if user exists
    const user = await findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Validate password
    const validPassword = await compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt({ userId: user._id }, process.env.JWT_SECRET);

    res.status(200).json({ token });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// authController.js
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const createSubscription = async (req, res) => {
  try {
    const subscription = await stripe.subscriptions.create({
      customer: req.body.customerId, // Replace with actual customer ID from Stripe
      items: [{ price: 'price_12345' }], // Replace with actual Stripe price ID
    });

    res.status(200).json({ subscription });
  } catch (error) {
    console.error('Error creating subscription:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export default {
  register,
  login,
  createSubscription
};