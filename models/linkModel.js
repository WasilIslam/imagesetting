import { Schema, model, models } from "mongoose";

const linkSchema = new Schema({
  path: { type: String, required: true },
  link: { type: String, required: true },
});

const Link = models.link || model("link", linkSchema);

export default Link;
