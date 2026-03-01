document.getElementById("explainBtn").addEventListener("click", function () {

    const topic = document.getElementById("topicInput").value.trim();
    if (!topic) return;

    const output = document.getElementById("output");

    // Hide welcome
    const welcome = document.getElementById("welcomeScreen");
    if (welcome) {
        welcome.style.display = "none";
    }

    // Add user message
    const userMessage = document.createElement("div");
    userMessage.className = "message user";
    userMessage.textContent = topic;
    output.appendChild(userMessage);

    document.getElementById("topicInput").value = "";
    output.scrollTop = output.scrollHeight;

    // Add typing animation
    const typing = document.createElement("div");
    typing.className = "message ai typing";
    typing.innerHTML = "<span></span><span></span><span></span>";
    output.appendChild(typing);
    output.scrollTop = output.scrollHeight;

    fetch("/explain", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic: topic })
    })
    .then(res => res.json())
    .then(data => {

        typing.remove();

        const aiMessage = document.createElement("div");
        aiMessage.className = "message ai";
        aiMessage.textContent = data.response;
        output.appendChild(aiMessage);

        output.scrollTop = output.scrollHeight;
    })
    .catch(() => {
        typing.remove();
    });
});