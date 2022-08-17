import { Schema, model, models } from "mongoose";

const textSchema = new Schema({
  data: { type: String, required: true },
});

const Text = models.text || model("text", textSchema);

export default Text;
