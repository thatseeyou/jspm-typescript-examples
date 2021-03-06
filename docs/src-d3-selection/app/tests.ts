import * as d3 from 'd3-selection';

export function testHtml() {
  // selection.html()
  d3.select('#container').html(`
      <div id="A">
        <div id="1">div #1</div>
        <div id="2">div #2</div>
        <div id="3">div #3</div>
    </div>
    <div id="B">
        <div id="4">div #4</div>
        <div id="5">div #5</div>
        <div id="6">div #6</div>
    </div>
  `);
}

export function testStyle() {
  let div = d3.select('#container').selectAll('div');

  // selection.style()
  div.selectAll(':nth-child(odd)').style('color', 'red');
  div.selectAll(':nth-child(even)').style('color', 'blue');
}

export function testNode() {
  let div = d3.select('#container').selectAll('div');

  // selection.node()
  let s = new XMLSerializer();
  let n = s.serializeToString(<Node>div.node());
  console.log(n);
}

export function testAppend() {
  let div = d3.select('#container').selectAll('div');

  // selection.append(), selection.text()
  let count = 0;
  div.selectAll('div').append('b').text(function (datum, index, group) {
    return `([${count++}]appended)`;
  });
}

export function testInsert() {
  let count = 0;

  let div = d3.select('#container').selectAll('div');
  // selection.insert(), selection.text()
  div.selectAll('div').insert('b', ':first-child').text(function (datum, index, group) {
    return `([${count++}]inserted before first-child)`;
  });
}

export function testPrepend() {
  let count = 0;

  let div = d3.select('#container').selectAll('div');

  div.selectAll('div').select(function (datum, index, group) {
    let n = this as Node;
    return n.insertBefore(document.createElement('b'), n.firstChild) as Element;
  }).text(function (datum, index, group) {
    return `([${count++}]inserted before Text)`;
  });
}

export function testData() {
  let svg = d3.select('#container').append('svg');

  svg.html('<circle style="fill: none; stroke: blue;" border="1" cx="5" cy="5" r="10"></circle>');
  // svg.append('circle');
  // svg.append('circle');

  (() => {
    let data = [
      { x: 100, y: 100, r: 100 },
      { x: 200, y: 100, r: 50 },
      { x: 100, y: 50, r: 70 }
    ]

    let circle = svg.selectAll("circle");
    logSelection('circle', circle);

    let update = circle.data(data);
    logSelection('update selection = after data()', update);

    let enter = update.enter();
    logSelection('enter selection', enter);

    let exit = update.exit();
    logSelection('exit selection', exit);

    // remove 
    exit.remove();

    // add & update
    enter
      .append('circle')
      .style('fill', 'none')
      .attr('border', 1)
      .style('stroke', 'blue')
      .merge(update)
      .attr('cx', (d) => d.x)
      .attr('cy', (d) => d.y)
      .attr('r', (d) => d.r);
  })();
}

export function testDatum() {
  let svg = d3.select('#container > svg');

  // selection.datum
  let circle = svg.selectAll("circle");
  logSelection('before datum', circle);
  circle.datum({ x: 5, y: 5 });
  logSelection('after datum', circle);
}

type PropNames = '_parents' | '_groups' | '_enter' | '_exit';
interface InternalSelection<E extends d3.BaseType, D, PE extends d3.BaseType, PD> extends d3.Selection<E, D, PE, PD> {
  // _parents: (PE[])[];
  // _groups: (any[])[];
  // _enter?: (any[])[];
  // _exit?: (any[])[];
  [propName: string]: any;
}

function logSelection<E extends d3.BaseType, D, PE extends d3.BaseType, PD>(desc: string, selection: d3.Selection<E, D, PE, PD>) {
  console.log();
  console.log(`LOG START {{{ // ${desc} ----------------------------------------`);

  let internalSelection = selection as InternalSelection<E, D, PE, PD>;

  // _selection
  console.log(`0. Selection = `);
  console.log(selection);

  let props: PropNames[] = ['_groups', '_parents', '_enter', '_exit'];

  props.forEach(function (prop, idxProp) {
    if (prop in internalSelection) {
      (<any[][]>internalSelection[prop]).forEach(function (nodes, idxGroup) {
        console.log(`${idxProp + 1}. ${prop}[${idxGroup}] = `);
        console.log(nodes);
        if (prop !== '_parents') {
          nodes.forEach(function (node, idxNode) {
            if (node.__data__) {
              console.log(`   ${prop}[${idxGroup}][${idxNode}].__data__ =`);
              console.log(node.__data__);
            }
          });
        }
      });
    }
  });

  console.log(`}}} LOG END // ${desc}`);
}
