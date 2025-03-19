// boughtItems.js

document.addEventListener('DOMContentLoaded', () => {
    const boughtItems = JSON.parse(localStorage.getItem('buyStock')) || [];
    const container = document.querySelector('#bought-items');

    const showBoughtItems = () => {
        container.innerHTML = '';

        if (boughtItems.length === 0) {
            container.innerHTML = `<p>No items have been bought yet!</p>`;
            return;
        }

        boughtItems.forEach((item, i) => {
            const row = `
                <div class="card" style="width: 18rem; margin-bottom: 10px;">
                    <div class="card-body">
                        <h5 class="card-title">${item.itemName}</h5>
                        <p class="card-text">Quantity: ${item.quantity}</p>
                    </div>
                </div>
            `;
            container.innerHTML += row;
        });
    };

    showBoughtItems();
});
