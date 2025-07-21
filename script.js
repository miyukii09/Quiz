const questions = [
    {
        question: "Qual é a sua cor favorita?",
        options: ["Rosa", "Azul", "Verde", "Roxo"]
    },
    {
        question: "O que você mais gosta de fazer no tempo livre?",
        options: ["Assistir anime", "Ler", "Ouvir música", "Jogar"]
    },
    {
        question: "Qual é o seu tipo de comida favorita?",
        options: ["Doces", "Pizza", "Comida japonesa", "Italiana"]
    },
    {
        question: "O que você acha mais importante em uma pessoa?",
        options: ["Humor", "Carinho", "Honestidade", "Inteligência"]
    }
];

let currentQuestion = 0;
let selectedAnswer = null;

function startQuiz() {
    document.getElementById('welcome-screen').classList.add('hidden');
    document.getElementById('quiz-screen').classList.remove('hidden');
    loadQuestion();
}

function loadQuestion() {
    const question = questions[currentQuestion];
    document.getElementById('question-text').textContent = question.question;
    document.getElementById('current-q').textContent = currentQuestion + 1;
    
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';
    
    question.options.forEach((option, index) => {
        const optionDiv = document.createElement('div');
        optionDiv.className = 'option';
        optionDiv.innerHTML = `
            <input type="radio" name="answer" value="${option}" id="option-${index}">
            <label for="option-${index}">${option}</label>
        `;
        optionDiv.addEventListener('click', () => selectOption(option, optionDiv));
        optionsContainer.appendChild(optionDiv);
    });

    document.querySelectorAll('.dot').forEach((dot, index) => {
        if (index <= currentQuestion) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });

    selectedAnswer = null;
    document.getElementById('next-btn').disabled = true;
}

function selectOption(answer, optionElement) {
    document.querySelectorAll('.option').forEach(opt => opt.classList.remove('selected'));
    
    optionElement.classList.add('selected');
    optionElement.querySelector('input').checked = true;
    
    selectedAnswer = answer;
    document.getElementById('next-btn').disabled = false;
}

function nextQuestion() {
    if (!selectedAnswer) return;

    currentQuestion++;
    
    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {
        document.getElementById('quiz-screen').classList.add('hidden');
        document.getElementById('final-screen').classList.remove('hidden');
        
        const noBtn = document.getElementById('no-btn');
        const container = document.getElementById('final-container');
        noBtn.style.left = '50%';
        noBtn.style.top = '60px';
        noBtn.style.transform = 'translateX(-50%)';
    }
}

function moveNoButton() {
    const noBtn = document.getElementById('no-btn');
    const container = document.getElementById('final-container');
    
    const containerRect = container.getBoundingClientRect();
    const btnRect = noBtn.getBoundingClientRect();
    
    const maxX = containerRect.width - btnRect.width - 20;
    const maxY = containerRect.height - btnRect.height - 20;
    
    const newX = Math.random() * maxX;
    const newY = Math.random() * maxY;
    
    noBtn.style.left = newX + 'px';
    noBtn.style.top = newY + 'px';
    noBtn.style.transform = 'none';
}

function handleYes() {
    document.getElementById('final-screen').classList.add('hidden');
    document.getElementById('success-screen').classList.remove('hidden');
    
    createFloatingHearts();
}

function createFloatingHearts() {
    const heartsContainer = document.getElementById('hearts-container');
    heartsContainer.classList.remove('hidden');
    
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.className = 'heart';
            heart.textContent = '💖';
            heart.style.left = Math.random() * 100 + '%';
            heart.style.fontSize = (20 + Math.random() * 20) + 'px';
            heart.style.animationDelay = Math.random() * 2 + 's';
            heart.style.animationDuration = (2 + Math.random() * 2) + 's';
            
            heartsContainer.appendChild(heart);
            
            setTimeout(() => {
                heart.remove();
            }, 5000);
        }, i * 200);
    }
}