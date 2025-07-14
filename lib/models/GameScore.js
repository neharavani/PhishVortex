import mongoose from 'mongoose';

const QuestionSchema = new mongoose.Schema({
  question: String,
  options: [String],
  answer: String,
});

const GameScoreSchema = new mongoose.Schema({
  topic: { type: String, required: true },
  questions: [QuestionSchema],
  score: { type: Number, required: true },
  total: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

export const GameScore = mongoose.models.GameScore || mongoose.model('GameScore', GameScoreSchema);
