/*
 便捷功能
 */

 var status;
 var text;
 var selstatus = -1;
 var itemList = new Array();
 var inventoryType;
 var deleteSlot;
 var deleteQuantity;
 
 function start() {
     status = -1;
     action(1, 0, 0);
 }
 
 function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 0 && status == 0) {
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        else {
            cm.dispose();
            return;
        }
        if (status == 0) {
            text = "#e- 请选择要删除的道具类型 -#n\r\n#d#e";
            text += "\t#L1#装备栏#l\r\n";
            text += "\t#L2#消耗栏#l\r\n";
            text += "\t#L4#其它栏#l\r\n";
            text += "\t#L3#设置栏#l\r\n";
            text += "\t#L5#特殊栏#l\r\n";
            cm.sendSimple(text);
        } else if (status == 1) {
            inventoryType = selection;
            itemList = cm.getInventory(inventoryType).list().iterator();
            text = "#e- 请选择要删除的道具 -#n\r\n\r\n#b";
            var indexof = 1;
            while (itemList.hasNext()) {
                var item = itemList.next();
                text += "#L" + item.getPosition() + "##v" + item.getItemId() + "#";
                if (indexof > 1 && indexof % 5 == 0) {
                    text += "\r\n";
                }
                indexof++;
            }
            cm.sendSimple(text);
        } else if (status == 2) {
            var item = cm.getInventory(inventoryType).getItem(selection);
            deleteSlot = selection;
            deleteQuantity = item.getQuantity();
            text = "#e确定要删除#r#v" + item.getItemId() + "##z" + item.getItemId() + "# " + deleteQuantity + "个 #k吗？";
            cm.sendNextPrev(text);
        } else if (status == 3) {
            cm.removeSlot(inventoryType, deleteSlot, deleteQuantity);
            cm.sendOk(""+inventoryType+deleteSlot+deleteQuantity+"删除成功，祝你游戏愉快~"+status+"");
            status = -1;
 
 
        }
    }
}