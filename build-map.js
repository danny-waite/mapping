const fs = require("fs");

const inputPath = process.argv[2]
    , outputPath = process.argv[3]
    ;

const input = fs.readFileSync(inputPath, "utf8");

let lastId = 0;
let lastIndent = 0;
let elements = [];
let links = [];
let title = ""
let parentIndex;

let parents = [];
let names = [];

const lines = input.split("\n");
const increment = (1 / lines.length).toFixed(3);
let currentIncrement = 1;

for (let line of lines) {
    line = line.trimRight();
    if (!line.trim()) continue;

    const indent = line.match(/^\s{0,100}/)[0].length; // fix hard coded 100 limit

    if (indent > lastIndent) parents.push(elements.length - 1)
    else if (indent < lastIndent) {

        const levels = (lastIndent - indent) / 2;
        for (let i=0;i < levels; i++) {
            parents.pop();
        }
    }

    parentIndex = parents[parents.length - 1];
    lastIndent = indent;
    lastId++;

    const values = line.trim().split("/")

    const name = values[0]
        , visibility = values.length > 1 ? parseInt(values[1]) / 100 : currentIncrement
        , maturity = values.length > 2 ? parseInt(values[2]) / 100 : currentIncrement
        , level = parents.length
        ;

    if (names.includes(name)) throw new Error(`duplicate name ${name}`);
    else if (name.startsWith("#")) continue; // commented

    names.push(name);

    const element = {
        id: lastId,
        name,
        visibility,
        maturity,
        level
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