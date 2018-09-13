// heroes
const hunters = new Creature ({
    name: "Sam and Dean",
    health: 200
})

// monster
const werewolf = new Creature ({
    name: "Werewolf",
    health: 100,
    baseDamage: 50,
    chanceToCrit: 0.3
})

// function choice() {
//     let elementChoice = document.createElement("div");
//     let resultChoice = document.createTextNode(`You chose ${bulletChoice}`);
//     elementChoice.appendChild(resultChoice);
//     let placeChoice = document.getElementById("choice");
//     placeChoice.appendChild(elementChoice);
// }

// lets the user choose the kind of bullet they want the hunters to use
let bulletChoice = prompt("Which bullet: iron or silver?").toLowerCase()
if (bulletChoice === "iron") {
    // iron does no damage to a werewolf; hunter base damage set to 0
    // hunters always lose
    hunters.baseDamage = 0;
} else if (bulletChoice === "silver") {
    // silver is effective against a werewolf; hunter base damage set to 25
    // hunters won't always win; depends on luck
    hunters.baseDamage = 25;
} else if (bulletChoice === "colt") {
    // the Colt can kill almost anything with one shot; hunter base damage set to 100;
    // hunters almost always win (won't win in cases of extreme unluckiness; they have to always miss)
    hunters.baseDamage = 100;
} else if (bulletChoice === "castiel") {
    // Castiel is not a bullet, but can be a cop-out if used correctly; hunter base damage set to 100; hunter chance to miss set to 0.1 (less likely to miss)
    // hunters almost always win (won't win in cases of extreme unluckiness; they have to always miss)
    hunters.baseDamage = 100;
    hunters.chanceToMiss = 0.1;
    alert("That's not a bullet, but I'll allow it.");
} else {
    // if the user enters anything other than the above choices, the hunters automatically lose; hunter health set to 0
    // hunters always lose
    hunters.baseDamage = 0;
    hunters.health = 0;
    alert("Congrats, Assbutt. You got the Winchesters killed.");
}
// choice();

function Creature (options) {
    this.name = options.name;
    this.health = options.health || 50
    this.chanceToCrit = options.chanceToCrit || 0.2;
    this.chanceToMiss = options.chanceToMiss || 0.3;
    this.baseDamage = options.baseDamage || 25;

    this.fight = function (creature) {
        let message;
        // displays the message on the page
        function actionTaken() {
            let elementAction = document.createElement("div");
            let resultAction = document.createTextNode(message);
            elementAction.appendChild(resultAction);
            let placeAction = document.getElementById("action");
            placeAction.appendChild(elementAction);
        }
        // decides whether the Creature's attack missed
        if (Math.random() < this.chanceToMiss) {
            message = `${this.name} missed ${creature.name}`
             // action
             actionTaken();
        } else {
            // decides whether the attack is a critical hit; sets the amount of damage a critical hit does
            const dmg = Math.random() < this.chanceToCrit
                ? this.baseDamage * 2
                : this.baseDamage;
            // subtracts the amount of damage from the creature's health
            creature.health -= dmg;
            // message displayed if the hunters are the attackers
            if (creature === hunters) {
                message = `${creature.name} have been hit! They are now at ${creature.health} health`;
                // action
                actionTaken();
            // message displayed if the werewolf is the attacker
            } else if (creature === werewolf) {
            message = `${creature.name} has been hit! It's now at ${creature.health} health`;
                // action
                actionTaken();
            }
        }
        console.log(message);
        return message;
    }
}

// displays the user's chosen bullet/weapon
Creature.prototype.weapon = function() {
    let elementChoice = document.createElement("div");
    let resultChoice = document.createTextNode(`You chose ${bulletChoice}`);
    elementChoice.appendChild(resultChoice);
    let placeChoice = document.getElementById("choice");
    placeChoice.appendChild(elementChoice);
}
let heroNew = new Creature("weapon")
heroNew.weapon();

// if no monster is provided
function battle (hero, ...monsters) {
    if (monsters.length === 0) {
        monsters = [new Creature ({ name: "Vampire"})];
    }
    
    // keeps fight going as long as both the heroes and monster have more than 0 health
    // at least it's fucking supposed to...
    monsters.forEach(monster => {
        while (hero.health > 0 && monster.health > 0) {
            hero.fight(monster);
            monster.fight(hero);
        }
        
        // to make sure winning text works for both the plural heroes and the singular monsters
        let winner;
        if (hero.health > 0) {
            winner = hero.name + " are the victors"
        } else if (monster.health > 0) {
            winner = monster.name + " is the victor"
        } else if (hero.health <= 0 && monster.health <= 0) {
            winner = "Both died"
        }
        console.log(`${hero.name} are at ${hero.health} health and ${monster.name} is at ${monster.health} health`);
        console.log(winner);
        
        // Final Stats
        let element = document.createElement("div");
        let result = document.createTextNode(`${hero.name} are at ${hero.health} health and ${monster.name} is at ${monster.health} health`);
        element.appendChild(result);
        let place = document.getElementById("main");
        place.appendChild(element);

        // Winning Text
        let elementWin = document.createElement("div");
        let resultWin = document.createTextNode(winner);
        elementWin.appendChild(resultWin);
        let placeWin = document.getElementById("main");
        placeWin.appendChild(elementWin);
    })
}

// run the battle code
battle(hunters, werewolf);