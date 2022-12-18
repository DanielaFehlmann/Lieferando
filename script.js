let menus = [
  {
    menu: "Onion Rings (10 Stück)",
    ingredient: "mit Sauce Tartare",
    price: 6.5,
  },
  {
    menu: "Frühlingsrollen (10 Stück)",
    ingredient: "mit süß-charfer Chilisauce",
    price: 6.0,
  },
  {
    menu: "Gebackene Champignons (10 Stück)",
    ingredient: "mit Knoblauchsauce",
    price: 7.0,
  },
  {
    menu: "Pizza Marinara",
    ingredient: "ohne Käse, mit Knoblauch",
    price: 5.0,
  },
  {
    menu: "Pizza Margherita",
    ingredient: "mit Käse, mit Knoblauch",
    price: 6.0,
  },
  {
    menu: "Pizza Salami",
    ingredient: "mit Käse, mit Salami",
    price: 7.0,
  },
  {
    menu: "Soda (0,5L)",
    ingredient: "prickelnd",
    price: 2.0,
  },
  {
    menu: "Coca Cola (0,3L)",
    ingredient: "Dose",
    price: 3.0,
  },
  {
    menu: "Fanta (0,3L)",
    ingredient: "Dose",
    price: 3.0,
  },
];


let cartMenus = [];
let cartPrices = [];
let cartAmounts = [];


let infoMenus = [
  `<ul><li>glutenhaltige/s Getreide/-Erzeugnisse</li><li>Enthält Milch/-Erzeugnisse (laktosehaltig)</li></ul>`,
  `<ul><li>glutenhaltige/s Getreide/-Erzeugnisse</li><li>Enthält Milch/-Erzeugnisse (laktosehaltig)</li><li>Enthält Sojabohnen/-Erzeugnisse</li></ul>`,
  `<ul><li>glutenhaltige/s Getreide/-Erzeugnisse</li><li>Enthält Milch/-Erzeugnisse (laktosehaltig)</li><li>Enthält Ei/-Erzeugnisse</li></ul>`,
  `<ul><li>glutenhaltige/s Getreide/-Erzeugnisse</li></ul>`,
  `<ul><li>glutenhaltige/s Getreide/-Erzeugnisse</li><li>Enthält Milch/-Erzeugnisse (laktosehaltig)</li></ul>`,
  `<ul><li>glutenhaltige/s Getreide/-Erzeugnisse</li><li>Enthält Milch/-Erzeugnisse (laktosehaltig)</li></ul>`,
  `<ul><li>keine</li></ul>`,
  `<ul><li>keine</li></ul>`,
  `<ul><li>keine</li></ul>`,
];


function showMenus() {
  //Bilder anzeigen
  let allMenus = document.getElementById('allMenus');
  allMenus.innerHTML= ``;
  for (let i = 0; i < menus.length; i++) {
    if (i == 0) {
      allMenus.innerHTML+= `
      <img class="imageMenus" src="img/onionrings.jpg">
    <h2 id="starter">Vorspeisen</h2> `;
    } else if (i == 3) {
      allMenus.innerHTML+= `
      <img class="imageMenus" src="img/pizza2.jpg">
    <h2 id="pizzas">Pizzen</h2> `;
    } else if (i == 6) {
      allMenus.innerHTML+= `
        <img class="imageMenus" src="img/water.jpg">
      <h2 id="drinks">Getränke</h2> `;
    }
    //alle Menüs anzeigen
    const menu = menus[i];
    const formattedPrice = menu["price"].toFixed(2).replace('.',',');
      allMenus.innerHTML+= `
      <div class="infoMenuBg d-none" id="infoMenuBg" onclick="closeInfoMenu()">
        <div class="infoMenu d-none" id="infoMenu" onclick="doNotCloseInfoMenu(event)">
        </div>
      </div>
      <div class="singleMenu">
        <div class="singleMenu_1">
          <div class="singleMenu_1_1">
            <h3>${menu["menu"]}</h3>
            <img class="imageInfo" src="img/logoInfo.png" onclick="openInfoMenu(${i})">
          </div>
            <img class="imageCross" src="img/cross.svg" onclick="addToCartArray(${i})">
        </div>
          <span class="singleMenu_2">${menu["ingredient"]}</span>
          <span class="singleMenu_3">${formattedPrice} €</span>
      </div>
  `;
}
}


//Menüs zu Warenkorb-Array hinzufügen
function addToCartArray(x) {
  let menu = menus[x];
  let index = cartMenus.indexOf(menu["menu"]);

  if (index == -1) {
    cartMenus.push(menu["menu"]);
    cartPrices.push(menu["price"]);
    cartAmounts.push(1);
  } else {
    cartPrices[index] = cartPrices[index] + menu["price"];
    cartAmounts[index]++;
  }
  addToCart();
}


