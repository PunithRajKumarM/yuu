require("dotenv").config();
import "reflect-metadata";

const cors = require("cors");
import { ApolloServer } from "apollo-server-express";
import { AppDataSource } from "./config/data-source";
import { schemaData } from "./schema/schema";
const express = require("express");
const PORT = process.env.PORT;

const main = async () => {
  try {
    await AppDataSource.initialize();
    console.log("Database connected successfully");

    const schema = await schemaData();

    const server = new ApolloServer({ schema });
    await server.start();

    const app = express();
    server.applyMiddleware({ app, path: '/api/graphql/list' });

    app.use(cors());

    app.listen(PORT, () => {
      console.log(`Server is running on the server ${PORT}`);
    });
  } catch (error) {
    console.error(`Error on starting the server: ${error}`);
  }
};

main();
