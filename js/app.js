const loadData = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    searchField.value = '';
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    console.log(url);
    fetch(url)
        .then(res => res.json())
        .then(data => displayData(data.data));
}

const displayData = data => {
    const searchDiv = document.getElementById('search-result');
    data.forEach(data => {
        const div = document.createElement('div');
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
                    <button onclick="loadDetails()" class="btn btn-warning">Show Details</button>
                </div>
            </div>
        </div>
        `
        searchDiv.appendChild(div);
    })
}

const loadDetails = () => {
    const detailDiv = document.getElementById('show-details');
    const div = document.createElement('div');
    div.innerHTML = `
        <div class="card mb-3">
            <img src="" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">Card title</h5>
                <p class="card-text">This is a wider card with supporting text below as a natural lead-in to
                    additional content. This content is a little bit longer.</p>
                <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
            </div>
        </div>
    `
}