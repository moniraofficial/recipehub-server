// const dns = require("node:dns");
// dns.setServers(["8.8.8.8", "8.8.4.4"]);

// const express = require('express');
// const cors = require('cors'); 
// const dotenv = require('dotenv');

// const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

// dotenv.config();

// const uri = process.env.MONGODB_URI;
// const app = express();
// const port = process.env.PORT || 5000;

// app.use(cors());
// app.use(express.json()); 

// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// let recipesCollection;

// async function run() {
//   try {
//     // await client.connect();
    
//     const database = client.db("recipehub"); 
//     recipesCollection = database.collection("recipes");

// //  Add Recipe POST API
// app.post("/api/recipes/add", async (req, res) => {
//   try {
//     console.log("==========================================");
//     console.log("Received Recipe Data from Frontend:", req.body);
//     console.log("==========================================");

//     const { recipeName, category, cuisineType, difficulty, difficultyLevel, prepTime, preparationTime, imageURL, ingredients, instructions } = req.body;

//     const finalPrepTime = prepTime || preparationTime;
//     const finalDifficulty = difficulty || difficultyLevel;

//     if (!recipeName || !category || !cuisineType || !imageURL || !ingredients || !finalPrepTime) {
//       console.log("❌ Validation Failed: Missing required fields");
//       return res.status(400).json({ error: "Required fields are missing!" });
//     }

//     if (!recipesCollection) {
//       console.log("❌ Database Error: Collection is not ready yet");
//       return res.status(500).json({ error: "Database collection is not ready yet" });
//     }
    
//     const newRecipe = {
//       recipeName,
//       category,
//       cuisineType,
//       difficultyLevel: finalDifficulty || "Easy", 
//       preparationTime: Number(finalPrepTime), 
//       imageURL, 
//       ingredients: typeof ingredients === 'string' ? ingredients.split(",").map(i => i.trim()).filter(Boolean) : ingredients,
//       instructions: instructions || "",
//       likesCount: 0, 
//       isFeatured: false, 
//       status: "Published",
//       createdAt: new Date()
//     };

//     const result = await recipesCollection.insertOne(newRecipe);
//     console.log("🎯 Successfully Inserted into MongoDB:", result);
    
//     res.status(201).json({ success: true, message: "Recipe saved to MongoDB!", id: result.insertedId });
//   } catch (error) {
//     console.error("Database Error:", error);
//     res.status(500).json({ error: "Internal Server Error. Failed to save recipe." });
//   }
// });


// // Browse Recipes All API
// app.get("/api/recipes/all", async (req, res) => {
//   try {
//     if (!recipesCollection) {
//       return res.status(500).json({ error: "Database collection is not ready yet" });
//     }

//     const { category } = req.query;
//     let query = {};

//     if (category && category !== "All") {
//       query = { category: { $in: [category] } }; 
//     }

//     const recipes = await recipesCollection.find(query).sort({ createdAt: -1 }).toArray();
//     res.status(200).json(recipes);
//   } catch (error) {
//     console.error("Browse Fetch Error:", error);
//     res.status(500).json({ error: "Failed to fetch browse page recipes" });
//   }
// });


// // Featured Recipes API (Home Page Section)
// app.get("/api/recipes/featured", async (req, res) => {
//   try {
//     if (!recipesCollection) {
//       return res.status(500).json({ error: "Database collection is not ready yet" });
//     }
    
//     const featured = await recipesCollection.find({ isFeatured: true }).limit(4).toArray();
//     res.status(200).json(featured);
//   } catch (error) {
//     console.error("Featured Fetch Error:", error);
//     res.status(500).json({ error: "Failed to fetch featured recipes" });
//   }
// });



// app.get("/api/recipes/popular", async (req, res) => {
//   try {
//     if (!recipesCollection) {
//       return res.status(500).json({ error: "Database collection is not ready yet" });
//     }

//     const popular = await recipesCollection.find({}).sort({ likesCount: -1 }).limit(4).toArray();
//     res.status(200).json(popular);
//   } catch (error) {
//     console.error("Popular Fetch Error:", error);
//     res.status(500).json({ error: "Failed to fetch popular recipes" });
//   }
// });



