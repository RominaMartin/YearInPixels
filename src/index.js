import "../styles/index.scss";
const YEAR_CONTAINER = document.getElementById("yearContainer");
const DAYS_HEADER = document.getElementById("daysHeader");
const MONTH_HEADER = document.getElementById("monthHeader");
const GUIDES = document.getElementById("guide");
const SELECTED_MOOD = document.querySelector("#selectedMood span");
const MOODS = document.getElementById("moods");
const MONTH_LETTERS = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];

const COLORS = {
    0: {code: "#2DE1C2", label: "😃"},
    1: {code: "#01BAEF", label: "😊"},
    2: {code: "#AFBFC0", label: "😐"},
    3: {code: "#037171", label: "😞"},
    4: {code: "#305654", label: "😭"}
}

let selectedMood = null;

let init = () => {
    checkLocalStorage();
    generateVisualStructure();
    setMoods();
}

let setMoods = () => {
    let colorKeys = Object.keys(COLORS);

    colorKeys.forEach(e => {
        let mood = document.createElement("div");
        let color = document.createElement("span");

        color.style.background = getGradient(COLORS[e].code);

        mood.setAttribute("mood", e);
        color.setAttribute("mood", e);

        mood.textContent += COLORS[e].label;
        mood.appendChild(color);
        
        MOODS.appendChild(mood);
    })
}

let checkLocalStorage = () => {
    if(window.localStorage.structure === undefined) {
        let structure = generateDataStructure();
        localStorage.setItem("structure", JSON.stringify(structure));
    }
}

let generateDataStructure = () => {
    let data = {};

    for(let i = 0; i < 12; i++) {
        data[i] = Array.from({length: getDaysFromMonth(i + 1)}, () => null);
    }

    return data;
}

let generateVisualStructure = () => {
    const data = getCurrentLSStructure();
    const months = Object.keys(data);
    const dayHeaderLength = 31;

    let monthHeaderSet = false;

    for(let day = 1; day <= dayHeaderLength; day++) {
        let dayHeader = document.createElement("div");
        dayHeader.className = "dayHeader";
        dayHeader.textContent = day;

        DAYS_HEADER.appendChild(dayHeader);
    }


    months.forEach(month => {
        let monthContainer = document.createElement("div");
        monthContainer.className = "monthContainer";
        let monthHeader = document.createElement("div");
        monthHeader.className = "monthHeader";
        monthHeader.textContent = MONTH_LETTERS[month];

        let days = Object.keys(data[month]);

        days.forEach(day => {
            let dayContainer = document.createElement("div");
            dayContainer.className = "dayContainer";
            dayContainer.onclick = () => {assignMood(month, day, dayContainer)};
            
            if(data[month][day])
                dayContainer.style.background = getGradient(COLORS[data[month][day]].code);

            monthContainer.appendChild(dayContainer);
        })

        MONTH_HEADER.appendChild(monthHeader);
        YEAR_CONTAINER.appendChild(monthContainer);
    })

}

let assignMood = (month, day, item) => {
    let data = getCurrentLSStructure();
    data[month][day] = selectedMood;

    if(selectedMood)
        item.style.background = getGradient(COLORS[selectedMood].code);

    localStorage.setItem("structure", JSON.stringify(data));
}

let getDaysFromMonth = (month) => new Date(2019, month, 0).getDate();
let getCurrentLSStructure = () => JSON.parse(window.localStorage.structure);
let getGradient = (colorId) => `radial-gradient(ellipse at center, rgba(255,255,255,.1) -95%, ${colorId} 100%)`;

GUIDES.addEventListener("click", (e) => {
    selectedMood = e.target.attributes[0].value;
    SELECTED_MOOD.style.background = getGradient(COLORS[selectedMood].code);
})

init();