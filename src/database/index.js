import mongoose from "mongoose";

const configOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 30000, // Increase timeout to handle slow connections
};

const connectToDB = async () => {
  const connectionUrl = process.env.MONGO_URI;

  if (!connectionUrl) {
    console.error("MongoDB connection string is missing in environment variables.");
    process.exit(1); // Exit the process with failure
  }

  mongoose
    .connect(connectionUrl, configOptions)
    .then(() => console.log("Ecommerce database connected successfully!"))
    .catch((err) => {
      console.error(`Error connecting to the database: ${err.message}`);
      // Optional: Retry connection after some delay
      setTimeout(connectToDB, 5000); // Retry after 5 seconds
    });

  mongoose.connection.on('error', (err) => {
    console.error(`MongoDB connection error: ${err.message}`);
  });

  mongoose.connection.on('disconnected', () => {
    console.warn('MongoDB connection lost. Attempting to reconnect...');
    connectToDB();
  });
};

export default connectToDB;
