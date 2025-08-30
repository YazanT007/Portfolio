const sections = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
});

sections.forEach((section) => observer.observe(section));


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

    statusEl.style.color = "#27a0c5";
    statusEl.textContent = "Message Sent, Thank You! I will get in touch ASAP.";
    form.reset();
  } 
  
  catch (err) {
    console.error(err);
    statusEl.style.color = "#27a0c5";
    statusEl.textContent = "Error, could not send message. Please try again.";
  } 
  
  finally {
    submitBtn.disabled = false;
  }
});
