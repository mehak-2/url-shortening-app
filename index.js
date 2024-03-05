
async function shortenLink() {
    const input = document.getElementById('search-input');
    const url = input.value;
    const apiUrl = `https://tinyurl.com/api-create.php?url=${url}`;

    try {
        const response = await fetch(apiUrl);
        if (response.ok) {
            const shortUrl = await response.text();
            displayShortenedLink(url, shortUrl);
        } else {
            alert('Failed to shorten URL');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred, please try again');
    }
}

function displayShortenedLink(originalUrl, shortUrl) {
    const container = document.getElementById('shortened-links');
    const linkElement = document.createElement('div');
    linkElement.classList.add('link'); // Add a class to the div
    linkElement.innerHTML = `
        <p><strong>Original URL:</strong> ${originalUrl}</p>
        <p><strong>Shortened URL:</strong> ${shortUrl}</p>
        <button onclick="copyToClipboard(this, '${shortUrl}')">Copy</button>
    `;
    container.appendChild(linkElement);
}


function copyToClipboard(button, text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    button.innerText = 'Copied';
    button.disabled = true;
}