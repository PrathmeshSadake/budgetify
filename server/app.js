import express from "express";
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello👋");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
