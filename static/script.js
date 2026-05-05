document.addEventListener('DOMContentLoaded', () => {
    const imageUploadBox = document.getElementById('image-upload-box');
    const imageUploadInput = document.getElementById('image-upload-input');
    const browseButton = document.getElementById('browse-button');
    const imagePreviewContainer = document.getElementById('image-preview-container');
    const imagePreview = document.getElementById('image-preview');
    const removeImageButton = document.getElementById('remove-image-button');
    const chatHistory = document.getElementById('chat-history');
    const questionInput = document.getElementById('question-input');
    const askButton = document.getElementById('ask-button');

    let imageBase64 = '';

    browseButton.addEventListener('click', () => imageUploadInput.click());
    imageUploadBox.addEventListener('click', () => imageUploadInput.click());

    imageUploadBox.addEventListener('dragover', (e) => {
        e.preventDefault();
        imageUploadBox.classList.add('dragover');
    });
    imageUploadBox.addEventListener('dragleave', () => {
        imageUploadBox.classList.remove('dragover');
    });
    imageUploadBox.addEventListener('drop', (e) => {
        e.preventDefault();
        imageUploadBox.classList.remove('dragover');
        const files = e.dataTransfer.files;
        if (files.length > 0) handleFile(files[0]);
    });

    imageUploadInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) handleFile(e.target.files[0]);
    });

    removeImageButton.addEventListener('click', () => {
        imageBase64 = '';
        imagePreview.src = '#';
        imagePreviewContainer.style.display = 'none';
        imageUploadBox.style.display = 'flex';
        questionInput.disabled = true;
        askButton.disabled = true;
        addMessageToChat('ai', 'Image removed. Please upload a new one to continue.');
    });

    askButton.addEventListener('click', askQuestion);
    questionInput.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') askQuestion();
    });

    function handleFile(file) {
        imagePreview.src = URL.createObjectURL(file);
        imagePreviewContainer.style.display = 'block';
        imageUploadBox.style.display = 'none';
        questionInput.disabled = false;
        askButton.disabled = false;

        const reader = new FileReader();
        reader.onload = () => {
            imageBase64 = reader.result.split(',')[1];
        };
        reader.readAsDataURL(file);

        addMessageToChat('ai', 'Image loaded! What would you like to know?');
    }

    function addMessageToChat(sender, text) {
        const messageElement = document.createElement('div');
        messageElement.classList.add(sender === 'user' ? 'user-message' : 'ai-message');
        messageElement.innerHTML = `<p>${text}</p>`;
        chatHistory.appendChild(messageElement);
        chatHistory.scrollTop = chatHistory.scrollHeight;
        return messageElement;
    }

    async function askQuestion() {
        const question = questionInput.value.trim();
        if (!imageBase64 || !question) return;

        addMessageToChat('user', question);
        questionInput.value = '';
        askButton.disabled = true;

        const loadingMessage = addMessageToChat('ai', `<div class="loading-dots"><span></span><span></span><span></span></div>`);

        try {
            const res = await fetch('/predict', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ image: imageBase64, question: question })
            });

            const data = await res.json();
            loadingMessage.innerHTML = `<p>${data.answer || data.error}</p>`;

        } catch (error) {
            loadingMessage.innerHTML = `<p>Sorry, something went wrong. Please check the server connection.</p>`;
            console.error("Error fetching prediction:", error);
        } finally {
            askButton.disabled = false;
        }
    }
});