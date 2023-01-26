const find = window.location.search
const urlParams = new URLSearchParams(find)
const id = urlParams.get('id')

const image = document.getElementsByClassName('item__img');
const title = document.getElementById('title');
const price = document.getElementById('price');
const description = document.getElementById('description');
const colors = document.getElementById('colors');

fetch(`http://localhost:3000/api/products/${id}`)
.then(res => res.json())
.then(data => { 
 
    
  image[0].innerHTML = `<img src=${data.imageUrl} alt=${data.altTxt}>`;
  imageURL = data.imageUrl;
  imageAlt = data.altTxt;
  title.innerHTML = `<h1>${data.name}</h1>`;
  price.innerText = `${data.price}`;
  description.innerText = `${data.description}`;

    
    for (number in data.colors) {
      colors.options[colors.options.length] = new Option(
        data.colors[number],
        data.colors[number]
        );
    }
  })
const button = document.querySelector("#addToCart");
button.addEventListener('click', (e) => {
    e.preventDefault();
 
    
    const selectColors = document.getElementById('colors').value;
    let qtyNum = document.getElementById('quantity')
    choiceQuantity = Number(qtyNum.value);
    

    const data = {
      id: id,
      image: imageURL,
      alt: imageAlt,
      name: title.textContent,
      color: selectColors,
      quantity: choiceQuantity,
      
    };
    if (!selectColors || !choiceQuantity ) {
      alert ("Please select a color and quantity")
      return
    }
    if (choiceQuantity > 100 || choiceQuantity < 0 ) {
      alert ("Please select 1-100 quantity")
      return
    }
   
    let oldCart = JSON.parse(localStorage.getItem('cart'))
    if (!oldCart){
        oldCart = [];
        
    } 
    const newCart = [...oldCart,data]
        localStorage.setItem('cart', JSON.stringify(newCart))
        alert('This item has been added to your order.');
        

    oldCart.forEach (function (currentCanap, key) {
      if (currentCanap.id === id && currentCanap.color === selectColors) {
        oldCart[key].quantity = parseInt(currentCanap.quantity) + parseInt(choiceQuantity);
        localStorage.setItem('cart', JSON.stringify(oldCart));
        alert('this item has been added again.');
        return
      }
    });

   
   
  });    