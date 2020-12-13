import { raw } from "express";
import fs from "fs";
const PATH = "./data.json";

class posts {
  get() {
    /* Return a list of posts*/
    return this.readData();
  }

  getIndividualPosts(post_id) {
    //   Return an Individual post
    let posts = this.readData();
    return posts.find((post) => post.id === post_id);
  }

  add(newPost) {
    /* Add a new post */
    const currentPosts = this.readData();
    currentPosts.unshift(newPost);
    this.storeData(currentPosts);
  }

  readData() {
    let rawData = fs.readFileSync(PATH);
    let posts = JSON.parse(rawData);
    return posts;
  }

  storeData(rawData) {
    let data = JSON.stringify(rawData);
    fs.writeFileSync(PATH, data);
  }
}

export default posts;
