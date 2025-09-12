import mongoose, { Schema } from "mongoose";

const partnerSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
  },
  { timestamps: true }
);

const partnerModel = mongoose.models.partner || mongoose.model("partner", partnerSchema);

export default partnerModel;
