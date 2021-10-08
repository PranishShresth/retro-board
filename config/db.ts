import mongoose from "mongoose";

async function connectToDB(dbString: string) {
  try {
    await mongoose.connect(dbString);
  } catch (error) {
    console.log(error);
  }
}

export default connectToDB;
