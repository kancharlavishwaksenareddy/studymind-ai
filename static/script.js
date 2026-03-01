document.getElementById("explainBtn").addEventListener("click", sendMessage);
document.getElementById("topicInput").addEventListener("keypress", function(e) {
    if (e.key === "Enter") sendMessage();
});

function sendMessage() {

    const input = document.getElementById("topicInput");
    const text = input.value.trim();
    if (!text) return;

    const chat = document.getElementById("output");

    // User message
    const userMsg = document.createElement("div");
    userMsg.className = "message user";
    userMsg.textContent = text;
    chat.appendChild(userMsg);

    input.value = "";
    chat.scrollTop = chat.scrollHeight;

    // Typing animation
    const typing = document.createElement("div");
    typing.className = "message ai typing";
    typing.innerHTML = "<span></span><span></span><span></span>";
    chat.appendChild(typing);
    chat.scrollTop = chat.scrollHeight;

    fetch("/explain", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic: text })
    })
    .then(res => res.json())
    .then(data => {

        typing.remove();

        const aiMsg = document.createElement("div");
        aiMsg.className = "message ai";
        aiMsg.textContent = data.response;
        chat.appendChild(aiMsg);

        chat.scrollTop = chat.scrollHeight;
    })
    .catch(() => typing.remove());
}