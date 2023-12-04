export function arrayMove<T>(array: T[], from: number, to: number): T[] {
    const newArray = array.slice();
    newArray.splice(
        to < 0 ? newArray.length + to : to,//0
        0,
        newArray.splice(from, 1)[0]
    );
    return newArray;
}

// export function arrayMove<T>(array: T[], from: number, to: number): T[] {
//     if (from === to) {
//         return array.slice(); 
//     }

//     const newArray = array.slice(); 
//     const movedItem = newArray[from]; 

//     newArray.splice(from, 1);
//     newArray.splice(to < 0 ? newArray.length + to : to, 0, movedItem);

//     return newArray;
// }