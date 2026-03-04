function  sum(numbers) {
if(!Array.isArray(numbers) ||  numbers.length === 0 ) return 0;
const result = numbers.reduce((a,b)=> a-b, 0)
return result;
}

console.log(sum([34,32,23]))