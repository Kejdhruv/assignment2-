import express from "express";
import cors from "cors"; 
import dbConnect1 from './Database/database.js';
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

app.get('/Cars', async (req, res) => {
  try {
    const data = await dbConnect1();
    res.send(data); 
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Failed to fetch Data" });
  }
});  