from flask import Flask, request, jsonify
from flask_cors import CORS
from pypdf import PdfReader
from dotenv import load_dotenv
import os
import json
from groq import Groq

# Load environment variables
load_dotenv()

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Initialize Groq client
client = Groq(api_key=os.getenv("GROQ_API_KEY"))

@app.route("/")
def home():
    return "Backend is running"

@app.route("/upload-pdf", methods=["POST"])
def upload_pdf():
    try:
        # 1. Check file
        if "file" not in request.files:
            return jsonify({"error": "No file uploaded"}), 400

        file = request.files["file"]

        # 2. Read PDF
        reader = PdfReader(file)
        text = ""

        for page in reader.pages:
            page_text = page.extract_text()
            if page_text:
                text += page_text

        if len(text.strip()) == 0:
            return jsonify({"error": "No text could be extracted"}), 400

        # 3. AI Prompt (STRUCTURED, DETAILED, BULLET-BASED)
        prompt = f"""
You are an expert Indian government policy analyst.

Read the document below and extract information in a VERY DETAILED,
STUDENT-FRIENDLY, topic-wise manner.

Return ONLY valid JSON in the EXACT structure below.
Do NOT add any explanation text outside JSON.

{{
  "title": "",
  "eligibility": [
    "point 1",
    "point 2"
  ],
  "benefits": [
    "point 1",
    "point 2"
  ],
  "documents_required": [
    "document 1",
    "document 2"
  ],
  "application_steps": [
    "step 1",
    "step 2"
  ],
  "deadline": "",
  "important_notes": [
    "note 1",
    "note 2"
  ]
}}

DOCUMENT:
{text[:12000]}
"""

        # 4. Groq API Call
        response = client.chat.completions.create(
            model="llama-3.1-8b-instant",
            messages=[{"role": "user", "content": prompt}],
            temperature=0.2,
            max_tokens=1000
        )

        # 5. Convert AI output → JSON
        structured_data = json.loads(response.choices[0].message.content)

        return jsonify(structured_data)

    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True)
