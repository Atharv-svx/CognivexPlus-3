const chatBox = document.getElementById("chat-box");
const input = document.getElementById("chat-input");
const sendBtn = document.getElementById("send-btn");

// ------------------------------
// ADD MESSAGE
// ------------------------------
function addMessage(role, text) {

    const div = document.createElement("div");

    div.classList.add("message", role);

    div.innerText = text || "";

    chatBox.appendChild(div);

    chatBox.scrollTop = chatBox.scrollHeight;

    return div;
}

// ------------------------------
// TYPEWRITER EFFECT
// ------------------------------
async function typeText(element, text, speed = 30) {

    element.innerText = "";

    for (let i = 0; i < text.length; i++) {

        element.innerText += text.charAt(i);

        chatBox.scrollTop = chatBox.scrollHeight;

        await new Promise(resolve =>
            setTimeout(resolve, speed)
        );
    }
}

// ------------------------------
// ENTER KEY HANDLING
// ------------------------------
input.addEventListener("keydown", (e) => {

    // Shift + Enter = new line
    if (e.key === "Enter" && e.shiftKey) {
        return;
    }

    // Enter = send
    if (e.key === "Enter") {

        e.preventDefault();

        sendMessage();
    }
});

// ------------------------------
// SEND MESSAGE
// ------------------------------
async function sendMessage() {

    const text = input.value.trim();

    if (!text) return;

    // user message
    addMessage("user", text);

    input.value = "";

    // reset textarea height
    input.style.height = "auto";

    // assistant placeholder
    const aiMsg = addMessage("assistant", "Thinking...");

    try {

        const res = await fetch(
            "https://cognivexplus-9.onrender.com/chat",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    message: text
                })
            }
        );

        const data = await res.json();

        const reply = data.reply || "No response";

        // typewriter animation
        await typeText(aiMsg, reply, 30);

    } catch (err) {

        console.error(err);

        aiMsg.innerText = "Error connecting to AI backend.";
    }

    chatBox.scrollTop = chatBox.scrollHeight;
}

// ------------------------------
// SEND BUTTON
// ------------------------------
sendBtn.addEventListener("click", sendMessage);

// ------------------------------
// AUTO RESIZE TEXTAREA
// ------------------------------
input.addEventListener("input", () => {

    input.style.height = "auto";

    input.style.height = input.scrollHeight + "px";
});