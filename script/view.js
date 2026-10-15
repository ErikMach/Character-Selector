import { createCharacterFigure } from "/script/figure.js";
export { loadView };

const loadView = () => {
    const character = Object.entries(window.characters)[window.history.state.characterId];
    document.getElementById("character_name").textContent = character[0];
    document.getElementById("view").append(createCharacterFigure(character[1]));
};