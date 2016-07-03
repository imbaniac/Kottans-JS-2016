function countWords(words) {
    return words.reduce(function(map, word) {
        map[word] = (map[word] || 0) + 1;
        return map;
    }, Object.create(null));
}

module.exports = countWords
