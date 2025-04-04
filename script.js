// filepath: /home/bhavya/Documents/projects/billing_software/billing/script.js
function scrollToBottom() {
    window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth'
    });
}

let items = [
    { "id": 1, "name": "Panipuri (Half Plate)", "price": 30 },
    { "id": 2, "name": "Panipuri (Full Plate)", "price": 50 },
    { "id": 3, "name": "Sevpuri (Half Plate)", "price": 30 },
    { "id": 4, "name": "Sevpuri (Full Plate)", "price": 50 },
    { "id": 5, "name": "Masalapuri (Half Plate)", "price": 30 },
    { "id": 6, "name": "Masalapuri (Full Plate)", "price": 50 },
    { "id": 7, "name": "Dahipuri (Half Plate)", "price": 40 },
    { "id": 8, "name": "Dahipuri (Full Plate)", "price": 60 },
    { "id": 9, "name": "Cheesepuri (Half Plate)", "price": 80 },
    { "id": 10, "name": "Cheesepuri (Full Plate)", "price": 100 },
    { "id": 11, "name": "Ragdapuri (Half Plate)", "price": 40 },
    { "id": 12, "name": "Ragdapuri (Full Plate)", "price": 60 },
    { "id": 13, "name": "Ragda Panipuri (Half Plate)", "price": 40 },
    { "id": 14, "name": "Ragda Panipuri (Full Plate)", "price": 60 },
    { "id": 15, "name": "Ragda Sevpuri (Half Plate)", "price": 40 },
    { "id": 16, "name": "Ragda Sevpuri (Full Plate)", "price": 60 },
    { "id": 17, "name": "Ragda Cheesepuri (Half Plate)", "price": 80 },
    { "id": 18, "name": "Ragda Cheesepuri (Full Plate)", "price": 100 },
    { "id": 19, "name": "Sev Cheesepuri (Half Plate)", "price": 80 },
    { "id": 20, "name": "Sev Cheesepuri (Full Plate)", "price": 100 },
    { "id": 21, "name": "Chatpuri (Half Plate)", "price": 50 },
    { "id": 22, "name": "Chatpuri (Full Plate)", "price": 70 },
    { "id": 23, "name": "Chat Sevpuri (Half Plate)", "price": 50 },
    { "id": 24, "name": "Chat Sevpuri (Full Plate)", "price": 70 },
    { "id": 25, "name": "Chat Ragdapuri (Half Plate)", "price": 50 },
    { "id": 26, "name": "Chat Ragdapuri (Full Plate)", "price": 70 },
    { "id": 27, "name": "Chat Dahipuri (Half Plate)", "price": 50 },
    { "id": 28, "name": "Chat Dahipuri (Full Plate)", "price": 70 },
    { "id": 29, "name": "Chat Cheesepuri (Half Plate)", "price": 80 },
    { "id": 30, "name": "Chat Cheesepuri (Full Plate)", "price": 100 },
    { "id": 31, "name": "Jain Panipuri (Half Plate)", "price": 30 },
    { "id": 32, "name": "Jain Panipuri (Full Plate)", "price": 50 },
    { "id": 33, "name": "Jain Sevpuri (Half Plate)", "price": 30 },
    { "id": 34, "name": "Jain Sevpuri (Full Plate)", "price": 50 },
    { "id": 35, "name": "Jain Ragdapuri (Half Plate)", "price": 40 },
    { "id": 36, "name": "Jain Ragdapuri (Full Plate)", "price": 60 },
    { "id": 37, "name": "Jeera Pudina Cheesepuri (Half Plate)", "price": 80 },
    { "id": 38, "name": "Jeera Pudina Cheesepuri (Full Plate)", "price": 100 },
    { "id": 39, "name": "Sezwan Garlic Cheesepuri (Half Plate)", "price": 80 },
    { "id": 40, "name": "Sezwan Garlic Cheesepuri (Full Plate)", "price": 100 },
    { "id": 41, "name": "Spe. Mix Cheesepuri (Half Plate)", "price": 100 },
    { "id": 42, "name": "Spe. Mix Cheesepuri (Full Plate)", "price": 120 }
  ];

let bill = [];
let salesData = JSON.parse(localStorage.getItem("salesData")) || {};
let billNumber = parseInt(localStorage.getItem("billNumber")) || 1;

function loadMenu() {
    const menu = document.getElementById("menu-items");
    menu.innerHTML = "";
    items.forEach(item => {
        menu.innerHTML += `
            <div class="item-card" data-id="${item.id}" onclick="highlightItem(this);addToBill(${item.id});">
                <div class="card-body">
                    <h5 class="card-title" style="color:rgb(76, 122, 119);">${item.name}</h5>
                    <p class="card-text" style="color:rgb(146, 114, 8);">₹${item.price}</p>
                </div>
            </div>
        `;
    });
}

