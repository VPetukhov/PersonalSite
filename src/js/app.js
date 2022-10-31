import { scrollNav } from "./components/scroll-nav";
import { skillsAccordion } from "./components/skills-accordion";
import { jumpBtn } from "./components/jump-btn";
import { popupMenu } from "./components/popup-menu";
import { copyClipboard } from "./components/copy-clipboard";
import { relevantShowMore } from "./components/relevant-show-more";

scrollNav.init();

if(document.querySelector(".js-skills-accordion") !== null)
skillsAccordion.init();

if(document.querySelector(".js-jump") !== null)
jumpBtn.init();

if(document.querySelector(".js-menu-switcher") !== null)
	popupMenu.init();

if(document.querySelector(".js-clipboard") !== null)
	copyClipboard.init();

if(document.querySelector(".js-relevant-show-more") !== null)
relevantShowMore.init();