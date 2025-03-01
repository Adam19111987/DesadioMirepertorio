import express from "express";
import cors from "cors";
import { writeFile, readFile } from "node:fs/promises";

const app = express();
app.use(express.json());
app.use(cors());

app.listen(5000, () => {
  console.log("¡Servidor running en el puerto 3000!");
});

const getReperotio = async () => {
  try {
    const rerResponse = await readFile("repertorio.json", "utf-8");
    const data = JSON.parse(rerResponse);
    return data;
  } catch (error) {
    console.error("Error al leer el archivo:", error);
    return [];
  }
};

app.get("/song", async (req, res) => {
  try{
    const song = await getReperotio();
  res.json(song)} catch(e){
   res.status(401).json({message : "Error con solicitud de cancion"})
  }
});

app.get("/song/:id", async (req, res) => {
  const { id } = req.params;
  const songs = await getReperotio();
  const finder = songs.find((song) => song.id === id);
  if (!finder) {
    res.status(404).json({ message: "Todo not found" });
  }
  res.json(finder);
});

app.post("/song", async (req, res) => {
 try{
 
    const { id, titulo, artista, tono } = req.body;
  const song = await getReperotio();

  const newSong = {
    id,
    titulo,
    artista,
    tono,
  };
  song.push(newSong);
  await writeFile("repertorio.json", JSON.stringify(song));
  res.status(201).json(newSong)}
  catch(e){
    res.status(401).json({message : "error no se pudo ingresar cancion a repertorio"})}
  }
);

app.delete("/song/:id", async (req, res) => {
    try{
  const { id } = req.params;
  let songs = await getReperotio();
  let finder = songs.find((song) => song.id === id);
  if (!finder) {
    res.status(401).json({ message: "error not found" });
  }

  songs = songs.filter((song) => song.id !== id);
  await writeFile("repertorio.json", JSON.stringify(songs));
  res.json({ message: "cancion eliminada", songs })
}catch(e){
    res.json({ message: "cancion no pudo ser eliminada"})
}
});

app.put("/song/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const song = req.body;
    const songs = await getReperotio();
    const index = songs.findIndex((s) => s.id == id);
    songs[index] = song;
    await writeFile("repertorio.json", JSON.stringify(songs));
    res.json({ message: "Repertorio modificado con éxito", songs });
  } catch (e) {
    res.json({ message: "error not found" });
  }
});

//http://localhost:5000/song
