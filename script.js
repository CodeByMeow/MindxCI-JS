const navItem = [
    {
        name: "Item 1"
    },
    {
        name: "Item 2"
    },
    {
        name: "Item 3"
    },
    {
        name: "Item 4"
    },
    {
        name: "Item 5"
    }
];

window.onload = function() {
    navItem.forEach((el) => {
        document.querySelector('.nav-bar').insertAdjacentHTML('beforeend', `<span>${el.name}</span>`)
    });
}