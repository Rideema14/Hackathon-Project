async function generateDFD() {
    const idea = document.getElementById("ideaInput").value.trim();
    if (!idea) {
      alert("Please enter your system idea.");
      return;
    }
  
    const prompt = `
  You are a helpful assistant. Generate a Mermaid.js syntax for a Level 1 Data Flow Diagram (DFD) of the following system:
  
  Idea: ${idea}
  
  Follow Mermaid DFD syntax. Use processes, data stores, and external entities clearly.
  `;
  
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer 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"
      },
      body: JSON.stringify({
        model: "llama3-8b-8192",
        messages: [{ role: "user", content: prompt }]
      })
    });
  
    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;
  
    const diagramCode = extractMermaidCode(content);
    renderMermaid(diagramCode);
  }
  
  function extractMermaidCode(text) {
    const code = text.match(/```mermaid([\s\S]*?)```/);
    return code ? code[1].trim() : text.trim();
  }
  
  function renderMermaid(code) {
    const container = document.getElementById("diagramContainer");
    container.innerHTML = code;
    mermaid.render("dfdGenerated", code, (svgCode) => {
      container.innerHTML = svgCode;
    });
  }
  