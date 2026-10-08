const form = document.getElementById('registrationForm');
const registrationCard = document.getElementById('registrationCard');
const successScreen = document.getElementById('successScreen');
const welcomeName = document.getElementById('welcomeName');
const successMessage = document.getElementById('successMessage');

function el(id) { return document.getElementById(id); }

function hideSuccessScreen() {
  registrationCard.style.display = 'block';
  successScreen.style.display = 'none';
  successScreen.hidden = true;
  successMessage.style.display = 'none';
}

function showSuccessScreen(name) {
  welcomeName.textContent = name;
  registrationCard.style.display = 'none';
  successScreen.hidden = false;
  successScreen.style.display = 'flex';
  successMessage.style.display = 'none';
}

hideSuccessScreen();

function setValidState(fieldId) {
	const input = el(fieldId);
	if (!input) return;
	input.classList.remove('input-invalid');
	input.classList.add('input-valid');
	el(fieldId + 'Error').textContent = '';
}

function setInvalidState(fieldId, message) {
	const input = el(fieldId);
	if (!input) return;
	input.classList.remove('input-valid');
	input.classList.add('input-invalid');
	el(fieldId + 'Error').textContent = message;
}

function clearState(fieldId) {
	const input = el(fieldId);
	if (!input) return;
	input.classList.remove('input-valid', 'input-invalid');
	el(fieldId + 'Error').textContent = '';
}

function validateEmail(email) {
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePhone(phone) {
	const digits = phone.replace(/\D/g, '');
	return /^\d{10}$/.test(digits);
}

function validatePincode(pincode) {
	return /^\d{6}$/.test(pincode);
}

function validateField(fieldId) {
	const input = el(fieldId);
	if (!input) return true;
	const value = input.value.trim();

	switch (fieldId) {
		case 'name':
			if (!value) { setInvalidState('name', 'Please enter your name.'); return false; }
			setValidState('name'); return true;
		case 'email':
			if (!value) { setInvalidState('email', 'Please enter your email.'); return false; }
			if (!validateEmail(value)) { setInvalidState('email', 'Please enter a valid email address.'); return false; }
			setValidState('email'); return true;
		case 'phone':
			if (!value) { setInvalidState('phone', 'Please enter your phone number.'); return false; }
			if (!validatePhone(value)) { setInvalidState('phone', 'Phone number must contain 10 digits.'); return false; }
			setValidState('phone'); return true;
		case 'pincode':
			if (!value) { setInvalidState('pincode', 'Please enter your pincode.'); return false; }
			if (!validatePincode(value)) { setInvalidState('pincode', 'Pincode must be 6 digits.'); return false; }
			setValidState('pincode'); return true;
		case 'subject':
			if (!value) { setInvalidState('subject', 'Please choose a subject.'); return false; }
			setValidState('subject'); return true;
		case 'message':
			if (!value) { setInvalidState('message', 'Please enter your message.'); return false; }
			setValidState('message'); return true;
		default:
			return true;
	}
}

// Live validation on input/change
['name','email','phone','pincode','subject','message'].forEach(id => {
	const input = el(id);
	if (!input) return;
	const eventName = input.tagName.toLowerCase() === 'select' ? 'change' : 'input';
	input.addEventListener(eventName, () => validateField(id));
	input.addEventListener('blur', () => validateField(id));
});

form.addEventListener('submit', function (event) {
	event.preventDefault();
	hideSuccessScreen();

	const fields = ['name','email','phone','pincode','subject','message'];
	let isValid = true;

	fields.forEach(f => { if (!validateField(f)) isValid = false; });

	if (isValid) {
		const name = el('name').value.trim();
		showSuccessScreen(name);
	}
});

