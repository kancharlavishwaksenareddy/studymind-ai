console.log("JS LOADED");

document.getElementById("explainBtn").addEventListener("click", function () {

    const topicInput = document.getElementById("topicInput");
    const topic = topicInput.value.trim();

    if (topic === "") return;

    const output = document.getElementById("output");

    const userMessage = document.createElement("div");
    userMessage.className = "message user";
    userMessage.textContent = topic;

    output.appendChild(userMessage);

    topicInput.value = "";

    output.scrollTop = output.scrollHeight;

    fetch("/explain", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ topic: topic })
    })
    .then(response => response.json())
    .then(data => {

      
        const aiMessage = document.createElement("div");
        aiMessage.className = "message ai";
        aiMessage.textContent = data.response;

        output.appendChild(aiMessage);

    
        output.scrollTop = output.scrollHeight;
    })
    .catch(error => {
        console.error("Error:", error);
    });

});