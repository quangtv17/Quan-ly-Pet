"use strict";
//Bổ sung animation cho sidebar
const active = document.querySelector('.active');
document.getElementById('sidebar').addEventListener('click', function() {  
    document.querySelector('#sidebar').classList.toggle('active');        
});
//Đặt biến
const breedInput = document.getElementById("input-breed");
const typeInput = document.getElementById("input-type");
const submitBtn = document.getElementById("submit-btn");
const tBody = document.getElementById("tbody");
const storeBreed = (x) => saveToStorage("breed-list", x);
const breedArr = getFromStorage("breed-list") || []; 
const petArr = getFromStorage("petArr") || [];

//Hàm hiện dữ liệu bảng Breed
const renderBreedTable = function (x) {
    tBody.innerHTML = "";
    for (let i = 0; i < x.length; i++) {
        const row = document.createElement("tr");
        row.innerHTML = `<td scope="row">${x.indexOf(x[i]) + 1}</td>
        <td>${x[i].breed}</td>
        <td>${x[i].type}</td>
        <td>
            <button type="button" class="btn btn-danger">Delete</button>
        </td>`;
        tBody.appendChild(row);
    }
    //Xóa Breed
    const btnsDelete = document.querySelectorAll(".btn-danger");
    btnsDelete.forEach(function (btn, i) {
        btn.addEventListener("click", function () {
            petBreed.splice(i, 1);
            storeBreed(petBreed);
            renderBreedTable(petBreed);
        });
    });
};
renderBreedTable(breedArr);
//Kiểm tra hợp lệ
const validate = function () {
    if (typeInput.value === "Select Type" || typeInput.value === "")
        return false;
    if (breedInput.value === "") return false;
    return true;
};

//Bắt sự kiện vào nút Submit
//Xử lý dữ liệu nhận từ input form:
submitBtn.addEventListener("click", function () {
    const breedData = {
        breed: breedInput.value,
        type: typeInput.value,
    };
    breedArr.push(breedData);

    //Yêu cầu để validate form
    if (typeInput.value === "Select Type" || typeInput.value === "")
        alert("Please select type");
    if (breedInput.value === "Select Breed" || breedInput.value === "")
        alert("Please input breed");
    validate();
    if (validate()) {
        renderBreedTable(breedArr);
        storeBreed(breedArr);
        typeInput.value = "Select Type";
        breedInput.value = "";
    }
});