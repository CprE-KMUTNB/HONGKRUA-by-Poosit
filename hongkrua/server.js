const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser"); // ต้องเพิ่ม middleware นี้เพื่อให้ Express อ่านข้อมูลจาก body ของคำขอ
const cors = require("cors")
const port = 3001;
const app = express();
app.use(bodyParser.json()); // เพิ่ม middleware นี้เพื่อให้ Express อ่านข้อมูล JSON จาก body ของคำขอ
app.use(cors())
// เชื่อมต่อกับ MongoDB
mongoose.connect(
  "mongodb+srv://poohpooh2547:1234@cluster0.fwcav45.mongodb.net/usersdb",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

// สร้าง database และ collection
const User = mongoose.model("User", {
  username: String,
  email: String,
  password: String,
});

// เลื่อนการสร้างดัชนีไปยังภายในฟังก์ชันที่ใช้ในการสร้างผู้ใช้
// db.collection("users").createIndex({ username: 1 }, { unique: true });

// ฟังก์ชันสำหรับบันทึกข้อมูลผู้ใช้ลงใน database
async function registerUser(username, email, password) {
  const user = new User({
    username,
    email,
    password,
  });

  try {
    await user.save();
    return user;
  } catch (error) {
    return null;
  }
}

// จัดการคำขอ HTTP
app.post("/api/register", async (req, res) => {
  const { username, email, password } = req.body;
  console.log(req.body)
  // ตรวจสอบว่าข้อมูลฟอร์มถูกต้องหรือไม่
  if (username && email && password && password === req.body.confirmPassword) {
    // บันทึกข้อมูลผู้ใช้ลงใน database
    const user = await registerUser(username, email, password);

    if (user) {
      // ตอบกลับข้อมูลผู้ใช้
      res.json(user);
    } else {
      // ตอบกลับข้อความแจ้งข้อผิดพลาดถ้ามีข้อผิดพลาดในการบันทึก
      res.status(400).json({ error: "ไม่สามารถลงทะเบียนผู้ใช้ได้" });
    }
  } else {
    // ตอบกลับข้อความแจ้งข้อผิดพลาด
    res.status(400).json({ error: "ข้อมูลฟอร์มไม่ถูกต้อง" });
  }
});

app.listen(port, () => console.log(`Server is running at http://localhost:${port}`));
