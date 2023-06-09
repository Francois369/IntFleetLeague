import app from "./app";
import "dotenv/config";
import mongoose from "mongoose";

const connectionString: string = process.env.MONGO_CONNECTION_STRING!;
const port = process.env.PORT;
console.log(connectionString);
mongoose
  .connect(connectionString)
  .then(() => {
    console.log("Mongoose Connected");
    app.listen(port, () => {
      console.log("SErver Running on Port" + port);
    });
  })
  .catch((err) => console.log(err));
