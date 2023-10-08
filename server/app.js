import express from "express";
import cors from "cors";
import sequelize from "./utils/database";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello👋");
});

const PORT = process.env.PORT || 3000;

sequelize
  .sync()
  .then((result) => {
    app.listen(4000);
  })
  .catch((err) => {
    console.log(err);
  });
app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
