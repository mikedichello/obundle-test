const cartURL = "/api/storefront/carts";

const bundleItems = {
    "lineItems": [
    {
        "quantity": 1,
        "productId": 88
    },
    {
        "quantity": 1,
        "productId": 104
    },
    {
        "quantity": 1,
        "productId": 93,
        "variantId": 54
    }
]};

function getCart(url) {
    return fetch(url, {
        method: "GET",
        credentials: "same-origin",
        headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
           }
    })
    .then(response => response.json());
 };

 function createCart(url, cartItems) {
    return fetch(url, {
        method: "POST",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json"},
        body: JSON.stringify(cartItems),
    })
    .then(response => response.json());
  };

 function addCartItem(url, cartId, cartItems) {
    return fetch(url + '/' + cartId + '/items', {
        method: "POST",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
            'Accept': 'application/json'},
        body: JSON.stringify(cartItems),
    })
    .then(response => response.json());
};

const bundleAdd = () => {
    getCart('/api/storefront/carts?include=lineItems.digitalItems.options,lineItems.physicalItems.options')
    .then(cart => {
        console.log(JSON.stringify(cart))
        
        if(!cart || !cart[0] || !cart[0].id){
            createCart(`/api/storefront/carts`, bundleItems)
             .then(data => console.log(JSON.stringify(data)))
             .catch(error => console.error(error));
            
            location.reload();
        }
            
        let cartId = cart[0].id;

        addCartItem(cartURL, cartId, bundleItems)
            .then(data => console.log(JSON.stringify(data)))
            .catch(error => console.error(error));

        location.reload();
    });
};


  
$('#bundle-button').click(() => bundleAdd());