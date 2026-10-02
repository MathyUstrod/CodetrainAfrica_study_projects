// document.body.innerHTML = "<h1>Hello, World!</h1>";

// document.body.innerHTML = "Hello, JavaScript!";

// get elements by ID and change their content

// document.getElementById("title").innerText = "My JavaScript Journey";

// document.getElementById("title").innerHTML = "Hello DOM!";

// document.getElementById("description").innerHTML = "This is a simple example of DOM manipulation using JavaScript.";

// get elements by class name and change their content
document.getElementsByClassName("highlight")[0].innerHTML = "This is a modified highlighted paragraph.";
document.getElementsByClassName("highlight1")[0].innerHTML = "This is also a modified highlighted paragraph.";
// document.getElementsByClassName("highlight2")[0].innerHTML = "This content has been changed.";


// assign the element to a variable and then change its content
let changeName = document.getElementsByClassName("highlight2")[0];

changeName.innerHTML = "My shiny new content";

// get elements by tag name and change their style
document.getElementsByTagName("p")[0].style.color = "blue";
// document.getElementsByTagName("h1")[0].innerHTML = "Welcome to DOM manipulation in JS!!";

const heading = document.getElementsByTagName("h1")[0];

heading.innerHTML = "Welcome to DOM manipulation in JS!!!";

// Styling HTML elements using JavaScript
heading.style.color = "red";
heading.style.fontFamily = "Arial";
heading.style.textAlign = "center";
heading.style.backgroundColor = "lightgray";
heading.style.padding = "10px";
heading.style.border = "2px solid black";
heading.style.borderRadius = "10px";

const page = document.body;
page.style.fontFamily = "Arial";
page.style.padding = "10px";

let paragraphs = document.getElementsByTagName("p");

for (let i=0; i<paragraphs.length; i++) {
    if(i%2==0){
        paragraphs[i].style.color = "green";
    } else {
        paragraphs[i].style.color = "red";
    }
}

