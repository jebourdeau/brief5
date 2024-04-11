import db from '../services/db.js'

export default class Post {
  constructor(user_id, content) {
    this.user_id = user_id
    this.content = content
  }

  async save() {
    const post = await db.connect()
    try {
      const queryText = 'INSERT INTO post (user_id, content) VALUES ($1, $2) RETURNING *';
      const values = [this.user_id, this.content]
      const result = await post.query(queryText, values)
      return result.rows
    } finally {
      post.release()
    }
  }

  static async findById(postId) {
    const post = await db.connect()
    try {
      const queryText = 'SELECT * FROM post WHERE id = $1'
      const values = [postId]
      const result = await post.query(queryText, values)
      return result.rows[0]
    } finally {
      post.release()
    }
  }

  // static async findByContent(content) {
  //   const post = await db.connect()
  //   try {
  //     const queryText = "SELECT * FROM post WHERE content ILIKE CONTAINS($1)"
  //     const values = [content]
  //     const result = await post.query(queryText, values)
  //     return result.rows
  //   } finally {
  //     post.release()
  //   }
  // }

  static async findAll() {
    const post = await db.connect()
    try {
      const queryText = "SELECT * FROM post"
      const result = await post.query(queryText)
      return result.rows
    } finally {
      post.release()
    }
  }
}