const svg2img = require('svg2img');
const { loadImage } = require('canvas');

module.exports = async (Settings, svg) => {
    return new Promise((resolve, reject) => {

        // changeColors
        Object.entries({ "--color1--": Settings.color1 ?? "#0A7F8B", "--color2--": Settings.color2 ?? "#D9D9D9" }).forEach(([key, value]) => svg = svg.replace(new RegExp(`\\${key}`, 'g'), value));

        // Convert to Buffer
        svg2img(svg, function (error, buffer) {
            if (error)
                return reject(error);

            loadImage(buffer).then(image => resolve(image)).catch(err => reject(err))
        })
    });
};
