import express from "express";
import cors from "cors";
import { writeFile, readFile } from "node:fs/promises";

const app = express();
app.use (cors());
app.use(express.json());


// servidor

app.listen(5000, console.log("¡servidor run!"))


//funcion de llamado Api

// const getReperotio = async() =>{
//   const rsResponse = await readFileSync('repertorio.json', 'utf-8');
//   const data = JSON.parse(rsResponse)
//   return data;
// }