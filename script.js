// 아이템 정보를 불러온 후 초기화
async function loadItems() {
    const response = await fetch("items.json");
    data = await response.json();
    updateStatsTable(0);
    updateStatsTable(1);
}
//팝업창을 연다.
function openWeapon(i) {
    let temp = i;
    selectedWeaponI = temp;
    popupContainer.style.display = "flex";
}
//팝업창을 닫는다.
function closeWeapon(itemType) {
    console.log("selected " + itemType);
    let temp = itemType;
    weaponType = temp;
    popupContainer.style.display = "none";
    filterItems("weapon", selectedWeaponI);
}
//선택한 옵션을 배열형태로 반환
function getOptions() {
    const selectedOptions = [];
    checkboxes.forEach((checkbox) => {
        if (checkbox.checked) {
            selectedOptions.push(checkbox.value);
            if (checkbox.value == "AP") {
                selectedOptions.push("APper");
            }
            if (checkbox.value == "atkReduce") {
                selectedOptions.push("skillReduce");
            }
        }
    });
    if (selectedOptions == 0) {
        return false;
    }
    return selectedOptions;
}
// 아이템 필터링
function filterItems(type, i) {
    let temp = i;
    console.log("filter" + type + "[" + i + "]");
    itemList.innerHTML = "";

    const selectedOptions = getOptions();
    console.log(selectedOptions);

    for (const item of data) {
        //옵션이 체크돼 있다면 옵션에 맞는 아이템만 필터링
        let isOption = true;
        if (selectedOptions) {
            isOption = false;
            for (const statKey of selectedOptions) {
                if (item.stats[statKey] > 0) {
                    isOption = true;
                    break;
                }
            }
        }
        //아이템 종류가 무기라면, weaponType 검사
        if (type == "weapon") {
            if (item.weaponType != weaponType) {
                continue;
            }
        }
        //리스트에 추가
        if (item.type === type && isOption == true) {
            const tr = document.createElement("tr");
            const td = document.createElement("td");
            const td2 = document.createElement("td");

            const imgContainer = document.createElement("div");
            imgContainer.setAttribute("class", "imgContainer");

            const img = document.createElement("img");
            img.src = item.name;
            img.alt = "no image" + item.name;

            imgContainer.appendChild(img);
            td.appendChild(imgContainer);
            tr.appendChild(td);

            td2.innerHTML = item.str;
            tr.appendChild(td2);
            tr.addEventListener("click", () => equipItem(item, temp));
            itemList.appendChild(tr);
        }
    }
    //리스트가 비어 있는 경우 처리
    if (itemList.innerHTML == "") {
        itemList.innerHTML = "조건에 맞는 아이템이 없습니다.";
    }
}
function disbaleItem(item, i) {
    console.log("unequip" + item)
    if (item === "weapon") {
        equippedWeapon[i] = null;
        popupButton[i].src = "./media/weapon/basic.png";
    } else if (item === "cloth") {
        equippedCloth[i] = null;
        armorBtn[i].src = "./media/cloth/basic.png";
    } else if (item == "head") {
        equippedHead[i] = null;
        headBtn[i].src = "./media/head/basic.png";
    } else if (item == "arm") {
        equippedArm[i] = null;
        armBtn[i].src = "./media/arm/basic.png";
    } else if (item == "leg") {
        equippedLeg[i] = null;
        legBtn[i].src = "./media/leg/basic.png";
    }

    updateStatsTable(i);
}
// 아이템 착용
function equipItem(item, i) {
    console.log("equipped" + item.type + i);
    if (item.type === "weapon") {
        equippedWeapon[i] = item;
        popupButton[i].src = item.name;
        popupButton[i].alt = "no image " + item.name;
    } else if (item.type === "cloth") {
        equippedCloth[i] = item;
        armorBtn[i].src = item.name;
        armorBtn[i].alt = "no image " + item.name;
    } else if (item.type == "head") {
        equippedHead[i] = item;
        headBtn[i].src = item.name;
        headBtn[i].alt = "no image " + item.name;
    } else if (item.type == "arm") {
        equippedArm[i] = item;
        armBtn[i].src = item.name;
        armBtn[i].alt = "no image " + item.name;
    } else if (item.type == "leg") {
        equippedLeg[i] = item;
        legBtn[i].src = item.name;
        legBtn[i].alt = "no image " + item.name;
    }

    updateStatsTable(i);
}