function addToBill(id) {
    let item = items.find(i => i.id === id);
    let billItem = bill.find(i => i.id === id);

    if (billItem) {
        billItem.quantity++;
    } else {
        bill.push({ ...item, quantity: 1 });
    }
    let clickedItem = document.querySelector(`.item-card[data-id="${id}"]`);
    if (clickedItem) {
        clickedItem.classList.add("clicked");
        setTimeout(() => {
            clickedItem.classList.remove("clicked");
        }, 100);
    }
    updateBill();
}

function updateBill() {
    const billTable = document.getElementById("bill-items");
    const grandTotalEl = document.getElementById("grand-total");
    let grandTotal = 0;

    billTable.innerHTML = "";
    bill.forEach(item => {
        let total = item.price * item.quantity;
        grandTotal += total;
        billTable.innerHTML += `
            <tr>
                <td>${item.name}</td>
                <td>${item.quantity} <button class="btn btn-warning btn-sm" onclick="decreaseQuantity(${item.id})">-</button></td>
                <td>₹${item.price}</td>
                <td>₹${total}</td>
                <td><button class="btn btn-danger btn-sm" onclick="removeItem(${item.id})">Remove</button></td>
            </tr>
        `;
    });
    grandTotalEl.innerText = grandTotal;
}

function decreaseQuantity(id) {
    let billItem = bill.find(i => i.id === id);
    if (billItem && billItem.quantity > 1) {
        billItem.quantity--;
    } else {
        removeItem(id);
    }
    updateBill();
}

function removeItem(id) {
    bill = bill.filter(i => i.id !== id);
    updateBill();
}
// let date = new Date().toISOString().split("T")[0];
// let grandTotal = parseFloat(document.getElementById("grand-total").innerText);
// let deductionAmount = parseFloat(document.getElementById("deduction-amount").value) || 0;
// let finalTotal = grandTotal - deductionAmount;

function printBill() {
    let date = new Date().toISOString().split("T")[0];
    // let grandTotal = document.getElementById("grand-total").innerText;
    let grandTotal = parseFloat(document.getElementById("grand-total").innerText);
    let deductionAmount = parseFloat(document.getElementById("deduction-amount").value) || 0;
    let finalTotal = grandTotal - (grandTotal * (deductionAmount / 100));

    if (!salesData[date]) salesData[date] = [];
    salesData[date].push({
        billNumber: billNumber.toString().padStart(4, '0'),
        grandTotal,
        date,
        items: [...bill]
    });
    localStorage.setItem("salesData", JSON.stringify(salesData));
    localStorage.setItem("billNumber", ++billNumber);

    let printContent = `
        <style>
            body { font-family: Arial, sans-serif; padding: 20px; text-align: center; }
            h2, h4 { margin: 5px 0; }
            table { width: 100%; border-collapse: collapse; margin-top: 10px; }
            th, td { border: 1px solid black; padding: 10px; text-align: center; }
            th { background-color: #007bff; color: white; }
            tfoot td { font-weight: bold; }
        </style>
        <h2>Madhav Sandwich & Pizza's</h2>
        <h4>Bill No: ${billNumber.toString().padStart(4, '0')}</h4>
        <h4>Date: ${date}</h4>
        <table>
            <thead>
                <tr>
                    <th>Item Name</th>
                    <th>Quantity</th>
                    <th>Price (₹)</th>
                </tr>
            </thead>
            <tbody>`;

    bill.forEach(item => {
        printContent += `
                <tr>
                    <td>${item.name}</td>
                    <td>${item.quantity}</td>
                    <td>₹${item.price * item.quantity}</td>
                </tr>`;
    });

    printContent += `
            </tbody>
            <tfoot>
                <tr>
                    <td colspan="2"><strong>Total</strong></td>
                    <td>₹${grandTotal}</td>
                </tr>
                 <tr>
                    <td colspan="2"><strong>Grand Total</strong></td>
                    <td>₹${finalTotal},(${deductionAmount}%off)</td>
                </tr>
            </tfoot>
        </table>`;

    // let blob = new Blob([printContent], { type: "text/html" });
    // let fileHandle = document.createElement("a");
    // fileHandle.href = URL.createObjectURL(blob);
    // fileHandle.download = `Bill_${billNumber.toString().padStart(4, '0')}.html`;
    // document.body.appendChild(fileHandle);
    // fileHandle.click();
    // document.body.removeChild(fileHandle);

    let printWindow = window.open("", "", "width=600,height=400");
    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.print();

    bill = [];
    updateBill();
}


document.addEventListener("DOMContentLoaded", () => {
    loadMenu();
    salesData = JSON.parse(localStorage.getItem("salesData")) || {};
});