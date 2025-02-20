document.addEventListener("DOMContentLoaded", function () {
    const pairs = document.querySelectorAll(".pair");
    const radioButtons = document.querySelectorAll("input[name='bundle']");
    const totalPrice = document.getElementById("total-price");

    const selectors = {
        pair1: document.getElementById("pair1-selectors"),
        pair2: document.getElementById("pair2-selectors"),
        pair3: document.getElementById("pair3-selectors"),
    };

    const discounts = {
        pair1: 50,
        pair2: 40,
        pair3: 60,
    };
    pairs.forEach(pair => {
        pair.addEventListener("mouseenter", function () {
            pairs.forEach(p => p.classList.remove("selected"));
            this.classList.add("selected");
            const radioInput = this.querySelector("input[name='bundle']");
            if (radioInput) {
                radioInput.checked = true;
                updatePrice(radioInput);
            }
        });
    });
    radioButtons.forEach((radio) => {
        radio.addEventListener("change", (e) => {
            updatePrice(e.target);
        });
    });
    document.querySelector(".add-to-cart").addEventListener("click", () => {
        alert("Items added to cart successfully!");
    });
    function updatePrice(selectedRadio) {
        Object.values(selectors).forEach((selector) => selector.classList.add("hidden"));
        if (selectors[selectedRadio.id]) {
            selectors[selectedRadio.id].classList.remove("hidden");
        }
        const discountPercentage = discounts[selectedRadio.id] || 0;
        const originalPrice = parseFloat(selectedRadio.dataset.price) / (1 - discountPercentage / 100);
        const formattedOriginalPrice = originalPrice.toFixed(2);
        const discountedPrice = parseFloat(selectedRadio.dataset.price).toFixed(2);
        totalPrice.textContent = `DKK ${discountedPrice} (Original: DKK ${formattedOriginalPrice}, ${discountPercentage}% OFF)`;
    }
});
