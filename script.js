// Inicializar variables con datos de localStorage o vacíos si no existen
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let total = JSON.parse(localStorage.getItem('total')) || 0;

// Función para agregar productos al carrito y almacenarlos en localStorage
function addToCart(productName, price) {
    cart.push({ productName, price });
    total += price;
    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('total', JSON.stringify(total));
    updateCartCount();
}

// Función para actualizar el contador de productos en el carrito
function updateCartCount() {
    document.getElementById('cart-count').innerText = cart.length;
}

// Función para redirigir a la página del carrito
function viewCart() {
    window.location.href = 'cart.html';
}

// Función para cargar los productos en la página del carrito
function loadCart() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = ''; // Limpiar la lista antes de cargar
    cart.forEach((item, index) => {
        const li = document.createElement('li');
        li.innerText = `${item.productName} - $${item.price.toFixed(2)}`;
        li.innerHTML += `<span onclick="removeFromCart(${index})"> [Eliminar]</span>`;
        cartItems.appendChild(li);
    });
    document.getElementById('total-price').innerText = total.toFixed(2);
}

// Función para eliminar productos del carrito y actualizar localStorage
function removeFromCart(index) {
    total -= cart[index].price;
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('total', JSON.stringify(total));
    loadCart();
}

// Función para proceder al pago
function checkout() {
    if (cart.length > 0) {
        alert('Gracias por tu compra!');
        cart = [];
        total = 0;
        localStorage.setItem('cart', JSON.stringify(cart));
        localStorage.setItem('total', JSON.stringify(total));
        loadCart();
    } else {
        alert('Tu carrito está vacío.');
    }
}

// Si estamos en la página del carrito, cargar los productos
if (window.location.pathname.includes('cart.html')) {
    loadCart();
} else {
    updateCartCount();
}
