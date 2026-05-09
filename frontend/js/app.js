
/* ================= SIDEBAR ================= */
function toggleSidebar() {
    document.getElementById("sidebar").classList.toggle("active");
}

/* close sidebar on outside click (mobile) */
document.addEventListener("click", function (e) {
    const sidebar = document.getElementById("sidebar");
    const btn = document.querySelector(".menu-btn");

    if (window.innerWidth <= 768) {
        if (
            sidebar.classList.contains("active") &&
            !sidebar.contains(e.target) &&
            !btn.contains(e.target)
        ) {
            sidebar.classList.remove("active");
        }
    }
});

/* ================= NEW CHAT ================= */
function newChat() {
    document.getElementById("chat-area").innerHTML = "";
    addMessage("bot", "New chat started ??");
}

/* ================= SEND MESSAGE ================= */
function sendMessage() {
    const input = document.getElementById("user-input");
    const text = input.value.trim();

    if (!text) return;

    addMessage("user", text);

    input.value = "";
    autoResize();

    setTimeout(() => {
        addMessage("bot", "I received: " + text);
    }, 400);
}

/* ================= ADD MESSAGE ================= */
function addMessage(type, text) {
    const chat = document.getElementById("chat-area");

    const msg = document.createElement("div");
    msg.classList.add("message", type);

    const bubble = document.createElement("div");
    bubble.classList.add("bubble");
    bubble.textContent = text;

    msg.appendChild(bubble);
    chat.appendChild(msg);

    chat.scrollTop = chat.scrollHeight;
}

/* ================= SEND BUTTON ================= */
document.getElementById("send-btn").addEventListener("click", sendMessage);

/* ================= INPUT AUTO RESIZE ================= */
const input = document.getElementById("user-input");

function autoResize() {
    input.style.height = "auto";
    input.style.height = Math.min(input.scrollHeight, 140) + "px";
}

input.addEventListener("input", autoResize);

/* ================= MOBILE DETECT ================= */
function isMobile() {
    return window.innerWidth <= 768;
}

/* ================= KEYBOARD HANDLING ================= */
input.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {

        if (isMobile()) {
            return; // mobile = newline only
        }

        if (!e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    }
});