export function test1() {
    let button = document.createElement('button');
    button.innerText = 'Click / MouseDown / MoudeMove / MouseUp';
    button.style.height = '100px';
    document.body.appendChild(button);

    button.addEventListener('click', (ev) => {
        console.log(`CLICK at (${ev.pageX},${ev.pageY})`);
    }, false);
    button.addEventListener('mousedown', (ev) => {
        console.log(`mouseDOWN at (${ev.pageX},${ev.pageY})`);
    }, false);
    button.addEventListener('mousemove', (ev) => {
        console.log(`mouseMOVE at (${ev.pageX},${ev.pageY})`);
    }, false);
    button.addEventListener('mouseup', (ev) => {
        console.log(`mouseUP at (${ev.pageX},${ev.pageY})`);
    }, false);
}