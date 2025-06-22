import mongoose from "mongoose";

const URI =
  "mongodb+srv://testDB:testDB@cluster0.n3msuld.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

export const dataBaseConnection = async () => {
  try {
    await mongoose.connect(URI);
    console.log("DATABASE IS CONNECTED ");
  } catch (error) {
    console.log("DATABASE IS NOT CONNECTED ", error);
  }
};

