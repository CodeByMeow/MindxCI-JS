const navItem = [
    {
        name: "Item 1",
        chidlren: ['Item 1.1', 'Item 1.2', 'Item 1.3'],
    },
    {
        name: "Item 2",
        chidlren: [
            'Item 1.1',
            'Item 1.2',
            'Item 1.3',
            'Item 1.1',
            'Item 1.2',
            'Item 1.3',
        ],
    },
    {
        name: "Item 3"
    },
    {
        name: "Item 4"
    },
    {
        name: "Item 5"
    },
];

window.onload = function () {
    const nav = document.querySelector('.nav-bar');
    navItem.forEach((el) => {
        
        if (el.chidlren !== undefined) {
            nav.insertAdjacentHTML('beforeend', `<span class="dropdown">${el.name}</span>`);
            nav.lastChild.insertAdjacentHTML('beforeend', `<div class="dropdown-content"></div>`);
            el.chidlren.forEach((child) => {
                nav.lastChild.lastChild.insertAdjacentHTML('beforeend',  `<span>${child}</span>`)
            })
        } else {
            nav.insertAdjacentHTML('beforeend', `<span>${el.name}</span>`);
        }
    });
}