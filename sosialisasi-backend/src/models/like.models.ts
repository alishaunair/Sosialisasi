import mongoose from "mongoose";

const Schema = mongoose.Schema;

export interface User {
  _id: mongoose.Types.ObjectId;
}

export interface Content {
  _id: mongoose.Types.ObjectId;
}

export interface Like {
  id_user: mongoose.Types.ObjectId;
  id_content: mongoose.Types.ObjectId;
  created_at_like: Date;
}

const LikeSchema = new Schema<Like>({
  id_user: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  id_content: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  created_at_like: {
    type: Schema.Types.Date,
    required: true,
  },
});

const LikeModel = mongoose.model("Like", LikeSchema);

export default LikeModel;
