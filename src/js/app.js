import { helpAccordion } from "./components/help-accordion";
import { jumpBtn } from "./components/jump-btn";

if(document.querySelector(".js-help-accordion") !== null)
helpAccordion.init();

if(document.querySelector(".js-jump") !== null)
jumpBtn.init();