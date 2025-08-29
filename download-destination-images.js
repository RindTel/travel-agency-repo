const https = require('https');
const fs = require('fs');
const path = require('path');

// Create images directory if it doesn't exist
const imagesDir = path.join(__dirname, 'images');
if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir);
}

// Destination images to download
const destinations = {
    'paris.jpg': 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34',
    'bali.jpg': 'https://images.unsplash.com/photo-1537996194471-e657df975ab4',
    'switzerland.jpg': 'https://images.unsplash.com/photo-1527668752968-14dc70a27c95',
    'dubai.jpg': 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c',
    'rome.jpg': 'https://images.unsplash.com/photo-1552832230-c0197dd311b5',
    'tokyo.jpg': 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf',
    'newyork.jpg': 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9',
    'santorini.jpg': 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff',
    'barcelona.jpg': 'https://images.unsplash.com/photo-1583422409516-2895a77efded',
    'sydney.jpg': 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9',
    'rio.jpg': 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325',
    'capetown.jpg': 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5'
};

// Download each image
Object.entries(destinations).forEach(([filename, url]) => {
    const filepath = path.join(imagesDir, filename);
    const file = fs.createWriteStream(filepath);

    https.get(url, response => {
        response.pipe(file);
        file.on('finish', () => {
            file.close();
            console.log(`Downloaded ${filename}`);
        });
    }).on('error', err => {
        fs.unlink(filepath, () => {});
        console.error(`Error downloading ${filename}: ${err.message}`);
    });
}); 