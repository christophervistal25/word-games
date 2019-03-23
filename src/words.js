const words = [
   "Lorem", "ipsum", "dolor", "sit", "amet,", "consectetur", "adipisicing", "elit.", "Mollitia,", "asperiores", "sunt", "repudiandae.", "Assumenda", "quo", "fugit", "eius", "recusandae", "vel", "consectetur", "est", "tempora", "voluptatibus", "quod", "explicabo.", "Perferendis", "harum", "culpa", "fugiat", "molestiae", "suscipit."
];

let wordElement          = document.querySelector('#words');
let inputtedWordsElement = document.querySelector('#inputted-words');
let correctWords         =  document.querySelector('#correctWords');
let wrongWords           = document.querySelector('#wrongWords');
let wordIndex = 0;

class WordUtilities {
 

    static deleteCommaSeperator(word) {
        return word.replace(/\,/gi,"");
    }

    static trim(string) {
        return string.replace(/\s+/gi,'');
    }

     static isWordEqual(fromWordList,typedWord) {
        return fromWordList === typedWord;
    }

}


class Word  {

   constructor() {
        this.correct = 0;
        this.wrong = 0;
        this.words = [];
        this.cleanUpWords = '';
    }

    init(words) {
        this.words = this.shuffleWordList(words);
    }

    shuffleWordList(words) {
        for (var i = words.length-1; i >=0; i--) {
            var randomIndex = Math.floor(Math.random()*(i+1)); 
            var itemAtIndex = words[randomIndex]; 
             
            words[randomIndex] = words[i]; 
            words[i] = itemAtIndex;
        }
        return words;
    }


    insertAndHighlightSelected(selected,index) {
        //return all words with string format
        return WordUtilities.deleteCommaSeperator(
            this.words.map((word,iteration) =>  {
            //add space for each word
            this.cleanUpWords = ' ';

            if (WordUtilities.isWordEqual(word,selected) && iteration === index) {
                this.cleanUpWords += `<span style="background:yellow;">${word}</span> `;
            } else {
                this.cleanUpWords += word;
            }

            return this.cleanUpWords;
        }).toString());
    }

    addCorrect() {
        this.correct++;
    }

    addWrong() {
        this.wrong++;
    }

    getCorrect() {
        return this.correct;
    }

    getWrong() {
        return this.wrong;
    }
}


Word = new Word();
Word.init(words);

wordElement.innerHTML = Word.insertAndHighlightSelected(words[wordIndex],wordIndex);

inputtedWordsElement.addEventListener('keydown' , (event) => {
    const keyCode = event.keyCode;
    if (keyCode == 32) {

        let inputValue = WordUtilities.trim(inputtedWordsElement.value);
        
        (!WordUtilities.isWordEqual(words[wordIndex],inputValue)) ? Word.addWrong() : Word.addCorrect();
        
        correctWords.innerHTML = `Correct : ${Word.getCorrect()}`;
        wrongWords.innerHTML = `Wrong : ${Word.getWrong()}`;

        wordIndex++;

        wordElement.innerHTML      = Word.insertAndHighlightSelected(words[wordIndex],wordIndex);
        inputtedWordsElement.value = '';
    }
});


