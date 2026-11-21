
const candidates = [
    "Alex Johnson",
    "Mary Smith",
    "David Brown"
];

// Demonstration results only.
// These values are not verified election results.
let votes = {
    "Alex Johnson": 0,
    "Mary Smith": 0,
    "David Brown": 0
};

let hasVoted = sessionStorage.getItem("hasVoted") === "true";

// MOBILE MENU
function toggleMenu() {
    document.getElementById("navLinks")
        .classList.toggle("active");
}

// VOTING
document.getElementById("votingForm")
.addEventListener("submit", function(event) {
    event.preventDefault();

    const message = document.getElementById("voteMessage");

    if (hasVoted) {
        message.textContent =
            "You have already voted in this demo session.";
        return;
    }

    const selected = document.querySelector(
        'input[name="candidate"]:checked'
    );

    if (!selected) {
        message.textContent = "Please select a candidate.";
        return;
    }

    votes[selected.value]++;

    hasVoted = true;

    sessionStorage.setItem("hasVoted", "true");

    message.style.color = "green";
    message.textContent =
        "Your demonstration vote has been recorded!";

    document.querySelectorAll(
        'input[name="candidate"]'
    ).forEach(input => input.disabled = true);

    document.querySelector(
        '#votingForm button[type="submit"]'
    ).disabled = true;

    displayResults();
});

// DISPLAY RESULTS
function displayResults() {
    const container =
        document.getElementById("resultsContainer");

    const total = Object.values(votes)
        .reduce((sum, value) => sum + value, 0);

    document.getElementById("totalVotes").textContent = total;

    container.innerHTML = "";

    candidates.forEach(candidate => {
        const count = votes[candidate];

        const percentage = total === 0
            ? 0
            : (count / total) * 100;

        const item = document.createElement("div");
        item.className = "result-item";

        const heading = document.createElement("h3");
        heading.textContent = candidate;

        const progress = document.createElement("div");
        progress.className = "progress";

        const bar = document.createElement("div");
        bar.className = "progress-bar";
        bar.style.width = percentage + "%";

        progress.appendChild(bar);

        const detail = document.createElement("p");
        detail.textContent =
            count + " votes (" + percentage.toFixed(1) + "%)";

        item.append(heading, progress, detail);
        container.appendChild(item);
    });
}

// CLOSE MOBILE MENU
document.querySelectorAll(".navbar a").forEach(link => {
    link.addEventListener("click", () => {
        document.getElementById("navLinks")
            .classList.remove("active");
    });
});

// INITIAL DISPLAY
displayResults();

// RESTORE DEMO VOTING STATE
if (hasVoted) {
    document.querySelectorAll(
        'input[name="candidate"]'
    ).forEach(input => input.disabled = true);

    document.querySelector(
        '#votingForm button[type="submit"]'
    ).disabled = true;

    document.getElementById("voteMessage").textContent =
        "You have already voted in this demo session.";
}
