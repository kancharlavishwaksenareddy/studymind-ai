console.log("JS LOADED");

document.getElementById("explainBtn").addEventListener("click", function () {
    console.log("Explain clicked");

    const topic = document.getElementById("topicInput").value;

    fetch("/explain", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ topic: topic })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById("output").innerText = data.response;
    })
    .catch(error => {
        console.error("Error:", error);
    });
});