import express from 'express';

const app = express();

app.get("/",(req,res)=>{
    res.send("API is Working");
})

export default app;