var status = 0;
var selectedType = -1;
var selectedItem = -1;
var item;
var mats;
var matQty;
var cost;
var qty;
var equip;

function start() {
    cm.getPlayer().setCS(true);
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        cm.dispose();
    }
    if (status == 0 && mode == 1) {
        var selStr = "这里是兑换中心，现在开放了一些物品的兑换\r\n您看看有什么感兴趣的？#b"
        var options = ["兑换装备", "兑换装备2", "兑换正向混沌卷轴", "兑换其他物品"];
        for (var i = 0; i < options.length; i++) {
            selStr += "\r\n#L" + i + "# " + options[i] + "#l";
        }

        cm.sendSimple(selStr);
    } else if (status == 1 && mode == 1) {
        selectedType = selection;
        if (selectedType == 0) { 
            var selStr = "好的，那么你想兑换哪样装备呢呢？#b";
            var items = ["#i1082003##t1082003##k - 战士 Lv. 10#b", "#i1082000##t1082000##k - 战士 Lv. 15#b", "#i1082004##t1082004##k - 战士 Lv. 20#b", "#i1082001##t1082001##k - 战士 Lv. 25#b",
                         "#i1082007##t1082007##k - 战士 Lv. 30#b", "#i1082008##t1082008##k - 战士 Lv. 35#b", "#i1082023##t1082023##k - 战士 Lv. 40#b", "#i1082009##t1082009##k - 战士 Lv. 50#b", "#i1082059##t1082059##k - 战士 Lv. 60#b"];
            for (var i = 0; i < items.length; i++) {
                selStr += "\r\n#L" + i + "# " + items[i] + "#l";
            }
            cm.sendSimple(selStr);
            equip = true;
        } else if (selectedType == 1) { 
            var selStr = "你想兑换哪种物品？#b";
            var crystals = ["#v4001084:##t4001084#兑换#v2049122:##t2049122##k", "#v1002357##t1002357#兑换#v2049122:##t2049122##k", "#v1122000##t1122000#兑换#v2049122:##t2049122##k", "#i1082036##t1082036##k - 战士 Lv. 35#b",
                            "#i1082024##t1082024##k - 战士 Lv. 40#b", "#i1082025##t1082025##k - 战士 Lv. 40#b", "#i1082010##t1082010##k - 战士 Lv. 50#b", "#i1082011##t1082011##k - 战士 Lv. 50#b",
                            "#i1082060##t1082060##k - 战士 Lv. 60#b", "#i1082061##t1082061##k - 战士 Lv. 60#b"];
            for (var i = 0; i < crystals.length; i++) {
                selStr += "\r\n#L" + i + "# " + crystals[i] + "#l";
            }
            cm.sendSimple(selStr);
            equip = true;
        } else if (selectedType == 2) { 
            var selStr = "你想如何兑换？#b";
            var materials = ["#k#v2049100#30个#t2049100#兑换#v2049122:##t2049122#", "#k#v4001084##t4001084#兑换#v2049122:##t2049122#", "#v1002357##t1002357#兑换#v2049122:##t2049122#", "#v1122000##t1122000#兑换#v2049122:##t2049122#",
                 "#v4000245#20个#t4000245#兑换#v2049122:##t2049122#", "#v4000244#20个#t4000244#兑换#v2049122:##t2049122#", "#v4020009#15个#t4020009#兑换#v2049122:##t2049122#"];
            for (var i = 0; i < materials.length; i++) {
                selStr += "\r\n#L" + i + "# " + materials[i] + "#l";
            }
            cm.sendSimple(selStr);
            equip = false;
        } else if (selectedType == 3) { 
            var selStr = "你想兑换哪种物品？#b";
            var materials = ["#k#v4001084##t4001084#兑换#v2049122:##t2049122#", "#v1002357##t1002357#兑换#v2049122:##t2049122#", "#v1122000##t1122000#兑换#v2049122:##t2049122#",
                 "#v4000245##t4000245#兑换#v2049122:##t2049122#", "#v4000244##t4000244#兑换#v2049122:##t2049122#", "#v4020009##t4020009#兑换#v2049122:##t2049122#"];
            for (var i = 0; i < materials.length; i++) {
                selStr += "\r\n#L" + i + "# " + materials[i] + "#l";
            }
            cm.sendSimple(selStr);
            equip = false;
        }
        if (equip) {
            status++;
        }
    } else if (status == 2 && mode == 1) {
        selectedItem = selection;
        if (selectedType == 2) { 
            var itemSet = [2049122, 2049122, 2049122, 2049122, 2049122, 2049122, 2049122];
            var matSet = [2049100, 4001084, 1002357, 1122000, 4000245, 4000244, 4020009];
            var matQtySet = [30, 10, 1, 1, 20, 20, 15];
            var costSet = [0, 0, 0, 0, 0, 0];
            item = itemSet[selectedItem];
            mats = matSet[selectedItem];
            matQty = matQtySet[selectedItem];
            cost = costSet[selectedItem];
        }else if (selectedType == 3) { 
            var itemSet = [2049122, 2049122, 2049122, 2049122, 2049122, 2049122];
            var matSet = [4001084, 1002357, 1122000, 4000245, 4000244, 4020009];
            var matQtySet = [10, 1, 1, 10, 10, 10];
            var costSet = [0, 0, 0, 0, 0, 0];
            item = itemSet[selectedItem];
            mats = matSet[selectedItem];
            matQty = matQtySet[selectedItem];
            cost = costSet[selectedItem];
        }

        var prompt = "那么，你打算兑换多少#t" + item + "#？#v" + item + ":#\r\n ";

        cm.sendGetNumber(prompt, 1, 1, 100)
    } else if (status == 3 && mode == 1) {
        if (equip) {
            selectedItem = selection;
            qty = 1;
        } else {
            qty = (selection > 0) ? selection : (selection < 0 ? -selection : 1);
        }

        if (selectedType == 0) { //glove refine
            var itemSet = [1082003, 1082000, 1082004, 1082001, 1082007, 1082008, 1082023, 1082009, 1082059];
            var matSet = [[4000021, 4011001], 4011001, [4000021, 4011000], 4011001, [4011000, 4011001, 4003000], [4000021, 4011001, 4003000], [4000021, 4011001, 4003000],
                [4011001, 4021007, 4000030, 4003000], [4011007, 4011000, 4011006, 4000030, 4003000]];
            var matQtySet = [[15, 1], 2, [40, 2], 2, [3, 2, 15], [30, 4, 15], [50, 5, 40], [3, 2, 30, 45], [1, 8, 2, 50, 50]];
            var costSet = [1000, 2000, 5000, 10000, 20000, 30000, 40000, 50000, 70000];
            item = itemSet[selectedItem];
            mats = matSet[selectedItem];
            matQty = matQtySet[selectedItem];
            cost = costSet[selectedItem];
        } else if (selectedType == 1) { //glove upgrade
            var itemSet = [2049122, 2049122, 2049122, 1082036, 1082024, 1082025, 1082010, 1082011, 1082060, 1082061];
            var matSet = [4001084, 1002357, 1122000, [1082008, 4021008], [1082023, 4011003], [1082023, 4021008],
                [1082009, 4011002], [1082009, 4011006], [1082059, 4011002, 4021005], [1082059, 4021007, 4021008]];
            var matQtySet = [10, 1, 1, [1, 1], [1, 4], [1, 2], [1, 5], [1, 4], [1, 3, 5], [1, 2, 2]];
            var costSet = [20000, 25000, 30000, 40000, 45000, 50000, 55000, 60000, 70000, 80000];
            item = itemSet[selectedItem];
            mats = matSet[selectedItem];
            matQty = matQtySet[selectedItem];
            cost = costSet[selectedItem];
        }

        var prompt = "是否在此兑换 ";
        if (qty == 1) {
            prompt += "一个 #v" + item + ":##t" + item + "#?";
        } else {
            prompt += qty + " 个#t" + item + "#?";
        }

        prompt += "\r\n兑换需要以下材料。请确保你的背包有足够的空间！#b\r\n";

        if (mats instanceof Array) {
            for (var i = 0; i < mats.length; i++) {
                prompt += "\r\n#v" + mats[i] + ":# " + matQty[i] * qty + " 个#t" + mats[i] + "#";
            }
        } else {
            prompt += "\r\n#v" + mats + ":# " + matQty * qty + " 个#t" + mats + "#";
        }

        if (cost > 0) {
            prompt += "\r\n#i4031138# " + cost * qty + " meso";
        }

        cm.sendYesNo(prompt);
    } else if (status == 4 && mode == 1) {
        var complete = true;
        var recvItem = item, recvQty;

        if (item == 4003000)//screws
        {
            recvQty = 15 * qty;
        } else {
            recvQty = qty;
        }

        if (!cm.canHold(recvItem, recvQty)) {
            cm.sendOk("首先检查你的物品栏是否有空位。");
            cm.dispose();
            return;
        } else if (cm.getMeso() < cost * qty) {
            cm.sendOk("你钱没带够呢，找人借点金币吧！");
            cm.dispose();
            return;
        } else {
            if (mats instanceof Array) {
                for (var i = 0; complete && i < mats.length; i++) {
                    if (!cm.haveItem(mats[i], matQty[i] * qty)) {
                        complete = false;
                    }
                }
            } else if (!cm.haveItem(mats, matQty * qty)) {
                complete = false;
            }
        }

        if (!complete) {
            cm.sendOk("大哥别逗我了，凑够材料再来换吧！");
        } else {
            if (mats instanceof Array) {
                for (var i = 0; i < mats.length; i++) {
                    cm.gainItem(mats[i], -matQty[i] * qty);
                }
            } else {
                cm.gainItem(mats, -matQty * qty);
            }

            if (cost > 0) {
                cm.gainMeso(-cost * qty);
            }

            cm.gainItem(recvItem, recvQty, true, true);
            cm.sendOk("兑换成功，欢迎下次光临");
        }
        cm.dispose();
    }
}