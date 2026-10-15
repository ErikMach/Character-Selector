import { navTo } from "./nav.js";

export { loadCreateName };

const loadCreateName = () => {
    document.getElementById("nextBtn").addEventListener("click", () => {
	navTo("create_done", Object.assign({ character_name: document.getElementsByTagName("input")[0].value }, window.history.state));
    });
};