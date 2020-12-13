import express, { json } from "express";
import Post from "./api/models/posts.js";
import cors from "cors";
import multer from "multer";

const app = express();
const postData = new Post();

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + `${getExtension(file.mimetype)}`
    );
  },
});

var upload = multer({ storage: storage });

app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));

const getExtension = (mimeType) => {
  switch (mimeType) {
    case "image/jpeg":
      return ".jpeg";
    case "image/png":
      return ".png";
  }
};

app.get("/", (req, res) => {
  res.status(200).send("Hello World");
});

app.get("/api/posts", (req, res) => {
  res.status(200).send(postData.get());
});

app.get("/api/posts/:post_id", (req, res) => {
  let foundPosts = postData.getIndividualPosts(req.params.post_id);
  if (foundPosts) {
    res.status(200).send(foundPosts);
  } else {
    res.status(404).send("Not found");
  }
});

app.post("/api/posts", upload.single("post_image"), (req, res) => {
  let fileUrl = req.file.path.replace(/\\/g, "/");
  console.log(fileUrl);

  console.log(req.file);
  const dataReceived = {
    id: `${Date.now()}`,
    title: req.body.title,
    content: req.body.content,
    post_image: fileUrl,
    added_date: `${Date.now()}`,
  };
  postData.add(dataReceived);
  res.status(200).send(dataReceived);
});

app.listen(3000, () => {
  console.log("Listening to locahost 3000");
});
