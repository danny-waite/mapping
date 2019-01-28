# Wardley Map Builder

```
node build-map.js inputs/test.txt maps/test.js
```

## Dependencies
You'll need to installed browser-sync globally
```
npm install browser-sync -g
```

## Development
```
# run watcher to rebuild outputs when you save input
npm run watch

# start the debug server
npm start
```

## Taxonomy
Hierarchy is specified using 2 spaces, for example
```
root node
  node 1
    node 1a
    node 1b
  node 2
```

Visibility and Maturity (respectively) can be specified with a slash separator at the end of the node name, for example
```
root node/100/50
```

Colour can also be specified by adding a CSS color.  You can find a list at https://www.w3schools.com/colors/colors_names.asp
```
root node/100/50/aqua
```

## Acknowledgments
SVG Mapping taken from cioportfolio at https://github.com/cioportfolio/swardley-script