import mongoose from "mongoose";

// Define the structure of data in the board collection
const boardsSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
});

// Create the model to interact with mongodb database
const Board = mongoose.models.Board || mongoose.model("Board", boardsSchema);

export default Board;
