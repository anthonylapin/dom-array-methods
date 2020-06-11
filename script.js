// All buttons
const addUser = document.getElementById("add-user");
const double = document.getElementById("double-money");
const showMillionaires = document.getElementById("show-only-millionaires");
const sort = document.getElementById("sort-richest");
const entireWealth = document.getElementById("entire-wealth");

// Main div
const main = document.getElementById("main");

// Array that stores data about random generated users
let data = [];

getUser();
getUser();
getUser();

async function getUser() {
    const res = await fetch("https://randomuser.me/api");
    const data = await res.json();

    const user = data.results[0];

    const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random() * 1000000)
    };

    addData(newUser);
}

function addData(newData) {
    data.push(newData);

    updateDOM();
}

function updateDOM(providedData = data) {
    main.innerHTML = "<h2><strong>Person</strong> Wealth</h2>";

    providedData.forEach(item => {
        const element = document.createElement("div");
        element.classList.add("person");
        element.innerHTML = `<strong>${item.name}</strong> ${modifyMoney(item.money)}`;
        main.appendChild(element);
    });
}

function modifyMoney(money) {
    return "$" + money.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}


function doubleMoney() {
    data = data.map(user => {
        return { name: user.name, money: user.money * 2 };
    });

    updateDOM();
}

function showOnlyMillionaires() {
    data = data.filter(user => user.money >= 1000000);

    updateDOM();
}

function sortByWealth() {
    data.sort((user1, user2) => {
        return user2.money - user1.money;
    });

    updateDOM();
}

function totalWealth() {
    const totalWealth = data.reduce((accumulator, currentValue) => (accumulator += currentValue.money), 0);

    const wealth = document.createElement("div");
    wealth.innerHTML = `<h3>Total Wealth: <strong>${modifyMoney(totalWealth)}</strong></h3>`;
    main.appendChild(wealth);
}



// Event Listeners
addUser.addEventListener("click", getUser);
double.addEventListener("click", doubleMoney);
showMillionaires.addEventListener("click", showOnlyMillionaires);
sort.addEventListener("click", sortByWealth);
entireWealth.addEventListener("click", totalWealth);
