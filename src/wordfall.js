const words = [
     "Lorem",
     "ipsum",
     "dolor",
     "sit",
     "amet,",
     "consectetur",
     "adipisicing",
     "elit.",
     "Corporis",
     "a",
     "sunt",
     "aut",
     "reprehenderit.",
     "Quisquam",
     "odit",
     "ducimus,",
     "consectetur",
     "perferendis",
     "unde",
     "excepturi",
     "vel",
     "ipsum,",
     "itaque",
     "error",
     "laboriosam",
     "alias",
     "fugiat,",
     "ut",
     "neque.",
     "Maxime!"
];


let input  = document.querySelector('#inputted-word');
const word = document.querySelector('#word');
let indexWord = 0;
let trim         = (word) => word.replace(/\s+/gi,''); 
const setNewWord = (newWord) => word.innerHTML = newWord;

setNewWord(words[indexWord]);

input.addEventListener('keyup' , (event) =>  {
    const keyCode = event.keyCode;
    if (keyCode == 32) {
        if (trim(input.value) === trim(words[indexWord])) {
            console.log('Correct');
        } else {
            console.log('Wrong');
        }
        //rebase
        input.value = '';
        indexWord++;
        setNewWord(words[indexWord]);
    }
});

