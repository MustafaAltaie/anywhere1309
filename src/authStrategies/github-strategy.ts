import passport from 'passport';
import { Strategy as GitHubStrategy } from 'passport-github2';
import { findOrCreateUserFromGitHub } from '../db/db';

passport.use(new GitHubStrategy(
  {
    clientID: process.env.GITHUB_CLIENT_ID!,
    clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    callbackURL: "http://localhost:3000/auth/github/callback",
    scope: ['user:email'],
  },
  async (accessToken: string, refreshToken: string, profile: any, done: (error: any, user?: any) => void) => {
    try {
      console.log('Access Token:', accessToken);
      console.log('Refresh Token:', refreshToken);
      console.log('Profile:', profile);
      const user = await findOrCreateUserFromGitHub(profile);
      done(null, user);
    } catch (error) {
      done(error);
    }
  }
));
passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await getUserById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});