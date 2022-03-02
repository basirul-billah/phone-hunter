// loads data
const loadData = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;

    // clear search field
    searchField.value = '';

    // fetch data
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayData(data.data));
}

// displays data
const displayData = data => {
    const searchDiv = document.getElementById('search-result');

    // clear previous search results
    searchDiv.textContent = '';

    // show results
    if(data.length == 0) {
        const div = document.createElement('div');
        div.innerHTML = `
            <p class="text-center text-danger">No results found.</p>
        `;
        searchDiv.appendChild(div);
    }
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

// loads details for a specific phone
const loadDetails = (phoneId) => {
    const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayDetails(data));
}

// displays phone details as modal
const displayDetails = id => {
    const idTag = id.data;
    const detailDiv = document.getElementById('show-details');

    const div = document.createElement('div');
    div.classList.add('.modal-dialog.modal-lg');

    div.innerHTML = `
        
        <div class="modal-content p-4 m-2">
            <div class="modal-header">
                <h5 class="modal-title">Modal title</h5>
                <button onclick="closeModal()" type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
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
                        <td>${idTag.mainFeatures.sensors }</td>
                    </tr>
                    <tr>
                        <th>Storage</th>
                        <td>${idTag.mainFeatures.storage}</td>
                    </tr>
                    <tr>
                        <th>Release Date</th>
                        <td>${idTag?.releaseDate ?? 'Not available'}</td>
                    </tr>
                </table>
            </div>
        </div>
        
    `
    detailDiv.appendChild(div);
}

// closes modal
const closeModal = () => {
    const detailDiv = document.getElementById('show-details');
    detailDiv.innerHTML = '';
}