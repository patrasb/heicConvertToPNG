const { promisify } = require('util');
const fs = require('fs');
const sharp = require('sharp');
const fiveMb = 5000000;
async function resizePng (inputBuffer, i) {
    const image = await sharp(inputBuffer);
    const metadata = await image.metadata();
    console.log(metadata);
    try {
            
        // if bigger than 5 mb -> example resizing
        if(metadata.size > fiveMb){
            const diff = metadata.size / fiveMb;
            const newWidth = Math.floor(metadata.width / diff);
            const newHeight = Math.floor(metadata.height / diff);
            image.resize(newWidth, newHeight).toFile(`./resultImages/image-${i}.png`, (err, info) => {
                console.log(err);
                console.log(info);
            });
            return;
        } 
        console.log(`image #${i} successfully converted`);
        
        await promisify(fs.writeFile)(`./resultImages/image-${i}.png`, inputBuffer);
        console.log(`png image #${i} successfully saved`);
    } catch (error) {
        console.log(error);
    }
}

module.exports = resizePng;