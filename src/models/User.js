import db from '../db.js'

export default class User {
  constructor(username, email, password) {
    this.username = username
    this.email = email
    this.password = password
  }

  async save() {
    const client = await db.connect()
    try {
      const queryText = 'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *';
      const values = [this.username, this.email, this.password]
      const result = await client.query(queryText, values)
      return result.rows[0]
    } finally {
      client.release()
    }
  }

  static async findById(userId) {
    const client = await db.connect()
    try {
      const queryText = 'SELECT * FROM users WHERE id = $1'
      const values = [userId]
      const result = await client.query(queryText, values)
      return result.rows[0]
    } finally {
      client.release()
    }
  }
}