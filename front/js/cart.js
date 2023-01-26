let productInLocalStorage = JSON.parse(localStorage.getItem("cart")) || [];

fetch('http://localhost:3000/api/products')

  .then(res => res.json())
  
  .then(data =>{

    productInLocalStorage.forEach(product => {
      const idToFind = product.id
      const found = data.find(element => element._id === idToFind)
     product.price = found.price;
    });
  
if (productInLocalStorage == null || productInLocalStorage.length == 0 ) {
  document.querySelector("#cart__items").innerHTML += `Votre panier est vide`;

} else {
  document.querySelector("#cart__items").innerHTML += `Votre panier`;

  productInLocalStorage.forEach( product => {
    document.querySelector("#cart__items").innerHTML += `
    <article class="cart__item" data-id="${product.id}" data-color="${product.color}">
                <div class="cart__item__img">
                  <img src="${product.image}">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>${product.name}</h2>
                    <p>${product.color}</p>
                    <p> ${product.price}€</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté</p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${product.quantity}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem" "${product.quantity}" "${product.color}" "${product.id}" >Supprimer</p>
                    </div>
                  </div>
                </div>
              </article>
    `;  
  })
}
// je modifie la quantité dans le panier
function changeQty() {
  let itemQty = document.querySelectorAll('.itemQuantity');
  
  for (let c = 0; c < itemQty.length; c++) {
    itemQty[c].addEventListener('change', (event) => {
    event.preventDefault();
   
    let itemNewQty = itemQty[c].value;
    if (itemNewQty > 100 || itemNewQty < 0 ) {
      alert ("Please select 1-100 quantity")
      return
    }
    const newLocalStorage = {
      id: productInLocalStorage[c].id,
      image: productInLocalStorage[c].image,
      alt: productInLocalStorage[c].alt,
      name: productInLocalStorage[c].name,
      color: productInLocalStorage[c].color,  
      quantity: itemNewQty, 
    };
    
    productInLocalStorage[c] = newLocalStorage;
    
    localStorage.setItem('cart', JSON.stringify(productInLocalStorage));

    alert('Your cart is updated.');
    window.location.href = "cart.html";
   
      })
  }
}
changeQty();

function priceTotal() {
  const price = [];
  productInLocalStorage.forEach( product => {
    
    const priceForm = product.price * product.quantity;
    price.push(priceForm);

   
    const reduce = (previousValue, currentValue) => previousValue + currentValue;
    total = price.reduce(reduce);
    const totalPrice = document.getElementById('totalPrice');
    totalPrice.textContent = total;
  })
}
priceTotal();



function deleteSofa() {
  const sup = document.querySelectorAll('.deleteItem');

  for (let i = 0; i < sup.length; i++) { 
    sup[i].addEventListener('click', (event) => {
    event.preventDefault();

    
    let deleteId = productInLocalStorage[i].id;
    let deleteColor = productInLocalStorage[i].color;

   
    productInLocalStorage = productInLocalStorage.filter( elt => elt.id !== deleteId || elt.color !== deleteColor);
      
   
    localStorage.setItem('cart', JSON.stringify(productInLocalStorage));

   
    alert('article was deleted');
    
    if (localStorage.length == 1) {
       (
        localStorage.removeItem("cart"),
        console.log("panier vidé"),
        location.reload()
      );
    }
    });
  }
}
deleteSofa();


function totalArticles() {
  let totalItems = 0;
  for (l in productInLocalStorage) {
   
    const newQuantity = parseInt(productInLocalStorage[l].quantity,);

    
    totalItems += newQuantity;
  }
    
    const totalQuantity = document.getElementById('totalQuantity');
    totalQuantity.textContent = totalItems;
}
totalArticles();

})




const zoneFirstNameErrorMsg = document.querySelector("#firstNameErrorMsg");
const zoneLastNameErrorMsg = document.querySelector("#lastNameErrorMsg");
const zoneAddressErrorMsg = document.querySelector("#addressErrorMsg");
const zoneCityErrorMsg = document.querySelector("#cityErrorMsg");
const zoneEmailErrorMsg = document.querySelector("#emailErrorMsg");

const inputFirstName = document.getElementById("firstName");
const inputLastName = document.getElementById("lastName");
const inputAddress = document.getElementById("address");
const inputCity = document.getElementById("city");
const inputEmail = document.getElementById("email");

// déclaration des regex de contrôle des inputs du formulaire //

const regexFirstName = /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/;
const regexLastName = regexFirstName;
const regexAddress = /^[#.0-9a-zA-ZÀ-ÿ\s,-]{2,60}$/; 
const regexCity = regexFirstName;
const regexEmail = /^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,4})$/;

// écoute du clic sur le bouton COMMANDER //

const zoneOrderButton = document.querySelector("#order");

zoneOrderButton.addEventListener("click", function(e) {
	e.preventDefault(); // on empeche le formulaire de fonctionner par defaut si aucun contenu

	// recupération des inputs du formulaire //

	let checkFirstName = inputFirstName.value;
	let checkLastName = inputLastName.value;
	let checkAddress = inputAddress.value;
	let checkCity = inputCity.value;
	let checkEmail = inputEmail.value;

	// mise en place des conditions de validation des champs du formulaire //

function orderValidation() {
	


  
if (  !localStorage.length ) {
  alert ('Your cart is empty or your formuler is empty')
  return
}
	// si une erreur est trouvée, un message est retourné et la valeur false également //

	if (regexFirstName.test(checkFirstName) == false || checkFirstName === null) {
		zoneFirstNameErrorMsg.innerHTML = "Merci de renseigner un prénom valide";
		return false;
	} else if (
		regexLastName.test(checkLastName) == false ||
		checkLastName === null
	) {
		zoneLastNameErrorMsg.innerHTML = "Merci de renseigner un nom de famille valide";
		return false;
	} else if (
		regexAddress.test(checkAddress) == false ||
		checkAddress === null
	) {
		zoneAddressErrorMsg.innerHTML =
			"Merci de renseigner une adresse valide (Numéro, voie, nom de la voie, code postal)";
		return false;
	} else if (regexCity.test(checkCity) == false || checkCity === null) {
		zoneCityErrorMsg.innerHTML = "Merci de renseigner un nom de ville valide";
		return false;
	} else if (regexEmail.test(checkEmail) == false || checkEmail === null) {
		zoneEmailErrorMsg.innerHTML =
			"Merci de renseigner une adresse email valide";
		return false;
	}  
	// si tous les champs du formulaire sont correctement remplis //
	else {
		// on crée un objet contact pour l'envoi par l'API //

		let idProducts = [];
            for (let l = 0; l<productInLocalStorage.length;l++) {
                idProducts.push(productInLocalStorage[l].id);
            }
            const order = {
              contact: {
                  firstName: firstName.value,
                  lastName: lastName.value,
                  address: address.value,
                  city: city.value,
                  email: email.value,
              },
              products: idProducts,
            } 
		// on crée l'objet contenant les infos de la commande //

    const options = {
      method: 'POST',
      headers: {
          'Accept': 'application/json', 
          'Content-Type': 'application/json' 
      },
      body: JSON.stringify(order)
  };

  fetch("http://localhost:3000/api/products/order", options)
.then((response) => response.json())
.then((data) => {
    console.log(options)
    localStorage.setItem("orderId", data.orderId , JSON.stringify("orderId"));

      document.location.href = "../html/confirmation.html";
  

		}) 
	}
}

orderValidation();
});