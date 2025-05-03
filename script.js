const characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@?#%";

function* generateGuesses(length, prefix = "") {
    if (length === 1) {
        for (let c of characters) {
            yield prefix + c;
        }
    } else {
        for (let c of characters) {
            yield* generateGuesses(length - 1, prefix + c);
        }
    }
}

function animateOutputText(element) {
    element.style.transition = "color 0.3s ease, text-shadow 0.3s ease";
    element.style.color = "#ff6666";
    element.style.textShadow = "0 0 10px #ff0000, 0 0 20px #ff4d4d";
    setTimeout(() => {
        element.style.color = "#ff9999";
        element.style.textShadow = "0 0 5px #ff4d4d, 0 0 10px #ff0000";
    }, 300);
}

async function bruteforce(targetPassword, outputElement) {
    let passwordLength = 1;
    let found = false;

    while (!found) {
        const generator = generateGuesses(passwordLength);
        for (let guess of generator) {
            outputElement.textContent = `Trying password: ${guess}`;
            animateOutputText(outputElement);
            await new Promise(r => setTimeout(r, 10)); // slow down for visibility
            if (guess === targetPassword) {
                outputElement.textContent = `Password found: ${guess}`;
                outputElement.style.color = "#ff0000";
                outputElement.style.textShadow = "0 0 20px #ff0000, 0 0 30px #ff4d4d";
                found = true;
                break;
            }
        }
        passwordLength++;
    }
}

document.getElementById("startBtn").addEventListener("click", () => {
    const passwordInput = document.getElementById("passwordInput").value;
    const outputElement = document.getElementById("output");
    if (!passwordInput) {
        outputElement.textContent = "Please enter a password to crack.";
        outputElement.style.color = "#ff6666";
        outputElement.style.textShadow = "0 0 10px #ff0000";
        return;
    }
    outputElement.textContent = "Starting brute force...";
    outputElement.style.color = "#ff9999";
    outputElement.style.textShadow = "0 0 5px #ff4d4d";
    bruteforce(passwordInput, outputElement);
});
