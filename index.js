// initialize buttons
let controlButtons = document.querySelectorAll(".control-button");

controlButtons.forEach((button, index) => {
  if (index === 2) {
    button.onclick = (event) => fightMonster(event);
  }
  else {  
    button.onclick = () => goToPlace(index+1);
  }
});

function update(location) {
  monsterStats.style.display = "none";

  for (let locIndex = 0; locIndex < controlButtons.length; locIndex++) {  
    controlButtons[locIndex].style.display = 'initial'
    controlButtons[locIndex].style.cssFloat = 'initial'
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
  currentLocation = locationIndex;

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
      
      const inventoryList = createList(inventory);

      text.appendChild(inventoryList);

    } else {
      text.innerText = "You do not have enough gold to buy a weapon.";
    }
  } else {
    text.innerText = "You already have the most powerful weapon!";
  }
}

function sellWeapon() {
  if (inventory.length > 1) {
    gold += 15;
    goldText.innerText = gold;
    let currentWeapon = inventory.shift();
    text.innerText = `You sold a ${currentWeapon}. In your inventory you have:`;

    const inventoryList = createList(inventory);
    text.appendChild(inventoryList);

} else {
    text.innerText = "Don't sell your only weapon!";
  }
}

function fightMonster(event){
  const button = event.target;
  const buttonName = (button.innerText).slice(6);
  const monsterIndex = monsters.findIndex(monster => 
    monster.name.toLowerCase() === buttonName.trim()
  );

  for (let i = 0; i < monsters.length; i++){
    if (monsterIndex === i){
      fighting = monsterIndex;
      goFight();  
    }
  
    else if (monsterIndex === -1){
      goFight();
    }
  }

}

function goFight() {
  update(locations[3]);
  monsterHealth = monsters[fighting].health;
  monsterStats.style.display = "block";
  monsterName.innerText = monsters[fighting].name;
  monsterHealthText.innerText = monsterHealth;
  const monsterImg = document.createElement('img')
  monsterImg.id = "monster-img"
  monsterImg.src = monsters[fighting].img
  text.appendChild(monsterImg)
  
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
  
  healthText.innerText = 0;
  
  controlButtons[1].style.display = 'none';
  controlButtons[2].style.display = 'none';
}

function winGame() {
  update(locations[6]);
  
  controlButtons[1].style.display = 'none';
  controlButtons[2].style.display = 'none';
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
  
  text.innerHTML = `You picked ${guess}. Here are the random numbers:\n`;
  
  const numbersList = createList(numbers);
  numbersList.classList.add('number-list');
  
  text.appendChild(numbersList);

  let resultText
  if (numbers.includes(guess)) {
      resultText = "Right! You win 20 gold!";
      gold += 20;
      goldText.innerText = gold;
      const resultItem = document.createElement('p');
      resultItem.innerText = resultText;
      text.appendChild(resultItem);
    } 
  else {
      resultText = "Wrong! You lose 10 health!";
      health -= 10;
      healthText.innerText = health;

      const resultItem = document.createElement('p');
      resultItem.innerText = resultText;
      text.appendChild(resultItem);

    if (health <= 0) {
      lose();
    }
  }

}

function checkInventory (){
  text.innerText = '';

  const inventoryList = createList(inventory);
  text.appendChild(inventoryList);

  controlButtons[2].style.display = 'none';

  controlButtons[0].innerText = 'Return';
  controlButtons[0].onclick = () => goToPlace(currentLocation);

  controlButtons[1].innerText = 'Sell Weapon - 15 gold';
  controlButtons[1].onclick = sellWeapon;
  controlButtons[1].style.cssFloat = 'right'

  monsterStats.style.display = 'none'

}

function createList(array){
    const arrayList = document.createElement('ul');
    array.forEach(item => {
    const listItem = document.createElement('li');
    listItem.innerText = item;
    arrayList.appendChild(listItem);
  });

return arrayList
}