function togglePlaceNameField(show) {
    const placeNameField = document.getElementById('placename');
    placeNameField.style.display = show ? 'block' : 'none';
    if (!show) {
        document.getElementById('placeName').value = "";
    }
}
function toggleMarriageField(show) {
    const marriageField = document.querySelector('#marriage');
    marriageField.style.display = show ? 'block' : 'none';
    if (!show) {
        document.querySelector('#marriageDate').value = "";
        document.querySelector('#marriageMonth').selectedIndex = -1;
        document.querySelector('#marrriageYear').value = "";
        document.querySelector('#partnername').value = "";
    }
}