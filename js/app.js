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
        console.log(data);
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card mb-3 p-2">
            <div class="row g-0">

                <!-- image -->
                <div class="col-md-3" style="max-width: 540px;">
                    <img src="${data.image}" class="img-fluid rounded-start">
                </div>

                <!-- phone title -->
                <div class="col-md-6">
                    <div class="card-body">
                        <h5 class="card-title">${data.phone_name}</h5>
                        <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                    </div>
                </div>

                <!-- details button -->
                <div class="col-md-3 align-items-center d-inline-flex flex-row-reverse p-2">
                    <button class="btn btn-warning">Show Details</button>
                </div>
            </div>
        </div>
        `
        searchDiv.appendChild(div);
    })
}