import { Pool } from 'pg';

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'dvdrental',
  password: '123456',
  port: 5432,
});

export async function getUserById(id: string) {
  try {
    const result = await pool.query('SELECT * FROM anywhere WHERE my_id = $1', [id]);
    return result.rows[0];
  } catch (error) {
    console.error('Error querying database:', error);
    throw error;
  }
}

export async function getUserByEmail(email: string) {
  try {
    const result = await pool.query('SELECT * FROM anywhere WHERE email = $1', [email]);
    return result.rows[0];
  } catch (error) {
    console.error('Error querying database:', error);
    throw error;
  }
}

export async function createUser(email: string, hashedPassword: string) {
  try {
    const result = await pool.query(
      'INSERT INTO anywhere (email, password) VALUES ($1, $2) RETURNING *',
      [email, hashedPassword]
    );
    return result.rows[0];
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}

export async function findOrCreateUserFromGitHub(profile: any) {
  try {
    const { id, emails } = profile;
    const result = await pool.query('SELECT * FROM users WHERE github_id = $1', [id]);
    if (result.rows.length === 0) {
      const newUser = await pool.query(
        'INSERT INTO users (github_id, email) VALUES ($1, $2) RETURNING *',
      );
      return newUser.rows[0];
    }
    return result.rows[0];
  } catch (error) {
    console.error('Error querying database:', error);
    throw error;
  }
}