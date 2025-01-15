function adicionarItem(idGrupo){
    fetch(`/itens/${idGrupo}` , {
method: 'POST',
headers: {
    'Content-Type': 'application/json'
},
body: null
})
.then(response => response.json())
.then(data => {
console.log('Success:', data);
window.location.reload();

})
.catch((error) => {
console.error('Error:', error);
});

}

function deletarItem(idItem){
    fetch(`/itens/${idItem}` , {
method: 'DELETE',
headers: {
    'Content-Type': 'application/json'
},
body: null
})
.then(response => response.json())
.then(data => {
console.log('Success:', data);
window.location.reload();

})
.catch((error) => {
console.error('Error:', error);
});

}

  document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.querySelector('.search-input');
    const tableRows = document.querySelectorAll('.items-table tbody tr');

    searchInput.addEventListener('input', function() {
      const searchTerm = searchInput.value.toLowerCase();

      tableRows.forEach(row => {
        const idCell = row.querySelector('td:nth-child(2)'); 
        const codBarrasCell = row.querySelector('td:nth-child(3)'); 

        const idValue = idCell.textContent.toLowerCase();
        const codBarrasValue = codBarrasCell.textContent.toLowerCase();

        if (idValue.includes(searchTerm) || codBarrasValue.includes(searchTerm)) {
          row.style.display = ''; 
        } else {
          row.style.display = 'none'; 
        }
      });
    });
  });
