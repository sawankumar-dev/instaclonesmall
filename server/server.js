import dotenv from 'dotenv';
dotenv.config();
import app from "./src/app.js";
import { connectDb } from "./src/db/db.js";

connectDb()
.then(() => {
    app.listen(3000, () => {
        console.log("Server is running on 3000 port.")
    })
})
