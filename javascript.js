const API_KEY = 'AIzaSyDRqijm3W_QqGNLKXn2oVvM7fPjvL1BKs8';
const FOLDER_ID = '1-Tgva4azEJF2kHLJdQSp_aW_CM-UINvY';

async function loadImages() {
    const gallery = document.getElementById('gallery');
    
    try {
        const query = `'${FOLDER_ID}' in parents and (mimeType contains 'image/')`;
        const url = `https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(query)}&key=${API_KEY}&fields=files(id)&pageSize=100`;
        
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.error) throw new Error(data.error.message);
        
        const files = data.files || [];
        
        let html = '';
        for (const file of files) {
            html += `<img src="https://drive.google.com/thumbnail?id=${file.id}&sz=w500" loading="lazy">`;
        }
        
        gallery.innerHTML = html;
        
    } catch (error) {
        gallery.innerHTML = `<div class="loading">nah : ${error.message}</div>`;
    }
}

loadImages();