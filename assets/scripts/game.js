let game = {

    lockMode: false,
    firstCard: null,
    secondCard: null,

    icons: ['geralt-01',
        'geralt-02',
        'geralt-03',
        'geralt-04',
        'geralt-05',
        'geralt-06',
        'geralt-07',
        'geralt-08',
        'geralt-09',
        'geralt-10'],

    cards: null,

    createCards: function () {
        this.cards = [];

        this.icons.forEach(icon => {
            this.cards.push(this.createPair(icon));
        });

        this.cards = this.cards.flatMap(pair => pair);
        this.shuffleCards();
        return this.cards;
    },

    createCardId: function (card) {
        return card + parseInt(Math.random() * 1000);
    },

    createPair: function (card) {
        return [
            {
                id: this.createCardId(card),
                icon: card,
                flipped: false,
            }, {
                id: this.createCardId(card),
                icon: card,
                flipped: false,
            }
        ];
    },

    shuffleCards: function () {
        let currentIndex = this.cards.length;
        let randomIndex = 0;

        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [this.cards[randomIndex], this.cards[currentIndex]] = [this.cards[currentIndex], this.cards[randomIndex]];
        }
    },

    setCard: function (id) {
        let card = this.cards.filter(card => card.id === id)[0];

        if (card.flipped || this.lockMode) {
            return false;
        };

        if (!this.firstCard) {
            this.firstCard = card;
            this.firstCard.flipped = true;
            return true;
        } else {
            this.secondCard = card;
            this.secondCard.flipped = true;
            this.lockMode = true;
            return true;
        };
    },

    checkMatch: function () {
        if (!this.firstCard || !this.secondCard) {
            return false
        };
        return this.firstCard.icon === this.secondCard.icon;
    },

    clearCards: function () {
        this.firstCard = null;
        this.secondCard = null;
        this.lockMode = false;
    },

    unflipCards: function () {
        this.firstCard.flipped = false;
        this.secondCard.flipped = false;
        this.clearCards();
    },

    checkGameOver: function () {
        return this.cards.filter(card => !card.flipped).length == 0;
    }
}