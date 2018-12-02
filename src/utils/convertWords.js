//Converts a list of words to fit the format 
//necessary for input into WordCloud
export default function convertWords(words) {
    var newWords = []
    Object.keys(words).map(function(keyName, keyIndex) {
        // use keyName to get current key's name
        // and a[keyName] to get its value
        newWords.push({ text: keyName, value: keyIndex });
    });
    return newWords;
}
