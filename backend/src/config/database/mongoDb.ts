import mongoose from "mongoose";
import { environment } from "../../resources/environments";

const password = process.env.MONGODB_PASSWORD || environment.get('mongodb.password')
const username = process.env.MONGODB_USERNAME || environment.get('mongodb.username')
const database = process.env.MONGODB_DATABASE || environment.get('mongodb.database')
const server = `mongodb+srv://${username}:${password}@cluster0.nhobcbw.mongodb.net`

class Database {
  constructor() { }

  _connect() {
    mongoose.connect(`${server}/${database}`)
      .then(() => {
        console.log('Database connection successful')
      })
      .catch(err => {
        console.error('Database connection error')
        console.error(err)
      })
  }
}

module.exports = new Database()
