const express = require("express");
const lyrics = require("simple-get-lyrics");

const app = express();

// middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(require("cors")());

// routes
app.post("/get/lyrics", (req, res) => {
  const { artistName, songName } = req.body;

  if (!artistName || !songName) {
    return res.json({ error: "Please enter both fields!😒" });
  }

  // find the lyrics
  lyrics
    .search(artistName, songName)
    .then((response) => {
      return res.json(response);
    })
    .catch((err) => {
      if (err) {
        return res.json({ error: "No match found!😥" });
      }
    });
});

// server config
app.listen(process.env.PORT, () => {
  console.log("server started listening on port: 3000....");
});
