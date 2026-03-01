console.log("JS LOADED");

async function send() {
    console.log("Explain clicked");

    let topic = document.getElementById("input").value;

    let res = await fetch("/explain", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ topic: topic })
    });

    let data = await res.json();

    document.getElementById("chat").innerHTML +=
        "<p><b>AI:</b> " + data.result + "</p>";
}

async function quiz() {
    let topic = document.getElementById("input").value;

    let res = await fetch("/quiz", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ topic: topic })
    });

    let data = await res.json();

    document.getElementById("chat").innerHTML +=
        "<p><b>Quiz:</b> " + data.result + "</p>";
}

async function exam() {
    let topic = document.getElementById("input").value;

    let res = await fetch("/exam", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ topic: topic })
    });

    let data = await res.json();

    document.getElementById("chat").innerHTML +=
        "<p><b>Exam:</b> " + data.result + "</p>";
}

function voiceInput() {
    alert("Voice feature coming soon");
}

function confuse() {
    alert("Confusion solver coming soon");
}