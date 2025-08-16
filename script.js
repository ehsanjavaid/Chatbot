
import { GoogleGenerativeAI } from "https://esm.run/@google/generative-ai";

const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");

// Initialize AI client
const genAI = new GoogleGenerativeAI("process.env.OPENAI_API_KEY"); // put your API key here

sendBtn.addEventListener("click", sendMessage);

userInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") sendMessage();
});

async function sendMessage() {
    const message = userInput.value.trim();
    if (message === "") return;
    appendMessage("user", message);
    userInput.value = "";
    // / Show typing dots
    const typingEl = appendTyping();

    try {
        const reply = await botReply(message);
        typingEl.remove(); // remove dots
        appendMessage("bot", reply);
    } catch (error) {
        typingEl.remove();
        appendMessage("bot", "⚠️ Oops! Something went wrong. Please try again.");
        console.error(error);
    }

}

function appendMessage(sender, text) {
    const msg = document.createElement("div");
    msg.classList.add("message", sender);

    // Use markdown parsing for bot messages
    if (sender === "bot") {
        msg.innerHTML = marked.parse(text);
    } else {
        msg.textContent = text; // keep user messages plain
    }

    chatBox.appendChild(msg);
    chatBox.scrollTop = chatBox.scrollHeight;
}


function appendTyping() {
    const typing = document.createElement("div");
    typing.classList.add("message", "bot");

    const dots = document.createElement("div");
    dots.classList.add("typing-dots");
    dots.innerHTML = "<span></span><span></span><span></span>";

    typing.appendChild(dots);
    chatBox.appendChild(typing);
    chatBox.scrollTop = chatBox.scrollHeight;
    return typing;
}
async function botReply(userMessage) {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
        const result = await model.generateContent(
            `Reply in clean Markdown format. Use short paragraphs, bullet points, and bold text when helpful.\n\nUser: ${userMessage}`
        );
        const response = await result.response;
        return response.text() || "Sorry, I couldn't generate a reply.";
    } catch (error) {
        console.error(error);
        return "Oops! Something went wrong.";
    }
}
