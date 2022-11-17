const fieldsElements = document.querySelectorAll(".board__item");
const panel = document.querySelector(".panel");
const button = document.querySelector(".reset-button");

let fields;
let activePlayer;
let gameActive;

const setDefaults = () => {
    fields = ["", "", "", "", "", "", "", "", ""];
    activePlayer = "X";
    gameActive = true;
}
setDefaults();
const winingConditions = [
 [0, 1, 2],
 [3, 4, 5],
 [6, 7, 8],
 [0, 3, 6],
 [1, 4, 7],
 [2, 5, 8],
 [0, 4, 8],
 [6, 4, 2]
];
const validateGame = () => {
    for (let i = 0; i <= 7; i++) {
        const [posA, posB, posC] = winingConditions[i];
        const value1 = fields[posA];
        const value2 = fields[posB];
        const value3 = fields[posC];

        if (value1 != "" && value1 === value2 && value1 === value3) {
            gameActive = false;
            panel.innerHTML = `Wygrałeś ${activePlayer}. Gratulacje!`;
        }
    }
};

const clearMessage = () => {
    panel.innerText = "";
}

fieldsElements.forEach(field => {
    field.addEventListener("click", (event) => {
        const {pos} = event.target.dataset;
        
        if (gameActive && fields[pos] === "") {
            fields[pos] = activePlayer;
            event.target.classList.add(`board__item--filled-${activePlayer}`)
            validateGame();
            activePlayer = activePlayer === "X" ? "O" : "X";
        }
    });
});

const handleButtonClick = () => {
    setDefaults();
    fieldsElements.forEach(field => {
        field.classList.remove("board__item--filled-X", "board__item--filled-O");
    })
    clearMessage();
};
button.addEventListener("click", handleButtonClick)
