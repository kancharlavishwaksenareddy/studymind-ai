from flask import Flask, request, jsonify, render_template
from groq import Groq

app = Flask(__name__, static_folder="static", static_url_path="/static")

import os
client = Groq(api_key=os.getenv("GROQ_API_KEY"))

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/explain", methods=["POST"])
def explain():
    topic = request.json["topic"]

    response = client.chat.completions.create(
       model="llama-3.1-8b-instant",
        messages=[
            {"role": "user", "content": f"Explain {topic} simply and exam oriented"}
        ]
    )

    return jsonify({"result": response.choices[0].message.content})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)