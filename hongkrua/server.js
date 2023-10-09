const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcrypt"); // เพิ่ม bcrypt เพื่อใช้ในการเข้ารหัสรหัสผ่าน

const port = 3001;
const app = express();

app.use(bodyParser.json());
app.use(cors());

mongoose.connect(
  "mongodb+srv://poohpooh2547:1234@cluster0.fwcav45.mongodb.net/hongkruadb",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const User = mongoose.model("User", {
  username: String,
  email: String,
  password: String,
});

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
  const { username, email, password } = req.body;

  if (username && email && password && password === req.body.confirmPassword) {
    const hashedPassword = await bcrypt.hash(password, 10); // เข้ารหัสรหัสผ่าน
    const user = new User({ username, email, password: hashedPassword });

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
      return res.status(401).json({ message: "ไม่พบผู้ใช้งานหรือรหัสผ่านไม่ถูกต้อง" });
    }

    res.status(200).json({ message: "เข้าสู่ระบบสำเร็จ" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "เกิดข้อผิดพลาดในการเข้าสู่ระบบ" });
  }
});

app.listen(port, () => console.log(`Server is running at http://localhost:${port}`));