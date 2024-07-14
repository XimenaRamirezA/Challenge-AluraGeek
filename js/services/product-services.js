
const productList = () => {
    return fetch ("http://localhost:3000/products")
           .then((res) => res.json())
           .catch((err) => console.log(err));

};


const createProducts =(name,price,image) => {
    return fetch("http://localhost:3000/products", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name,
                price,
                image,
            })
        }) 
        .then((res) => res.json())
        .catch((err)=> console.log(err));

};

const deleteProduct = (productId) => {
    return fetch(`http://localhost:3000/products/${productId}`, {
      method: 'DELETE'
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Error deleting product');
      }
      return response.json();
    })
    .catch(error => {
      console.error('Error deleting product:', error);
      throw error; // Rethrow error for handling in the calling function
    });
  };




export const servicesProducts = {
    productList, 
    createProducts,
    deleteProduct
};


