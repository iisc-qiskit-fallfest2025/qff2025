// Countdown Timer
const targetDate = new Date("October 28, 2025 00:00:00").getTime();

function updateCountdown() {
  const countdownElement = document.getElementById("countdown");
  
  // Check if countdown elements exist (they only exist on index.html)
  if (!countdownElement) {
    return;
  }
  
  const now = new Date().getTime();
  const diff = targetDate - now;

  if (diff <= 0) {
    countdownElement.innerText = "The Fest Has Started!";
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  const daysEl = document.getElementById("days");
  const hoursEl = document.getElementById("hours");
  const minutesEl = document.getElementById("minutes");
  const secondsEl = document.getElementById("seconds");
  
  if (daysEl) daysEl.innerText = days;
  if (hoursEl) hoursEl.innerText = hours;
  if (minutesEl) minutesEl.innerText = minutes;
  if (secondsEl) secondsEl.innerText = seconds;
}

setInterval(updateCountdown, 1000);
updateCountdown();

// Mobile Navigation Toggle
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

// Certificate Generation
const CERTIFICATE_API_URL = 'https://certificate-generator-916823407631.us-central1.run.app';

// Registration verification is handled by registration-check.js
// Use window.RegistrationChecker.isEmailRegistered(email) to check registration

const certBtn = document.getElementById("cert-btn");
const certEmailInput = document.getElementById("cert-email");
const certMsg = document.getElementById("cert-msg");
const certModal = document.getElementById("cert-modal");
const certPreview = document.getElementById("cert-preview");
const errorModal = document.getElementById("error-modal");
const modalClose = document.getElementById("modal-close");
const modalCancel = document.getElementById("modal-cancel");
const modalDownload = document.getElementById("modal-download");
const errorModalClose = document.getElementById("error-modal-close");

let currentCertificateBlob = null;
let currentEmail = "";

if (certBtn && certEmailInput && certMsg) {
  certBtn.addEventListener("click", async () => {
    const email = certEmailInput.value.trim();
    
    // Validate email
    if (!email) {
      showCertMessage("Please enter your email address.", "error");
      return;
    }
    
    if (!isValidEmail(email)) {
      showCertMessage("Please enter a valid email address.", "error");
      return;
    }
    
    // Disable button and show loading
    certBtn.disabled = true;
    certBtn.textContent = "Loading...";
    showCertMessage("Verifying registration...", "info");
    currentEmail = email;
    
    try {
      // Check if email is registered
      const isRegistered = await window.RegistrationChecker.isEmailRegistered(email);
      
      if (!isRegistered) {
        showCertMessage("❌ Email not registered! Please register for QFF 2025 first to receive a certificate. If you have already registered, please use the same email address.", "error");
        certBtn.disabled = false;
        certBtn.textContent = "View Certificate";
        return;
      }
      
      showCertMessage("Generating certificate...", "info");
      
      // The backend now automatically checks winner status and generates the appropriate certificate
      // We just need to request participation type and the backend handles the rest
      const response = await fetch(CERTIFICATE_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          type: 'participation'
        }),
      });
      
      if (response.ok) {
        // Get the PDF blob
        const blob = await response.blob();
        currentCertificateBlob = blob;
        
        // Create blob URL for preview
        const blobUrl = window.URL.createObjectURL(blob);
        certPreview.src = blobUrl;
        
        // Show modal
        certModal.classList.add("active");
        showCertMessage("", "");
      } else {
        const errorData = await response.json();
        if (response.status === 404) {
          // Show error modal
          showErrorModal();
        } else {
          showCertMessage(`❌ Error: ${errorData.error || "Failed to generate certificate"}`, "error");
        }
      }
    } catch (error) {
      console.error("Certificate generation error:", error);
      showCertMessage("❌ An error occurred. Please try again later or contact the organisers.", "error");
    } finally {
      // Re-enable button
      certBtn.disabled = false;
      certBtn.textContent = "View Certificate";
    }
  });
  
  // Allow Enter key to submit
  certEmailInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      certBtn.click();
    }
  });
}

// Modal close handlers
if (modalClose) {
  modalClose.addEventListener("click", closeModal);
}

if (modalCancel) {
  modalCancel.addEventListener("click", closeModal);
}

if (errorModalClose) {
  errorModalClose.addEventListener("click", closeErrorModal);
}

// Download certificate from modal
if (modalDownload) {
  modalDownload.addEventListener("click", () => {
    if (currentCertificateBlob && currentEmail) {
      const url = window.URL.createObjectURL(currentCertificateBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${currentEmail}_participation_certificate.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      
      showCertMessage("✅ Certificate downloaded successfully!", "success");
      closeModal();
      certEmailInput.value = ""; // Clear the input
    }
  });
}

// Close modal when clicking outside
if (certModal) {
  certModal.addEventListener("click", (e) => {
    if (e.target === certModal) {
      closeModal();
    }
  });
}

if (errorModal) {
  errorModal.addEventListener("click", (e) => {
    if (e.target === errorModal) {
      closeErrorModal();
    }
  });
}

function closeModal() {
  if (certModal) {
    certModal.classList.remove("active");
    if (certPreview.src) {
      window.URL.revokeObjectURL(certPreview.src);
      certPreview.src = "";
    }
  }
}

function closeErrorModal() {
  if (errorModal) {
    errorModal.classList.remove("active");
  }
}

function showErrorModal() {
  if (errorModal) {
    errorModal.classList.add("active");
  }
  showCertMessage("", "");
}

function showCertMessage(message, type) {
  certMsg.textContent = message;
  certMsg.className = "";
  
  if (type === "success") {
    certMsg.style.color = "#155724";
    certMsg.style.backgroundColor = "#d4edda";
    certMsg.style.border = "1px solid #c3e6cb";
  } else if (type === "error") {
    certMsg.style.color = "#721c24";
    certMsg.style.backgroundColor = "#f8d7da";
    certMsg.style.border = "1px solid #f5c6cb";
  } else if (type === "info") {
    certMsg.style.color = "#0c5460";
    certMsg.style.backgroundColor = "#d1ecf1";
    certMsg.style.border = "1px solid #bee5eb";
  }
  
  if (message) {
    certMsg.style.padding = "0.75rem";
    certMsg.style.borderRadius = "6px";
    certMsg.style.marginTop = "1rem";
  } else {
    certMsg.style.padding = "0";
    certMsg.style.border = "none";
    certMsg.style.backgroundColor = "transparent";
  }
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}