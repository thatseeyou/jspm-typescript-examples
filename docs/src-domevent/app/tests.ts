export function test1() {
    let div = document.createElement('div');
    div.innerText = 'Outer DIV';
    div.style.height = '140px';
    div.style.width = '300px';
    div.style.backgroundColor = "yellow";

    let button = document.createElement('button');
    button.innerText = 'Click / MouseDown / MoudeMove / MouseUp';
    button.style.display = 'block'
    button.style.height = '100px';
    div.appendChild(button);

    document.body.appendChild(div);

    button.addEventListener('click', (ev) => {
        console.log(`INNER:CLICK at (${ev.pageX},${ev.pageY})`);
    }, false);
    button.addEventListener('mousedown', (ev) => {
        console.log(`INNER:mouseDOWN at (${ev.pageX},${ev.pageY})`);
    }, false);
    // button.addEventListener('mousemove', (ev) => {
    //     console.log(`INNER:mouseMOVE at (${ev.pageX},${ev.pageY})`);
    // }, false);
    button.addEventListener('mouseup', (ev) => {
        console.log(`INNER:mouseUP at (${ev.pageX},${ev.pageY})`);
    }, false);
    button.addEventListener('mouseover', (ev) => {
        console.log(`INNER:mouseOVER at (${ev.pageX},${ev.pageY})`);
    }, false);
    button.addEventListener('mouseout', (ev) => {
        console.log(`INNER:mouseOUT at (${ev.pageX},${ev.pageY})`);
    }, false);
    button.addEventListener('mouseenter', (ev) => {
        console.log(`INNER:mouseENTER at (${ev.pageX},${ev.pageY})`);
    }, false);
    button.addEventListener('mouseleave', (ev) => {
        console.log(`INNER:mouseLEAVE at (${ev.pageX},${ev.pageY})`);
    }, false);

    div.addEventListener('click', (ev) => {
        console.log(`OUTER:CLICK at (${ev.pageX},${ev.pageY})`);
    }, false);
    div.addEventListener('mousedown', (ev) => {
        console.log(`OUTER:mouseDOWN at (${ev.pageX},${ev.pageY})`);
    }, false);
    // div.addEventListener('mousemove', (ev) => {
    //     console.log(`OUTER:mouseMOVE at (${ev.pageX},${ev.pageY})`);
    // }, false);
    div.addEventListener('mouseup', (ev) => {
        console.log(`OUTER:mouseUP at (${ev.pageX},${ev.pageY})`);
    }, false);
    div.addEventListener('mouseover', (ev) => {
        console.log(`OUTER:mouseOVER at (${ev.pageX},${ev.pageY})`);
    }, false);
    div.addEventListener('mouseout', (ev) => {
        console.log(`OUTER:mouseOUT at (${ev.pageX},${ev.pageY})`);
    }, false);
    div.addEventListener('mouseenter', (ev) => {
        console.log(`OUTER:mouseENTER at (${ev.pageX},${ev.pageY})`);
    }, false);
    div.addEventListener('mouseleave', (ev) => {
        console.log(`OUTER:mouseLEAVE at (${ev.pageX},${ev.pageY})`);
    }, false);
}