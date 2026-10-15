export { createCharacterFigure };

/** Returns a figure (as per #figureTemplate) populated with the provided `images` */
const createCharacterFigure = (images = []) => {
    const figure = document.getElementById("figureTemplate").content.cloneNode(true);
    images.forEach(imageName => {
	const bodyPart = imageName.split(".webp")[0].split("_")[2];
	const img = figure.querySelector(`.${bodyPart}`);
	img.src = "./assets/character_images/" + imageName;
	if (imageName.charAt(0) === "m") {
	    img.alt = "male" + imageName.split(".webp")[0].replaceAll("_", " ").slice(1);
	} else {
	    img.alt = "female" + imageName.split(".webp")[0].replaceAll("_", " ").slice(1);
	}
    });
    return figure;
};