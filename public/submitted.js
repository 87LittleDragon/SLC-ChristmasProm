const successRegister = document.getElementById('successRegister');
const ticketNumber = document.getElementById('ticketNumber');
const content = document.getElementById('content')
let success = false
console.log("test from submitted.js");

async function getTicketNumber() {
    let ticketNumberv = await fetch('/ticketNumber').then((val) => val.text());
    console.log(ticketNumberv)
    ticketNumber.textContent = ticketNumberv 
    return(ticketNumberv)
}
async function getRepeated(){
    let repeated = await fetch('/successq').then((val) => val.text());
    console.log(repeated)
    successRegister.textContent = (repeated === 'false') ? "Successfully registered" : "failed to register - repeated email address"; 
    if (repeated === 'true'){
        content.classList.add('hide')
    }
    
    
    
    return(repeated)
}
// async function getSuccess(){
//     const successq = await fetch('/successq');
//     const text = await successq.text()
//     console.log(text);
//     return(text);
// }
getTicketNumber();
getRepeated();

// console.log(getSuccess())
// successRegister.textContent = (success == 'true') ? "Successfully registered" : "failed to register - repeated email address";