let changeBtn = document.querySelector("#changeBtn");
let oldTitle = document.querySelector("#title");
let newTitle = "You're Welcome to Codetrain Africa!";

changeBtn.addEventListener("click", ()=>{
    oldTitle.textContent = newTitle;
});

// Secret message
let toggleBtn = document.querySelector("#toggleBtn");
let message = document.querySelector("#message");

toggleBtn.addEventListener("click", ()=>{
    if(message.hasAttribute("hidden")){
        message.removeAttribute("hidden");
        toggleBtn.textContent = "Hide Message";
    } else {
        message.setAttribute("hidden", "");
        toggleBtn.textContent = "Show Message";
    }
});

//Like Btn
let likeBtn = document.querySelector("#likeBtn");
let likeCount = document.querySelector("#likeCount");
let likeMsg = document.querySelector("#likeMsg");

let counter = likeCount.textContent;

likeBtn.addEventListener("click", ()=>{
    
    likeCount.textContent = ++counter;
    if(counter === 1){
        likeMsg.textContent = "Like";
    } else if (counter > 1 || counter === 0){
        likeMsg.textContent = "Likes";
    }
});