// app.get("/api/recipes/:id", async (req, res) => {
//   try {
//     if (!recipesCollection) {
//       return res.status(500).json({ error: "Database collection is not ready yet" });
//     }

//     const recipeId = req.params.id;

//     // মঙ্গোডিবি অবজেক্ট আইডি ভ্যালিডেশন চেক
//     if (!ObjectId.isValid(recipeId)) {
//       return res.status(400).json({ error: "Invalid recipe ID format" });
//     }

//     const recipe = await recipesCollection.findOne({ _id: new ObjectId(recipeId) });
    
//     if (!recipe) {
//       return res.status(404).json({ error: "Recipe not found" });
//     }

//     res.status(200).json(recipe);
//   } catch (error) {
//     console.error("Fetch Single Recipe Error:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

//     // await database.command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } catch (error) {
//     console.error("MongoDB connection failed:", error);
//   }
// }
// run().catch(console.dir);



// app.get('/', (req, res) => {
//   res.send('server is running!')
// })

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })




// ////////////////////////////
// const dns = require("node:dns");
// dns.setServers(["8.8.8.8", "8.8.4.4"]);

// const express = require('express');
// const cors = require('cors'); 
// const dotenv = require('dotenv');
// const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

// dotenv.config();

// const uri = process.env.MONGODB_URI;
// const app = express();
// const port = process.env.PORT || 5000;

// app.use(cors());
// app.use(express.json()); 

// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// let recipesCollection;
// let usersCollection; // Managed user accounts and premium states

// async function run() {
//   try {
//     const database = client.db("recipehub"); 
//     recipesCollection = database.collection("recipes");
//     usersCollection = database.collection("user"); // Better Auth maps its schema to the 'user' collection

//     // ==========================================
//     // 6.1 & 6.2 USER DASHBOARD ANALYTICS ENDPOINT
//     // ==========================================
//     app.get("/api/users/dashboard-stats", async (req, res) => {
//       try {
//         const { email } = req.query;
//         if (!email) {
//           return res.status(400).json({ error: "Email query parameter is required." });
//         }

//         if (!recipesCollection) {
//           return res.status(500).json({ error: "Database collections are not ready yet." });
//         }

//         // const normalizedEmail = email.toLowerCase().trim();

//         // 1. Total count of recipes added by this specific user
//         const totalRecipes = await recipesCollection.countDocuments({ creatorEmail: email });

//         // 2. Fetch user profile from database safely to assess membership badge tier
//         let isPremium = false;
//         let totalFavorites = 0;
        
//         if (usersCollection) {
//           const dbUser = await usersCollection.findOne({ email: email });
//           if (dbUser) {
//             isPremium = dbUser.isPremium || false;
//             totalFavorites = dbUser.favoritesCount || 0;
//           }
//         }
        
//         // 3. Aggregate likes received across all recipes published by this user
//         const recipesAddedByUser = await recipesCollection.find({ creatorEmail: email }).toArray();
//         const totalLikesReceived = recipesAddedByUser.reduce((acc, current) => acc + (current.likesCount || 0), 0);

//         res.status(200).json({
//           totalRecipes,
//           totalFavorites,
//           totalLikesReceived,
//           isPremium
//         });
//       } catch (error) {
//         console.error("Dashboard Stats Fetch Error:", error);
//         res.status(500).json({ error: "Internal Server Error compiling profile analytics metrics." });
//       }
//     });

//     // ==========================================
//     // 7. ADD RECIPE POST API (With Email Fallbacks & Normalization)
//     // ==========================================
//     app.post("/api/recipes/add", async (req, res) => {
//       try {
//         console.log("==========================================");
//         console.log("Received Recipe Data from Frontend:", req.body);
//         console.log("==========================================");
//       const data= req.body
//         // const { 
//         //   recipeName, 
//         //   category, 
//         //   cuisineType, 
//         //   difficulty, 
//         //   difficultyLevel, 
//         //   prepTime, 
//         //   preparationTime, 
//         //   imageURL, 
//         //   ingredients, 
//         //   instructions,
//         //   creatorEmail,
//         //   email // Frontend context fallback
//         // } = req.body;

