const block = document.querySelectorAll('.block');

document.addEventListener('keydown', (event) => {
    event.preventDefault();
    if (event.code.toLowerCase() === 'space') {
        setRandomColor()

    }
})

document.addEventListener('click', (event) => {
    const type = event.target.dataset.type;
    if (type === "lock") {
        const node = event.target.tagName.toLowerCase() === 'i'
            ? event.target
            : event.target.children[0]

        node.classList.toggle('fa-circle');
        node.classList.toggle('fa-circle-check');
    } else if (type === 'copy') {
        copyToClickboard(event.target.textContent);
        alert('цвет скопирован')
    }
})

function setRandomColor(isInitial) {
    const colors = isInitial ? getColorsHash() : []
    block.forEach((item, index) => {
        const isLocked = item.querySelector('i').classList.contains('fa-circle-check')
        const text = item.querySelector('.block__title');
        const button = item.querySelector('.block__button');

        if (isLocked) {
            colors.push(text.textContent)
            return
        }

        const color = isInitial
            ? colors[index]
                ? colors[index]
                : chroma.random()
            : chroma.random();

        if (!isInitial) {
            colors.push(color);
        }

        text.textContent = color;
        item.style.background = color;
        setText(text, color);
        setText(button, color);
    })
    updateColorsHash(colors);
}

function copyToClickboard(text) {
    return navigator.clipboard.writeText(text)
}

function setText(text, color) {
    const luminance = chroma(color).luminance();
    text.style.color = luminance > 0.5 ? 'black' : 'white';
}

function updateColorsHash(colors = []) {
    document.location.hash = colors.map(col => {
        return col.toString().substring(1)
    }).join('-')
}

function getColorsHash() {
    if (document.location.hash.length > 1) {
        return document.location.hash
            .substring(1)
            .split('-')
            .map((color) => '#' + color)
    }
    return [];
}
setRandomColor(true);