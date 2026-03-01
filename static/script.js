console.log("JS LOADED");

function sendRequest(type) {
    const topic = document.querySelector("input").value;

    console.log(type + " clicked");

    fetch(`/${type}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ topic: topic })
    })
    .then(response => response.json())
    .then(data => {
        document.querySelector(".output").innerText = data.response;
    })
    .catch(error => {
        console.error("Error:", error);
    });
}