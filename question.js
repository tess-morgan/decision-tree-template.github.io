let NO_VALID_ID = 'no valid id';

function loadQuestion() {
    // use PapaParse library to convert csv to JSON
    console.log(window.location.href);
    let curUrl = window.location.href;
    let urlArray = curUrl.split('/');
    console.log (urlArray);
    console.log ('csv url: ' + 'https://' + urlArray[2] + '/questions.csv');
    let csvUrl = 'https://' + urlArray[2] + '/questions.csv';

    Papa.parse(csvUrl, {
        download: true,
        header: true,
        dynamicTyping: true,


        complete: function (results, file) {
            console.log('Parsing complete', results.data);
            let questions = results.data;

            let questionId = parseInt(window.location.search.split('=')[1]);
            console.log('question id: ' + questionId);
            let question = getQuestionById(questions, questionId);
            console.log('question: ' + question);

            // render heading and body paragraphs
            document.getElementById('heading').innerHTML = String(question.heading);
            document.getElementById('paragraphs').innerHTML = String(question.body);

            // render buttons
            let buttonDiv = document.getElementById('buttons');

            if (question.button1name) {
                addButton(question.button1name, question.button1link, buttonDiv)
            }
            if (question.button2name) {
                addButton(question.button2name, question.button2link, buttonDiv)
            }
            if (question.button3name) {
                addButton(question.button3name, question.button3link, buttonDiv)
            }
        }
    });
}

// Adds a button to buttonDiv with text buttonName and the button when clicked
// will render the question with number n
function addButton(buttonName, nextId, buttonDiv) {
    let button = document.createElement('a');
    button.innerHTML = buttonName;
    button.className = "btn btn-default btn-lg btn-block";
    button.setAttribute('href', "question.html?id=" + nextId);
    button.setAttribute('role', 'button');
    buttonDiv.appendChild(button);
}

// finds question in array with id === targetId
// returns index in which this can be located in array
function getQuestionById(data, targetId) {
    console.log ('length: ' + data.length);
    for (let i = 0; i < data.length; i++) {
        console.log('target: ' + targetId + ", id: " + data[i].id);
        if (data[i].id === targetId) {
            return data[i];
        }
    }
    return NO_VALID_ID;
}