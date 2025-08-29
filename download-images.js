const https = require('https');
const fs = require('fs');
const path = require('path');

// Create images directory if it doesn't exist
const imagesDir = path.join(__dirname, 'images');
if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir);
}

// Image URLs (using Unsplash images)
const images = {
    'hero-bg.jpg': 'https://images.unsplash.com/photo-1469474968028-56623f02e42e',
    'paris.jpg': 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34',
    'bali.jpg': 'https://images.unsplash.com/photo-1537996194471-e657df975ab4',
    'switzerland.jpg': 'https://images.unsplash.com/photo-1527668752968-14dc70a27c95',
    'dubai.jpg': 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c',
    'rome.jpg': 'https://images.unsplash.com/photo-1552832230-c0197dd311b5',
    'tokyo.jpg': 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf'
};

// Download function
function downloadImage(url, filename) {
    return new Promise((resolve, reject) => {
        const filepath = path.join(imagesDir, filename);
        const file = fs.createWriteStream(filepath);

        https.get(url, response => {
            response.pipe(file);
            file.on('finish', () => {
                file.close();
                console.log(`Downloaded ${filename}`);
                resolve();
            });
        }).on('error', err => {
            fs.unlink(filepath, () => reject(err));
        });
    });
}

// Download all images
async function downloadAllImages() {
    try {
        for (const [filename, url] of Object.entries(images)) {
            await downloadImage(url, filename);
        }
        console.log('All images downloaded successfully!');
    } catch (error) {
        console.error('Error downloading images:', error);
    }
}

downloadAllImages(); 