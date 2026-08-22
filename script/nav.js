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