require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const Order = require("./models/Orders");
const bcrypt = require("bcrypt");
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: "https://faceyoga.vn"
}));

// middleware
app.use(express.json());

// 🔥 KẾT NỐI MONGODB
mongoose.connect(process.env.MONGO_URI,
                 {  useNewUrlParser: true,
                    useUnifiedTopology: true
                  })
  .then(() => {    
    console.log("MongoDB connected ✅");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => console.log(err));
  
// route test
app.get("/", (req, res) => {
  res.send("Face Yoga API is running 🚀");
});

function verifyAdmin(req, res, next) {

  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ success: false });
  }

  const token = authHeader.split(" ")[1];

  try {
    jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (err) {
    return res.status(403).json({ success: false });
  }
}


app.post("/api/orders", async (req, res) => {
  //console.log("ITEMS RAW:", req.body.items);
  //console.log("ITEMS[0]:", req.body.items[0]);
  //console.log("TYPE ITEMS[0]:", typeof req.body.items[0]);
  try {
    //console.log("BODY:", req.body);
    //console.log("TYPE OF ITEMS:", typeof req.body.items);
    //console.log("IS ARRAY:", Array.isArray(req.body.items));
    //console.log("FIRST ITEM REAL TYPE:", typeof req.body.items[0]);
    //console.log("FIRST ITEM VALUE:", req.body.items[0]);
    const order = new Order(req.body);
    await order.save();

    res.status(201).json({
      success: true,
      message: "Order saved successfully"
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to save order"
    });
  }
});


app.get("/api/orders", verifyAdmin, async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      data: orders
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch orders"
    });
  }
});

app.patch("/api/orders/:id", verifyAdmin, async (req, res) => {
  try {
    const { status } = req.body;

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.json({
      success: true,
      data: order
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update order"
    });
  }
});

app.delete("/api/orders/:id", verifyAdmin, async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Order deleted successfully"
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to delete order"
    });
  }
});

app.post("/api/admin/login", async (req, res) => {
  const { password } = req.body;

  const isMatch = await bcrypt.compare(
    password,
    process.env.ADMIN_PASSWORD_HASH
  );

  if (!isMatch) {
    return res.status(401).json({ success: false });
  }

  const accessToken = jwt.sign(
    { role: "admin" },
    process.env.JWT_SECRET,
    { expiresIn: "15m" }   // 🔥 ngắn hạn
  );

  const refreshToken = jwt.sign(
    { role: "admin" },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }    // 🔥 dài hạn
  );

  res.json({
    success: true,
    accessToken,
    refreshToken
  });
});


app.post("/api/admin/refresh", (req, res) => {

  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(401).json({ success: false });
  }

  try {
    jwt.verify(refreshToken, process.env.JWT_SECRET);

    const newAccessToken = jwt.sign(
      { role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );

    res.json({
      success: true,
      accessToken: newAccessToken
    });

  } catch (err) {
    return res.status(403).json({ success: false });
  }
});


// start server



//console.log(Order.schema.obj);







