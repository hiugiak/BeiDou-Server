/*
	This file is part of the OdinMS Maple Story Server
    Copyright (C) 2008 Patrick Huy <patrick.huy@frz.cc>
		       Matthias Butz <matze@odinms.de>
		       Jan Christian Meyer <vimes@odinms.de>

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as
    published by the Free Software Foundation version 3 as published by
    the Free Software Foundation. You may not use, modify or distribute
    this program under any other version of the GNU Affero General Public
    License.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

/**
 *Crystal of Roots
 *@Author: Ronan
 *@NPC: Crystal of Roots
 */
function start() {
    if (cm.getMapId() == 240060000||cm.getMapId() == 240060100||cm.getMapId() == 240060200) {
        if (!cm.getEventInstance().isEventCleared()) {
            cm.sendYesNo("你想要离开吗？");
        } else {
            cm.sendYesNo("你们终于打败了暗黑龙王，真是太厉害啦！点击确定可离开这里并获得2颗暗黑龙王石以及30000点券。");
        }
    } else {
        cm.sendYesNo("你想要离开吗？");
    }
}

function action(mode, type, selection) {
    if (mode < 1) {
        cm.dispose();
    } else {
        if (cm.getMapId() == 240060000||cm.getMapId() == 240060100||cm.getMapId() == 240060200) {
            if (!cm.getEventInstance().isEventCleared()) {
                cm.warp(240050600);
            } else {
                cm.warp(240050600);
                cm.gainItem(2041200, 2)
                cm.getPlayer().getCashShop().gainCash(1, 30000);
            }
        } else {
            cm.warp(240040700, "out00");
        }

        cm.dispose();
    }
}