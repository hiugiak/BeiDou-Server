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
/* Denma the Owner
	Henesys VIP Eye Change.

        GMS-like revised by Ronan -- contents found thanks to Mitsune (GamerBewbs), Waltzing, AyumiLove
*/
var status = 0;
var beauty = 0;
var price = 1000000;
var mface_v = Array(20000, 20001, 20002, 20003, 20004, 20005, 20006, 20007, 20008, 20009, 20010,
    20011, 20012, 20013, 20014, 20016, 20017, 20018, 20019, 20020, 20021, 20022, 20023, 20024, 20025, 20026,
    20027, 20029, 20031, 20032, 20800, 20801, 20802, 20803, 20804, 20805, 20806, 20807, 20808, 20809, 20810,
    20811, 20812, 20813, 20814, 20816, 20817, 20818, 20819, 20820, 20821, 20822, 20823, 20824, 20826, 20828);
var fface_v = Array(21000, 21001, 21002, 21003, 21004, 21005, 21006, 21007, 21008, 21009, 21010,
    21011, 21012, 21013, 21014, 21016, 21017, 21018, 21019, 21020, 21021, 21022, 21023, 21024, 21025, 21026,
    21027, 21029, 21030, 21800, 21801, 21802, 21803, 21804, 21805, 21806, 21807, 21808, 21809, 21810,
    21811, 21812, 21813, 21814, 21816, 21817, 21818, 21819, 21820, 21821, 21822, 21823, 21824, 21825, 21826);
var facenew = Array();

function pushIfItemExists(array, itemid) {
    if ((itemid = cm.getCosmeticItem(itemid)) != -1 && !cm.isCosmeticEquipped(itemid)) {
        array.push(itemid);
    }
}

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode < 1)  // disposing issue with stylishs found thanks to Vcoc
    {
        cm.dispose();
    } else {
        if (mode == 1) {
            status++;
        } else {
            status--;
        }
        if (status == 0) {
            cm.sendSimple("Well, hello! Welcome to the Henesys Plastic Surgery! Would you like to transform your face into something new? With a #b#t5152001##k, you can let us take care of the rest and have the face you've always wanted~!\r\n#L2#Plastic Surgery: #i5152001##t5152001##l");
        } else if (status == 1) {
            if (selection == 2) {
                facenew = Array();
                if (cm.getPlayer().getGender() == 0) {
                    for (var i = 0; i < mface_v.length; i++) {
                        pushIfItemExists(facenew, mface_v[i] + cm.getPlayer().getFace() % 1000 - (cm.getPlayer().getFace() % 100));
                    }
                }
                if (cm.getPlayer().getGender() == 1) {
                    for (var i = 0; i < fface_v.length; i++) {
                        pushIfItemExists(facenew, fface_v[i] + cm.getPlayer().getFace() % 1000 - (cm.getPlayer().getFace() % 100));
                    }
                }
                cm.sendStyle("Let's see... I can totally transform your face into something new. Don't you want to try it? For #b#t5152001##k, you can get the face of your liking. Take your time in choosing the face of your preference.", facenew);
            }
        } else if (status == 2) {
            cm.dispose();
            if (cm.haveItem(5152001) == true) {
                cm.gainItem(5152001, -1);
                cm.setFace(facenew[selection]);
                cm.sendOk("Enjoy your new and improved face!");
            } else {
                cm.sendOk("Hmm ... it looks like you don't have the coupon specifically for this place. Sorry to say this, but without the coupon, there's no plastic surgery for you...");
            }
        }
    }
}
