const { promisify } = require('util');
const fs = require('fs');
const convert = require('heic-convert');
const heicImages = './heicImages/';
const imgNames = [];
fs.readdirSync(heicImages).forEach( (file) => {
    imgNames.push(file);
});

const main = async () => {
  console.log('starting the conversion');
  try {
    for(let i = 0; i< imgNames.length; i++){
      console.log('converting image: #',i);
      let img = imgNames[i];
      const inputBuffer =  await promisify(fs.readFile)(`./heicImages/${img}`);
      console.log(`image #${i} successfully inputed`);
      const outputBuffer = await convert({
        buffer: inputBuffer, // the HEIC file buffer
        format: 'PNG',      // output format
      });
      console.log(`image #${i} successfully converted`);
      
      await promisify(fs.writeFile)(`./resultImages/image-${i}.png`, outputBuffer);
      console.log(`png image #${i} successfully saved`);
    }
  } catch (error) {
    console.log(error);
  }
}

main();