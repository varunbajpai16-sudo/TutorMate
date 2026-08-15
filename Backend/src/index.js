import dotenv from 'dotenv';
dotenv.config();
import app from './app.js';
import { connectToDatabase } from './db/Database_Connection.js';
import {Teacher} from "../src/models/teacher.models.js"
console.log("DB_KEY exists:", !!process.env.DB_KEY);
console.log("DATABASE_NAME:", process.env.DATABASE_NAME);
console.log("PORT:", process.env.PORT);

connectToDatabase()
  .then(() => {
    console.log("DB Connected")
    app.listen(process.env.PORT, () => {
      console.log(`🚀 Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.error('Failed to connect to database. Server not started.', error);
  });

  const teacher = await Teacher.find({userid:"6a4a0b7e2753a4b5dd37e890"})
  console.log("Teacher:", teacher);