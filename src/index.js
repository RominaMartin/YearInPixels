import "../styles/index.scss";
const YEAR_CONTAINER = document.getElementById("yearContainer");
const MONTH_HEADER = document.getElementById("monthHeader")
const MONTH_LETTERS = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];
const COLORS = {
    0: {code: "#d11141", label: ":D"},
    1: {code: "#00b159", label: ":)"},
    2: {code: "#00aedb", label: ":|"},
    3: {code: "#f37735", label: ":("},
    4: {code: "#ffc425", label: ":'("}
}

let init = () => {
    checkLocalStorage();
    generateVisualStructure();
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

    // for(let day = 1; day < dayHeaderLength; day++) {
    //     let dayHeader = document.createElement("div");
    //     dayHeader.className = "dayHeader";
    //     monthHeader.textContent = day;
    // }

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
            
            if(data[month][day])
                dayContainer.style.background = COLORS[data[month][day]].code;

            monthContainer.appendChild(dayContainer);
        })

        MONTH_HEADER.appendChild(monthHeader);
        YEAR_CONTAINER.appendChild(monthContainer);
    })

}

let getDaysFromMonth = (month) => new Date(2019, month, 0).getDate();
var getCurrentLSStructure = () => JSON.parse(window.localStorage.structure);

init();