# goalie

# AI-Generated Personal Planning Calendar

This project uses Amazon Bedrock (Claude 3), AWS Lambda, API Gateway, and DynamoDB to generate **personalized weekly plans** based on user-selected hobbies.  
The generated activities are mapped to a calendar-style frontend for users to visualize and act on their goals!

---

## Features

- Select a hobby or focus area (e.g., Exercise, Creativity, Reading, Relaxation).
- Generate a **personalized 7-day plan** using an AI model (Claude 3 via Bedrock).
- Store generated plans in a DynamoDB table (`goals`).
- Fetch and display the generated plan as **calendar events** in the frontend.
- Dynamically map AI-generated activities to real-world dates.

---

## Tech Stack

- **Frontend:** React (Vite)
- **Backend:** AWS Lambda (Python), API Gateway
- **AI Model:** Anthropic Claude 3 via Amazon Bedrock
- **Database:** AWS DynamoDB
- **Deployment:** GitHub

---

## How It Works

1. **User selects a hobby** from a dropdown menu.
2. **Frontend sends a prompt** to an HTTP API Gateway endpoint.
3. **AWS Lambda parses the prompt**, sends a custom message to Claude 3 via Bedrock.
4. **Bedrock generates a structured JSON output** — a weekly plan of activities.
5. **Lambda stores the plan** into a DynamoDB table and returns it to the frontend.
6. **Frontend parses the response** and maps activities onto a calendar.

---

## Project Structure

---
## Running Locally
`
cd goalie
npm install
npm run dev`

📋 API Example
POST /createPlan

json
Copy
Edit
{
  "userId": "testUser123",
  "hobby": "Exercise",
  "body": {
    "text": "Give me a motivating running goal for today."
  }
}
Response:

json
Copy
Edit
{
  "goalSuggestions": {
    "L": [
      {
        "M": {
          "activity": { "S": "Run 4 miles" },
          "date": { "S": "2025-04-28" }
        }
      },
      ...
    ]
  }
}
