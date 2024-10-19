function enter(pi) {
    switch (pi.getMapId()) {
        case 930000000:
            pi.playPortalSound();
            pi.warp(930000010, 0);
            pi.getPlayer().message("艾琳的变身魔法渗透进了身体。");
            return true;
        case 930000010:
            pi.playPortalSound();
            pi.warp(930000100, 0);
            return true;
        case 930000100:
            if (pi.getMap().getMonsters().size() == 0) {
                pi.playPortalSound();
                pi.warp(930000200, 0);
                return true;
            } else {
                pi.playerMessage(5, "除掉所有的怪物！");
                return false;
            }
        case 930000200:
            if (pi.getMap().getReactorByName("spine") != null && pi.getMap().getReactorByName("spine").getState() < 4) {
                pi.playerMessage(5, "荆棘草挡住了前进的道路。");
                return false;
            } else {
                pi.playPortalSound();
                pi.warp(930000300, 0); //assuming they cant get past reactor without it being gone
                return true;
            }
        default:
            pi.playerMessage(5, "This portal leads to an unbound path.");
            return false;
    }
}