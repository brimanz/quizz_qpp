const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []


//game questions//
let questions = [
    {
        question: 'What is 2 + 2?',
        choice1: '2',
        choice2: '4',
        choice3: '21',
        choice4: '17',
        answer: 2,
    },
    {
        question: "The tallest building in the world is located in which city?",
        choice1: "Dubai",
        choice2: "New York",
        choice3: "Shanghai",
        choice4: "None of the above",
        answer: 1,
    },
    {
        question: "Who discovered America?",
        choice1: "Joe Biden",
        choice2: "Cristobal Colón",
        choice3: "Me",
        choice4: "El Zorro",
        answer: 2,
    },
    {
        question: "What color is the sky?",
        choice1: "Red",
        choice2: "Black",
        choice3: "Blue",
        choice4: "Green",
        answer: 3,
    },
    {
        question: "What is the name of the Queen of England?",
        choice1: "Anacleta",
        choice2: "Isabel",
        choice3: "Pepita",
        choice4: "María",
        answer: 2,
    },
    {
        question: "Who is the author of Don Quixote?",
        choice1: "Miguel de Cervantes",
        choice2: "Fidel Castro",
        choice3: "Wisin & Yandel",
        choice4: "Me",
        answer: 1,
    },
    {
        question: "Where is the famous Eiffel Tower located?",
        choice1: "Panamá",
        choice2: "Brasil",
        choice3: "France",
        choice4: "Poland",
        answer: 3,
    },
    {
        question: "What sport did Michael Jordan play?",
        choice1: "Tennis",
        choice2: "Swimming",
        choice3: "Soccer",
        choice4: "Basketball",
        answer: 4,
    },
    {
        question: "What is the name of the national anthem of France?",
        choice1: "Rakata",
        choice2: "Billie Jean",
        choice3: "Marsellesa",
        choice4: "Good bye",
        answer: 3,
    },
    {
        question: "How many legs does the spider have?",
        choice1: "100",
        choice2: "4",
        choice3: "8",
        choice4: "64",
        answer: 3,
    },
    {
        question: "In which country is the famous Taj Mahal monument located?",
        choice1: "India",
        choice2: "Italy",
        choice3: "France",
        choice4: "Poland",
        answer: 1,
    },
    {
        question: "What is the name of the Russian space station?",
        choice1: "Mir",
        choice2: "Pan",
        choice3: "Thor",
        choice4: "Hulk",
        answer: 1,
    },
    {
        question: "What is the first of the list of prime numbers?",
        choice1: "4",
        choice2: "1",
        choice3: "80",
        choice4: "2",
        answer: 4,
    },
    {
        question: "Who wrote Hamlet?",
        choice1: "Enrique Peñanieto",
        choice2: "Nicolas Maduro",
        choice3: "William Shakespeare",
        choice4: "Me",
        answer: 3,
    },
    {
        question: "What is the capital of Croatia?",
        choice1: "Paris",
        choice2: "My House",
        choice3: "Moscow",
        choice4: "Zagreb",
        answer: 4,
    },
    {
        question: "When World War I started?",
        choice1: "2021",
        choice2: "1914",
        choice3: "1820",
        choice4: "1900",
        answer: 2,
    },
    {
        question: "In what year Freddie Mercury died?",
        choice1: "2001",
        choice2: "1214",
        choice3: "1991",
        choice4: "1900",
        answer: 3,
    },
    {
        question: "What year did the Berlin Wall fall?",
        choice1: "2000",
        choice2: "1989",
        choice3: "1914",
        choice4: "1999",
        answer: 2,
    },
    {
        question: "What is the Country of the Rising Sun?",
        choice1: "Japan",
        choice2: "India",
        choice3: "China",
        choice4: "Poland",
        answer: 1,
    },
    {
        question: "In which country is the Transylvania region located?",
        choice1: "Italy",
        choice2: "Rumania",
        choice3: "Poland",
        choice4: "France",
        answer: 2,
    }
    
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 20

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`
    
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()