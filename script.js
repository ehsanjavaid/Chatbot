// const chatBox = document.getElementById("chat-box")
// const userInput = document.getElementById("user-input")
// const sendBtn = document.getElementById("send-btn")

// sendBtn.addEventListener("click", sendMessage)

// userInput.addEventListener("keypress", (e) => {
//     if (e.key === "Enter") sendMessage();
// });

// function sendMessage() {
//     const message = userInput.value.trim();
//     if (message === "") return;
//     appendMessage("user", message);
//     userInput.value = "";

//     setTimeout(() => {
//         const reply = botReply(message);
//         appendMessage("bot", reply)
//     }, 500)
// }

// function appendMessage(sender, text) {
//     const msg = document.createElement("div")
//     msg.classList.add("message", sender);
//     msg.textContent = text
//     chatBox.appendChild(msg)
//     chatBox.scrollTop = chatBox.scrollHeight
// }
// import { GoogleGenAI } from "@google/genai";

// const ai = new GoogleGenAI({});

// async function botReply() {
//     const response = await ai.models.generateContent({
//         model: "gemini-2.5-flash",
//         contents: "Explain how AI works in a few words",
//         config: {
//             thinkingConfig: {
//                 thinkingBudget: 0, // Disables thinking
//             },
//         }
//     });
//     console.log(response.text);
// }

// await botReply();

// function botReply(msg) {
//     msg = msg.toLowerCase();
//     if (msg.includes('hello') || msg.includes('hi')) {
//         return "Hello How can I help you?";
//     }
//     else if (msg.includes('How are you')) {
//         return "I'm just a bot, but I'm doing great! 😄"
//     }
//     else if(msg.includes('by')){
//         return "Goodby!"
//     }
//     else {
//         return "I don't understand, can you rephrase?"
//     }
// }
import { GoogleGenerativeAI } from "https://esm.run/@google/generative-ai";

const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");

// Initialize AI client
const genAI = new GoogleGenerativeAI("AIzaSyDUDhSWQqcN8u6t0tE7VRu4SDaklCKJlj0"); // put your API key here

sendBtn.addEventListener("click", sendMessage);

userInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") sendMessage();
});

async function sendMessage() {
    const message = userInput.value.trim();
    if (message === "") return;
    appendMessage("user", message);
    userInput.value = "";

    const reply = await botReply(message);
    appendMessage("bot", reply);
}

function appendMessage(sender, text) {
    const msg = document.createElement("div");
    msg.classList.add("message", sender);
    msg.textContent = text;
    chatBox.appendChild(msg);
    chatBox.scrollTop = chatBox.scrollHeight;
}

async function botReply(userMessage) {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
        const result = await model.generateContent(userMessage);
        const response = await result.response;
        return response.text() || "Sorry, I couldn't generate a reply.";
    } catch (error) {
        console.error(error);
        return "Oops! Something went wrong.";
    }
}
