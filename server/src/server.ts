import express from "express";
import { ApolloServer } from "apollo-server-express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { typeDefs } from "./graphql/schema";
import { resolvers } from "./graphql/resolvers";

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to Mongo db
const connectDB = async () => {
  try {
    const mongoDbUrl =
      process.env.MONGO_URI || "mongodb://127.0.0.1:27017/pokerverse-db";
    await mongoose.connect(mongoDbUrl);
    console.log("MongoDb connected");
  } catch (err) {
    console.error("MongoDb connection failed:", err);
  }
};

// Initialize Apollo Server
const startApolloServer = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({ req })
  });
  
  await server.start();
  server.applyMiddleware({ app: app as any });

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(
      `GraphQL endpoint: http://127.0.0.1:${PORT}${server.graphqlPath}`
    );
  });
};

// Connect to MongoDB and start Apollo server
connectDB().then(() => {
  console.log("Starting Apollo server after DB connection");
  startApolloServer();
});
