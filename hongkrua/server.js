const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcrypt"); // เพิ่ม bcrypt เพื่อใช้ในการเข้ารหัสรหัสผ่าน
const port = 3001;
const app = express();
const jwt = require("jsonwebtoken");
const User = require("./lib/user")
const Recipe = require("./lib/recipe")
const ingredient = require("./lib/ingredient")

app.use(cors());
app.use(bodyParser.json({ limit: "50mb", extended: true }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);
app.use(bodyParser.text({ limit: "200mb" }));
mongoose.connect(
  "mongodb+srv://poohpooh2547:1234@cluster0.fwcav45.mongodb.net/hongkruadb",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

async function loginUser(email, password) {
  try {
    const user = await User.findOne({ email }).exec();

    if (!user) {
      return null; // ไม่พบผู้ใช้
    }

    const isPasswordValid = await bcrypt.compare(password, user.password); // เปรียบเทียบรหัสผ่าน

    if (isPasswordValid) {
      return user; // เข้าสู่ระบบสำเร็จ
    } else {
      return null; // รหัสผ่านไม่ถูกต้อง
    }
  } catch (error) {
    return null; // เกิดข้อผิดพลาดในการค้นหาผู้ใช้
  }
}

app.post("/api/register", async (req, res) => {
  const { username, email, password} = req.body;

  if (username && email && password && password === req.body.confirmPassword) {
    const hashedPassword = await bcrypt.hash(password, 10); // เข้ารหัสรหัสผ่าน
    const user = new User({ username,email, password: hashedPassword });

    try {
      const savedUser = await user.save();
      res.json(savedUser);
    } catch (error) {
      res.status(400).json({ error: "ไม่สามารถลงทะเบียนผู้ใช้ได้" });
    }
  } else {
    res.status(400).json({ error: "ข้อมูลฟอร์มไม่ถูกต้อง" });
  }
});

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await loginUser(email, password);

    if (!user) {
      return res
        .status(401)
        .json({ message: "ไม่พบผู้ใช้งานหรือรหัสผ่านไม่ถูกต้อง" });
    }
    const token = jwt.sign({ userId: user._id }, "kawin", { expiresIn: "8h" });

    res.status(200).json({ message: "เข้าสู่ระบบสำเร็จ", token,user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "เกิดข้อผิดพลาดในการเข้าสู่ระบบ" });
  }
});

app.post("/api/recipes", async (req, res) => {
  console.log(req.body);
  const { title, nation, type, details, steps, selectedImage } = req.body;

  try {
    const newRecipe = new Recipe({
      title,
      nation,
      type,
      details,
      selectedImage,
      steps,
    }); // req.body ควข้อมูลแบบฟอร์ม
    // console.log(title, nation, type, details, steps);
    const SaveRecipe = await newRecipe.save();

    res.json(SaveRecipe);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "การสร้างสูตรอาหาร" });
  }
});
app.get("/api/recipes/:id", async (req, res) => {
  const recipeId = req.params.id;
  try {
    const recipes = await Recipe.findOne({ title: recipeId });
    res.json(recipes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "การดึงข้อมูลสูตรอาหาร" });
  }
});
app.get("/api/recipes", async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.json(recipes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "การดึงข้อมูลสูตรอาหาร" });
  }
});
// app.get('/api/ingredients/:id', async (req, res) => {
//   // Replace with logic to fetch ingredients by ID from your database
//   const ingredientId = req.params.id;
//   try{
//     const ingredient = await ingredient.findOne({title:ingredientId});
//     console.log(ingredient);
//     res.json(ingredient);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "การดึงข้อมูลสูตรอาหาร" });
//   }
//   // Query your database and send the ingredients as a response
// });
app.get("/api/ingredients", async (req, res) => {
  // Replace with logic to fetch ingredients by ID from your database
  try {
    const ingredientData = await ingredient.findOne();
    console.log(ingredientData);
    res.json(ingredientData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "การดึงข้อมูลสูตรอาหาร" });
  }
  // Query your database and send the ingredients as a response
});
app.post("/api/comments", (req, res) => {
  // Replace with logic to save comments in your database
  const { text, rating } = req.body;
  // Save the comment to your database
  // Return success status or error message
  res.status(201).json({ message: "Comment saved successfully" });
});

app.listen(port, () =>
  console.log(`Server is running at http://localhost:${port}`)
);
