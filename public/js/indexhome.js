const memberDetails = document.getElementById('memberDetails');
const addMemberBtn = document.getElementById('addMember');

let memberCount = 1;
addMemberBtn.addEventListener('click', () => {
    const newMemberDetails = document.createElement('div');
    newMemberDetails.innerHTML = `
        <hr class="border border-success border-2 opacity-50">
        <div class="row g-4" id="memberDetails-${memberCount}">
            <div class="col-md-4 p-3">
                <label for="inputText4" class="form-label">Name *</label>
                <input type="text" class="form-control border-success" placeholder="name" name="memberDetails[${memberCount}][name]"
                id="fName" required>
            </div>
            <div class="col-md-4 p-3">
                <label for="inputText4" class="form-label">Relation</label>
                <input type="text" class="form-control border-success" placeholder="Relation" name="memberDetails[${memberCount}][relation]"
                id="relation">
            </div>
            <div class="row">
                <div class="col-md-2 p-3">
                    <label for="inputText4" class="form-label">Birth Date *</label>
                        <input type="number" class="form-control border-success" name="memberDetails[${memberCount}][birthdate]"
                            id="date" required>
                </div>
                <div class="col-md-2 p-3">
                    <label for="inputText4" class="form-label">Birth Month *</label>
                        <select id="inputState selectMonth" name="memberDetails[${memberCount}][birthmonth]" class="form-select border-success" required>
                            <option>Not Selected</option>
                            <option>January</option>
                            <option>February</option>
                            <option>March</option>
                            <option>April</option>
                            <option>May</option>
                            <option>June</option>
                            <option>July</option>
                            <option>August</option>
                            <option>September</option>
                            <option>October</option>
                            <option>November</option>
                            <option>December</option>
                        </select>
                </div>
                <div class="col-md-2 p-3">
                    <label for="inputText4" class="form-label">Birth Year *</label>
                        <input type="number" class="form-control border-success" name="memberDetails[${memberCount}][birthyear]"
                            id="year" required>
                </div>
            </div>
            <div class="row">
                <div class="col-md-2 p-3">
                    <label for="inputText4" class="form-label">Baptism Date</label>
                        <input type="number" class="form-control border-success" name="memberDetails[${memberCount}][baptismdate]"
                            id="date">
                </div>
                <div class="col-md-2 p-3">
                    <label for="inputText4" class="form-label">Baptism Month</label>
                        <select id="inputState selectMonth" name="memberDetails[${memberCount}][baptismmonth]" class="form-select border-success">
                            <option>Not Selected</option>
                            <option>January</option>
                            <option>February</option>
                            <option>March</option>
                            <option>April</option>
                            <option>May</option>
                            <option>June</option>
                            <option>July</option>
                            <option>August</option>
                            <option>September</option>
                            <option>October</option>
                            <option>November</option>
                            <option>December</option>
                        </select>
                </div>
                <div class="col-md-2 p-3">
                    <label for="inputText4" class="form-label">Baptism Year</label>
                        <input type="number" class="form-control border-success" name="memberDetails[${memberCount}][baptismyear]"
                            id="year">
                </div>
            </div>
            <div class="row">
                <div class="col-md-2 p-3">
                    <label for="inputText4" class="form-label">Abroad or Not</label>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input border-success" type="radio" name="memberDetails[${memberCount}][abroad]"
                        id="abroadyes" value="yes" onclick="document.getElementById('placename${memberCount}').style.visibility = 'visible';">
                        <label class="form-check-label" for="inlineRadio1">Yes</label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input border-success" type="radio" name="memberDetails[${memberCount}][abroad]"
                        id="abroadno" value="no" checked onclick="document.getElementById('placename${memberCount}').style.visibility = 'hidden';">
                        <label class="form-check-label" for="inlineRadio2">No</label>
                    </div>
                </div>
                <div class="col-md-4 p-3" id="placename${memberCount}" style="visibility: hidden;">
                    <label for="inputText4" class="form-label">Place Name</label>
                    <input type="text" class="form-control border-success" placeholder="Place Name"
                    name="memberDetails[${memberCount}][placeName]" id="placeName">
                </div>
            </div>
            <div class="row" id="marrage" >
                <div class="col-md-2 p-3">
                    <label for="inputText4" class="form-label">Married or Not</label>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input border-success" type="radio" name="memberDetails[${memberCount}][married]"
                        id="marryyes" value="yes" onclick="document.getElementById('marryCheck${memberCount}').style.visibility = 'visible';">
                        <label class="form-check-label" for="inlineRadio1">Yes</label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input border-success" type="radio" name="memberDetails[${memberCount}][married]"
                        id="marryno" value="no" checked onclick="document.getElementById('marryCheck${memberCount}').style.visibility = 'hidden';">
                        <label class="form-check-label" for="inlineRadio2">No</label>
                    </div>
                </div>
                <div class="col-md-9 p-3" id="marryCheck${memberCount}" style="visibility: hidden;">
                    <div style="display: flex;">
                        <div class="col-md-2 p-3">
                            <label for="inputText4" class="form-label">Marriage Date</label>
                                <input type="number" class="form-control border-success"
                                    placeholder="Marriage Date" name="memberDetails[${memberCount}][marriagedate]" id="date">
                        </div>
                        <div class="col-md-2 p-3">
                            <label for="inputText4" class="form-label">Marriage Month</label>
                                <select id="inputState selectMonth" name="memberDetails[${memberCount}][marriagemonth]"
                                    class="form-select border-success">
                                    <option>Not Selected</option>
                                    <option>January</option>
                                    <option>February</option>
                                    <option>March</option>
                                    <option>April</option>
                                    <option>May</option>
                                    <option>June</option>
                                    <option>July</option>
                                    <option>August</option>
                                    <option>September</option>
                                    <option>October</option>
                                    <option>November</option>
                                    <option>December</option>
                                </select>
                        </div>
                        <div class="col-md-2 p-3">
                            <label for="inputText4" class="form-label">Marriage Year</label>
                            <input type="number" class="form-control border-success"
                                placeholder="Marriage Year" name="memberDetails[${memberCount}][marriageyear]" id="year">
                        </div>
                        <div class="col-md-6 p-3">
                            <label for="inputTest4" class="form-label">Partner Name</label>
                                <input type="text" class="form-control border-success"
                                placeholder="Partner Name" name="memberDetails[${memberCount}][partnerName]"
                                id="partnerName">
                        </div>
                    </div>
                </div>
            </div>
        </div>`
    document.getElementById('memberDetail').appendChild(newMemberDetails);
    memberCount++;
});