// 스탯 테이블 업데이트
function updateStatsTable(i) {
    console.log("update" + i)
    totalStats[i] = {
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
    for (const item of [equippedWeapon[i], equippedCloth[i], equippedHead[i], equippedArm[i], equippedLeg[i]]) {
        if (item) {
            for (const statKey in totalStats[i]) {
                if (statKey == "resist") {
                    if (totalStats[i][statKey] < item.stats[statKey]) {
                        totalStats[i][statKey] = item.stats[statKey];
                    }
                }
                else if (item.stats[statKey]) {
                    totalStats[i][statKey] += item.stats[statKey];
                }
            }
        }
        totalStats[i].original += "<br>";
    }
    //html에 반영
    console.log(totalStats);
    tdATK[i].innerHTML = totalStats[i].atk + "(+" + totalStats[i].adjATK + ")";
    tdSKILL[i].innerHTML = totalStats[i].skill + "(+" + totalStats[i].adjSKILL + ")";
    tdSIGHT[i].innerHTML = totalStats[i].sight;
    tdRANGE[i].innerHTML = totalStats[i].range;
    tdBASICATK[i].innerHTML = totalStats[i].basicATK + "%";
    tdDEF[i].innerHTML = totalStats[i].def;
    tdREDUCE[i].innerHTML = totalStats[i].atkReduce + "% | " + totalStats[i].skillReduce + "%";
    tdRESIST[i].innerHTML = totalStats[i].resist + "%";
    tdATKSPD[i].innerHTML = totalStats[i].atkSPD + "%";
    tdCOOLTIME[i].innerHTML = totalStats[i].cooltime + "%";
    tdAP[i].innerHTML = totalStats[i].AP + " | " + totalStats[i].APper + "%";
    tdHEAL[i].innerHTML = totalStats[i].atkheal + "% | " + totalStats[i].skillheal + "%";
    tdCRIT[i].innerHTML = totalStats[i].crit + "% | " + totalStats[i].critD + "%";
    tdSPEED[i].innerHTML = totalStats[i].speed;
    tdHP[i].innerHTML = totalStats[i].hp + " | " + totalStats[i].hpRegen + "%";
    tdMP[i].innerHTML = totalStats[i].mp + " | " + Math.floor(totalStats[i].mpRegen) + "%";
    tdORIGINAL[i].innerHTML = totalStats[i].original;
    comp();
}
//두 스탯합을 비교하여 색을 칠하는 함수
function comp() {
    let atkSum = [0, 0];
    let skillSum = [0, 0];
    for (let i = 0; i < 2; i++) {
        if (totalStats[i].atk > totalStats[i].skill) {
            atkSum[i] = totalStats[i].atk + totalStats[i].adjATK;
            skillSum[i] = totalStats[i].skill
        }
        else {
            atkSum[i] = totalStats[i].atk;
            skillSum[i] = totalStats[i].skill + totalStats[i].adjSKILL
        }
    }
    console.log(atkSum[0]);
    //=======================================================
    if (atkSum[0] > atkSum[1]) {
        tdATK[0].setAttribute("data-color", "green");
        tdATK[1].setAttribute("data-color", "red");
    }
    else if (atkSum[0] < atkSum[1]) {
        tdATK[1].setAttribute("data-color", "green");
        tdATK[0].setAttribute("data-color", "red");
    }
    else {
        tdATK[1].setAttribute("data-color", "");
        tdATK[0].setAttribute("data-color", "");
    }
    //=======================================================
    if (skillSum[0] > skillSum[1]) {
        tdSKILL[0].setAttribute("data-color", "green");
        tdSKILL[1].setAttribute("data-color", "red");
    }
    else if (skillSum[0] < skillSum[1]) {
        tdSKILL[1].setAttribute("data-color", "green");
        tdSKILL[0].setAttribute("data-color", "red");
    }
    else {
        tdSKILL[1].setAttribute("data-color", "");
        tdSKILL[0].setAttribute("data-color", "");
    }
    //=======================================================
    if (totalStats[0].sight > totalStats[1].sight) {
        tdSIGHT[0].setAttribute("data-color", "green");
        tdSIGHT[1].setAttribute("data-color", "red");
    }
    else if (totalStats[0].sight < totalStats[1].sight) {
        tdSIGHT[1].setAttribute("data-color", "green");
        tdSIGHT[0].setAttribute("data-color", "red");
    }
    else {
        tdSIGHT[1].setAttribute("data-color", "");
        tdSIGHT[0].setAttribute("data-color", "");
    }
    //=======================================================
    if (totalStats[0].range > totalStats[1].range) {
        tdRANGE[0].setAttribute("data-color", "green");
        tdRANGE[1].setAttribute("data-color", "red");
    }
    else if (totalStats[0].range < totalStats[1].range) {
        tdRANGE[1].setAttribute("data-color", "green");
        tdRANGE[0].setAttribute("data-color", "red");
    }
    else {
        tdRANGE[1].setAttribute("data-color", "");
        tdRANGE[0].setAttribute("data-color", "");
    }
    //=======================================================
    if (totalStats[0].basicATK > totalStats[1].basicATK) {
        tdBASICATK[0].setAttribute("data-color", "green");
        tdBASICATK[1].setAttribute("data-color", "red");
    }
    else if (totalStats[0].basicATK < totalStats[1].basicATK) {
        tdBASICATK[1].setAttribute("data-color", "green");
        tdBASICATK[0].setAttribute("data-color", "red");
    }
    else {
        tdBASICATK[1].setAttribute("data-color", "");
        tdBASICATK[0].setAttribute("data-color", "");
    }
    //=======================================================
    if (totalStats[0].def > totalStats[1].def) {
        tdDEF[0].setAttribute("data-color", "green");
        tdDEF[1].setAttribute("data-color", "red");
    }
    else if (totalStats[0].def < totalStats[1].def) {
        tdDEF[1].setAttribute("data-color", "green");
        tdDEF[0].setAttribute("data-color", "red");
    }
    else {
        tdDEF[1].setAttribute("data-color", "");
        tdDEF[0].setAttribute("data-color", "");
    }
    //=======================================================
    if (totalStats[0].atkReduce == totalStats[1].atkReduce &&
        totalStats[0].skillReduce == totalStats[1].skillReduce) {
        tdREDUCE[1].setAttribute("data-color", "");
        tdREDUCE[0].setAttribute("data-color", "");
    }
    else if (totalStats[0].atkReduce >= totalStats[1].atkReduce &&
        totalStats[0].skillReduce >= totalStats[1].skillReduce) {
        tdREDUCE[0].setAttribute("data-color", "green");
        tdREDUCE[1].setAttribute("data-color", "red");
    }
    else if (totalStats[0].atkReduce <= totalStats[1].atkReduce &&
        totalStats[0].skillReduce <= totalStats[1].skillReduce) {
        tdREDUCE[1].setAttribute("data-color", "green");
        tdREDUCE[0].setAttribute("data-color", "red");
    }
    else {
        tdREDUCE[1].setAttribute("data-color", "orange");
        tdREDUCE[0].setAttribute("data-color", "orange");
    }
    //=======================================================
    if (totalStats[0].resist > totalStats[1].resist) {
        tdRESIST[0].setAttribute("data-color", "green");
        tdRESIST[1].setAttribute("data-color", "red");
    }
    else if (totalStats[0].resist < totalStats[1].resist) {
        tdRESIST[1].setAttribute("data-color", "green");
        tdRESIST[0].setAttribute("data-color", "red");
    }
    else {
        tdRESIST[1].setAttribute("data-color", "");
        tdRESIST[0].setAttribute("data-color", "");
    }
    //=======================================================
    if (totalStats[0].atkSPD > totalStats[1].atkSPD) {
        tdATKSPD[0].setAttribute("data-color", "green");
        tdATKSPD[1].setAttribute("data-color", "red");
    }
    else if (totalStats[0].atkSPD < totalStats[1].atkSPD) {
        tdATKSPD[1].setAttribute("data-color", "green");
        tdATKSPD[0].setAttribute("data-color", "red");
    }
    else {
        tdATKSPD[1].setAttribute("data-color", "");
        tdATKSPD[0].setAttribute("data-color", "");
    }
    //=======================================================
    if (totalStats[0].cooltime > totalStats[1].cooltime) {
        tdCOOLTIME[0].setAttribute("data-color", "green");
        tdCOOLTIME[1].setAttribute("data-color", "red");
    }
    else if (totalStats[0].cooltime < totalStats[1].cooltime) {
        tdCOOLTIME[1].setAttribute("data-color", "green");
        tdCOOLTIME[0].setAttribute("data-color", "red");
    }
    else {
        tdCOOLTIME[1].setAttribute("data-color", "");
        tdCOOLTIME[0].setAttribute("data-color", "");
    }
    if (totalStats[0].cooltime > 30) {
        tdCOOLTIME[0].setAttribute("data-color", "orange");
    }
    if (totalStats[1].cooltime > 30) {
        tdCOOLTIME[1].setAttribute("data-color", "orange");
    }
    //=======================================================
    if (totalStats[0].AP == totalStats[1].AP &&
        totalStats[0].APper == totalStats[1].APper) {
        tdAP[1].setAttribute("data-color", "");
        tdAP[0].setAttribute("data-color", "");
    }
    else if (totalStats[0].AP >= totalStats[1].AP &&
        totalStats[0].APper >= totalStats[1].APper) {
        tdAP[0].setAttribute("data-color", "green");
        tdAP[1].setAttribute("data-color", "red");
    }
    else if (totalStats[0].AP <= totalStats[1].AP &&
        totalStats[0].APper <= totalStats[1].APper) {
        tdAP[1].setAttribute("data-color", "green");
        tdAP[0].setAttribute("data-color", "red");
    }
    else {
        tdAP[1].setAttribute("data-color", "orange");
        tdAP[0].setAttribute("data-color", "orange");
    }
    //=======================================================
    if (totalStats[0].atkheal == totalStats[1].atkheal &&
        totalStats[0].skillheal == totalStats[1].skillheal) {
        tdHEAL[1].setAttribute("data-color", "");
        tdHEAL[0].setAttribute("data-color", "");
    }
    else if (totalStats[0].atkheal >= totalStats[1].atkheal &&
        totalStats[0].skillheal >= totalStats[1].skillheal) {
        tdHEAL[0].setAttribute("data-color", "green");
        tdHEAL[1].setAttribute("data-color", "red");
    }
    else if (totalStats[0].atkheal <= totalStats[1].atkheal &&
        totalStats[0].skillheal <= totalStats[1].skillheal) {
        tdHEAL[1].setAttribute("data-color", "green");
        tdHEAL[0].setAttribute("data-color", "red");
    }
    else {
        tdHEAL[1].setAttribute("data-color", "orange");
        tdHEAL[0].setAttribute("data-color", "orange");
    }
    //=======================================================
    if (totalStats[0].crit > totalStats[1].crit) {
        tdCRIT[0].setAttribute("data-color", "green");
        tdCRIT[1].setAttribute("data-color", "red");
    }
    else if (totalStats[0].crit < totalStats[1].crit) {
        tdCRIT[1].setAttribute("data-color", "green");
        tdCRIT[0].setAttribute("data-color", "red");
    }
    else {
        tdCRIT[1].setAttribute("data-color", "");
        tdCRIT[0].setAttribute("data-color", "");
    }
    //=======================================================
    if (totalStats[0].speed > totalStats[1].speed) {
        tdSPEED[0].setAttribute("data-color", "green");
        tdSPEED[1].setAttribute("data-color", "red");
    }
    else if (totalStats[0].speed < totalStats[1].speed) {
        tdSPEED[1].setAttribute("data-color", "green");
        tdSPEED[0].setAttribute("data-color", "red");
    }
    else {
        tdSPEED[1].setAttribute("data-color", "");
        tdSPEED[0].setAttribute("data-color", "");
    }
    //=======================================================
    if (totalStats[0].hp == totalStats[1].hp &&
        totalStats[0].hpRegen == totalStats[1].hpRegen) {
        tdHP[1].setAttribute("data-color", "");
        tdHP[0].setAttribute("data-color", "");
    }
    else if (totalStats[0].hp >= totalStats[1].hp &&
        totalStats[0].hpRegen >= totalStats[1].hpRegen) {
        tdHP[0].setAttribute("data-color", "green");
        tdHP[1].setAttribute("data-color", "red");
    }
    else if (totalStats[0].hp <= totalStats[1].hp &&
        totalStats[0].hpRegen <= totalStats[1].hpRegen) {
        tdHP[1].setAttribute("data-color", "green");
        tdHP[0].setAttribute("data-color", "red");
    }
    else {
        tdHP[1].setAttribute("data-color", "orange");
        tdHP[0].setAttribute("data-color", "orange");
    }
    //=======================================================
    if (totalStats[0].mp == totalStats[1].mp &&
        totalStats[0].mpRegen == totalStats[1].mpRegen) {
        tdMP[1].setAttribute("data-color", "");
        tdMP[0].setAttribute("data-color", "");
    }
    else if (totalStats[0].mp >= totalStats[1].mp &&
        totalStats[0].mpRegen >= totalStats[1].mpRegen) {
        tdMP[0].setAttribute("data-color", "green");
        tdMP[1].setAttribute("data-color", "red");
    }
    else if (totalStats[0].mp <= totalStats[1].mp &&
        totalStats[0].mpRegen <= totalStats[1].mpRegen) {
        tdMP[1].setAttribute("data-color", "green");
        tdMP[0].setAttribute("data-color", "red");
    }
    else {
        tdMP[1].setAttribute("data-color", "orange");
        tdMP[0].setAttribute("data-color", "orange");
    }
}