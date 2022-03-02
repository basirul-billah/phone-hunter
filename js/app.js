const loadData = () => {
    const searchText = document.getElementById('search-field').value;
    console.log(searchText);
    fetch('https://openapi.programming-hero.com/api/phones?search=iphone')
        .then(res => res.json())
        .then(data => displayData(data));
}

const displayData = data => {
    // console.log(data);
    const searchDiv = document.getElementById('search-result');
    data.forEach(data => {
        searchDiv.classList.add('card mb-3 p-2');
        searchDiv.innerHTML = `
        <div class="row g-0">

            <!-- image -->
            <div class="col-md-3" style="max-width: 540px;">
                <img src="apple-iphone-13-mini.jpg" class="img-fluid rounded-start">
            </div>

            <!-- phone title -->
            <div class="col-md-6">
                <div class="card-body">
                    <h5 class="card-title">Card title</h5>
                    <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                </div>
            </div>

            <!-- details button -->
            <div class="col-md-3 align-items-center d-inline-flex flex-row-reverse p-2">
                <button class="btn btn-warning">Show Details</button>
            </div>
        </div>
        `
    })
}