//game stats
let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["stick"];

let controlButtons = document.querySelectorAll(".control-button");
const text = document.getElementById("text");
const xpText = document.getElementById("xpText");
const healthText = document.getElementById("healthText");
const goldText = document.getElementById("goldText");
const monsterStats = document.getElementById("monsterStats");
const monsterName = document.getElementById("monsterName");
const monsterHealthText = document.getElementById("monsterHealth");
const weapons = [
  { name: 'stick', power: 5 },
  { name: 'dagger', power: 30 },
  { name: 'claw hammer', power: 50 },
  { name: 'sword', power: 100 }
];
const monsters = [
  {
    name: "Slime",
    level: 2,
    health: 15,
    img: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/45736226-4350-419f-acd8-d950e4a3c1c6/de9ited-2332eae4-a0ff-4966-915c-33735dfc7c37.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzQ1NzM2MjI2LTQzNTAtNDE5Zi1hY2Q4LWQ5NTBlNGEzYzFjNlwvZGU5aXRlZC0yMzMyZWFlNC1hMGZmLTQ5NjYtOTE1Yy0zMzczNWRmYzdjMzcuZ2lmIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.dRz9i0hMJMBCGVGMpux2cML4Sl5P3sxMmshAHIFU0iI'
  },
  {
    name: "Skeleton",
    level: 8,
    health: 60,
    img: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/9d70ef73-ee0b-4abf-b97a-3389eff38ed5/d9vgxfx-b4707e19-5cbf-47be-9baf-666dd1e9c145.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzlkNzBlZjczLWVlMGItNGFiZi1iOTdhLTMzODllZmYzOGVkNVwvZDl2Z3hmeC1iNDcwN2UxOS01Y2JmLTQ3YmUtOWJhZi02NjZkZDFlOWMxNDUuZ2lmIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.SCx5Bl_HOQ3pBmecdTzg_YJjlmm0Yj4TohyA_h6x6GA'
  },
  {
    name: "Dragon",
    level: 20,
    health: 300,
    img: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/07e0fe07-c785-4399-baa0-bd88bc992dea/de8o01h-4ef6da32-e468-428a-84a5-ef90a5f87716.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzA3ZTBmZTA3LWM3ODUtNDM5OS1iYWEwLWJkODhiYzk5MmRlYVwvZGU4bzAxaC00ZWY2ZGEzMi1lNDY4LTQyOGEtODRhNS1lZjkwYTVmODc3MTYuZ2lmIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.TNgUKUh_F-YRYQmV9_JnFAiJ9Hczd377PSIiPOaNMnE'
  }
]
const locations = [
  {
    name: "town square",
    "button text": ["Go to store", "Go to cave", "Fight dragon"],
    "button functions": [() => goToPlace(1), () => goToPlace(2), (event) => fightMonster(event)],
    text: "You are in the town square. You see a sign that says \"Store\".",
    img: 'storeSign.png'
  },
  {
    name: "store",
    "button text": ["Buy Potion (+10 health) - 10 gold", "Buy weapon - 30 gold", "Go to town square"],
    "button functions": [buyHealth, buyWeapon, () => goToPlace(0)],
    text: "You enter the store.",
    img: 'https://png.pngtree.com/png-vector/20240917/ourmid/pngtree-potion-bottle-pixel-art-vector-png-image_13852691.png'
  },
  {
    name: "cave",
    "button text": ["Fight slime", "Fight skeleton", "Go to town square"],
    "button functions": [(event) => fightMonster(event), (event) => fightMonster(event), () => goToPlace(0)],
    text: "You enter the cave. You see some monsters."
  },
  {
    name: "fight",
    "button text": ["Attack", "Dodge", "Run"],
    "button functions": [attack, dodge, () => goToPlace(0)],
    text: "You are fighting a monster."
  },
  {
    name: "kill monster",
    "button text": ["Go to town square", "Go to town square", "Go to town square"],
    "button functions": [() => goToPlace(0), () => goToPlace(0), () => goToPlace(0)],
    text: 'The monster screams "Arg!" as it dies. You gain experience points and find gold.'
  },

  {
    name: "lose",
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
    "button functions": [restart, restart, restart],
    text: "You died. &#x2620;"
  },
  { 
    name: "win", 
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?"], 
    "button functions": [restart, restart, restart], 
    text: "You defeated the dragon! YOU WIN THE GAME! &#x1F389;" 
  },
  {
    name: "easter egg",
    "button text": ["2", "8", "Go to town square?"],
    "button functions": [pickTwo, pickEight, () => goToPlace(0)],
    text: "You found a secret game. Pick a number above. Ten numbers will be randomly chosen between 0 and 10. If the number you choose matches one of the random numbers, you win!"
  }
];

// initialize buttons
controlButtons.forEach((button, index) => {
  if (index === 2) {
    button.onclick = fightDragon;
  }
  else {  
  button.onclick = () => goToPlace(index+1);
  }
});

function update(location) {
  monsterStats.style.display = "none";

  for (let locIndex = 0; locIndex < controlButtons.length; locIndex++) {  
  controlButtons[locIndex].innerText = location["button text"][locIndex];
  controlButtons[locIndex].onclick = location["button functions"][locIndex];
}
  
  text.innerHTML = location.text;

  if (location.img){
    const locationImg = document.createElement('img')
    locationImg.id = "location-img"
    locationImg.src = location.img
    text.appendChild(locationImg)
  }
}

