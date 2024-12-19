// Toggle class active untuk hamburger menu
const navbarNav = document.querySelector('.navbar-nav');
//ketika hamburger menu di klik
document.querySelector('#hamburger-menu').
onclick = () => {
    navbarNav.classList.toggle('active');
};

// Toggle class active untuk shopping cart
const shoppingCart = document.querySelector('.shopping-cart');

document.querySelector('#shopping-cart-button').onclick = (e) => {
    shoppingCart.classList.toggle('active');
    e.preventDefault();
}

//klik diluar sidebar untuk menghilangkan nav
const hm = document.querySelector('#hamburger-menu');
const sc = document.querySelector('#shopping-cart-button');

document.addEventListener('click', function(e) {
    if (!hm.contains(e.target) && !navbarNav.contains(e.target)) {
        navbarNav.classList.remove('active');
    }
    if (!sc.contains(e.target) && !shoppingCart.contains(e.target)) {
        shoppingCart.classList.remove('active');
    }
});

// klik diluar modal
const modal = document.querySelector('#item-detail-modal');
window.onclick = (e) => {
    if(e.target === modal) {
        modal.style.display = 'none';
    }
}