import mongoose from "mongoose";

const connectToDb = () => {
  mongoose
    .connect(process.env.DB_URL)
    .then((conn) => {
      console.log(`Database connected: `, conn.connection.host);
    })
    .catch((error) => {
      console.log(`Error connecting to Database: `, error);
    });
};

export default connectToDb;
