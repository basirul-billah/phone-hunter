// loads data after clicking search
const loadData = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;

    const searchDiv = document.getElementById('search-result');

    // clear search field
    searchField.value = '';

    // closes modal if exists
    closeModal();

    if (searchText == '') {
        searchDiv.textContent = '';
        const div = document.createElement('div');
        div.innerHTML = `
            <p class="text-center text-danger">Please enter a search term.</p>
        `;
        searchDiv.appendChild(div);
    }
    else {
        // fetch data
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
        fetch(url)
            .then(res => res.json())
            .then(data => displayData(data.data));
    }
}

// toggles spinner on/off 
const spinnerToggle = displayStyle => {
    document.getElementById('spinner').style.display = displayStyle;
}

// toggles search result on/off 
const spinnerResultToggle = displayStyle => {
    document.getElementById('search-result').style.display = displayStyle;
}

// displays data
const displayData = data => {
    const numberOfPhones = data.slice(0, 20);
    const searchDiv = document.getElementById('search-result');

    // clear previous search results
    searchDiv.textContent = '';

    // shows spinner 
    spinnerToggle('block');

    // show results
    if (data.length == 0) {
        const div = document.createElement('div');
        div.innerHTML = `
            <p class="text-center text-danger">No results found.</p>
        `;
        searchDiv.appendChild(div);
    }
    numberOfPhones.forEach(data => {
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

    // hides spinner 
    spinnerToggle('none');
}

// loads details for a specific phone
const loadDetails = (phoneId) => {
    // closes modal if any
    closeModal();

    const scrollToTop = document.documentElement;
    scrollToTop.scrollTop = 0;

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
                <h5 class="modal-title">Phone Specifications</h5>
                <button onclick="closeModal()" type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body row g-4">
                <div class="col-md-4">
                    <img src="${idTag?.image ?? 'Not available'}">
                </div>
                <div class="col-md-8">
                    <h5 class="mt-2">${idTag?.name ?? 'Not available'}</h5>
                    <p>${idTag?.releaseDate ?? 'Release date not available'}</p>
                    <hr>
                    <p>Brand: ${idTag?.brand ?? 'Not available'}</p>
                    <p>Chipset: ${idTag?.mainFeatures?.chipSet ?? 'Not available'}</p>
                    <p>Display Size: ${idTag?.mainFeatures?.displaySize ?? 'Not available'}</p>
                    <p>Memory: ${idTag?.mainFeatures?.memory ?? 'Not available'}</p>
                    <p>Sensors: ${idTag?.mainFeatures?.sensors ?? 'Not available'}</p>
                    <p>Storage: ${idTag?.mainFeatures?.storage ?? 'Not available'}</p>
                    <p>Bluetooth: ${idTag?.others?.Bluetooth ?? 'Not available'}</p>
                    <p>GPS: ${idTag?.others?.GPS ?? 'Not available'}</p>
                    <p>NFC: ${idTag?.others?.NFC ?? 'Not available'}</p>
                    <p>Radio: ${idTag?.others?.Radio ?? 'Not available'}</p>
                    <p>USB: ${idTag?.others?.USB ?? 'Not available'}</p>
                    <p>WLAN: ${idTag?.others?.WLAN ?? 'Not available'}</p>
                </div>
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