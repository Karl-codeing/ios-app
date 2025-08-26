const API_KEY = "9b953abebd684a00a461265ddb353241"; // Ersetze dies mit deinem echten API-Key

async function sendMsg() {
  const input = document.getElementById("msg");
  const msg = input.value.trim();
  if (!msg) return;
  input.value = "";

  const chat = document.getElementById("chat");
  chat.innerHTML += `<div class="msg user"><b>Du:</b> ${msg}</div>`;
  chat.scrollTop = chat.scrollHeight;

  try {
    const res = await fetch("https://api.aimlapi.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o", // oder ein anderes Modell deiner Wahl
        messages: [{ role: "user", content: msg }],
        max_tokens: 512,
      }),
    });

    const data = await res.json();
    const reply = data.choices[0].message.content;
    chat.innerHTML += `<div class="msg bot"><b>KI:</b> ${reply}</div>`;
    chat.scrollTop = chat.scrollHeight;
  } catch (err) {
    chat.innerHTML += `<div class="msg bot"><b>Fehler:</b> Keine Verbindung zum Server.</div>`;
  }
}
