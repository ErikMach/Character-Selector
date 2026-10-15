import { createCharacterFigure } from "/script/figure.js";
import { navTo } from "/script/nav.js";

export { loadCreateDone };

const loadCreateDone = () => {
    let {character_name, character_map} = window.history.state;
    window.characters[character_name] = character_map;

    document.getElementById("character_name").textContent += character_name;
    document.getElementById("create_done").append(createCharacterFigure(character_map));

    document.getElementById("nextBtn").addEventListener("click", () => {
	navTo("library");
    });
};