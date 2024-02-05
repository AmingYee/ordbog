"use strict";

window.addEventListener("load", start)

let globalArrayOfWords;

async function start() {
    const response = await fetch("../data/ddo_fullforms.csv");
    const rawtext = await response.text();

    globalArrayOfWords = rawtext.split("\n").map(line => {
        const parts = line.split("\t");
        return {
            variant: parts[0],
            headword: parts[1],
            homograph: parts[2],
            partofspeech: parts[3],
            id: parts[4]
        }
    });
    globalArrayOfWords.sort(compare);
    console.log(`array size: ${globalArrayOfWords.length}`)
    const targetVariant = "hestevogn";
    const targetObject = { variant: targetVariant };
    const resultBinaryIndex = binarySearch(globalArrayOfWords, targetObject, compare)
    const resultFind = findIndex()
    console.log(`result Binary : ${resultBinaryIndex}`)
    console.log(`result .find: ${resultFind}`)
    console.log(globalArrayOfWords.at(resultFind))
}

function binarySearch(array, target, comparator){
    const startTime = Date.now()
    let min = 0;
    let max = array.length - 1;

    while (min <= max) {
        const mid = Math.floor((min + max) / 2);
        const comparisonResult = comparator(array[mid], target);
        if (comparisonResult === 0) {
            return mid;
        } else if (comparisonResult < 0) {
            min = mid + 1;
        } else if (comparisonResult > 0) {
            max = mid - 1;
        }
    }
    const endTime = Date.now()
    const time = endTime-startTime
    console.log(`binary search took : ${time} milliseconds`)

    return -1
}

function compare(a, b){
    if (a.variant === b.variant) {
        return 0;
    } else if (a.variant > b.variant) {
        return 1;
    } else if (a.variant < b.variant) {
        return -1;
    }
}

function findIndex(){
    const startTime = Date.now()
    const index = globalArrayOfWords.findIndex(wordObject => wordObject.variant === "hestevogn");
    const endTime = Date.now()
    const time = endTime-startTime
    console.log(`.find took : ${time} milliseconds`)

    return index;
}