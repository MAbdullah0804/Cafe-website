document.addEventListener("DOMContentLoaded", function () {

    const openBtn = document.getElementById("confirm");
    const closeBtn = document.querySelectorAll("#new");
    const overlay = document.getElementById("confirmOverlay");

    // Show confirmation window
    openBtn.addEventListener("click", () => {
        overlay.classList.remove("d-none");
    });

    // Hide confirmation window
    closeBtn.forEach(btn => {
    btn.addEventListener("click", () => {
        overlay.classList.add("d-none");
    });
});

    // Optional: close when clicking outside popup
    overlay.addEventListener("click", (e) => {
        if (e.target === overlay) {
            overlay.classList.add("d-none"); 
        }
    });

});
