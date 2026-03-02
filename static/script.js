// Send button click
document.getElementById("explainBtn").addEventListener("click", sendMessage);

// Press Enter to send
document.getElementById("topicInput").addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        sendMessage();
    }
});

function sendMessage() {

    const input = document.getElementById("topicInput");
    const text = input.value.trim();

    if (!text) return;

    const chat = document.getElementById("output");

    // ✅ Add user message
    const userMsg = document.createElement("div");
    userMsg.className = "message user";
    userMsg.textContent = text;
    chat.appendChild(userMsg);

    input.value = "";
    chat.scrollTop = chat.scrollHeight;

    // ✅ Add typing animation
    const typing = document.createElement("div");
    typing.className = "message ai typing";
    typing.innerHTML = "<span></span><span></span><span></span>";
    chat.appendChild(typing);
    chat.scrollTop = chat.scrollHeight;

    // ✅ Send request to backend
    fetch("/explain", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ topic: text })
    })
    .then(res => res.json())
    .then(data => {

        typing.remove();

        const aiMsg = document.createElement("div");
        aiMsg.className = "message ai";

        // 👇 Format the response properly
        aiMsg.innerHTML = formatResponse(data.response);

        chat.appendChild(aiMsg);
        chat.scrollTop = chat.scrollHeight;
    })
    .catch(() => {
        typing.remove();
    });
}


// ✅ FORMAT RESPONSE FUNCTION
function formatResponse(text) {

    // Convert **bold** to <strong>
    text = text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

    // Add spacing before numbered sections
    text = text.replace(/\n\d+\.\s/g, "<br><br>");

    // Convert line breaks to <br>
    text = text.replace(/\n/g, "<br>");

    return text;
}