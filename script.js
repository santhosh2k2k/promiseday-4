
let form = document.querySelector ('.dictform');

let wordInput = document.querySelector('.wordinput');

let wordInfo = document.querySelector('.meaningforward');

let searchButton = document.querySelector('.searchButton');


async function getmeaning(word){
    try{
        let response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);

        let data = await response.json();

        let paragraph = document.createElement('p');

        wordInfo.innerHTML = '';

        paragraph.innerHTML = `<b>${data[0].word}</b>`;

        wordInfo.appendChild(paragraph);

        let list = document.createElement('ul');

        list.style.listStyleType = 'none';
        let meanings = data[0].meanings;

        for(let meaning of meanings){

            let listItem = document.createElement('li');

            listItem.innerHTML = `${meaning.partOfSpeech}`;

            let subList = document.createElement('ul');

            subList.style.listStyleType = 'disk';

            let definitions = meaning.definitions;

            for(let definition of definitions){

                let subListItem = document.createElement('li');

                subListItem.innerHTML = `${definition.definition}`;

                subList.appendChild(subListItem);
            }

            listItem.appendChild(subList);

            list.appendChild(listItem);
        }

        wordInfo.appendChild(list);




    } catch(error){
        console.error('error fetching the meaning of the word');
    }
}



function handleSubmit(event){
    event.preventDefault();

    let word = wordInput.value;

    getmeaning(word);


}




form.addEventListener('submit', handleSubmit);

searchButton.addEventListener('click',handleSubmit);