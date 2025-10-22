import express from "express";
import cors from "cors"; 
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send("yo man wassup");
});
app.listen(PORT, () => {
  console.log(`yo i m there at http://localhost:${PORT}`);
});
