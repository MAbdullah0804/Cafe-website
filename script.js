let total = 0;

const cart       = document.getElementById("cart");
const totalEl    = document.getElementById("total");
const confirmBtn = document.getElementById("confirm");
const modal      = document.getElementById("modal");
const modalList  = document.getElementById("modal-list");
const conTotal   = document.getElementById("conTotal");
const newBtn     = document.getElementById("new");
const toggleBtn = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");
const joinLink = document.getElementById("joinLink");
const select = document.getElementById('dessert');
  // -----------The NavToggler-----------
toggleBtn.addEventListener("click", () => {
    navLinks.classList.toggle("d-none");
    joinLink.classList.toggle("d-none");
});
  // -----------------Dropdown--------------
select.addEventListener('change', function() {
    const target = this.value;
    if (target) {
      // Scroll to the section
      window.location.href = target;
    }
  });

// ---------------- MAIN CLICK HANDLER ----------------

document.addEventListener("click", e => {

  const p = e.target.closest(".product");
  
  // If click is outside a product, ignore it
  if (!p && !e.target.id) return;


  // ---------------- ADD BUTTON ----------------
  if (e.target.classList.contains("add")) {

    e.target.classList.add("d-none");
    p.querySelector(".qty").classList.remove("d-none");

    addItem(p);
    updateTotal(+p.dataset.price);

    return;
  }


  // ---------------- PLUS BUTTON ----------------
  if (e.target.classList.contains("plus")) {

    const num = p.querySelector(".num");
    const newQty = +num.textContent + 1;

    num.textContent = newQty;
    updateItem(p, newQty);
    updateTotal(+p.dataset.price);

    return;
  }


  // ---------------- MINUS BUTTON ----------------
  if (e.target.classList.contains("minus")) {

    const num = p.querySelector(".num");
    const current = +num.textContent;

    // If quantity is 1 → remove product
    if (current === 1) {
      num.textContent = 1; // keep UI consistent

      p.querySelector(".qty").classList.add("d-none");
      p.querySelector(".add").classList.remove("d-none");

      removeItem(p);
      updateTotal(-p.dataset.price);

      return;
    }

    // Otherwise decrease normally
    const newQty = current - 1;
    num.textContent = newQty;
    
    updateItem(p, newQty);
    updateTotal(-p.dataset.price);

    return;
  }


  // ---------------- CONFIRM ORDER BUTTON ----------------
  if (e.target.id === "confirm") {
    modalList.innerHTML = cart.innerHTML;
    conTotal.textContent = total.toFixed(2);
    modal.classList.remove("d-none");
    return;
  }


  // ---------------- NEW ORDER BUTTON ----------------
  if (e.target.id === "new") {
    resetOrder();
    return;
  }

});


// ---------------- FUNCTIONS ----------------

function addItem(p) {
  const li = document.createElement("li");

  li.dataset.name = p.dataset.name;
  li.dataset.price = p.dataset.price;
  li.dataset.qty = 1;

  li.textContent = `Item Name: ${p.dataset.name} | Quantity: 1 |Price: $${(+p.dataset.price).toFixed(2)}`;

  cart.appendChild(li);
  confirmBtn.disabled = false;
}

function updateItem(p, qty) {
  const li = [...cart.children].find(i => i.dataset.name === p.dataset.name);

  li.dataset.qty = qty;
  const price = qty * li.dataset.price;

  li.textContent = `Item Name ${p.dataset.name} | Quantity: ${qty} | Price: $${price.toFixed(2)}`;
}

function removeItem(p) {
  const li = [...cart.children].find(i => i.dataset.name === p.dataset.name);
  li.remove();

  confirmBtn.disabled = cart.children.length === 0;
}

function updateTotal(amount) {
  total += Number(amount);
  totalEl.textContent = total.toFixed(2);
}

function resetOrder() {
  cart.innerHTML = "";
  total = 0;

  totalEl.textContent = "0.00";
  confirmBtn.disabled = true;

  document.querySelectorAll(".num").forEach(n => n.textContent = 1);
  document.querySelectorAll(".qty").forEach(q => q.classList.add("d-none"));
  document.querySelectorAll(".add").forEach(a => a.classList.remove("d-none"));

  modal.classList.add("d-none");
}
