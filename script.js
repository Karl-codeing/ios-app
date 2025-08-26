// IP deines PCs / Flask-Backend anpassen
const SERVER_URL = "http://192.168.2.127:5000/ask";

async function sendMsg() {
    const input = document.getElementById("msg");
    const msg = input.value.trim();
    if (!msg) return;
    input.value = "";

    const chat = document.getElementById("chat");
    chat.innerHTML += `<div class="msg user"><b>Du:</b> ${msg}</div>`;
    chat.scrollTop = chat.scrollHeight;

    try {
        const res = await fetch(SERVER_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ prompt: msg }),
        });

        const data = await res.json();
        const reply = data.choices[0].message.content;
        chat.innerHTML += `<div class="msg bot"><b>KI:</b> ${reply}</div>`;
        chat.scrollTop = chat.scrollHeight;
    } catch (err) {
        chat.innerHTML += `<div class="msg bot"><b>Fehler:</b> Server nicht erreichbar.</div>`;
    }
}
