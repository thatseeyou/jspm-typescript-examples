export interface TestItem {
    text: string;
    action: (target:HTMLButtonElement) => void;
}

export function makeTestButtons(items:TestItem[]) {
    let container = document.getElementById('test-buttons');
    items.forEach((item) =>{
        makeTestButton(container, item.text, (targetButton)=> {
            console.log(`>>> START of ${item.text}`);
            item.action(targetButton);
            console.log(`<<< END of ${item.text}`);
            console.log();
        });
    });
}

function makeTestButton(parent:HTMLElement, text:string, action:(targetButton:HTMLButtonElement) => void) {
    let button = document.createElement('button');
    button.innerText = text;
    button.style.display = 'block';

    parent.appendChild(button);
    button.addEventListener('click', (event) => {
        action(this);
    });
}