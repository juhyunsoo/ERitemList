//아이템 리스트
const itemList = document.getElementById("itemList");

//팝업 창
const popupButton = document.getElementsByClassName('popupButton');
const popupContainer = document.getElementById('popupContainer');
const weaponSelector = document.getElementsByClassName("weaponSelector");
const weaponName = [
    "knife",
    "sword",
    "axe",
    "doubleKnife",
    "handgun",
    "rifle",
    "sniper",
    "glove",
    "tonfa",
    "hammer",
    "bat",
    "pierce",
    "spear",
    "bow",
    "bolt",
    "throwable",
    "razor",
    "guitar",
    "chainStick",
    "whip",
    "camera",
    "mage",
    "VF"
]

//버튼
const armorBtn = document.getElementsByClassName("clothBtn");
const headBtn = document.getElementsByClassName("headBtn");
const armBtn = document.getElementsByClassName("armBtn");
const legBtn = document.getElementsByClassName("legBtn");

const weaponImgContainer = document.getElementsByClassName("weaponImgContainer");
const clothImgContainer = document.getElementsByClassName("clothImgContainer");
const headImgContainer = document.getElementsByClassName("headImgContainer");
const armImgContainer = document.getElementsByClassName("armImgContainer");
const legImgContainer = document.getElementsByClassName("legImgContainer");

//스탯합
const tdATK = document.getElementsByClassName("atk");
const tdSKILL = document.getElementsByClassName("skill");
const tdSIGHT = document.getElementsByClassName("sight");
const tdRANGE = document.getElementsByClassName("range");
const tdBASICATK = document.getElementsByClassName("basicATK");
const tdDEF = document.getElementsByClassName("def");
const tdREDUCE = document.getElementsByClassName("reduce");
const tdRESIST = document.getElementsByClassName("resist");
const tdATKSPD = document.getElementsByClassName("atkSPD");
const tdCOOLTIME = document.getElementsByClassName("cooltime");
const tdAP = document.getElementsByClassName("AP");
const tdHEAL = document.getElementsByClassName("heal");
const tdCRIT = document.getElementsByClassName("crit");
const tdSPEED = document.getElementsByClassName("speed");
const tdHP = document.getElementsByClassName("hp");
const tdMP = document.getElementsByClassName("mp");
const tdORIGINAL = document.getElementsByClassName("original");

//필터
const checkboxes = document.querySelectorAll("input[type='checkbox']");
//json에서 불러온 데이터
let data;

let selectedWeaponI = 0;
let weaponType = "knife";
//stats
let totalStats = [
    {
        "atk": 0,
        "def": 0,
        "skill": 0,
        "adjATK": 0,
        "adjSKILL": 0,
        "basicATK": 0,
        "atkSPD": 0,
        "crit": 0,
        "critD": 0,
        "cooltime": 0,
        "speed": 0,
        "critReduce": 0,
        "atkReduce": 0,
        "skillReduce": 0,
        "mp": 0,
        "mpRegen": 0,
        "hp": 0,
        "hpRegen": 0,
        "AP": 0,
        "APper": 0,
        "resist": 0,
        "atkheal": 0,
        "skillheal": 0,
        "range": 0,
        "sight": 0,
        "original": ""
    },
    {
        "atk": 0,
        "def": 0,
        "skill": 0,
        "adjATK": 0,
        "adjSKILL": 0,
        "basicATK": 0,
        "atkSPD": 0,
        "crit": 0,
        "critD": 0,
        "cooltime": 0,
        "speed": 0,
        "critReduce": 0,
        "atkReduce": 0,
        "skillReduce": 0,
        "mp": 0,
        "mpRegen": 0,
        "hp": 0,
        "hpRegen": 0,
        "AP": 0,
        "APper": 0,
        "resist": 0,
        "atkheal": 0,
        "skillheal": 0,
        "range": 0,
        "sight": 0,
        "original": ""
    }
]
//아이템의 종류
let equippedWeapon = [null, null];
let equippedCloth = [null, null];
let equippedHead = [null, null];
let equippedArm = [null, null];
let equippedLeg = [null, null];

for (let temp = 0; temp < 2; temp++) {
    //weaponBtn[temp].addEventListener("click", () => filterItems("weapon", temp));
    armorBtn[temp].addEventListener("click", () => filterItems("cloth", temp));
    armorBtn[temp].addEventListener("contextmenu", (e) => {
        e.preventDefault();
        disbaleItem("cloth", temp)
    });
    headBtn[temp].addEventListener("click", () => filterItems("head", temp));
    headBtn[temp].addEventListener("contextmenu", (e) => {
        e.preventDefault();
        disbaleItem("head", temp)
    });
    armBtn[temp].addEventListener("click", () => filterItems("arm", temp));
    armBtn[temp].addEventListener("contextmenu", (e) => {
        e.preventDefault();
        disbaleItem("arm", temp)
    });
    legBtn[temp].addEventListener("click", () => filterItems("leg", temp));
    legBtn[temp].addEventListener("contextmenu", (e) => {
        e.preventDefault();
        disbaleItem("leg", temp)
    });
    popupButton[temp].addEventListener("click", () => openWeapon(temp));
    popupButton[temp].addEventListener("contextmenu", (e) => {
        e.preventDefault();
        disbaleItem("weapon", temp)
    });
}
for (let temp = 0; temp < 23; temp++) {
    weaponSelector[temp].addEventListener("click", () => closeWeapon(weaponName[temp]));
}
itemList.addEventListener("contextmenu", (e) => {
    e.preventDefault();
    itemList.innerHTML = "";
});
//로드 완료시 코드 실행
document.addEventListener("DOMContentLoaded", () => {
    loadItems();
});