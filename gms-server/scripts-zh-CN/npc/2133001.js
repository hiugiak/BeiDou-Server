/**
 * @author: Ronan
 * @npc: Ellin
 * @map: Ellin PQ
 * @func: Ellin PQ Coordinator
 */

var status = 0;
var mapid;

function start() {
    mapid = cm.getPlayer().getMapId();

    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    switch (mapid) {
        case 930000000:
            return messageWithLeaveOption('好了，现在必须进入怪人所在的森林了。但是在这之前，我要先把你变成阿尔泰营地的成员。', mode, type, selection);
        case 930000010:
            return messageWithLeaveOption('请你确认好自己的外貌，不要搞混了！', mode, type, selection);
        case 930000100:
            return messageWithLeaveOption('因为苔藓木妖，森林受到了毒素的污染。你去把苔藓木妖全部消灭掉！', mode, type, selection);
        case 930000200:
            return messageWithLeaveOption('一棵巨大的荆棘草挡住了前进的道路。我们必须从#b#o9300173##k身上拿到毒素来清除荆棘草。但自然状态下的毒素浓度太高，我们无法处理。可以使用那边的#b水坑#k来稀释它。', mode, type, selection);
        case 930000300:
            return onThirdStage(mode, type, selection);
        case 930000400:
            return onFourthStage(mode, type, selection);
        case 930000600:
            return messageWithLeaveOption('把紫色魔力石放到怪人的祭坛上！', mode, type, selection);
        case 930000700:
            return messageWithLeaveOption('你们做到了！非常感谢你们净化了森林！', mode, type, selection);
        default:
            return messageWithLeaveOption('', mode, type, selection);
    }
}

var leaveConfirmStatus = -1;
function messageWithLeaveOption(tips, mode, type, selection) {
    if (mode == -1) { // END CHAT
        return cm.dispose();
    }

    if (type == 0 && mode == 0) {
        leaveConfirmStatus--;
    } else {
        leaveConfirmStatus++;
    }

    switch (leaveConfirmStatus) {
        case 0:
            return cm.sendSimple(tips + '\r\n\r\n#L0##b离开#m930000000#。#k#l');
        case 1:
            if (mode == 1 && selection == 0) {
                return cm.sendYesNo('你的队友可能还在努力尝试，你确定要离开吗？');
            }
            return cm.dispose();
        case 2:
            if (mode == 1) {
                return cm.warp(930000800, 0);
            }
            return cm.dispose();
        default:
            return cm.dispose();
    }
}

function onThirdStage(mode, type, selection) {
    if (mode == -1) { // END CHAT
        return cm.dispose();
    }

    if (type == 0 && mode == 0) {
        status--;
    } else {
        status++;
    }

    if (type == 1 && mode == 0) { // NO
        return cm.dispose();
    } else if (mode == 1) { // YES
        cm.getEventInstance().warpEventTeam(930000400);
        return cm.dispose();
    }

    var eim = cm.getEventInstance();
    if (eim.getIntProperty("statusStg4") == 0) {
        eim.showClearEffect(cm.getMap().getId());
        eim.setIntProperty("statusStg4", 1);
    }
    cm.sendYesNo('吁……还好你来到了这里。我们继续前进吧？')
}

function onFourthStage(mode, type, selection) {
    if (mode == -1) { // END CHAT
        return cm.dispose();
    }

    if (type == 0 && mode == 0) {
        status--;
    } else {
        status++;
    }

    if (cm.haveItem(4001169, 20)) {
        if (!cm.isEventLeader()) {
            cm.sendOk('请由队长把20个#t4001169#交给我！');
            return cm.dispose();
        }

        if (status == 0) {
            return cm.sendYesNo('#t4001169#全部搜集到啦！要继续前进吗？');
        } else if (mode == 1) {
            cm.gainItem(4001169, -20);
            cm.getEventInstance().warpEventTeam(930000500);
        }
        return cm.dispose();
    }

    if (cm.getEventInstance().gridCheck(cm.getPlayer()) != 1) {
        cm.sendNext('#b#o9300175##k占领了这片区域。然而它们不是普通的怪物，它们长得很快，#r普通的武器和魔法对它没有任何伤害#k，必须使用#b#t2270004##k来净化它们！');
        cm.getEventInstance().gridInsert(cm.getPlayer(), 1);
        status = -1;
        return;
    }

    var mobs = cm.getMap().countMonsters();
    if (mobs == 0) {
        return messageWithLeaveOption('请由队长把20个#t4001169#拿给我！', mode, type, selection);
    }

    if (cm.haveItem(2270004)) {
        return messageWithLeaveOption('从我这里拿到#p2270004#后，捕捉怪物，然后由队长把20个#t4001169#拿给我！', mode, type, selection);
    }

    if (!cm.canHold(2270004, 10)) {
        cm.sendOk("在领取#t2270004#之前，请确保你的背包消耗栏有足够的空间！");
        cm.dispose();
    }

    cm.gainItem(2270004, 10);
    cm.sendOk("这是10个#t2270004#。先削弱#o9300175#的力量，#r一旦它的生命值降低，使用#t2270004#来捕捉它们。");
    return cm.dispose();
}