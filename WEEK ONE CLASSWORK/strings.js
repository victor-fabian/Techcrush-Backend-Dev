const myName = "ViCtOr FaBiAn"

console.log(myName.toLowerCase()); // victor fabian
console.log(myName.toUpperCase()); // VICTOR FABIAN

function lowerMe(value) {
    return value.toLowerCase();
}

console.log(lowerMe(myName));

const trimExample = "   Hello World!   ";
console.log(trimExample.trim()); // "Hello World!"
console.log(trimExample.trimStart()); // "Hello World!   "
console.log(trimExample.trimEnd()); // "   Hello World!"

let filename = "report_final_2024.pdf";

console.log(filename.startsWith("report")); // true
console.log(filename.startsWith("draft"));  // false
console.log(filename.endsWith(".pdf"));     // true
console.log(filename.endsWith(".docx"));    // false


const extractExample = "Victor"
console.log(extractExample.slice(0, 3)); // "Vic"
console.log(extractExample.slice(3));    // "tor"
console.log(extractExample.slice(-3));  // "tor"
console.log(extractExample.substring(0, 3)); // "Vic"
console.log(extractExample.substring(3));    // "tor"
console.log(extractExample.substring(-3));  // "Victor" (negative index treated as 0)


//replace and the replaceAll
const stringText = "Victor enjoys backend development, Victor writes JavaScript, and Victor builds APIs"
console.log(stringText.replace("Victor", "He"))
console.log(stringText.replaceAll("Victor", "He"))
let splittedText = stringText.split(",")
console.log(splittedText[1].replaceAll("Victor", "He"))

//reverse
let panlindrome = "madam"
let reversed = panlindrome.split("").reverse().join("")
console.log(reversed)

function wordCheck(word) {
    return word === word.split("").reverse().join("").toLowerCase() ? "Yes it is a palindrome" : "No it is not a palindrome"
}

console.log(wordCheck("victor"))
