---
title: Contact
description: Get in touch.
layout: page
---

# Connect
I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.

<div class="contact-grid">
<a href="mailto:shehab@ashmod.dev" class="contact-card">
<i class="fas fa-envelope"></i>
<span>shehab@ashmod.dev</span>
</a>
<a href="https://github.com/ashmod" target="_blank" class="contact-card">
<i class="fab fa-github"></i>
<span>@ashmod</span>
</a>
<a href="https://www.x.com/shehabtweets" target="_blank" class="contact-card">
<i class="fab fa-x-twitter"></i>
<span>@shehabtweets</span>
</a>
<a href="https://www.linkedin.com/in/ShehabMahmoud" target="_blank" class="contact-card">
<i class="fab fa-linkedin"></i>
<span>Shehab Mahmoud</span>
</a>
</div>

## Send a Message
<form action="https://api.web3forms.com/submit" method="POST" id="contact-form" class="contact-form">
<input type="hidden" name="access_key" value="0c92db70-79b4-4ced-8ce3-1c1d96e0335a">

<input type="checkbox" name="botcheck" class="hidden" style="display: none;">
<input type="hidden" name="from_name" value="Portfolio Contact Form">
<input type="hidden" name="subject" value="New Contact Form Message from Portfolio">

<div class="form-group">
<label for="name" class="form-label">Name</label>
<input type="text" id="name" name="name" class="form-input" required placeholder="John Doe">
</div>

<div class="form-group">
<label for="email" class="form-label">Email</label>
<input type="email" id="email" name="email" class="form-input" required placeholder="john@example.com">
</div>

<div class="form-group">
<label for="subject-input" class="form-label">Subject</label>
<div class="custom-select-wrapper" id="custom-select">
    <div class="custom-select-trigger">
        <span id="select-value">Select a topic</span>
        <i class="fas fa-chevron-down"></i>
    </div>
    <div class="custom-options">
        <span class="custom-option" data-value="collaboration">Collaboration</span>
        <span class="custom-option" data-value="project">Project Inquiry</span>
        <span class="custom-option" data-value="feedback">Feedback</span>
        <span class="custom-option" data-value="general">General Question</span>
        <span class="custom-option" data-value="other">Other</span>
    </div>
    <input type="hidden" id="subject-input" name="subject" required>
</div>
</div>

<div class="form-group">
<label for="message" class="form-label">Message</label>
<textarea id="message" name="message" class="form-textarea" rows="6" required placeholder="What's cookin' good lookin'?"></textarea>
</div>

<button type="submit" class="submit-btn">
<span id="btn-text">[ TRANSMIT ]</span>
</button>

<div id="form-result" class="form-result"></div>
</form>

<script>
const form = document.getElementById('contact-form');
const result = document.getElementById('form-result');
const btnText = document.getElementById('btn-text');

const selectWrapper = document.getElementById('custom-select');
const selectTrigger = selectWrapper.querySelector('.custom-select-trigger');
const selectValue = document.getElementById('select-value');
const selectOptions = selectWrapper.querySelector('.custom-options');
const hiddenInput = document.getElementById('subject-input');

selectTrigger.addEventListener('click', () => {
    selectWrapper.classList.toggle('open');
});

selectWrapper.querySelectorAll('.custom-option').forEach(option => {
    option.addEventListener('click', function() {
        selectValue.textContent = this.textContent;
        hiddenInput.value = this.getAttribute('data-value');
        selectWrapper.classList.remove('open');
        selectWrapper.querySelectorAll('.custom-option').forEach(opt => opt.classList.remove('selected'));
        this.classList.add('selected');
    });
});

document.addEventListener('click', (e) => {
    if (!selectWrapper.contains(e.target)) {
        selectWrapper.classList.remove('open');
    }
});


form.addEventListener('submit', function(e) {
    if (!hiddenInput.value) {
        e.preventDefault();
        alert("Please select a subject.");
        return;
    }

    e.preventDefault();
    const formData = new FormData(form);
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    btnText.innerHTML = "[ TRANSMITTING... ]";
    result.style.display = "none";

    fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: json
    })
    .then(async (response) => {
        let json = await response.json();
        if (response.status == 200) {
            result.innerHTML = "> SUCCESS: Message transmitted.<br>> ACKOWLEDGED.";
            result.classList.add('success');
            result.style.display = "block";
            btnText.innerHTML = "[ TRANSMIT ]";
            form.reset();
            selectValue.textContent = "Select a topic";
            hiddenInput.value = "";
        } else {
            console.log(response);
            result.innerHTML = "> ERROR: Transmission failed.<br>> " + json.message;
            result.classList.add('error');
            result.style.display = "block";
            btnText.innerHTML = "[ RETRY ]";
        }
    })
    .catch(error => {
        console.log(error);
        result.innerHTML = "> ERROR: Connection lost.";
        result.style.display = "block";
        btnText.innerHTML = "[ RETRY ]";
    });
});
</script>
