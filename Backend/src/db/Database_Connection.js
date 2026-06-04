import mongoose from "mongoose"

export const connectToDatabase = async ()=>{
    try{
        if(!process.env.DB_KEY){
            throw new Error("DB_KEY is not defined in environment variables");
        }
      const connection = await  mongoose.connect(`${process.env.DB_KEY}/${process.env.DATABASE_NAME}`) 
       console.log("✅ MongooDB connected successfully",connection.connection.name);
    } catch (error) {
        console.log("❌ MongooDB is not connected:", error.message);
        throw error;
    }
}