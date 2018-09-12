const hunters = new Creature ({
    name: "Sam and Dean",
    health: 200
})

// const demon = new Creature ({
//     name: "Demon",
//     baseDamage: 20,
//     chanceToMiss: 0
// })

const werewolf = new Creature ({
    name: "Werewolf",
    baseDamage: 50,
    chanceToCrit: 0.3
})

function choice() {
    let elementChoice = document.createElement("div");
    let resultChoice = document.createTextNode(`You chose ${bulletChoice}`);
    elementChoice.appendChild(resultChoice);
    let placeChoice = document.getElementById("choice");
    placeChoice.appendChild(elementChoice);
}

let bulletChoice = prompt("Which bullet: iron or silver?").toLowerCase()
if (bulletChoice === "iron") {
    hunters.baseDamage = 0;
} else if (bulletChoice === "silver") {
    hunters.baseDamage = 25;
} else if (bulletChoice === "colt") {
    hunters.baseDamage = 100;
} else if (bulletChoice === "castiel") {
    hunters.baseDamage = 100;
    alert("That's not a bullet, but I'll allow it.");
} else {
    hunters.baseDamage = 0;
    hunters.health = 0;
    alert("Congrats, Assbutt. You got the Winchesters killed.");
}
choice();

function Creature (options) {
    this.name = options.name;
    this.health = options.health || 100;
    this.chanceToCrit = options.chanceToCrit || 0.2;
    this.chanceToMiss = options.chanceToMiss || 0.3;
    this.baseDamage = options.baseDamage || 25;

    this.fight = function (creature) {
        let message;
        
        if (Math.random() < this.chanceToMiss) {
            message = `${this.name} missed ${creature.name}`
             // action
            let elementAction = document.createElement("div");
            let resultAction = document.createTextNode(message);
            elementAction.appendChild(resultAction);
            let placeAction = document.getElementById("action");
            placeAction.appendChild(elementAction);
        } else {
            const dmg = Math.random() < this.chanceToCrit
                ? this.baseDamage * 2
                : this.baseDamage;
            creature.health -= dmg;
            if (creature === hunters) {
                message = `${creature.name} have been hit! They are now at ${creature.health} health`;
                // action
                let elementAction = document.createElement("div");
                let resultAction = document.createTextNode(message);
                elementAction.appendChild(resultAction);
                let placeAction = document.getElementById("action");
                placeAction.appendChild(elementAction);
            } else if (creature === werewolf) {
            message = `${creature.name} has been hit! It's now at ${creature.health} health`;
                // action
                let elementAction = document.createElement("div");
                let resultAction = document.createTextNode(message);
                elementAction.appendChild(resultAction);
                let placeAction = document.getElementById("action");
                placeAction.appendChild(elementAction);
            }
        }
        console.log(message);
        return message;
       
    }
}

function battle (hero, ...monsters) {
    if (monsters.length === 0) {
        monsters = [new Creature ({ name: "Vampire"})];
    }
    monsters.forEach(monster => {
        while (hero.health > 0 && monster.health > 0) {
            hero.fight(monster);
            monster.fight(hero);
            hero.fight(monster);
        }
        
        console.log(`${hero.name} are at ${hero.health} health and ${monster.name} is at ${monster.health} health`);
        console.log(`${hero.health > 0 ? hero.name : monster.name} won`);
        
        // Final Stats
        let element = document.createElement("div");
        let result = document.createTextNode(`${hero.name} are at ${hero.health} health and ${monster.name} is at ${monster.health} health`);
        element.appendChild(result);
        let place = document.getElementById("main");
        place.appendChild(element);

        // Winning Text
        let elementWin = document.createElement("div");
        let resultWin = document.createTextNode(`${hero.health > 0 ? hero.name : monster.name} won`);
        elementWin.appendChild(resultWin);
        let placeWin = document.getElementById("main");
        placeWin.appendChild(elementWin);
    })
}

battle(hunters, werewolf);