import mongoose from "mongoose";

const snippetSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    code: { type: String, required: true },
    language: { type: String, required: true },
    tags: [{ type: String }],
    expiresIn: { type: Number },
    expiresAt: { type: Date },
  },
  { timestamps: true }
);

snippetSchema.pre("save", function (next) {
  if (this.code) {
    this.code = Buffer.from(this.code).toString("base64");
  }
  if (this.expiresIn) {
    this.expiresAt = new Date(Date.now() + this.expiresIn * 1000);
  }
  next();
});

const Snippet = mongoose.model("Snippet", snippetSchema, "snippets");

export default Snippet;
