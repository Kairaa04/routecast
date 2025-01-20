const express = require("express");
const app = express();
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

app.use(express.json());

// API route
app.get("/api", (req, res) => {
  res.send("Backend is working!");
});

// // Serve the React app
// const path = require("path");
// app.use(express.static(path.join(__dirname, "../routecast-frontend/build")));

// app.get("*", (req, res) => {
//   res.sendFile(
//     path.join(__dirname, "../routecast-frontend/build", "index.html")
//   );
// });
const path = require("path");
app.use(express.static(path.join(__dirname, "../routecast-frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(
    path.join(__dirname, "../routecast-frontend/build", "index.html")
  );
});

mongoose
  .connect("mongodb://127.0.0.1:27017/routecast", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