//         // const finalEmail = creatorEmail || email;
//         // const finalPrepTime = prepTime || preparationTime;
//         // const finalDifficulty = difficulty || difficultyLevel;

//         // if (!recipeName || !category || !cuisineType || !imageURL || !ingredients || !finalPrepTime || !finalEmail) {
//         //   console.log("❌ Validation Failed: Missing required fields");
//         //   return res.status(400).json({ error: "Required fields are missing! Make sure you are logged in." });
//         // }

//         // if (!recipesCollection || !usersCollection) {
//         //   return res.status(500).json({ error: "Database collection is not ready yet" });
//         // }
// const email= req.body.creatorEmail
// let ingredients=req.body.ingredients
//         const normalizedEmail = email.toLowerCase().trim();
// console.log({email})
//         // 7.4 Validation: Normal user vs Premium recipe generation capping rule logic
//         const dbUser = await usersCollection.findOne({ email: normalizedEmail });
//         const isPremium = dbUser?.isPremium || false;
//         const existingRecipeCount = await recipesCollection.countDocuments({ creatorEmail: normalizedEmail });

//         if (!isPremium && existingRecipeCount >= 2) {
//           return res.status(403).json({ 
//             error: "Standard users are capped at adding a maximum of 2 recipes. Upgrade to Premium for unlimited submissions!" 
//           });
//         }
        
//         const newRecipe = {
//   ...data,
//   creatorEmail: normalizedEmail,
//   ingredients:
//     typeof ingredients === "string"
//       ? ingredients.split(",").map(i => i.trim()).filter(Boolean)
//       : ingredients,
//   likesCount: 0,
//   isFeatured: false,
//   status: "Published",
//   createdAt: new Date(),
// };

//         const result = await recipesCollection.insertOne(newRecipe);
//         console.log("🎯 Successfully Inserted into MongoDB:", result);
        
//         res.status(201).json({ success: true, message: "Recipe saved to MongoDB!", id: result.insertedId });
//       } catch (error) {
//         console.error("Database Error:", error);
//         res.status(500).json({ error: "Internal Server Error. Failed to save recipe." });
//       }
//     });

//     // ==========================================
//     // 8.1 GET USER SPECIFIC RECIPES (For Section 8)
//     // ==========================================
//     app.get("/api/recipes/user", async (req, res) => {
//       try {
//         if (!recipesCollection) {
//           return res.status(500).json({ error: "Database collection is not ready yet" });
//         }

//         const { email } = req.query;
//         if (!email) {
//           return res.status(400).json({ error: "Email parameter required to fetch user assets." });
//         }

//         const normalizedEmail = email.toLowerCase().trim();
//         const userRecipes = await recipesCollection.find({ creatorEmail: normalizedEmail }).sort({ createdAt: -1 }).toArray();
//         res.status(200).json(userRecipes);
//       } catch (error) {
//         console.error("User Recipes Fetch Error:", error);
//         res.status(500).json({ error: "Failed to fetch user recipes" });
//       }
//     });

//     // ==========================================
//     // BROWSE RECIPES ALL API
//     // ==========================================
//     app.get("/api/recipes/all", async (req, res) => {
//       try {
//         if (!recipesCollection) {
//           return res.status(500).json({ error: "Database collection is not ready yet" });
//         }

//         const { category } = req.query;
//         let query = {};

//         if (category && category !== "All") {
//           query = { category: { $in: [category] } }; 
//         }

//         const recipes = await recipesCollection.find(query).sort({ createdAt: -1 }).toArray();
//         res.status(200).json(recipes);
//       } catch (error) {
//         console.error("Browse Fetch Error:", error);
//         res.status(500).json({ error: "Failed to fetch browse page recipes" });
//       }
//     });

