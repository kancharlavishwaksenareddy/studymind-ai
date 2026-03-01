from flask import Flask, render_template, request, jsonify
from groq import Groq
import os

app = Flask(__name__)

# Groq client
client = Groq(api_key=os.getenv("GROQ_API_KEY"))

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/explain", methods=["POST"])
def explain():
    data = request.get_json()
    topic = data.get("topic")

    response = client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[
            {"role": "user", "content": f"Explain {topic} in simple terms."}
        ]
    )

    answer = response.choices[0].message.content

    return jsonify({"response": answer})


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 10000))
    app.run(host="0.0.0.0", port=port)