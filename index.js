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


// 1. Add Recipe POST API
app.post("/api/recipes/add", async (req, res) => {
  try {
    console.log("==========================================");
    console.log("Received Recipe Data from Frontend:", req.body);
    console.log("==========================================");

    const { recipeName, category, cuisineType, difficulty, difficultyLevel, prepTime, preparationTime, imageURL, ingredients, instructions } = req.body;

    const finalPrepTime = prepTime || preparationTime;
    const finalDifficulty = difficulty || difficultyLevel;

    if (!recipeName || !category || !cuisineType || !imageURL || !ingredients || !finalPrepTime) {
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
      difficultyLevel: finalDifficulty || "Easy", 
      preparationTime: Number(finalPrepTime), 
      imageURL, 
      ingredients: typeof ingredients === 'string' ? ingredients.split(",").map(i => i.trim()).filter(Boolean) : ingredients,
      instructions: instructions || "",
      likesCount: 0, 
      isFeatured: false, 
      status: "Published",
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



app.get("/api/recipes/all", async (req, res) => {
  try {
    if (!recipesCollection) {
      return res.status(500).json({ error: "Database collection is not ready yet" });
    }

    const { category } = req.query;
    let query = {};

 
    if (category && category !== "All") {
      query = { category: { $in: [category] } }; 
    }

    const recipes = await recipesCollection.find(query).sort({ createdAt: -1 }).toArray();
    res.status(200).json(recipes);
  } catch (error) {
    console.error("Browse Fetch Error:", error);
    res.status(500).json({ error: "Failed to fetch browse page recipes" });
  }
});


// 3. Featured Recipes API (Home Page Section)
app.get("/api/recipes/featured", async (req, res) => {
  try {
    if (!recipesCollection) {
      return res.status(500).json({ error: "Database collection is not ready yet" });
    }
    
    // সর্বোচ্চ ৪টি ফিচার্ড রেসিপি নিয়ে আসবে
    const featured = await recipesCollection.find({ isFeatured: true }).limit(4).toArray();
    res.status(200).json(featured);
  } catch (error) {
    console.error("Featured Fetch Error:", error);
    res.status(500).json({ error: "Failed to fetch featured recipes" });
  }
});


//  4. Popular Recipes API (Home Page Section sorted by likesCount)
app.get("/api/recipes/popular", async (req, res) => {
  try {
    if (!recipesCollection) {
      return res.status(500).json({ error: "Database collection is not ready yet" });
    }

    // likesCount অনুযায়ী বড় থেকে ছোট ক্রমানুসারে (Descending) সর্বোচ্চ ৪টি ডেটা আনবে
    const popular = await recipesCollection.find({}).sort({ likesCount: -1 }).limit(4).toArray();
    res.status(200).json(popular);
  } catch (error) {
    console.error("Popular Fetch Error:", error);
    res.status(500).json({ error: "Failed to fetch popular recipes" });
  }
});


app.get('/', (req, res) => {
  res.send('server is running!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})