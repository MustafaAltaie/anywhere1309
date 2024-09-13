import express from 'express';
import passport from 'passport';
import session from 'express-session';

const app = express();

// Session setup
app.use(session({
  secret: 'yourSecret',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }  // Use true for HTTPS
}));

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) => {
  // Get user by ID from DB
});

import './authStrategies/local-strategy';
import './authStrategies/github-strategy.ts';

app.listen(3000, () => console.log('Server running on port 3000'));

import pgSession from 'connect-pg-simple';
import { Pool } from 'pg';

const pgPool = new Pool({
  user: 'your_user',
  host: 'your_host',
  database: 'your_database',
  password: 'your_password',
  port: 5432,
});

app.use(session({
  store: new (pgSession(session))({
    pool: pgPool,
    tableName: 'session'
  }),
  secret: 'yourSecret',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}));