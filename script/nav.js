import { loadLibrary } from "/script/library.js";
import { loadView } from "/script/view.js";
import { loadCreateSelector } from "/script/create_selector.js";
import { loadCreateName } from "/script/create_name.js";
import { loadCreateDone } from "/script/create_done.js";

export { navTo };

window.pages = Object.create(null);

["library", "view", "create_selector", "create_name", "create_done"].forEach(pageName => {
    Object.defineProperty(window.pages, pageName, {
	async get() {
	    let html = await fetch(`./page_templates/${pageName}.html`).then(res => res.text());
	    Object.defineProperty(window.pages, pageName, {value: html, configurable: false, writable: false, enumerable: true});
	    return html;
	},
	enumerable: false,
	configurable: true
    });
});


const loadPage = (pageName) => {
    switch (pageName) {
	case "library": loadLibrary(); break;
	case "view": loadView(); break;
	case "create_selector": loadCreateSelector(); break;
	case "create_name": loadCreateName(); break;
	case "create_done": loadCreateDone(); break;
	default: break;
    }
};

const navTo = async (pageName, state = {}) => {
    const newArticle = document.createElement("article");
    newArticle.innerHTML = await window.pages[pageName];
    document.getElementsByTagName("article")[0].replaceWith(newArticle.children[0]);
    window.history.pushState(state, "", `#${pageName}`);
    loadPage(pageName);
};

navTo("library");

window.addEventListener("popstate", () => navTo(window.location.hash.slice(1)) );










localStorage.setItem("DNDCharacters", '{"Nelson": "1111m", "Gabby":"1313m","Steve":"3311f"}');

const parseCharacters = (characters = {"Nelson": "1111m"}) => {
    const bodyParts = ["head", "body", "legs", "feet"];
    for (let name in characters) {
	const characterCode = characters[name];
	const gender = characterCode.slice(-1);
	characters[name] = characterCode
		.slice(0, -1)
		.split('')
		.map((raceCode, i) =>
		    [
			gender, 
			getRaceString(raceCode),
			bodyParts[i]
		    ]
			.join("_")
			.concat(".webp")
		);
    }
    return characters;
};


const getRaceString = (raceCode) => {
  const races = {
    1: 'human',
    2: 'elf',
    3: 'orc',
    4: 'dwarf'
  };
  return races[raceCode] || console.error("Race code not found!", raceCode);
}

window.characters = parseCharacters(JSON.parse(localStorage.getItem("DNDCharacters")));