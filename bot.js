async function sendMessage() {
    const input = document.getElementById("userInput");
    const text = input.value.trim();
    if (!text) return;
  
    addMessage("user", text);
    input.value = "";
  
    try {
      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer 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"
        },
        body: JSON.stringify({
          model: "llama3-8b-8192",
          messages: [
            {
              role: "user",
              content: text
            }
          ]
        })
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP ${response.status} - ${errorText}`);
      }
  
      const data = await response.json();
      const reply = data.choices?.[0]?.message?.content || "No response from AI.";
      addMessage("bot", reply);
    } catch (err) {
      console.error(err);
      addMessage("bot", `⚠️ Error: ${err.message}`);
    }
  }
  function addMessage(sender, content) {
    const message = document.createElement("div");
    message.className = "message " + sender;
    message.textContent = content;
    document.getElementById("chat-messages").appendChild(message);
    document.getElementById("chat-messages").scrollTop = 9999;
  }
  
  function handleKey(event) {
    if (event.key === "Enter") {
      sendMessage();
    }
  }
  const text = "Hii👋 How Can I Help You Today?";
  const target = document.querySelector(".typewriter-text");
  
  let i = 0;
  function typeWriter() {
    if (i < text.length) {
      target.textContent += text.charAt(i);
      i++;
      setTimeout(typeWriter, 80); // speed of typing
    }
  }
  
  window.addEventListener("DOMContentLoaded", typeWriter);
  