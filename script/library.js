import { navTo } from "./nav.js";
import { createCharacterFigure } from "./figure.js";

export { loadLibrary };

const libraryClickHandler = (e) => {
    const card = e.target.closest("card");
    if (!card) return;
    if (card.id === "add") {
	navTo("create_selector");
    } else {
	navTo("view", {characterId: card.id});
    }
};

/** Appends a card (as per #cardTemplate) to #deck */
const createCharacterCard = (name, images, idx) => {
    const card = document.getElementById("cardTemplate").content.cloneNode(true);
    card.getElementById("characterName").textContent = name;
    card.children[0].id = idx;
    card.children[0].appendChild(createCharacterFigure(images));
    document.getElementById("deck").appendChild(card);
};

const loadLibrary = () => {
    Object.entries(window.characters).forEach((character, idx) => createCharacterCard(...character, idx) );
    document.getElementById("library").addEventListener("click", libraryClickHandler, {});
};

const refreshLibrary = () => {};