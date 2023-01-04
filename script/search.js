'use strict';
//Lấy dữ liệu từ local
const petArr = getFromStorage("petArr") || [];
const breedArr = getFromStorage("breed-list") || [];
//Đặt biến
var idInput = document.getElementById('input-id');
var nameInput = document.getElementById('input-name');
var typeInput = document.getElementById('input-type');
var breedInput = document.getElementById('input-breed');
var vaccinatedInput = document.getElementById('input-vaccinated');
var dewormedInput = document.getElementById('input-dewormed');
var sterilizedInput = document.getElementById('input-sterilized');
var tBody = document.getElementById('tbody');
//Dữ liệu bảng table khi load trang
const renderTableData = function (petArr) {
    tBody.innerHTML = "";

    for (let i = 0; i < petArr.length; i++) {
        let vaccinatedText = petArr[i].vaccinated
            ? "bi bi-check-circle-fill"
            : "bi bi-x-circle-fill";
        let dewormedText = petArr[i].dewormed
            ? "bi bi-check-circle-fill"
            : "bi bi-x-circle-fill";
        let sterilizedText = petArr[i].sterilized
            ? "bi bi-check-circle-fill"
            : "bi bi-x-circle-fill";
        const row = document.createElement("tr");
        row.innerHTML = `<th scope="row">${petArr[i].id}</th>
        <td>${petArr[i].name}</td>
        <td>${petArr[i].age}</td>
        <td>${petArr[i].type}</td>
        <td>${petArr[i].weight} kg</td>
        <td>${petArr[i].length} cm</td>
        <td>${petArr[i].breed}</td>
        <td>
            <i class="bi bi-square-fill" style="color: ${petArr[i].color}"></i>
        </td>
        <td><i class="${vaccinatedText}"></i></td>
        <td><i class="${dewormedText}"></i></td>
        <td><i class="${sterilizedText}"></i></td>
        <td>${petArr[i].date}</td>`;
        tBody.appendChild(row);
    }
}
renderTableData(petArr);

//Event click Find tìm kiếm
document.getElementById('find-btn').addEventListener('click', function(e) {
    e.preventDefault();

    searchData();
    clearFind();
});
//Clear form sau khi nhấn Find
function clearFind() {
    idInput.value = '';
    nameInput.value = '';
    typeInput.value = 'Select Type';
    breedInput.value = 'Select Breed';
    vaccinatedInput.checked = false;
    dewormedInput.checked = false;
    sterilizedInput.checked = false;
}

//Hiển thị breed
const renderBreed = function (breedArr) {
    breedInput.innerHTML = '';
    for (let i = 0; i < breedArr.length; i++) {
        const option = document.createElement('option');
        option.innerHTML = breedArr[i].breed;
        breedInput.appendChild(option);
    }
};
//Hiển thị Breed tương ứng theo Type
typeInput.addEventListener("change", function () {
    const optionsValue = breedArr.filter(function (item) {
        if (typeInput.value === "Dog") return item.type === "Dog";
        if (typeInput.value === "Cat") return item.type === "Cat";
        if (typeInput.value === "Select type") return [];
    });
    renderBreed(optionsValue);
});

//Hàm search tìm kiến pet theo người dùng muốn
const data = [];
function searchData() {  
    //Đặt biến
    var myId = document.getElementById('input-id').value;
    var myName = document.getElementById('input-name').value;
    var myType = document.getElementById('input-type').value;
    var myBreed = document.getElementById('input-breed').value;
    var myVaccinated = document.getElementById('input-vaccinated').checked;
    var myDewormed = document.getElementById('input-dewormed').checked;
    var mySterilized = document.getElementById('input-sterilized').checked;

    var data = petArr;
    if(myId) {
        data = petArr.filter(x => x.id.includes(myId));
    }
    if(myName) {
        data = petArr.filter(x => x.name.includes(myName));
    }
    if(myType != 'Select Type') {
        data = petArr.filter(x => x.type.includes(myType));
    }
    if(myBreed != 'Select Breed') {
        data = petArr.filter(x => x.breed.includes(myBreed));
    }
    if(myVaccinated) {
        data = petArr.filter(x => x.vaccinated);
    }
    if(myDewormed) {
        data = petArr.filter(x => x.dewormed);
    }
    if(mySterilized) {
        data = petArr.filter(x => x.sterilized);
    }
    console.log(data);
    renderTableData(data);
}
