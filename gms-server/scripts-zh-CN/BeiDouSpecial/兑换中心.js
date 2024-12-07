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
        var options = ["坐骑兑换", "选项二暂没想好", "兑换正向混沌卷轴", "兑换其他物品暂没想好"];
        for (var i = 0; i < options.length; i++) {
            selStr += "\r\n#L" + i + "# " + options[i] + "#l";
        }

        cm.sendSimple(selStr);
    } else if (status == 1 && mode == 1) {
        selectedType = selection;
        if (selectedType == 0) { 
            var selStr = "好的，那么你想兑换啥？#b";
            var items = ["#k用#t1902002#兑换#k#v1902018:##t1902018#", "#k用#t1902018#兑换#k#v1902002:##t1902002#",
                "#k用#t1912000#兑换#k#v1912011:##t1912011#：狼系列坐骑鞍", "#k用#t1912011#兑换#k#v1912000:##t1912000#：冒险家坐骑鞍"];
            for (var i = 0; i < items.length; i++) {
                selStr += "\r\n#L" + i + "# " + items[i] + "#l";
            }
            cm.sendSimple(selStr);
            equip = true;
        } else if (selectedType == 1) { 
            var selStr = "你想兑换哪种物品？#b";
            var crystals = ["#k#v1052081:##t1052081#", "#k#v1002562:##t1002562#"];
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
            var materials = ["#k#v4030012#50个#t4030012#兑换#k#v2100902:#神秘召唤包"];
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
            var itemSet = [2100902];
            var matSet = [4030012];
            var matQtySet = [50];
            var costSet = [0];
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

        if (selectedType == 0) { 
            var itemSet = [1902018, 1902002, 1912011, 1912011];
            var matSet = [1902002, 1902018, 1912000, 1912011];
            var matQtySet = [1, 1, 1, 1];
            var costSet = [10000000, 10000000, 5000000, 5000000,];
            item = itemSet[selectedItem];
            mats = matSet[selectedItem];
            matQty = matQtySet[selectedItem];
            cost = costSet[selectedItem];
        } else if (selectedType == 1) { 
            var itemSet = [1052081, 1002562];
            var matSet = [2010009, [2010009, 2010003]];
            var matQtySet = [10, [5, 5]];
            var costSet = [1000, 1000];
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