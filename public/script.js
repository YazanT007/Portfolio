const form = document.getElementById("contact-form");
const statusEl = document.getElementById("form-status");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  statusEl.textContent = "";
  const submitBtn = form.querySelector(".send-btn");
  submitBtn.disabled = true;

  const formData = {
    name: form.name.value.trim(),
    email: form.email.value.trim(),
    message: form.message.value.trim()
  };

  try {
    const resp = await fetch("/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    });

    // backend always returns JSON
    const data = await resp.json();
    if (!resp.ok) throw new Error(data.message || "Failed to send");

    statusEl.style.color = "green";
    statusEl.textContent = data.message || "Sent!";
    form.reset();
  } 
  
  catch (err) {
    console.error(err);
    statusEl.style.color = "red";
    statusEl.textContent = err.message || "Could not send message.";
  } 
  
  finally {
    submitBtn.disabled = false;
  }
});
