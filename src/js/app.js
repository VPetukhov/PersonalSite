import { scrollNav } from "./components/scroll-nav";
import { helpAccordion } from "./components/help-accordion";
import { jumpBtn } from "./components/jump-btn";
import { popupMenu } from "./components/popup-menu";

scrollNav.init();

if(document.querySelector(".js-help-accordion") !== null)
helpAccordion.init();

if(document.querySelector(".js-jump") !== null)
jumpBtn.init();

if(document.querySelector(".js-menu-switcher") !== null)
	popupMenu.init();