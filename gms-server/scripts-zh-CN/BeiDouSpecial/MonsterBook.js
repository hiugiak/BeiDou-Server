var status = -1;
var sel = -1;

const ringInfoList = [
    { ID: 1119000, materialID: 0 },
    { ID: 1119001, materialID: 4021000 },
    { ID: 1119002, materialID: 4021001 },
    { ID: 1119003, materialID: 4021002 },
    { ID: 1119004, materialID: 4021003 },
    { ID: 1119005, materialID: 4021004 },
    { ID: 1119006, materialID: 4021005 },
    { ID: 1119007, materialID: 4021006 },
    { ID: 1119008, materialID: 4021007 },
    { ID: 1119009, materialID: 4021008 },
    { ID: 1119010, materialID: 4021009 },
    { ID: 1119011, materialID: 4011007 },
    { ID: 1119012, materialID: 4001085 },
    { ID: 1119013, materialID: 4001084 }
];

function start() {
    status = -1;
    sel = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        return cm.dispose();
    }

    if (type == 0 && mode == 0) {
        status--;
    } else {
        status++;
    }

    const InventoryType = Java.type('org.gms.client.inventory.InventoryType');
    switch (status) {
        case 0:
            var text = `#r目前卡组数量为: ${countCardSet()}#k，要兑换戒指吗？`;
            for (var i = 0; i < ringInfoList.length; i++) {
                text += `\r\n#b#L${i}##t${ringInfoList[i].ID}##l#k`;
            }
            return cm.sendSimple(text);
        case 1:
            if (type == 4 && mode == 0) {
                return cm.dispose();
            }
            sel = selection;
            if (!playerCanHoldRing(sel)) {
                cm.sendOk('身上已有其它怪物卡戒指，无法兑换。');
                return cm.dispose();
            }
            if (sel == 0) {
                cm.gainItem(ringInfoList[0].ID, 1);
                return cm.dispose();
            }
            return showRequirement(sel);
        case 2:
            if (type == 1 && mode == 0) {
                return cm.dispose();
            }

            const cardSetCountRequirement = sel * 30;
            const ringInfo = ringInfoList[sel];
            const lastStageRingID = sel > 0 ? ringInfoList[sel - 1].ID : 0;
            const materialID = ringInfo.materialID;

            if (lastStageRingID > 0 && !cm.haveItem(lastStageRingID, 1)) {
                cm.sendOk(`需要拥有#i${lastStageRingID}# #t${lastStageRingID}#`);
                return cm.dispose();
            }

            if (countCardSet() < cardSetCountRequirement) {
                cm.sendOk(`已收集的怪物卡片数量不足${cardSetCountRequirement}组，目前卡组数量为: ${countCardSet()}`);
                return cm.dispose();
            }

            if (materialID > 0 && !cm.haveItem(materialID, 10)) {
                cm.sendOk(`拥有的#i${materialID}# #t${materialID}#数量不足10个。`);
                return cm.dispose();
            }

            if (!cm.canHold(ringInfo.ID)) {
                cm.sendOk('装备栏空间不足');
                return cm.dispose();
            }

            cm.gainItem(ringInfo.ID, 1);
            if (lastStageRingID > 0) {
                cm.gainItem(lastStageRingID, -1);
            }
            if (materialID > 0) {
                cm.gainItem(materialID, -10);
            }
            return cm.dispose();
        default:
            return cm.dispose();

    }
}

function showRequirement(ringIndex) {
    const cardSetCountRequirement = ringIndex * 30;
    const ringInfo = ringInfoList[ringIndex];
    const lastStageRingID = ringIndex > 0 ? ringInfoList[ringIndex - 1].ID : 0;
    const materialID = ringInfo.materialID;

    var text = `兑换#t${ringInfo.ID}#需要`;
    if (cardSetCountRequirement > 0) {
        text += `#b怪物卡片 ${cardSetCountRequirement} 组#k以及`
    }
    text += '以下材料：\r\n\r\n'
    if (materialID > 0) {
        text += `#i${materialID}# #b#t${materialID}# 10 个#k`;
    }
    if (lastStageRingID > 0) {
        text += `\r\n\r\n#i${lastStageRingID}# #b#t${lastStageRingID}##k`;
    }
    cm.sendNext(text);
}

function countCardSet() {
    const monsterBook = cm.getPlayer().getMonsterBook();
    const cards = monsterBook.getCards();
    var cardSetGreaterThanFive = 0;
    for (const cardID of cards.keySet().toArray()) {
        if (cards.get(cardID) >= 5) {
            cardSetGreaterThanFive++;
        }
    }
    return cardSetGreaterThanFive;
}

function playerCanHoldRing(targetRingIndex) {
    const InventoryType = Java.type('org.gms.client.inventory.InventoryType');
    const inventory = cm.getPlayer().getInventory(InventoryType.EQUIP);
    for (var i = 0; i < ringInfoList.length; i++) {
        if (i == targetRingIndex - 1) {
            continue;
        }
        if (inventory.countById(ringInfoList[i].ID) > 0) {
            return false;
        }
    }
    return true; 
}