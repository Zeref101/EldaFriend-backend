import { Schema, models, model, Document } from "mongoose";

export interface ICommunity {
  userId: Schema.Types.ObjectId[];
  admin: Schema.Types.ObjectId;
  name: string;
  description: string;
  picture: string;
  banner?: string;
}

const CommunitySchema = new Schema({
  userId: [{ type: Schema.Types.ObjectId, ref: "User", required: true }],
  admin: { type: Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  picture: { type: String, required: true },
  banner: { type: String, required: false },
});

const Community = models.Community || model("Community", CommunitySchema);

export default Community;
