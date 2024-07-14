import { servicesProducts } from "../services/product-services.js";


const productContainer = document.querySelector("[data-product]");
const form = document.querySelector("[data-form]");


function createCard (name, price, image, id){
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.id = id;

    card.innerHTML = `
    
    <div class= "img-container"> 
        <img class= "img-size" src="${image}" alt="${name}">
    </div>
    <div class="card-info">
    <div class="card-container--info">
        <p>${name}</p>
    </div>

        <div class="card-container--value">
        <i class="bi bi-currency-dollar"></i>
        <p>${price}</p>
     
        <button class="delete-button" data-id=${id}>
        <i class="bi bi-trash-fill"></i>
        </button>
        </div>
    </div>
    
    `;


    productContainer.appendChild(card);


    const deleteButton = card.querySelector('.delete-button');
  deleteButton.addEventListener('click', () => {
    deleteProduct(id);
  });
    return card;

    
}

function deleteProduct(id) {
    servicesProducts.deleteProduct(id)
      .then(() => {
        // Remove the product card from the DOM
        const cardToRemove = productContainer.querySelector(`[data-id="${id}"]`);
        if (cardToRemove) {
          cardToRemove.remove();
        }

        loadingIndicator.remove();
        cardToRemove.remove();
      })
      .catch(error => {
        console.error('Error deleting product:', error);
        const errorMessage = document.createElement('p');
        errorMessage.textContent = 'Error deleting product. Please try again later.';
        cardToRemove.appendChild(errorMessage);

        setTimeout(() => {
            errorMessage.remove();
          }, 3000);

        loadingIndicator.remove();
      });
  }
  











const render = async () => {
    try {
        const listProducts = await servicesProducts.productList();

        listProducts.forEach(product => {
            productContainer.appendChild(
                createCard(
                    product.name,
                    product.price,
                    product.image,
                    product.id
                )
            )
            
        });
        


    } catch (error) {
        console.log(error)
        
    }
};

form.addEventListener("submit",(event) => {
    event.preventDefault();

    const name = document.querySelector("[data-name]").value;
    const price = document.querySelector("[data-price]").value;
    const image = document.querySelector("[data-image]").value;

    servicesProducts
    .createProducts(name, price, image)
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
});


render();






    




