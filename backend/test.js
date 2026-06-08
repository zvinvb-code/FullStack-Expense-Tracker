require("dotenv").config();

console.log("URI =", process.env.MONGO_URI);

const { MongoClient } = require("mongodb");

const uri = process.env.MONGO_URI;

async function test() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log("Connected Successfully!");
  } catch (err) {
    console.error(err);
  }
}

test();