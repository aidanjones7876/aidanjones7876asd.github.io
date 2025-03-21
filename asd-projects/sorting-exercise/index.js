/* IMPORTANT VALUES

This section contains a list of all variables predefined for you to use (that you will need)

The CSS ids you will work with are:

1. bubbleCounter -- the container for the counter text for bubble sort
2. quickCounter  -- the container for the counter text for quick sort

*/

///////////////////////////////////////////////////////////////////////
/////////////////////// YOUR WORK GOES BELOW HERE /////////////////////
///////////////////////////////////////////////////////////////////////

// TODO 2: Implement bubbleSort
//sorting all of the bubbles from smallest to largest
async function bubbleSort(array){
    for(let i = 0; i < array.length -1; i++){ //what is pushing through the array
        for(let j = array.length -1;j > 1; j--){ //inner loop is responsible for actual sorting
            if(array[j].value < array[j-1].value){ //
                swap(array, j, j-1); //function that does the swapping
                updateCounter(bubbleCounter); //updating the count of the bubbles
                await sleep(); //slows down the sorting so that we can watch it happen
            }
        }
    }
}

// TODO 3: Implement quickSort
// sorts all elements of the provided array from smallest to largest
async function quickSort(array, left, right){
    if(right - left < 0){
        return;
    }

    var index = await partition(array, left, right)
    if(left < index - 1){
        await quickSort(array, left, index - 1);
    }

    if(right > index){
        await quickSort(array, index, right);
    }
}

// TODOs 4 & 5: Implement partition
async function partition(array, left, right){
    var pivot = array[Math.floor((right + left) / 2)].value; //decides where other values should go
    while(left < right){ //decides what will happen while left is less than right
        //left increases by one while left value is less than pivot
        while(array[left].value < pivot){ 
            left++;
        }
        //right decreases by one while right value is greater than pivot
        while(array[right].value > pivot){
            right--;
        }
        //whenever left is less than right, the circles swap
        if(left < right){
            swap(array, left, right);
            updateCounter(quickCounter);
            await sleep();
        }
    }
    return left + 1;
}

// TODO 1: Implement swap
function swap(array, i, j){
    var temp = array[i]; //stores array[i] in temporary variable
    array[i] = array[j]; //storing j to i
    array[j] = temp; //storing temp into j
    drawSwap(array, i, j); //what is visually drawing the swaps
}


///////////////////////////////////////////////////////////////////////
/////////////////////// YOUR WORK GOES ABOVE HERE /////////////////////
///////////////////////////////////////////////////////////////////////

//////////////////////////// HELPER FUNCTIONS /////////////////////////

// this function makes the program pause by SLEEP_AMOUNT milliseconds whenever it is called
function sleep(){
    return new Promise(resolve => setTimeout(resolve, SLEEP_AMOUNT));
}

// This function draws the swap on the screen
function drawSwap(array, i, j){
    let element1 = array[i];
    let element2 = array[j];

    let temp = parseFloat($(element1.id).css("top")) + "px";

    $(element1.id).css("top", parseFloat($(element2.id).css("top")) + "px");
    $(element2.id).css("top", temp);
}

// This function updates the specified counter
function updateCounter(counter){
    $(counter).text("Move Count: " + (parseFloat($(counter).text().replace(/^\D+/g, '')) + 1));
}