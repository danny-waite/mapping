const fs = require("fs");

const inputPath = process.argv[2]
    , outputPath = process.argv[3]
    ;

const input = fs.readFileSync(inputPath, "utf8");

let lastId = 0;
let lastIndent = 0;
// let base = 0;
let elements = [];
let links = [];
let title = ""
let parentIndex;

let parents = [];

const lines = input.split("\n");
const increment = (1 / lines.length).toFixed(3);
let currentIncrement = 1;

for (let line of lines) {
    line = line.trimRight();
    if (!line.trim()) continue;

    const indent = line.match(/^\s{0,100}/)[0].length; // fix hard coded 100 limit

    // if (indent !== lastIndent) { // changed levels
    //     base = base + indent * 100;
    //     lastId = 0;
    // }

    if (indent > lastIndent) parents.push(elements.length - 1)
    else if (indent < lastIndent) parents.pop()

    parentIndex = parents[parents.length - 1];

    lastIndent = indent;

    lastId++;

    const element = {
        id: lastId,
        name: line.trim(),
        visibility: currentIncrement,
        maturity: currentIncrement,
        level: parents.length
    };

    if (parentIndex > -1) {
        const link = {
            start: elements[parentIndex].name,
            end: element.name
        }
    
        links.push(link);
    }
    
    elements.push(element);

    currentIncrement = Number((currentIncrement - increment).toFixed(3));
}

const outputObject = {
    title,
    elements,
    links
}

let outputString = "var mapScript = " + JSON.stringify(outputObject, null, 2);
outputString = outputString.replace(/\"([^(\")"]+)\":/g,"$1:");

fs.writeFileSync(outputPath, outputString);