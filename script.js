document.getElementById('send').addEventListener('click', () => {
  const input = document.getElementById('input').value;
  const output = document.getElementById('output');

  // Hier kannst du deine KI-Logik einfügen
  output.innerText = "Dein KI-Text: " + input.split("").reverse().join("");
});
