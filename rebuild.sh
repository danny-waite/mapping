for filename in inputs/*.txt; do
    node build-map.js $filename maps/$(basename $filename .txt).js
done