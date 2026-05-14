  async function handleSubmit(e) {
    e.preventDefault();
    const form = document.getElementById('commissionForm');
    const success = document.getElementById('formSuccess');
    const btn = form.querySelector('.btn-submit');

    const required = form.querySelectorAll('[required]');
    let valid = true;
    required.forEach(el => {
      if (!el.value.trim()) { el.style.borderBottomColor = '#888'; valid = false; }
      else { el.style.borderBottomColor = ''; }
    });
    if (!valid) return;

    btn.textContent = 'Sending…';
    btn.disabled = true;

    const data = {
      access_key: '64a64759-0ab3-49b6-bd78-2a879fb01e5d',
      subject: 'New Trauern Commission Application',
      from_name: 'Trauern Commissions',
      first_name: document.getElementById('firstName').value,
      last_name: document.getElementById('lastName').value,
      email: document.getElementById('email').value,
      nationality: document.getElementById('nationality').value,
      role: document.getElementById('role').value,
      experience: document.getElementById('experience').value,
      portfolio: document.getElementById('portfolio').value,
      statement: document.getElementById('statement').value,
    };

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(data)
      });
      const json = await res.json();
      if (json.success) {
        form.style.opacity = '0';
        form.style.transition = 'opacity 0.4s';
        setTimeout(() => { form.style.display = 'none'; success.classList.add('visible'); }, 400);
      } else {
        btn.textContent = 'Submit Application';
        btn.disabled = false;
        alert('Something went wrong. Please try again.');
      }
    } catch (err) {
      btn.textContent = 'Submit Application';
      btn.disabled = false;
      alert('Network error. Please check your connection and try again.');
    }
  }
