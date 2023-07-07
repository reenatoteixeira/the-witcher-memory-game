const CARD = 'card'
const FRONT = 'card_front';
const BACK = 'card_back';
const ICON = 'icon'

function createCardFace(face, card, element) {
    let cardElementFace = document.createElement('div');
    cardElementFace.classList.add(face);

    if (face === FRONT) {
        let iconElement = document.createElement('img');
        iconElement.classList.add(ICON);
        iconElement.src = './assets/images/' + card.icon + '.png';
        cardElementFace.appendChild(iconElement);
    } else {
        let iconElement = document.createElement('img');
        iconElement.classList.add(ICON);
        iconElement.src = './assets/images/logo.png';
        cardElementFace.appendChild(iconElement);
    };

    element.appendChild(cardElementFace);
}

function createCardContent(card, cardElement) {
    createCardFace(FRONT, card, cardElement);
    createCardFace(BACK, card, cardElement);
}

function initializeCards() {
    let gameBoard = document.getElementById('gameBoard');
    gameBoard.innerHTML = '';

    game.cards.forEach(card => {
        let cardElement = document.createElement('div');
        cardElement.id = card.id;
        cardElement.classList.add(CARD);
        cardElement.dataset.icon = card.icon;

        createCardContent(card, cardElement);
        cardElement.addEventListener('click', flipCard);
        gameBoard.appendChild(cardElement);
    })
};

function flipCard() {
    if (game.setCard(this.id)) {
        this.classList.add('flip');

        if (game.secondCard) {
            if (game.checkMatch()) {
                game.clearCards();
                if (game.checkGameOver()) {
                    let gameOverScreen = document.getElementById('gameOver');
                    gameOverScreen.style.display = 'flex';
                }
            } else {
                setTimeout(() => {
                    let firstCardView = document.getElementById(game.firstCard.id);
                    let secondCardView = document.getElementById(game.secondCard.id);
    
                    firstCardView.classList.remove('flip');
                    secondCardView.classList.remove('flip');
                    game.unflipCards();
                }, 1000);
            };
        };
    };
};

function restartGame() {
    game.clearCards();
    startGame();
    
    let gameOverScreen = document.getElementById('gameOver');
    gameOverScreen.style.display = 'none';
};

function startGame() {
    initializeCards(game.createCards());
};

startGame();