function goToPlace(locationIndex) {
  update(locations[locationIndex]);
  if (locationIndex === 2) {
    fightMonster(); 
  }
}

function buyHealth() {
  if (gold >= 10) {
    gold -= 10;
    health += 10;
    goldText.innerText = gold;
    healthText.innerText = health;
  } else {
    text.innerText = "You do not have enough gold to buy health.";
  }
}

function buyWeapon() {
  if (currentWeapon < weapons.length - 1) {
    if (gold >= 30) {
      gold -= 30;
      currentWeapon++;
      goldText.innerText = gold;
      let newWeapon = weapons[currentWeapon].name;
      text.innerText = `You now have a ${newWeapon}. In your inventory you have:`;
      inventory.push(newWeapon);
      
      const inventoryList = document.createElement('ul');
      inventory.forEach(item => {
        const listItem = document.createElement('li');
        listItem.innerText = item;
        inventoryList.appendChild(listItem);
      });

      text.appendChild(inventoryList);

    } else {
      text.innerText = "You do not have enough gold to buy a weapon.";
    }
  } else {
    text.innerText = "You already have the most powerful weapon!";
    button2.innerText = "Sell weapon for 15 gold";
    button2.onclick = sellWeapon;
  }
}

function sellWeapon() {
  if (inventory.length > 1) {
    gold += 15;
    goldText.innerText = gold;
    let currentWeapon = inventory.shift();
    text.innerText = `You sold a ${currentWeapon}.`;
    text.innerText +=  ` In your inventory you have: ${inventory.join(', ')}`;
  } else {
    text.innerText = "Don't sell your only weapon!";
  }
}

function fightMonster(event){
  const button = event.target;
  const buttonIndex = Array.from(controlButtons).indexOf(button);
  switch (buttonIndex) {
    case 0:
      fighting = buttonIndex;
      goFight();
      break;
    case 1:
      fighting = buttonIndex;
      goFight();  
      break;
    case 2:
      fighting = buttonIndex;
      goFight();
      break;
  }
}

function goFight() {
  update(locations[3]);
  monsterHealth = monsters[fighting].health;
  monsterStats.style.display = "block";
  monsterName.innerText = monsters[fighting].name;
  monsterHealthText.innerText = monsterHealth;
  if (monsters[fighting].img){
    const monsterImg = document.createElement('img')
    monsterImg.id = "monster-img"
    monsterImg.src = monsters[fighting].img
    text.appendChild(monsterImg)
  }
}

function attack() {
    text.innerHTML = "";
    let monsterImg
    text.innerText = `The ${monsters[fighting].name} attacks. You attack it with your ${weapons[currentWeapon].name}. `;
    health -= getMonsterAttackValue(monsters[fighting].level);
    
    if (monsters[fighting].img) {
        monsterImg = document.createElement('img');
        monsterImg.id = "monster-img";
        monsterImg.src = monsters[fighting].img;
        text.appendChild(monsterImg);
      }

    if (isMonsterHit()) {
        monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;    
    } else {
        monsterImg.insertAdjacentText('beforebegin', " You miss.");
    }
    
    healthText.innerText = health;
    monsterHealthText.innerText = monsterHealth;
    
    if (health <= 0) {
        lose();
    } else if (monsterHealth <= 0) {
        switch (fighting){
            case 2:
                winGame();
                break;
            default:
                monsterImg.remove()
                defeatMonster();
                break;
        }
    }
    
    if (Math.random() <= .1 && inventory.length !== 1) {
        text.insertAdjacentText('beforeend', ` Your ${inventory.pop()} breaks.`);
        currentWeapon--;
    }

}

function getMonsterAttackValue(level) {
  const hit = (level * 5) - (Math.floor(Math.random() * xp));
  return hit > 0 ? hit : 0;
}

function isMonsterHit() {
  return Math.random() > .2 || health < 20;
}

function dodge() {
  text.textContent = `You dodge the attack from the ${monsters[fighting].name}`;
}

function defeatMonster() {
  gold += Math.floor(monsters[fighting].level * 6.7);
  xp += monsters[fighting].level;
  goldText.innerText = gold;
  xpText.innerText = xp;
  update(locations[4]);
}

function lose() {
  update(locations[5]);
}

function winGame() {
  update(locations[6]);
}

function restart() {
    location.reload();
}

function easterEgg() {
  update(locations[7]);
}

function pickTwo() {
  pick(2);
}

function pickEight() {
  pick(8);
}

function pick(guess) {
  const numbers = [];
  while (numbers.length < 10) {
    numbers.push(Math.floor(Math.random() * 11));
  }
  text.innerText = `You picked ${guess}. Here are the random numbers:\n`;
  for (let i = 0; i < 10; i++) {
    text.innerText += numbers[i] + "\n";
  }
  if (numbers.includes(guess)) {
    text.innerText += "Right! You win 20 gold!";
    gold += 20;
    goldText.innerText = gold;
  } else {
    text.innerText += "Wrong! You lose 10 health!";
    health -= 10;
    healthText.innerText = health;
    if (health <= 0) {
      lose();
    }
  }
}