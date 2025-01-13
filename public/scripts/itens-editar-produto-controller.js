function showPopup() {
    document.getElementById("popup").style.display = "flex";
}

function addCategory() {
    const category = document.getElementById("new-category").value;
    if (category) {
        const select = document.getElementById("category-select");
        const newOption = document.createElement("option");
        newOption.textContent = category;
        select.appendChild(newOption);
        select.value = category;

        document.getElementById("popup").style.display = "none";
        document.getElementById("new-category").value = "";
    }
}