//Menüs zu Warenkorb hinzufügen
function addToCart() {
  let bag = document.getElementById("bag");
  bag.innerHTML = ``;
  bag.classList.remove("bag");
  bag.classList.add("bagMenus");

  for (let i = 0; i < cartMenus.length; i++) {
    bag.innerHTML += addToCartHTML (i);
  }
  sumArray();
}


function addToCartHTML (i) {
  return `
  <div class="bagMenu">
  <div class="bagMenu_1">
    <b>${cartAmounts[i]} ${cartMenus[i]}</b>
    ${cartPrices[i].toFixed(2).replace('.',',')} €
  </div>
  <div class="bagMenu_2">
    <img onclick="minusOne(${i})" src="img/minus.svg">
    <img onclick="plusOne(${i})" src="img/cross.svg">
  </div>
  </div>
  <hr>
  `;
}


//Ein Menü aus dem Warenkorb entfernen
function minusOne(i) {
  if (cartAmounts[i] > 1) {
    cartAmounts[i]--;
    cartPrices[i] = cartPrices[i] - menus[i]["price"];
  } else {
    cartMenus.splice(i, 1);
    cartPrices.splice(i, 1);
    cartAmounts.splice(i, 1);
  }
  addToCart();
}

//Ein Mebnü dem Warenkorb hinzufügen
function plusOne(i) {
    cartAmounts[i]++;
    cartPrices[i] = cartPrices[i] + menus[i]["price"];
  addToCart();
}

//Summen ausrechnen
function sumArray() {
  let subtotal = 0;
  let deliveryCosts = 0;
  let sum = 0;
  for (let i = 0; i < cartPrices.length; i++) {
    subtotal += cartPrices[i];
  }
  if (subtotal < 10) {
    deliveryCosts = 2;
  }
  if (subtotal == 0) {
    deliveryCosts = 0;
  }
  sum = subtotal + deliveryCosts;
  document.getElementById("costs").innerHTML = sumArrayHTML(subtotal, deliveryCosts, sum);
  bigButton (sum);
}


function sumArrayHTML(subtotal, deliveryCosts, sum) {
  return `<table class="tableCosts">
      <tr>
        <td>Zwischensumme</td>
        <td>${subtotal.toFixed(2).replace('.',',')} €</td>
      </tr>
      <tr>
        <td>Lieferkosten</td>
        <td>${deliveryCosts.toFixed(2).replace('.',',')} €</td>
      </tr>
      <tr>
        <td>Gesamtsumme</td>
        <td>${sum.toFixed(2).replace('.',',')} €</td>
      </tr>
    </table> <br>
    <button class="buttonPay">Bezahlen (${sum.toFixed(2).replace('.',',')} €)</button>
  `;
}


//Info über Pizzeria öffnen
function openInfoPizzeria () {
  document.getElementById('infoPizzeriaBg').classList.remove('d-none');
  document.getElementById('infoPizzeria').classList.remove('d-none');
}


function closeInfoPizzeria () {
  document.getElementById('infoPizzeriaBg').classList.add('d-none');
  document.getElementById('infoPizzeria').classList.add('d-none');
}


function doNotCloseInfoPizzeria (event) {
  event.stopPropagation();
}

//Infos über einzelne Menüs öffnen
function openInfoMenu(i) {
  document.getElementById('infoMenuBg').classList.remove('d-none');
  document.getElementById('infoMenu').classList.remove('d-none');
  document.getElementById('infoMenu').innerHTML= `
  <h2>Allergene</h2><br>
  ${infoMenus[i]}
  `;
}

//Info über Pizzeria schließen
function closeInfoMenu() {
  document.getElementById('infoMenuBg').classList.add('d-none');
  document.getElementById('infoMenu').classList.add('d-none');
}


function doNotCloseInfoMenu(event) {
event.stopPropagation();
}

//großer Button "Warenkorb" (bei kleiner Version)
function bigButton (sum) {
  document.getElementById('button').innerHTML = `
  Warenkorb (${sum.toFixed(2).replace('.',',')} €)
  `;
}

//auf großen Button "Warenkorb" klicken -> großer Warenkorb öffnet sich
function openBigBag () {
  document.getElementById('right').classList.remove ('right');
  document.getElementById('left').classList.add ('d-none');
  document.getElementById('crossBag').classList.remove ('d-none');
  document.getElementById('footer').classList.add ('d-none');
  document.getElementById('bigButton').style.display="none";
  document.getElementById('right').classList.add ('rightBig');
}

//auf X im großen Warenkorb klicken -> großer Warenkorb schließt sich
function closeBigBag() {
  document.getElementById('right').classList.add ('right');
  document.getElementById('left').classList.remove ('d-none');
  document.getElementById('right').classList.remove ('rightBig');
  document.getElementById('crossBag').classList.add ('d-none');
  document.getElementById('footer').classList.remove ('d-none');
  document.getElementById('bigButton').style.display="flex";
}