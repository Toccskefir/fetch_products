import { AllProduct, Product } from "./product";

const buttonAll = document.getElementById("buttonAll");
const buttonABC = document.getElementById("buttonABC");
const buttonMostExpensive = document.getElementById("buttonMostExpensive");
const buttonSearch = document.getElementById("buttonSearch");
const buttonSuggest = document.getElementById("buttonSuggest");
const divList = document.getElementById("divList");
let content: AllProduct;

async function load() {
  let result = await fetch("products.json");
  if (!result.ok) {
    throw new Error("Hiba történt a betöltésnél");
  } else {
    content = await result.json() as AllProduct;
  }
}

function adatMegjelenites(termekLista: Product[]) {
  divList!.innerHTML = "";
  const ul = document.createElement("ul");
  termekLista.forEach(e => {
    const ul2 = document.createElement("ul");
    const li1 = document.createElement("li");
    const li2 = document.createElement("li");
    const li3 = document.createElement("li");
    const li4 = document.createElement("li");
    const li5 = document.createElement("li");
    const li6 = document.createElement("li");
    const li7 = document.createElement("li");
    const li8 = document.createElement("li");

    li1.textContent = e.title;
    li2.textContent = e.description;
    li3.textContent = "Price: " + e.price.toString() + "$";
    li4.textContent = "Discount: " + e.discountPercentage.toString() + "%";
    li5.textContent = "Rating: " + e.rating.toString();
    li6.textContent = "Stock: " + e.stock.toString();
    li7.textContent = "Brand: " + e.brand;
    li8.textContent = "Category: " + e.category;

    ul2.appendChild(li2);
    ul2.appendChild(li3);
    ul2.appendChild(li4);
    ul2.appendChild(li5);
    ul2.appendChild(li6);
    ul2.appendChild(li7);
    ul2.appendChild(li8);
    ul.appendChild(li1);
    ul.appendChild(ul2);
  });

  divList!.appendChild(ul);
}

document.addEventListener("DOMContentLoaded", load);

buttonAll!.addEventListener("click", () => {
  adatMegjelenites(content.products);
});

buttonABC!.addEventListener("click", () => {
  let productListABC = Array.from(content.products);
  productListABC.sort((a,b) => a.title.localeCompare(b.title));
  adatMegjelenites(productListABC);
});

buttonMostExpensive!.addEventListener("click", () => {
  let productListExpense = Array.from(content.products);
  productListExpense.sort((a,b) => b.price - a.price);
  adatMegjelenites(productListExpense);
});

buttonSearch!.addEventListener("click", () => {
  const inputSearch: string = (document.getElementById("inputSearch") as HTMLInputElement).value.toLocaleLowerCase();
  let productListSearch = content.products.filter(product => product.description.toLocaleLowerCase().includes(inputSearch));
  adatMegjelenites(productListSearch);
});

buttonSuggest!.addEventListener("click", () => {
  let productListSuggest = content.products.filter(product => product.price < 100)
                                            .sort((a,b) => b.rating - a.rating);
  adatMegjelenites(productListSuggest);
});