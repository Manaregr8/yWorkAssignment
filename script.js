document.addEventListener("DOMContentLoaded", function () {
    const users = [
        {
            name: "Emma Thompson",
            initials: "ET",
            lastActive: "12:43PM",
            lastMessage: "Dummy bot reply using JavaScript (predefined or random responses)",
            gradientColors: ["#a18cd1", "#fbc2eb", "#7b4397"]
        },
        {
            name: "John Doe",
            initials: "JD",
            lastActive: "11:10AM",
            lastMessage: "Hey there! Are you available for the meeting?",
            gradientColors: ["#89f7fe", "#66a6ff", "#1e3c72"]
        },
        {
            name: "Alice Johnson",
            initials: "AJ",
            lastActive: "Yesterday",
            lastMessage: "Let’s catch up soon!",
            gradientColors: ["#fbc2eb", "#a6c1ee", "#f9d29d"]
        },
    ];

    let currentUser = users[0];

    function updateMainProfile(user) {
        currentUser = user;

        const mainDp = document.getElementById("mainDp");
        const mainName = document.getElementById("mainName");
        const mainStatus = document.getElementById("mainStatus");

        if (mainDp && mainName && mainStatus) {
            mainDp.innerHTML = `<span>${user.initials}</span>`;
            mainDp.style.background = `linear-gradient(135deg, ${user.gradientColors.join(", ")})`;
            mainName.innerText = user.name;
            mainStatus.innerText = "Online";
        }
    }

    function renderProfiles() {
        const container = document.getElementById('profilesContainer');
        container.innerHTML = "";

        users.forEach((user, index) => {
            const profileCard = document.createElement("div");
            profileCard.className = "profilesCard";
            if (index === 0) profileCard.classList.add("activebutton");

            profileCard.innerHTML = `
                <div class="ProfilesDp">
                    <span>${user.initials}</span>
                </div>
                <div class="profileData">
                    <div class="profileInfo">
                        <h3>${user.name}</h3>
                        <p class="lastActive">${user.lastActive}</p>
                    </div>
                    <div class="profilelastMessage">${user.lastMessage}</div>
                </div>
            `;

            const profileDp = profileCard.querySelector(".ProfilesDp");
            profileDp.style.background = `linear-gradient(135deg, ${user.gradientColors.join(", ")})`;

            profileCard.addEventListener("click", () => {
                document.querySelectorAll(".profilesCard").forEach(card => card.classList.remove("activebutton"));
                profileCard.classList.add("activebutton");

                updateMainProfile(user);

                if (window.innerWidth < 763) {
                    document.querySelector(".mainContainer").classList.add("active");
                }
            });

            container.appendChild(profileCard);
        });
    }

    function addMessageToChat(sender, message) {
        const chatBox = document.getElementById("chatBox");
        const messageDiv = document.createElement("div");
        messageDiv.className = sender === "me" ? "myMessage" : "aiMessage";
        messageDiv.innerText = message;
        chatBox.appendChild(messageDiv);
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    function sendMessage() {
        const input = document.getElementById("messageInput");
        const message = input.value.trim();
        if (message === "") return;

        addMessageToChat("me", message);
        input.value = "";

        const Replies = [
            "That's interesting!",
            "Can you tell me more?",
            "Sure, I'll look into it.",
            "Thanks for the update!",
            "Got it!"
        ];
        const reply = Replies[Math.floor(Math.random() * Replies.length)];

        let dots = 0;
        const mainStatus = document.getElementById("mainStatus");
        mainStatus.innerText = "Typing";
        const typingInterval = setInterval(() => {
            dots = (dots + 1) % 4;
            mainStatus.innerText = "Typing" + ".".repeat(dots);
        }, 400);

        const delay = Math.max(800, reply.length * 60);
        setTimeout(() => {
            clearInterval(typingInterval);
            mainStatus.innerText = "Online";
            addMessageToChat("ai", reply);
        }, delay);
    }

    document.getElementById("sendBtn").addEventListener("click", sendMessage);
    document.getElementById("messageInput").addEventListener("keydown", (e) => {
        if (e.key === "Enter") sendMessage();
    });

    document.getElementById("backBtn").addEventListener("click", () => {
        document.querySelector(".mainContainer").classList.remove("active");
        updateMainProfile(users[0]);
    });

    renderProfiles();
    updateMainProfile(users[0]);
});
