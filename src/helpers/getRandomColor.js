/**
 * Returns a random combination of 6 letters or numbers that make up a hex-color.
 */
const getRandomColor = () => {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
export default getRandomColor;