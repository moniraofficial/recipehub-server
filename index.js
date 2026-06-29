// const dns = require("node:dns");
// dns.setServers(["8.8.8.8", "8.8.4.4"]);


// const express = require('express');

// const dotenv = require('dotenv');

// const { MongoClient, ServerApiVersion } = require('mongodb');

// dotenv.config();

// const uri = process.env.MONGODB_URI;
// const app = express()
// const port = process.env.PORT 

// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);


// app.get('/', (req, res) => {
//   res.send('server is running!')
// })

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })

const dns = require("node:dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const express = require('express');
const cors = require('cors'); 
const dotenv = require('dotenv');
const { MongoClient, ServerApiVersion } = require('mongodb');

dotenv.config();

const uri = process.env.MONGODB_URI;
const app = express();
const port = process.env.PORT || 5000;

app.use(cors({
    origin: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
    credentials: true
}));
app.use(express.json()); 

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

let recipesCollection;

async function run() {
  try {
    await client.connect();
    
    const database = client.db("recipehub"); 
    recipesCollection = database.collection("recipes");

    await database.command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
  }
}
run().catch(console.dir);


// 🚀 Add Recipe POST API
app.post("/api/recipes/add", async (req, res) => {
  try {

    console.log("==========================================");
    console.log("Received Recipe Data from Frontend:", req.body);
    console.log("==========================================");

    const { recipeName, category, cuisineType, difficulty, prepTime, imageURL, ingredients, instructions } = req.body;

  
    if (!recipeName || !category || !cuisineType || !imageURL || !ingredients || !prepTime) {
      console.log("❌ Validation Failed: Missing required fields");
      return res.status(400).json({ error: "Required fields are missing!" });
    }

    if (!recipesCollection) {
      console.log("❌ Database Error: Collection is not ready yet");
      return res.status(500).json({ error: "Database collection is not ready yet" });
    }
    
    const newRecipe = {
      recipeName,
      category,
      cuisineType,
      difficulty: difficulty || "Easy",
      prepTime: Number(prepTime),
      imageURL, 
      ingredients: typeof ingredients === 'string' ? ingredients.split(",").map(i => i.trim()).filter(Boolean) : ingredients,
      instructions: instructions || "",
      createdAt: new Date()
    };

    const result = await recipesCollection.insertOne(newRecipe);
    
  
    console.log("🎯 Successfully Inserted into MongoDB:", result);
    
    res.status(201).json({ success: true, message: "Recipe saved to MongoDB!", id: result.insertedId });
  } catch (error) {
    console.error("Database Error:", error);
    res.status(500).json({ error: "Internal Server Error. Failed to save recipe." });
  }
});


app.get('/', (req, res) => {
  res.send('server is running!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})