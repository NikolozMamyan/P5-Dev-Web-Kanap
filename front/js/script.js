
fetch('http://localhost:3000/api/products')

  .then(res => res.json())
  
  .then(canape => { 
    Products(canape);
  })


function Products(canape) {
    
  for (let i=0; i < canape.length; i++) {
        
        const itemCard = document.getElementById('items');
       
        itemCard.innerHTML +=`
        <a href=./product.html?id=${canape[i]._id}>
        <article>
          <img src="${canape[i].imageUrl}" alt="${canape[i].altTxt}">
          <h3 class="productName">${canape[i].name}</h3>
          <p class="productDescription">${canape[i].description}</p>
        </article>
        </a>
      `
    }
}






