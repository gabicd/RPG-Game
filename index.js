//create player
const player = {
  level: 1,
  attack: 10,
  defense: 5,
  requiredXp: 50,
  maxHp: 50,
  baseXp: 50,
  baseHealth: 50,

  levelUp() {
      this.level++
      this.attack = Math.round(this.attack * 1.12)
      this.defense = Math.round(this.defense * 1.08)
      this.requiredXp = Math.floor(this.baseXp * Math.pow(1.5, this.level-1))

    },

    updateHealth(){
      const additionalHealth = 5 * (this.level - 1);
      this.maxHp = this.maxHp  + additionalHealth
      console.log(`Leveled up to ${this.level}. New maxHp: ${this.maxHp}`);
    }

  }

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
  if (gold >= 10 && health <= player.maxHp) {
    gold -= 10;
    health += 10;
    if (health > player.maxHp){
      health = player.maxHp
      goldText.innerText = gold;
      healthText.innerText = health;
      text.innerText = "You are already at max health!";
    }
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
    health -= getMonsterAttackValue(monsters[fighting]);
    
    if (monsters[fighting].img) {
        monsterImg = document.createElement('img');
        monsterImg.id = "monster-img";
        monsterImg.src = monsters[fighting].img;
        text.appendChild(monsterImg);
      }

    if (isMonsterHit()) {
        monsterHealth -= (player.attack - monsters[fighting].defense) + Math.floor(Math.random() * 5) - 2;    
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

function getMonsterAttackValue(monster) {
  let hit = (Number(monster.attack) - Number(player.defense * 0.3))
  const random = Math.random() * 0.2 + 0.9
  hit *= random
  console.log(`Monster hit: ${Math.round(hit)}`)
  return Math.round(hit);
}

function isMonsterHit() {
  return Math.random() > .2 || health < 20;
}

function dodge() {
  text.textContent = `You dodge the attack from the ${monsters[fighting].name}`;
}

function defeatMonster() {
  let gainedGold = Math.floor(monsters[fighting].level * (Math.random() * (7-1) + 1));
  console.log(`You gained: ${gainedGold} gold`)
  gold += gainedGold
  let gainedXp = (monsters[fighting].level * Math.floor(Math.random() * (10-1) + 1));
  xp += gainedXp
  changeWidth()
  console.log(`You gained: ${gainedXp} xp`)
  goldText.innerText = gold;
  xpText.innerText = xp;
  update(locations[4]);
  if (xp >= player.requiredXp){
    currentMaxHp = player.maxHp
    //console.log(`Current max: ${currentMaxHp}`)
    //console.log(`Base HP: ${player.baseHealth}`)
    xp -= player.requiredXp
    changeWidth()
    xpText.innerText = xp 
    player.levelUp();
    player.updateHealth();
    //console.log(player)
    health += player.maxHp - currentMaxHp
    //console.log(`Gained health: ${player.maxHp - currentMaxHp}`)
    healthText.innerText = health;
  }
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

function checkStats(){
  text.innerText = '';

  let statsArray = Object.entries(player);
  statsArray.splice(-4)
  statsArray = statsArray.map(([key, value]) => {
    let formattedKey
    if (key === 'requiredXp'){
      formattedKey = 'XP to next level'
    }

    else if (key === 'maxHp'){
      formattedKey = 'Max HP'
    }
    
    else{
      formattedKey = key.charAt(0).toUpperCase() + key.slice(1);
    }
    
    return `${formattedKey}: ${value}`;
  })
  const statsList = createList(statsArray)

  text.appendChild(statsList)

  controlButtons[1].style.display = 'none';
  controlButtons[2].style.display = 'none';

  controlButtons[0].innerText = 'Return';
  controlButtons[0].onclick = () => goToPlace(currentLocation);

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

function changeWidth(){
  progress.style.width = `${(xp / player.requiredXp) * 100}%`
  progress.innerText = `${((xp / player.requiredXp) * 100).toFixed(2)}%`
}