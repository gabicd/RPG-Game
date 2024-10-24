let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let currentLocation = 0;
let lastMonster;
let fighting;
let monsterHealth;
let inventory = ["Stick"];


const text = document.getElementById("text");
const xpText = document.getElementById("xpText");
const healthText = document.getElementById("healthText");
const goldText = document.getElementById("goldText");
const monsterStats = document.getElementById("monsterStats");
const monsterName = document.getElementById("monsterName");
const monsterHealthText = document.getElementById("monsterHealth");
const controlsContainer = document.getElementById('controls')

const weapons = [
  { name: 'Stick', power: 5 },
  { name: 'Dagger', power: 30 },
  { name: 'Claw Hammer', power: 50 },
  { name: 'Sword', power: 100 }
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
    "button text": ["Fight again", "Go to store", "Go to town square"],
    "button functions": [(event) => fightMonster(event), () => goToPlace(1), () => goToPlace(0)],
    text: 'The monster screams "Arg!" as it dies. You gain experience points and find gold.'
  },

  {
    name: "lose",
    "button text": ["REPLAY?"],
    "button functions": [restart],
    text: "You died ⚰"
  },
  { 
    name: "win", 
    "button text": ["REPLAY?"], 
    "button functions": [restart], 
    text: "You defeated the dragon! YOU WON THE GAME! ⚔" 
  },
  {
    name: "easter egg",
    "button text": ["2", "8", "Go to town square?"],
    "button functions": [pickTwo, pickEight, () => goToPlace(0)],
    text: "You found a secret game. Pick a number above. Ten numbers will be randomly chosen between 0 and 10. If the number you choose matches one of the random numbers, you win!"
  }
];