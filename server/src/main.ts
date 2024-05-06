import express from "express";
import { MongoClient } from "mongodb";
import authRoutes from "./routes/authRoutes";

const app = express();
const mongoDBUrl =`mongodb+srv://ljm8350:${process.env.PASSWORD}@mongopractice.osgmeti.mongodb.net/?retryWrites=true&w=majority&appName=mongoPractice`;

async function startServer() {
  // Create a MongoDB client
  const client = new MongoClient(mongoDBUrl);

  try {
    // Connect to MongoDB
    await client.connect();
    console.log("MongoDB 서버에 성공적으로 연결되었습니다.");

    // Express app setup
    app.set("view engine", "ejs");
    app.set("views", "./src/views");

    app.use(express.urlencoded({ extended: true }));

    app.use("/auth", authRoutes);

    app.get("/", (req, res) => res.render("login"));
    app.get("/dashboard", (req, res) => {
        res.send(`안녕하세요`);
    });

    app.listen(3000, () =>
      console.log("서버가 http://localhost:3000 에서 시작되었습니다.")
    );
  } catch (err) {
    console.error("MongoDB에 연결하지 못했습니다.", err);
  }
}

startServer().catch(console.error);
