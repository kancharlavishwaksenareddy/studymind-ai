from flask import request, jsonify

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
import os

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 10000))
    app.run(host="0.0.0.0", port=port)