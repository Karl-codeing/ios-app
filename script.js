async function sendMsg() {
  let input = document.getElementById("msg");
  let msg = input.value.trim();
  if (!msg) return;
  input.value = "";

  let chat = document.getElementById("chat");
  chat.innerHTML += `<div class="msg user"><b>Du:</b> ${msg}</div>`;
  chat.scrollTop = chat.scrollHeight;

  try {
    let res = await fetch("http://192.168.2.127:5000/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: msg })
    });
    let data = await res.json();
    chat.innerHTML += `<div class="msg bot"><b>KI:</b> ${data.response}</div>`;
    chat.scrollTop = chat.scrollHeight;
  } catch (err) {
    chat.innerHTML += `<div class="msg bot"><b>Fehler:</b> Keine Verbindung zum Server.</div>`;
  }
}
