//Delete Member
document.querySelectorAll('.delete-member').forEach(button => {
    button.addEventListener('click', event => {
        const memberId = event.target.getAttribute('data-memberid');
        const userId = event.target.getAttribute('data-id');
        const message = `Are you sure you want to delete member?`;
        if (confirm(message)) {
            fetch(`/${userId}/${memberId}`, {
                method: 'DELETE'
            })
                .then(response => {
                    if (response.ok) {
                        location.reload();
                    } else {
                        throw new Error('Failed to delete member');
                    }
                })
                .catch(error => alert(error.message));
        }
    });
});
// Delete Data
document.querySelectorAll('.delete-data').forEach(button => {
    button.addEventListener('click', event => {
        const userId = event.target.getAttribute('data-id');
        const message = `Are you sure you want to delete family?`;
        if (confirm(message)) {
            fetch(`/${userId}`, {
                method: 'DELETE'
            })
                .then(response => {
                    if (response.ok) {
                        window.location.href = "/list";
                    } else {
                        throw new Error('Failed to delete member');
                    }
                })
                .catch(error => alert(error.message));
        }
    });
});