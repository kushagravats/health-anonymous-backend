const express = require("express");
const router = express.Router();
const Symptom = require("../models/Symptom");
const protect = require("../middleware/authMiddleware");
const axios = require("axios");

router.post("/submit", protect, async (req, res) => {
  const { symptom_description, severity_level } = req.body;

  try {
    const newSymptom = new Symptom({
      // @ts-ignore
      anonymous_id: req.user.anonymous_id,
      symptom_description,
      severity_level,
      response_provided: "Analyzing...",
    });

    const savedSymptom = await newSymptom.save();

    // @ts-ignore
    const response = await axios.get(
      `https://health-api.example.com/suggestions?symptom=${symptom_description}`
    );
    savedSymptom.response_provided = response.data.suggestion;

    await savedSymptom.save();
    res.status(201).json(savedSymptom);
  } catch (error) {
    res.status(500).json({ error: "Failed to submit symptom" });
  }
});

module.exports = router;
