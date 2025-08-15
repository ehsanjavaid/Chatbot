const chatBox = document.getElementById("chat-box")
const userInput = document.getElementById("user-input")
const sendBtn = document.getElementById("send-btn")

sendBtn.addEventListener("click", sendMessage)

userInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") sendMessage();
});

function sendMessage() {
    const message = userInput.value.trim();
    if (message === "") return;
    appendMessage("user", message);
    userInput.value = "";

    setTimeout(() => {
        const reply = botReply(message);
        appendMessage("bot", reply)
    }, 500)
}

function appendMessage(sender, text) {
    const msg = document.createElement("div")
    msg.classList.add("message", sender);
    msg.textContent = text
    chatBox.appendChild(msg)
    chatBox.scrollTop = chatBox.scrollHeight
}

function botReply(msg) {
    msg = msg.toLowerCase();
    if (msg.includes('hello') || msg.includes('hi')) {
        return "Hello How can I help you?";
    }
    else if (msg.includes('How are you')) {
        return "I'm just a bot, but I'm doing great! 😄"
    }
    else if(msg.includes('by')){
        return "Goodby!"
    }
    else {
        return "I don't understand, can you rephrase?"
    }
}