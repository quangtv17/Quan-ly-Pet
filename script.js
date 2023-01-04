'use strict';
//Bổ sung animation cho sidebar
const active = document.querySelector('.active');
document.getElementById('sidebar').addEventListener('click', function() {  

    document.querySelector('#sidebar').classList.toggle('active');        
});

// LocalStorage lưu và gọi dữ liệu từ local
const localPetArr = (x) => saveToStorage("petArr", x);
const petArr = getFromStorage("petArr") || [];
//Dặt biến
var petId = document.querySelector ('#input-id');
var petName = document.querySelector('#input-name');
var petAge = document.querySelector('#input-age');
var petType = document.querySelector ('#input-type');
var petWeight = document.querySelector('#input-weight');
var petLength = document.querySelector('#input-length');
var petColor = document.querySelector ('#input-color-1');
var petBreed = document.querySelector('#input-breed');
var petVaccinated = document.querySelector('#input-vaccinated');
var petDewormed = document.querySelector('#input-dewormed');
var petSterilized = document.querySelector('#input-sterilized');      
//Thời gian khi nhập pet mới
var date = new Date();
var petDateAdded = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
var submit = true;
var petTbody = document.querySelector('#tbody');
//Hiển thị dữ liệu khi load trang
function renderTableData(x) {
    petTbody.innerHTML = '';

    for (let i = 0; i < x.length; i++) {
        let vaccinatedText = x[i].vaccinated ? "bi bi-check-circle-fill" : "bi bi-x-circle-fill";
        let dewormedText = x[i].dewormed ? "bi bi-check-circle-fill" : "bi bi-x-circle-fill";
        let sterilizedText = x[i].sterilized ? "bi bi-check-circle-fill" : "bi bi-x-circle-fill";
        
        const row = document.createElement("tr");
        row.innerHTML = `<th scope="row">${x[i].id}</th>
        <td>${x[i].name}</td>
        <td>${x[i].age}</td>
        <td>${x[i].type}</td>
        <td>${x[i].weight}</td>
        <td>${x[i].length}</td>
        <td>${x[i].breed}</td>
        <td>
            <i class="bi-square-fill" style="color: ${x[i].color}"></i>
        </td>
        <td><i class="${vaccinatedText}"></i></td>
        <td><i class="${dewormedText}"></i></td>
        <td><i class="${sterilizedText}"></i></td>
        <td>${x[i].date}</td>
        <td>
            <button type="button" class="btn btn-danger">Delete</button>
            
        </td>`;
        petTbody.appendChild(row);
    }
    //Xóa pet
    const deletePet = function(id) {
        for(let i = 0; i < petTbody.rows.length; i++) {
            if(id === petTbody.rows[i].cells[0].textContent) {
                petArr.splice(i, 1)
                localPetArr(petArr);
            }
            renderTableData(petArr);
        }
    }

    const btnDelete = document.querySelectorAll('.btn-danger');
    for(let a = 0; a < btnDelete.length; a++) {
        btnDelete[a].addEventListener('click', function() {
            const confirmDelete = confirm('Are you sure?');
            if(confirmDelete) {
                const id = petTbody.rows[a].cells[0].textContent;
                deletePet(id);
            }
        })
    }
};
renderTableData(petArr);

//Event click Submit
document.querySelector("#submit-btn").addEventListener('click', function(e){
    e.preventDefault();
           
    const data = {
        id: petId.value,
        name: petName.value,
        age: Number(petAge.value),
        type: petType.value,
        weight: Number(petWeight.value),
        length: Number(petLength.value),
        color: petColor.value,
        breed: petBreed.value,
        vaccinated: petVaccinated.checked,
        dewormed: petDewormed.checked,
        sterilized: petSterilized.checked,
        date: petDateAdded
    };
    // Validate tránh người dùng nhập thiếu
    if (petId.value.trim().length == '') {
        alert("Please input for ID!");
        return;
    } else if (petName.value.trim().length == '') {
        alert("Please input for name!");
        return;
    } else if (petAge.value.trim().length == 0) {
        alert("Please input for age!");
        return;
    } else if (petWeight.value.trim().length == 0) {
        alert("Please input for weight!");
        return;
    } else if (petLength.value.trim().length == 0) {
        alert("Please input for length!");
        return;
    }
    // Điều kiện cho các value khi người dùng nhập dữ liệu
    for (let i = 0; i < petTbody.rows.length; i++) {
        if (petId.value === petTbody.rows[i].textContent) {
            alert("ID must unique!");
            return;
        }
        if (petAge.value < 1 || petAge.value > 15) {
            alert("Age must be between 1 and 15!");
            return;
        }
        if (petWeight.value < 1 || petWeight.value > 15) {
            alert("Weight must be between 1 and 15!");
            return;
        }
        if (petLength.value < 1 || petLength.value > 100) {
            alert("Length must be between 1 and 100!");
            return;
        }
        if (petType.selectedIndex === '') {
            alert("Please select type!");
            return;
        }
        if (petBreed.selectedIndex === '') {
            alert("Please select breed!");
            return;
        }
    }
    if(submit) {
        petArr.push(data);   
        localPetArr(petArr);
        renderTableData(petArr);
        clearFrom();
    }
});

//Xóa dữ liệu nhập trên form
function clearFrom() {
    petId.value = '';
    petName.value = '';
    petAge.value = '';
    petWeight.value = '';
    petLength.value = '';
    petType.value = 'Select Type';
    petBreed.value = 'Select Breed';
    petVaccinated.checked = false;
    petDewormed.checked = false;
    petSterilized.checked = false;
}

// Lọc pet 
var healthyPetArr = [];
var healthyCheck = false;
var healthyBtn = document.getElementById('healthy-btn');
healthyBtn.addEventListener('click', function() {

    if(healthyCheck == true) {
        healthyBtn.innerHTML = 'Show Healthy Pet';
        renderTableData(petArr);
    } else if(healthyCheck == false) {
        healthyBtn.innerHTML = 'Show All Pet';
        healthyPetArr = petArr.filter(petArr => petArr.vaccinated && petArr.dewormed && petArr.sterilized);
        renderTableData(healthyPetArr);
    } 
});

// Lay breed-list tu Storage
const breedArr = getFromStorage("breed-list") || [];
console.log(breedArr);
const renderBreed = function (breedArr) {
    petBreed.innerHTML = '';
    for (let i = 0; i < breedArr.length; i++) {
        const option = document.createElement('option');
        option.innerHTML = breedArr[i].breed;
        petBreed.appendChild(option);
    }
};
//Hiển thị Breed tương ứng theo Type
petType.addEventListener("change", function () {
    const optionsValue = breedArr.filter(function (item) {
        if (petType.value === "Dog") return item.type === "Dog";
        if (petType.value === "Cat") return item.type === "Cat";
        if (petType.value === "Select type") return [];
    });
    renderBreed(optionsValue);
});



