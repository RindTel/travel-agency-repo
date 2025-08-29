const https = require('https');
const fs = require('fs');
const path = require('path');

// Create videos directory if it doesn't exist
const videosDir = path.join(__dirname, 'videos');
if (!fs.existsSync(videosDir)) {
    fs.mkdirSync(videosDir, { recursive: true });
}

// Video URL - using a completely different destination-focused travel video
const videoUrl = 'https://cdn.pixabay.com/vimeo/328240676/travel-25153.mp4?width=1280&hash=0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c';

// Download the video
console.log('Downloading completely new destination-focused travel video...');
const file = fs.createWriteStream(path.join(videosDir, 'travel-bg-new.mp4'));
https.get(videoUrl, (response) => {
    response.pipe(file);
    file.on('finish', () => {
        file.close();
        console.log('New video download completed!');
    });
}).on('error', (err) => {
    fs.unlink(path.join(videosDir, 'travel-bg-new.mp4'), () => {}); // Delete the file if there was an error
    console.error('Error downloading video:', err.message);
}); 