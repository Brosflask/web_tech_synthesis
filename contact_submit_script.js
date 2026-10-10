
async function handleSubmit(event) {
  event.preventDefault();
  const btn = document.getElementById('submitBtn');
  const form = document.getElementById('contactForm');
  btn.textContent = 'Sending...';
  btn.disabled = true;
  try {
    const response = await fetch('https://formspree.io/f/xkoqnlvb', {
      method: 'POST',
      body: new FormData(form),
      headers: { 'Accept': 'application/json' }
    });
    if (response.ok) {
      form.style.display = 'none';
      document.getElementById('formSuccess').style.display = 'block';
    } else {
      throw new Error('Failed');
    }
  } catch(e) {
    document.getElementById('formError').style.display = 'block';
    btn.textContent = 'Send Message';
    btn.disabled = false;
  }
}