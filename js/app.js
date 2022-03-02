const loadData = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    searchField.value = '';
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayData(data.data));
}

const displayData = data => {
    const searchDiv = document.getElementById('search-result');
    data.forEach(data => {
        const div = document.createElement('div');
        const phoneId = data.slug;
        div.classList.add('col-sm-4');
        div.innerHTML = `
        <div class="card text-center mb-3 p-2">
            <div class="row g-0">

                <!-- image -->
                <div>
                    <img src="${data.image}" class="img-fluid rounded-start">
                </div>

                <!-- phone title -->
                <div class="card-body">
                    <h5 class="card-title">${data.phone_name}</h5>
                    <p class="card-text"><small class="text-muted">Brand: ${data.brand}</small></p>
                </div>

                <!-- details button -->
                <div>
                    <button onclick="loadDetails('${phoneId}')" class="btn btn-warning">Show Details</button>
                </div>
            </div>
        </div>
        `
        searchDiv.appendChild(div);
    })
}

const loadDetails = (phoneId) => {
    const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayDetails(data));
}

const displayDetails = id => {
    const idTag = id.data;
    const detailDiv = document.getElementById('show-details');
    const div = document.createElement('div');
    div.innerHTML = `
        <div class="modal-dialog modal-lg">
            <img src="${idTag.image}" alt="">
                <table class="table table-striped">
                    <tr>
                        <th>Chipset</th>
                        <td>${idTag.mainFeatures.chipSet}</td>
                    </tr>
                    <tr>
                        <th>Display Size</th>
                        <td>${idTag.mainFeatures.displaySize}</td>
                    </tr>
                    <tr>
                        <th>Memory</th>
                        <td>${idTag.mainFeatures.memory}</td>
                    </tr>
                    <tr>
                        <th>Sensors</th>
                        <td>${idTag.sensors}</td>
                    </tr>
                    <tr>
                        <th>Storage</th>
                        <td>${idTag.mainFeatures.storage}</td>
                    </tr>
                    <tr>
                        <th>Others</th>
                        <td>${idTag.others}</td>
                    </tr>
                    <tr>
                        <th>Others</th>
                        <td>${idTag.releaseDate}</td>
                    </tr>
                </table>
        </div>
    `
    detailDiv.appendChild(div);
}