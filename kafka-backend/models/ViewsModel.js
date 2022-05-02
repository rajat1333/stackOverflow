import mongoose from "mongoose";
const Schema = mongoose.Schema;

var ViewsSchema = new Schema(
  {
    questionID: { type: String, unique: true },
    clientIdentity: { type: [String] },
  },
  {
    versionKey: false,
  }
);
const ViewsModel = mongoose.model("view", ViewsSchema);

export default ViewsModel;