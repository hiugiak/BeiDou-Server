function start(ms) {
    const mapID = ms.getPlayer().getMapId();
    const mapObj = ms.getPlayer().getMap();
    switch (mapID) {
        case 930000000:
            mapObj.startMapEffect('你可以通过中央的传送点过去。我现在就给你施变身魔法。', 5120023);
            break;
        case 930000010:
            mapObj.startMapEffect('请你确认好自己的外貌，不要搞混了！', 5120023);
            break;
        case 930000100:
            mapObj.startMapEffect('除掉所有的怪物！', 5120023);
            break;
        case 930000200:
            mapObj.startMapEffect('在中央的水坑杀死怪物后，用水坑里稀释的毒素清除掉荆棘！', 5120023);
            break;
        case 930000300:
            mapObj.startMapEffect('大家都去哪儿了？快通过传送点到这里来！', 5120023);
            break;
        case 930000400:
            mapObj.startMapEffect('从我这里拿到净化之珠后，捕捉怪物，然后由队长把20个怪物之珠交给我！', 5120023);
            break;
        case 930000500:
            mapObj.startMapEffect('打开怪人桌子前的箱子，把紫色魔力石拿回来！', 5120023);
            break;
        case 930000600:
            mapObj.startMapEffect('把紫色魔力石放到怪人的祭坛上！', 5120023);
            break;
    }
}