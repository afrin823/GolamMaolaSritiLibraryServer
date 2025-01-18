import mongoose from "mongoose";
const port = process.env.PORT || 5000;
export async function main(app) {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("Connected to MongoDB");

    app.listen(port, () => {
      console.log(`App listening on port ${port}`);
    });
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
    process.exit(1);
  }
}
