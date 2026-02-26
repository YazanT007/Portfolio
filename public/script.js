const sections = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
});

sections.forEach((section) => observer.observe(section));

// Initialize EmailJS
emailjs.init('rqEN3DP3j_qbQXZ5l');

const form = document.getElementById("contact-form");
const statusEl = document.getElementById("form-status");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  statusEl.textContent = "";
  const submitBtn = form.querySelector(".send-btn");
  submitBtn.disabled = true;

  const templateParams = {
    from_name: form.name.value.trim(),
    from_email: form.email.value.trim(),
    message: form.message.value.trim()
  };

  try {
    await emailjs.send('service_lg1n9jf', 'template_v27mipo', templateParams);
    
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
