// #Trello : Sort an array with another array
//https://clubmate.fi/sort-array-with-array
export function orderArrayBasedOnAnotherArray<T>(inputArray: T[], orderArray: string[], key: keyof T): T[] {
    const orderedArray: T[] = [...inputArray]; // Create a copy of the inputArray

    orderedArray.sort((a: T, b: T) => { // Sort the orderedArray
        const indexA = orderArray.indexOf(String(a[key])); // Get the index of a[key] in orderArray
        const indexB = orderArray.indexOf(String((b[key]))); // Get the index of b[key] in orderArray
        return indexA - indexB; // Compare the indices and return the result
    });

    return orderedArray; // Return the sorted array
}