'use strict';
const localPetArr = (x) => saveToStorage("petArr", x);//Lưu dữ liệu vào local
const petArr = getFromStorage("petArr") || [];// Lấy dữ liệu từ local
// Dat bien
var idInput = document.getElementById("input-id");
var nameInput = document.getElementById("input-name");
var ageInput = document.getElementById("input-age");
var typeInput = document.getElementById("input-type");
var weightInput = document.getElementById("input-weight");
var lengthInput = document.getElementById("input-length");
var colorInput = document.getElementById("input-color-1");
var breedInput = document.getElementById("input-breed");
var vaccinatedInput = document.getElementById("input-vaccinated");
var dewormedInput = document.getElementById("input-dewormed");
var sterilizedInput = document.getElementById("input-sterilized");
var tBody = document.getElementById("tbody");
//Hiển thị dữ liệu ra bảng khi load trang
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
        <td>${petArr[i].date}</td>
        <td>
        <td>
            <button type="button" class="btn btn-warning">Edit</button>
        </td>`;
        tBody.appendChild(row);
    }
}
renderTableData(petArr);

//Hiển thị breed
const breedArr = getFromStorage("breed-list") || [];//Lấy dữ liệu từ local
//Hàm render để chọn pet
const renderBreed = function (breedArr) {
    breedInput.innerHTML = '';
    for (let i = 0; i < breedArr.length; i++) {
        const option = document.createElement('option');
        option.innerHTML = breedArr[i].breed;
        breedInput.appendChild(option);
    }
};
//Hiển thị Breed tương ứng khi chọn Type
typeInput.addEventListener("change", function () {
    const optionsValue = breedArr.filter(function (item) {
        if (typeInput.value === "Dog") return item.type === "Dog";
        if (typeInput.value === "Cat") return item.type === "Cat";
        if (typeInput.value === "Select type") return [];
    });
    renderBreed(optionsValue);
});
//Event click Edit
const btnEdit = document.querySelectorAll('.btn-warning');
btnEdit.forEach(function(btn, i) {
    btn.addEventListener('click', function() {
        document.getElementById('container-form').classList.remove('hide');
        //Lấy dữ liệu ra form
        idInput.value = petArr[i].id;
        nameInput.value = petArr[i].name;
        ageInput.value = petArr[i].age;
        typeInput.value = petArr[i].type;
        weightInput.value = petArr[i].weight;
        lengthInput.value = petArr[i].length;
        colorInput.value = petArr[i].color;
        //Hiển thị Breed tương ứng khi chọn Type
        const optionsValue = breedArr.filter(function (item) {
            if (typeInput.value === "Dog") return item.type === "Dog";
            if (typeInput.value === "Cat") return item.type === "Cat";
            if (typeInput.value === "Select type") return [];
        });
        renderBreed(optionsValue);
        vaccinatedInput.checked = petArr[i].vaccinated;
        dewormedInput.checked = petArr[i].dewormed;
        sterilizedInput.checked = petArr[i].sterilized;
    })
})
// Event click Submit cập nhật dữ liệu
document.getElementById('submit-btn').addEventListener('click', function(e) {
    e.preventDefault();
    // const petList = getFromStorage("petArr") || [];
    
    const data = {
        id: idInput.value,
        name: nameInput.value,
        age: ageInput.value,
        type: typeInput.value,
        weight: weightInput.value,
        length: lengthInput.value,
        color: colorInput.value,
        breed: breedInput.value,
        vaccinated: vaccinatedInput.checked,
        dewormed: dewormedInput.checked,
        sterilized: sterilizedInput.checked,
        date: new Date().getDate() + '/' +
            (new Date().getMonth() + 1) + '/' +
            new Date().getFullYear()
    };

    let index = petArr.findIndex((x) => x.id == data.id)
    if(index >= 0) {
        petArr.splice(index, 1, data);
    }
    renderTableData(petArr);
    localPetArr(petArr);
    clearForm();          
});
function validate() {
    //Validate tránh người dùng nhập thiếu
    if (nameInput.value.trim().length == '') {
        alert("Please input for name!");
        return;
    } else if (ageInput.value.trim().length == 0) {
        alert("Please input for age!");
        return;
    } else if (weightInput.value.trim().length == 0) {
        alert("Please input for weight!");
        return;
    } else if (lengthInput.value.trim().length == 0) {
        alert("Please input for length!");
        return;
    }
    
    // Điều kiện cho các value khi người dùng nhập dữ liệu
    for (let i = 0; i < tBody.rows.length; i++) {    
                    
        if (ageInput.value < 1 || ageInput.value > 15) {
            alert("Age must be between 1 and 15!");
            return;
        }
        if (weightInput.value < 1 || weightInput.value > 15) {
            alert("Weight must be between 1 and 15!");
            return;
        }
        if (lengthInput.value < 1 || lengthInput.value > 100) {
            alert("Length must be between 1 and 100!");
            return;
        }
        if (typeInput.selectedIndex === '') {
            alert("Please select type!");
            return;
        }
        if (breedInput.selectedIndex === '') {
            alert("Please select breed!");
            return;
        }
    }
};
// Xóa dữ liệu sau khi người dùng ấn Submit ra khỏi form
function clearForm() {
    idInput.value = '';
    nameInput.value = '';
    ageInput.value = '';
    weightInput.value = '';
    lengthInput.value = '';
    typeInput.value = 'Select Type';
    breedInput.value = 'Select Breed';
    vaccinatedInput.checked = false;
    dewormedInput.checked = false;
    sterilizedInput.checked = false;
};