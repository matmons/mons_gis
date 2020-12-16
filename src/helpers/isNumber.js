/**
 * This funciton takes a variable as input and returns True/False based on wether the
 * variable is a number or not. The function is used to deal with numbers camouflaged as
 * strings in data sets. 
 * @param {*} n 
 * @returns boolean
 */

const isNumber = (n) => {
    n = n.replace(',', '.');
    return !isNaN(parseFloat(n)) && isFinite(n);
}
export default isNumber;