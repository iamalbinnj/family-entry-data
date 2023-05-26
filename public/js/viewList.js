document.querySelectorAll('.delete-data').forEach(button => {
    button.addEventListener('click', event => {
        const userId = event.target.getAttribute('data-id');
        const message = `Are you sure you want to delete?`;

        if (confirm(message)) {
            fetch(`/${userId}`, {
                method: 'DELETE'
            })
                .then(response => {
                    if (response.ok) {
                        window.location.href = window.location.href;
                    } else {
                        throw new Error('Failed to delete member');
                    }
                })
                .catch(error => alert(error.message));
        }
    });
});

function handleSelectChange(selectedId) {
    const BM = document.getElementById('BM');
    const AM = document.getElementById('AM');

    if (selectedId === 'BM') {
      AM.disabled = BM.value !== '';
    } else if (selectedId === 'AM') {
      BM.disabled = AM.value !== '';
    }
  }