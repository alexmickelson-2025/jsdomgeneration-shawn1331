import { animals } from "./animals.js";

console.log(animals[0]); // example showing you can use the animals array and that this code is running correctly

const mainCardContainer = document.getElementById("card-container-id");
mainCardContainer.replaceChildren();

function CreateCard(animal) {
  const cardContainer = document.createElement("div");
  cardContainer.className = "card";
  const cardTextContainer = document.createElement("div");
  cardTextContainer.className = "card-text";
  const textElement = document.createElement("p");
  textElement.textContent = animal.description;
  const imageElement = document.createElement("img");
  imageElement.src = animal.image;
  const titleElement = document.createElement("h2");
  titleElement.textContent = animal.title;
  cardContainer.appendChild(imageElement);
  cardContainer.appendChild(cardTextContainer);
  cardTextContainer.appendChild(titleElement);
  cardTextContainer.appendChild(textElement); 
  return cardContainer;
}

function Render(list){
  if(list.length === 0){
    const msg = document.createElement("p");
    msg.textContent = "No results found";
    mainCardContainer.replaceChildren(msg);
  }
  else{
    mainCardContainer.replaceChildren(...list.map(CreateCard));
  }
}

function GetQueryTerm(){
  const urlParams = new URLSearchParams(window.location.search);
  const value = urlParams.get("filter") || "";
  return decodeURIComponent(value.split("+").join(" ")).trim().toLowerCase();
}

function FilterAnimals(term){
  if(term === ""){
    return animals;
  }
  return animals.filter(animal =>
    animal.title.toLowerCase().includes(term) ||
    animal.description.toLowerCase().includes(term)
  );
}

const queryTerm = GetQueryTerm();
const filteredAnimals = FilterAnimals(queryTerm);
Render(filteredAnimals);