document.addEventListener('DOMContentLoaded', (event) => {
    const contactform = document.getElementById('contactform');
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const contactNumber = document.getElementById('contactNumber');
    const message = document.getElementById('message');
    const submitBtn = document.getElementById('submitBtn');
    const spinner = document.getElementById('spinner');
    const messageStatus = document.getElementById('messageStatus');

    contactform.addEventListener('submit', (e) => {
        e.preventDefault();

        // Show spinner and disable submit button
        spinner.style.display = 'block';
        submitBtn.disabled = true;

        // Validate email format
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email.value)) {
            showMessage('Please enter a valid email address.', 'error');
            spinner.style.display = 'none';
            submitBtn.disabled = false;
            return;
        }

        // Validate contact number format
        const contactNumberPattern = /^07\d{8}$/;
        if (!contactNumberPattern.test(contactNumber.value)) {
            showMessage('Please enter a valid contact number starting with "07" and followed by 8 digits.', 'error');
            spinner.style.display = 'none';
            submitBtn.disabled = false;
            return;
        }

        let formdata = {
            name: name.value,
            email: email.value,
            contactNumber: contactNumber.value,
            message: message.value
        };

        let xhr = new XMLHttpRequest();
        xhr.open('POST', '/');
        xhr.setRequestHeader('content-type', 'application/json');
        xhr.onload = function () {
            console.log(xhr.responseText);
            if (xhr.responseText == 'success') {
                showMessage('Message sent successfull', 'success');
                name.value = '';
                email.value = '';
                contactNumber.value = '';
                message.value = '';
            } else {
                showMessage('Something went wrong', 'error');
            }
            // Hide spinner and enable submit button
            spinner.style.display = 'none';
            submitBtn.disabled = false;
        };
        xhr.send(JSON.stringify(formdata));
    });

    // Function to show message
    function showMessage(msg, type) {
        messageStatus.textContent = msg;
        messageStatus.className = type + '-message'; // Add appropriate class for styling
    }
});
