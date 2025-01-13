// CEP mask
document.querySelector('input[name="cep"]').addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 8) value = value.slice(0, 8);
    if (value.length > 5) {
        value = value.slice(0, 5) + '-' + value.slice(5);
    }
    e.target.value = value;
});

function toggleAllEquipment(source) {
    const checkboxes = document.getElementsByName('equipment[]');
    checkboxes.forEach(checkbox => checkbox.checked = source.checked);
}

function removeEquipment(id) {
    if (confirm('Deseja remover este equipamento?')) {
        fetch(`/contracts/equipment/${id}`, { method: 'DELETE' })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    location.reload();
                }
            });
    }
}

function submitForm() {
    const form = document.getElementById('contractForm');
    if (form.checkValidity()) {
        form.submit();
    } else {
        alert('Por favor, preencha todos os campos obrigatórios.');
    }
}

function openEquipmentModal() {
    // Implementation for equipment modal
}

function triggerFileInput() {
    document.getElementById('fileInput').click();
}

function changeOperation() {
    // Implementation for changing operation
}