// IP deines PCs / Flask-Backend
const SERVER_URL = "http://192.168.2.127:5000/ask";

async function sendMsg() {
    const input = document.getElementById("msg");
    const msg = input.value.trim();
    if (!msg) return; // nichts senden, wenn leer
    input.value = "";  // Eingabefeld leeren

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
        // KI-Antwort extrahieren
        const reply = data.choices?.[0]?.message?.content || "Keine Antwort vom Server.";
        chat.innerHTML += `<div class="msg bot"><b>KI:</b> ${reply}</div>`;
        chat.scrollTop = chat.scrollHeight;

    } catch (err) {
        chat.innerHTML += `<div class="msg bot"><b>Fehler:</b> Server nicht erreichbar.</div>`;
        chat.scrollTop = chat.scrollHeight;
        console.error("Fehler beim Abrufen der KI:", err);
    }
}