//     // ==========================================
//     // FEATURED RECIPES API (Home Page Section)
//     // ==========================================
//     app.get("/api/recipes/featured", async (req, res) => {
//       try {
//         if (!recipesCollection) {
//           return res.status(500).json({ error: "Database collection is not ready yet" });
//         }
        
//         const featured = await recipesCollection.find({ isFeatured: true }).limit(4).toArray();
//         res.status(200).json(featured);
//       } catch (error) {
//         console.error("Featured Fetch Error:", error);
//         res.status(500).json({ error: "Failed to fetch featured recipes" });
//       }
//     });

//     // ==========================================
//     // POPULAR RECIPES API
//     // ==========================================
//     app.get("/api/recipes/popular", async (req, res) => {
//       try {
//         if (!recipesCollection) {
//           return res.status(500).json({ error: "Database collection is not ready yet" });
//         }

//         const popular = await recipesCollection.find({}).sort({ likesCount: -1 }).limit(4).toArray();
//         res.status(200).json(popular);
//       } catch (error) {
//         console.error("Popular Fetch Error:", error);
//         res.status(500).json({ error: "Failed to fetch popular recipes" });
//       }
//     });

//     // ==========================================
//     // SINGLE RECIPE DETAILS API
//     // ==========================================
//     app.get("/api/recipes/:id", async (req, res) => {
//       try {
//         if (!recipesCollection) {
//           return res.status(500).json({ error: "Database collection is not ready yet" });
//         }

//         const recipeId = req.params.id;

//         if (!ObjectId.isValid(recipeId)) {
//           return res.status(400).json({ error: "Invalid recipe ID format" });
//         }

//         const recipe = await recipesCollection.findOne({ _id: new ObjectId(recipeId) });
        
//         if (!recipe) {
//           return res.status(404).json({ error: "Recipe not found" });
//         }

//         res.status(200).json(recipe);
//       } catch (error) {
//         console.error("Fetch Single Recipe Error:", error);
//         res.status(500).json({ error: "Internal Server Error" });
//       }
//     });

//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } catch (error) {
//     console.error("MongoDB connection failed:", error);
//   }
// }
// run().catch(console.dir);

// app.get('/', (req, res) => {
//   res.send('server is running!')
// });

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// });



const dns = require("node:dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const express = require('express');
const cors = require('cors'); 
const dotenv = require('dotenv');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

dotenv.config();

const uri = process.env.MONGODB_URI;
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json()); 

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

let recipesCollection;
let usersCollection; // Managed user accounts and premium states
let likesCollection;
let favoritesCollection;
let reportsCollection;

