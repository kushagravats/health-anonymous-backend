const mongoose = require("mongoose");

const SymptomSchema = new mongoose.Schema({
  anonymous_id: { type: String, required: true },
  symptom_description: { type: String, required: true },
  severity_level: { type: Number, default: 1 },
  response_provided: { type: String, required: false },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Symptom", SymptomSchema);
