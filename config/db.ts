import mongoose from "mongoose";

async function connectToDB(dbString: string) {
  try {
    await mongoose.connect(dbString);
    console.log("DB connected");
  } catch (error) {
    console.log(error);
  }
}

export default connectToDB;
