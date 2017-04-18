export function buttonForTest(text: string) {
    let button = document.createElement('button');
    button.innerText = text;
    button.style.height = '80px';
    document.body.appendChild(button);

    return button;
}

export function inputForTest(label: string) {
    let labelEl = document.createElement('label');
    labelEl.innerText = label;
    let inputEl = document.createElement('input');
    labelEl.appendChild(inputEl);

    document.body.appendChild(labelEl);

    return inputEl;
}
