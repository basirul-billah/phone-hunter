const loadData = () => {
    fetch('https://openapi.programming-hero.com/api/phones?search=iphone')
        .then(res => res.json())
        .then(data => displayData(data));
}

const displayData = data => {
    console.log(data);
}