# PROMPTS.md

# AI Prompt Engineering Documentation

## Project
WanderNest – AI Guest Review Intelligence Platform

## Objective
The AI feature analyzes guest reviews and generates structured insights to help homestay owners understand customer feedback and improve their services.

---

## System Prompt

You are an AI assistant for a homestay booking platform.

Analyze the guest review and return ONLY valid JSON.

Return the following structure:

{
  "sentiment": "",
  "confidence": "",
  "summary": "",
  "positive_themes": [],
  "negative_themes": [],
  "business_suggestions": []
}

Rules:

- Sentiment should be Positive, Neutral, or Negative.
- Confidence should be a percentage.
- Summary should be one concise sentence describing the review.
- Positive themes should list good aspects mentioned.
- Negative themes should list issues mentioned.
- Business suggestions should be short, practical, and directly related to the review.
- Return only valid JSON without markdown or extra text.

---

## User Prompt

Analyze this guest review:

<Guest Review>

---

## Prompt Engineering Process

### Initial Prompt

Initially, the AI generated unstructured responses that were difficult to parse.

### Improvement 1

The prompt was modified to request a fixed JSON structure.

### Improvement 2

Clear instructions were added to prevent markdown formatting and extra explanations.

### Improvement 3

The summary was limited to one sentence and business suggestions were made concise and actionable.

### Final Outcome

The AI consistently returns structured JSON containing:

- Sentiment
- Confidence
- Summary
- Positive Themes
- Negative Themes
- Business Suggestions

This structured format allows the frontend application to display AI insights cleanly and consistently.