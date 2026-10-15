import { navTo } from "./nav.js";
import { createCharacterFigure } from "./figure.js";

export { loadCreateSelector };


const races = [
    'human',
    'elf',
    'orc',
    'dwarf'
];

class Cycle extends Array {
    #current = 0;
    constructor(...data) {
	super(...data);
    }
    back() {
	this.#current = --this.#current % this.length;
	return this.at(this.#current);
    }
    next() {
	this.#current = ++this.#current % this.length;
	return this.at(this.#current);
    }
}

const bodyParts = { 
    head: new Cycle(...races),
    body: new Cycle(...races),
    legs: new Cycle(...races),
    feet: new Cycle(...races),
};

const loadCreateSelector = () => {
    document.getElementsByTagName("fieldset")[0].addEventListener('input', (e) => {
	let gender = e.target.id.slice(0, 1);
	for (const img of document.getElementsByTagName("img")) {
	    img.src = img.src.replace(/\/[mf]_/, `/${gender}_`);
	}
    });
    for (const backArrow of document.getElementsByTagName("l-arrow")) {
	backArrow.addEventListener("click", () => {
	    const part = bodyParts[backArrow.parentElement.className].back();
	    let c = backArrow.parentElement.getElementsByTagName("img")[0].src;
	    // replace the bodyPart in the src with the new part
	    backArrow.parentElement.getElementsByTagName("img")[0].src = c.split('_').with(-2, part).join('_');
	});
    }
    for (const nextArrow of document.getElementsByTagName("r-arrow")) {
	nextArrow.addEventListener("click", () => {
	    const part = bodyParts[nextArrow.parentElement.className].next();
	    let c = nextArrow.parentElement.getElementsByTagName("img")[0].src;
	    nextArrow.parentElement.getElementsByTagName("img")[0].src = c.split('_').with(-2, part).join('_');
	});
    }
    document.getElementById("nextBtn").addEventListener("click", () => {
	const characterMap = Array.from(document.getElementsByTagName("img"))
	    .map(img => img.src.split('/').pop());
	navTo("create_name", { character_map: characterMap });
    });
};