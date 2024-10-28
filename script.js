const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const result = document.getElementById("result");
const sound = document.getElementById("sound");
const btn = document.getElementById("search-btn");

btn.addEventListener("click", () => {
    let inpWord = document.getElementById("inp-word").value.trim();
    if (!inpWord) {
        result.innerHTML = '<h3 class="error">Please enter a word</h3>';
        return;
    }

    fetch(`${url}${inpWord}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then((data) => {
            if (!data.length) {
                throw new Error("No definitions found");
            }

            console.log(data);
            result.innerHTML = `
                <div class="word">
                    <h3>${inpWord}</h3>
                    <button onclick="playSound()">
                        <i class="fas fa-volume-up"></i>
                    </button>
                </div>
                <div class="details">
                    <p>${data[0].meanings[0].partOfSpeech}</p>
                    <p>/${data[0].phonetic}/</p>
                </div>
                <p class="word-meaning">
                    ${data[0].meanings[0].definitions[0].definition}
                </p>
                <p class="word-example">
                    ${data[0].meanings[0].definitions[0].example || ""}
                </p>`;
                
            // Check if audio URL exists before setting it
            if (data[0].phonetics.length > 0 && data[0].phonetics[0].audio) {
                sound.setAttribute("src", data[0].phonetics[0].audio);
            } else {
                sound.setAttribute("src", ""); // No audio available
            }
        })
        .catch((error) => {
            console.error("Error:", error);
            result.innerHTML = `<h3 class="error">${error.message}</h3>`;
        });
});

function playSound() {
    sound.play();
}
