
    let count = 0;
    const cartCount = document.getElementById("cart-count");

    document.querySelectorAll(".add-cart").forEach(btn => {
        btn.addEventListener("click", () => {
            count++;
            cartCount.innerText = count;
        });
    });

