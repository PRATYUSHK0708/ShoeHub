const hamburger = document.querySelector(".fa-bars")

const list = document.querySelector(".mobile-screen")

hamburger.addEventListener("click", (e) => {
  e.preventDefault();

  hamburger.classList.toggle("fa-bars")
  hamburger.classList.toggle("fa-x")

  list.classList.toggle("mobile-screen-active");
})



// cart

const carticon = document.querySelector(".cart-icon")

const carttab = document.querySelector(".cart-tab")

carticon.addEventListener("click", (e) => {
  e.preventDefault();

  carttab.classList.toggle("cart-tab-active")
})

// close cart

const closebtn = document.querySelector(".close-btn")

const cartTab = document.querySelector(".cart-tab")

closebtn.addEventListener("click", () => {

  cartTab.classList.toggle("cart-tab-active")

})


let product = [];
let cartproduct = [];

const cartTotal = document.querySelector('.cart-total');
const cartValue = document.querySelector(".cart-value")

// update total price


const updateTotal = () => {
  let totalPrice = 0;
  let totalQuantity = 0;
  document.querySelectorAll('.item').forEach(item => {
    const quantity = parseInt(item.querySelector('.quantity-value').textContent);
    // Fix: Get price from .item-total (shows current quantity * price)
    const priceText = item.querySelector('.item-total').textContent;
    const price = parseFloat(priceText.replace(/[^\d.-]/g, ''));
    totalPrice += price;
    totalQuantity += quantity;
  });
  cartTotal.textContent = `$${totalPrice.toFixed(2)}`;
  cartValue.textContent = totalQuantity;
};





// Embeding shoes gallery content

const gallery = document.querySelector(".shoes-gallery");

const showcard = () => {
  product.forEach(item => {

    const cards = document.createElement('div')
    cards.classList.add("shoes-box")
    cards.innerHTML = ` 
                            <img src="${item.image}" alt="">
                            <div class="gallery-content">
                                <h3>${item.name}</h3>
                                <h5>${item.price}</h5>
                                <div class="mt-2">
                        <a href="#" class="add-to-cart-btn">Add to cart</a>
                
                        `;

    gallery.appendChild(cards)
    updateTotal();

    const cardbtn = cards.querySelector(".add-to-cart-btn");

    cardbtn.addEventListener("click", (e) => {
      e.preventDefault();

      addToCart(item);
    })
  })
}





// cart-tab



const addToCart = (product) => {

  // avoid the same item

  const existingProduct = cartproduct.find(item =>
    item.id === product.id);

  if (existingProduct) {
    alert('itemAlreadyAdded')
    return;
  }



  cartproduct.push(product);
  let quantity = 1;
  const price = parseFloat(product.price.replace('$', ''));

  const cartlist = document.querySelector(".cart-list")
  const cartitem = document.createElement("div")
  cartitem.classList.add("item")


  cartitem.innerHTML = ` <div class="cart-tab-content flex ">
                    <div class="cart-tab-image mt-2">
                        <img src="${product.image}">
                    </div>
                    <div class=" item-detail flex mt-2">
                        <h3>${product.name}</h3>
                        <h5 class="item-total">$${price.toFixed(2)}</h5>

                        <div class="quantity flex ">
                            <a href="" class="quantity-btn ">
                                <i class="fa-solid fa-minus"></i>
                            </a>
                            <h4 class="quantity-value">${quantity}</h4>
                            <a href="" class="quantity-btn">
                                <i class="fa-solid fa-plus"></i>
                            
                        </div>
                    </div>
                </div>`;

  cartlist.appendChild(cartitem)
  updateTotal();


  // to increment element

  const plus = cartitem.querySelector(".fa-plus")

  const quantityValue = cartitem.querySelector(".quantity-value")

  const itemTotal = cartitem.querySelector(".item-total")

  plus.addEventListener("click", (e) => {
    e.preventDefault()
    let quantity = parseInt(quantityValue.textContent);
    quantity++;
    quantityValue.textContent = quantity;
    itemTotal.textContent = `$${(price * quantity).toFixed(2)}`
    updateTotal();
  });

  // to decrement element

  const minus = cartitem.querySelector(".fa-minus")

  minus.addEventListener("click", (e) => {
    e.preventDefault();

    let quantity = parseInt(quantityValue.textContent)
    if (quantity <= 1) {
      cartitem.classList.add("slide-out")
      setTimeout(() => {
        cartitem.remove();
        cartproduct = cartproduct.filter(item => item.id !== product.id);
        updateTotal()
      }, 300);
    }
    else {
      quantity--;
      quantityValue.textContent = quantity;
      itemTotal.textContent = `$${(price * quantity).toFixed(2)}`
      updateTotal();
    }
  });

}






// fetching Nike.json

const initApp = () => {
  fetch('product.json').then
    (response => response.json()).then
    (data => {
      product = data;
      showcard();
    })
}




initApp()













// scroller
const gallery01 = document.getElementById('gallery');
const scrollLeft = document.querySelector('.scroll-left');
const scrollRight = document.querySelector('.scroll-right');

scrollLeft.addEventListener('click', () => {
  gallery01.scrollBy({ left: -300, behavior: 'smooth' });
});

scrollRight.addEventListener('click', () => {
  gallery01.scrollBy({ left: 300, behavior: 'smooth' });
});

// Auto-scroll every 5 seconds
setInterval(() => {
  gallery.scrollBy({ left: 300, behavior: 'smooth' });
}, 5000);



