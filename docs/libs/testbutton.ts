export interface TestItem {
    text: string;
    action: (target:HTMLButtonElement, placeholder:HTMLElement) => void;
}

export function makeTestButtons(items:TestItem[]) {
    let container = document.getElementById('test-buttons');
    items.forEach((item) =>{
        makeTestButton(container, item.text, (targetButton, placeholder)=> {
            console.log(`>>> START of ${item.text}`);
            item.action(targetButton, placeholder);
            console.log(`<<< END of ${item.text}`);
            console.log();
        });
    });
}

function makeTestButton(parent:HTMLElement, text:string, action:(targetButton:HTMLButtonElement, placeholder:HTMLElement) => void) {
    let button = document.createElement('button');
    button.innerText = text;
    button.style.display = 'block';

    let placeholder = document.createElement('div');

    parent.appendChild(button);
    parent.appendChild(placeholder);

    button.addEventListener('click', (event) => {
        action(this, placeholder);
    });

}