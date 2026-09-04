const express = require("express")
const mongoose = require('mongoose');
const userRoute = require("./routes/userRoutes.js")

const mongoUri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/victor_user_auth"

mongoose.connect(mongoUri)
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.error("Connection Error: ", err));


const app = express()
const port = Number(process.env.PORT) || 5555


app.use(express.json())

app.get("/", (req, res) => {
    res.json({ message: "Victor Fabian's user authentication API is active" })
})
app.use("/users", userRoute)
app.listen(port, () => {
    console.log(`server is up and running on port : ${port}`)
})
