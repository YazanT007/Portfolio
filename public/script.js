const sections = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
});

sections.forEach((section) => observer.observe(section));

// Typing animation
const phrases = [
  "A Software Engineer specializing in web development.",
  "A Full Stack Developer passionate about creating solutions.",
  "A UI/UX Enthusiast who loves clean designs."
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeEffect() {
  const typedTextElement = document.getElementById("typed-text");
  if (!typedTextElement) return;
  
  const currentPhrase = phrases[phraseIndex];
  
  if (isDeleting) {
    typedTextElement.textContent = currentPhrase.substring(0, charIndex - 1);
    charIndex--;
    typingSpeed = 50;
  } else {
    typedTextElement.textContent = currentPhrase.substring(0, charIndex + 1);
    charIndex++;
    typingSpeed = 100;
  }
  
  if (!isDeleting && charIndex === currentPhrase.length) {
    typingSpeed = 2000;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    typingSpeed = 500;
  }
  
  setTimeout(typeEffect, typingSpeed);
}

// Start typing effect when page loads
document.addEventListener("DOMContentLoaded", () => {
  setTimeout(typeEffect, 500);
});

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
