export default `
function bubbleSort(array) {
    let swapped;

    for (let i = 0; i < array.length - 1; i++) {
        swapped = false;

        for (let j = 0; j < array.length - i - 1; j++) {
            if (array[j] > array[j + 1]) {
                const temp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = temp;
                swapped = true;
            }
        }

        if (!swapped) {
            break;
        }
    }
}`;
