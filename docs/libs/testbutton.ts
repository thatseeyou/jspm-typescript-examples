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
    // 1. make button
    let button = document.createElement('button');
    button.innerText = text;
    button.style.display = 'block';

    // 2. make placeholder below button
    let placeholder = document.createElement('div');

    // 3. append to parent
    parent.appendChild(button);
    parent.appendChild(placeholder);

    // 4. listen click event 
    button.addEventListener('click', (event) => {
        action(this, placeholder);
    });

}