async function run() {
  try {
    const database = client.db("recipehub"); 
    recipesCollection = database.collection("recipes");
    usersCollection = database.collection("user"); // Better Auth maps its schema to the 'user' collection
    likesCollection = database.collection("likes");
    favoritesCollection = database.collection("favorites");
    reportsCollection = database.collection("reports");

    // ==========================================
    // 6.1 & 6.2 USER DASHBOARD ANALYTICS ENDPOINT
    // ==========================================
    app.get("/api/users/dashboard-stats", async (req, res) => {
      try {
        const { email } = req.query;
        if (!email) {
          return res.status(400).json({ error: "Email query parameter is required." });
        }

        if (!recipesCollection) {
          return res.status(500).json({ error: "Database collections are not ready yet." });
        }

        // const normalizedEmail = email.toLowerCase().trim();

        // 1. Total count of recipes added by this specific user
        const totalRecipes = await recipesCollection.countDocuments({ creatorEmail: email });

        // 2. Fetch user profile from database safely to assess membership badge tier
        let isPremium = false;
        let totalFavorites = 0;
        
        if (usersCollection) {
          const dbUser = await usersCollection.findOne({ email: email });
          if (dbUser) {
            isPremium = dbUser.isPremium || false;
            totalFavorites = dbUser.favoritesCount || 0;
          }
        }
        
        // 3. Aggregate likes received across all recipes published by this user
        const recipesAddedByUser = await recipesCollection.find({ creatorEmail: email }).toArray();
        const totalLikesReceived = recipesAddedByUser.reduce((acc, current) => acc + (current.likesCount || 0), 0);

        res.status(200).json({
          totalRecipes,
          totalFavorites,
          totalLikesReceived,
          isPremium
        });
      } catch (error) {
        console.error("Dashboard Stats Fetch Error:", error);
        res.status(500).json({ error: "Internal Server Error compiling profile analytics metrics." });
      }
    });

    // ==========================================
    // 7. ADD RECIPE POST API (With Email Fallbacks & Normalization)
    // ==========================================
    app.post("/api/recipes/add", async (req, res) => {
      try {
        console.log("==========================================");
        console.log("Received Recipe Data from Frontend:", req.body);
        console.log("==========================================");
      const data = req.body
        // const { 
        //   recipeName, 
        //   category, 
        //   cuisineType, 
        //   difficulty, 
        //   difficultyLevel, 
        //   prepTime, 
        //   preparationTime, 
        //   imageURL, 
        //   ingredients, 
        //   instructions,
        //   creatorEmail,
        //   email // Frontend context fallback
        // } = req.body;

        // const finalEmail = creatorEmail || email;
        // const finalPrepTime = prepTime || preparationTime;
        // const finalDifficulty = difficulty || difficultyLevel;

        // if (!recipeName || !category || !cuisineType || !imageURL || !ingredients || !finalPrepTime || !finalEmail) {
        //   console.log("❌ Validation Failed: Missing required fields");
        //   return res.status(400).json({ error: "Required fields are missing! Make sure you are logged in." });
        // }

        // if (!recipesCollection || !usersCollection) {
        //   return res.status(500).json({ error: "Database collection is not ready yet" });
        // }
const email= req.body.creatorEmail
let ingredients=req.body.ingredients
        const normalizedEmail = email.toLowerCase().trim();
console.log({email})
        // 7.4 Validation: Normal user vs Premium recipe generation capping rule logic
        const dbUser = await usersCollection.findOne({ email: normalizedEmail });
        const isPremium = dbUser?.isPremium || false;
        const existingRecipeCount = await recipesCollection.countDocuments({ creatorEmail: normalizedEmail });

        if (!isPremium && existingRecipeCount >= 2) {
          return res.status(403).json({ 
            error: "Standard users are capped at adding a maximum of 2 recipes. Upgrade to Premium for unlimited submissions!" 
          });
        }
        
        const newRecipe = {
  ...data,
  creatorEmail: normalizedEmail,
  ingredients:
    typeof ingredients === "string"
      ? ingredients.split(",").map(i => i.trim()).filter(Boolean)
      : ingredients,
  likesCount: 0,
  isFeatured: false,
  status: "Published",
  createdAt: new Date(),
};

        const result = await recipesCollection.insertOne(newRecipe);
        console.log("🎯 Successfully Inserted into MongoDB:", result);
        
        res.status(201).json({ success: true, message: "Recipe saved to MongoDB!", id: result.insertedId });
      } catch (error) {
        console.error("Database Error:", error);
        res.status(500).json({ error: "Internal Server Error. Failed to save recipe." });
      }
    });

    // ==========================================
    // 8.1 GET USER SPECIFIC RECIPES (For Section 8)
    // ==========================================
    app.get("/api/recipes/user", async (req, res) => {
      try {
        if (!recipesCollection) {
          return res.status(500).json({ error: "Database collection is not ready yet" });
        }

        const { email } = req.query;
        if (!email) {
          return res.status(400).json({ error: "Email parameter required to fetch user assets." });
        }

        const normalizedEmail = email.toLowerCase().trim();
        const userRecipes = await recipesCollection.find({ creatorEmail: normalizedEmail }).sort({ createdAt: -1 }).toArray();
        res.status(200).json(userRecipes);
      } catch (error) {
        console.error("User Recipes Fetch Error:", error);
        res.status(500).json({ error: "Failed to fetch user recipes" });
      }
    });

    // ==========================================
    // BROWSE RECIPES ALL API
    // ==========================================
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

    // ==========================================
    // FEATURED RECIPES API (Home Page Section)
    // ==========================================
    app.get("/api/recipes/featured", async (req, res) => {
      try {
        if (!recipesCollection) {
          return res.status(500).json({ error: "Database collection is not ready yet" });
        }
        
        const featured = await recipesCollection.find({ isFeatured: true }).limit(4).toArray();
        res.status(200).json(featured);
      } catch (error) {
        console.error("Featured Fetch Error:", error);
        res.status(500).json({ error: "Failed to fetch featured recipes" });
      }
    });

    // ==========================================
    // POPULAR RECIPES API
    // ==========================================
    app.get("/api/recipes/popular", async (req, res) => {
      try {
        if (!recipesCollection) {
          return res.status(500).json({ error: "Database collection is not ready yet" });
        }

        const popular = await recipesCollection.find({}).sort({ likesCount: -1 }).limit(4).toArray();
        res.status(200).json(popular);
      } catch (error) {
        console.error("Popular Fetch Error:", error);
        res.status(500).json({ error: "Failed to fetch popular recipes" });
      }
    });

    // ==========================================
    // SINGLE RECIPE DETAILS API
    // ==========================================
    app.get("/api/recipes/:id", async (req, res) => {
      try {
        if (!recipesCollection) {
          return res.status(500).json({ error: "Database collection is not ready yet" });
        }

        const recipeId = req.params.id;

        if (!ObjectId.isValid(recipeId)) {
          return res.status(400).json({ error: "Invalid recipe ID format" });
        }

        const recipe = await recipesCollection.findOne({ _id: new ObjectId(recipeId) });
        
        if (!recipe) {
          return res.status(404).json({ error: "Recipe not found" });
        }

        res.status(200).json(recipe);
      } catch (error) {
        console.error("Fetch Single Recipe Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    });

    // ==========================================
    // ADDED: INTERNAL USER-STATUS VERIFICATION API
    // ==========================================
    app.get("/api/recipes/:id/user-status", async (req, res) => {
      try {
        const recipeId = req.params.id;
        const { email } = req.query;

        if (!email) {
          return res.status(400).json({ error: "Email query parameter required." });
        }

        const normalizedEmail = email.toLowerCase().trim();

        const hasLiked = await likesCollection.findOne({ email: normalizedEmail, recipeId });
        const hasFavorited = await favoritesCollection.findOne({ email: normalizedEmail, recipeId });
        const hasReported = await reportsCollection.findOne({ email: normalizedEmail, recipeId });

        res.status(200).json({
          isLiked: !!hasLiked,
          isFavorite: !!hasFavorited,
          isReported: !!hasReported
        });
      } catch (error) {
        console.error("User status verification error:", error);
        res.status(500).json({ error: "Internal server error." });
      }
    });

    // ==========================================
    // ADDED: FAVORITES COLLECTION ROUTERS
    // ==========================================
    // GET: Fetch all favorited recipes for a specific user
    app.get("/api/favorites", async (req, res) => {
      try {
        const { email } = req.query;
        if (!email) {
          return res.status(400).json({ error: "Email query parameter is required." });
        }

        const normalizedEmail = email.toLowerCase().trim();

        // 1. Find all favorite entries matching this user's email
        const userFavorites = await favoritesCollection.find({ email: normalizedEmail }).toArray();
        
        // 2. Isolate target recipe IDs
        const recipeIds = userFavorites.map(fav => fav.recipeId);

        if (recipeIds.length === 0) {
          return res.status(200).json([]);
        }

        // 3. Map values to database dynamic ObjectId schemas
        const objectIds = recipeIds
          .filter(id => ObjectId.isValid(id))
          .map(id => new ObjectId(id));

        // 4. Resolve populated profile lists back to layout configurations
        const favoritedRecipes = await recipesCollection.find({ _id: { $in: objectIds } }).toArray();

        res.status(200).json(favoritedRecipes);
      } catch (error) {
        console.error("Error fetching favorited items:", error);
        res.status(500).json({ error: "Failed to fetch favorited items from database." });
      }
    });

    // POST: Add a favorite (Supports both standard and /add routing schemas)
    const handleAddFavorite = async (req, res) => {
      try {
        const { email, recipeId } = req.body;
        if (!email || !recipeId) {
          return res.status(400).json({ error: "Missing user email or recipe identification." });
        }

        const normalizedEmail = email.toLowerCase().trim();
        
        // Prevent duplicate favorite entry structures
        const query = { email: normalizedEmail, recipeId };
        const existing = await favoritesCollection.findOne(query);

        if (!existing) {
          await favoritesCollection.insertOne({ ...query, createdAt: new Date() });
          // Increment totalFavorites shortcut pointer for the user's dashboard performance
          await usersCollection.updateOne({ email: normalizedEmail }, { $inc: { favoritesCount: 1 } });
        }

        res.status(200).json({ success: true, message: "Successfully favorited recipe." });
      } catch (error) {
        console.error("Favorite write operational handling fault:", error);
        res.status(500).json({ error: "Failed to persist database favorite record." });
      }
    };
    app.post("/api/favorites", handleAddFavorite);
    app.post("/api/favorites/add", handleAddFavorite);

    // DELETE: Remove a favorite (Supports both standard and /remove routing schemas)
    const handleDeleteFavorite = async (req, res) => {
      try {
        const { email, recipeId } = req.body;
        if (!email || !recipeId) {
          return res.status(400).json({ error: "Missing parameters to clear favorite entry data." });
        }

        const normalizedEmail = email.toLowerCase().trim();
        const deleteResult = await favoritesCollection.deleteOne({ email: normalizedEmail, recipeId });

        if (deleteResult.deletedCount > 0) {
          await usersCollection.updateOne({ email: normalizedEmail }, { $inc: { favoritesCount: -1 } });
        }

        res.status(200).json({ success: true, message: "Successfully deleted recipe from favorites." });
      } catch (error) {
        console.error("Favorite drop operation error:", error);
        res.status(500).json({ error: "Failed to delete target collection records." });
      }
    };
    app.delete("/api/favorites", handleDeleteFavorite);
    app.delete("/api/favorites/remove", handleDeleteFavorite);

    // ==========================================
    // ADDED: INTERACTIVE LIKES SYSTEM OPERATIONS
    // ==========================================
    app.post("/api/likes/add", async (req, res) => {
      try {
        const { email, recipeId } = req.body;
        const normalizedEmail = email.toLowerCase().trim();

        const query = { email: normalizedEmail, recipeId };
        const existing = await likesCollection.findOne(query);

        if (!existing) {
          await likesCollection.insertOne({ ...query, createdAt: new Date() });
          await recipesCollection.updateOne({ _id: new ObjectId(recipeId) }, { $inc: { likesCount: 1 } });
        }
        res.status(200).json({ success: true });
      } catch (error) {
        res.status(500).json({ error: "Like increment failed." });
      }
    });

    app.delete("/api/likes/remove", async (req, res) => {
      try {
        const { email, recipeId } = req.body;
        const normalizedEmail = email.toLowerCase().trim();

        const deleteResult = await likesCollection.deleteOne({ email: normalizedEmail, recipeId });
        if (deleteResult.deletedCount > 0) {
          await recipesCollection.updateOne({ _id: new ObjectId(recipeId) }, { $inc: { likesCount: -1 } });
        }
        res.status(200).json({ success: true });
      } catch (error) {
        res.status(500).json({ error: "Like decrement failed." });
      }
    });

    // ==========================================
    // ADDED: CONTENT AUDITING REPORTS PIPELINE
    // ==========================================
    app.post("/api/reports/add", async (req, res) => {
      try {
        const { email, recipeId, reason } = req.body;
        const normalizedEmail = email.toLowerCase().trim();

        await reportsCollection.insertOne({
          email: normalizedEmail,
          recipeId,
          reason,
          createdAt: new Date()
        });
        res.status(200).json({ success: true });
      } catch (error) {
        res.status(500).json({ error: "Report generation error." });
      }
    });

    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
  }
}
run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('server is running!')
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});