class Card {
    constructor (suit, number) {
        this.suit = suit
        this.number = number
    }
}

class Player {
    constructor (name, hand) {
        this.name = name
        this.hand = hand
    }
    dealCard(card) {
    this.hand.push(card)
    }
}
  
function createPlayers(){
    const players = []
    let lastOne = false;
    alert('Welcome to the MGM Grand!');
    while(players.length <= 8 && !lastOne){
        let sitDown = confirm('Will you have a seat at the poker table?');
        if (sitDown){
            const playerName=prompt("What's your name?")
            players.push(new Player(playerName, []))
            lastOne = confirm('Are you the last one?');
        }
        else lastOne = true
    }
    return players;
}
  
function createDeck(){
    const deck = []
    const suits = ['spade', 'heart', 'diamond', 'club']
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]

    for (let suit of suits){
        for (let number of numbers){
        deck.push(new Card(suit, number))
        }
    }
    // deck is in order [spade 1-13, heart 1-13, diamond 1-13, club 1-13]
    return deck
}
  
function shuffleDeck(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
}
  
function dealCards(players, deck) {
    for (let i = 0; i < players.length; i++) {
    players[i].hand.push(deck.pop(), deck.pop())
    }
}

function playGame(shuffedDealtDeck, cardsOnTable = []) {
    for(let i=0; i < 3; i++) {
        if(i === 0) {
            cardsOnTable.push(shuffedDealtDeck.pop(), shuffedDealtDeck.pop(), shuffedDealtDeck.pop())
            oneRoundCheckOrFold(players)
            console.log(players, cardsOnTable)
            if(players.length === 1){
                alert(`Winner winner, chicken dinner! Congratulations ${players[0].name}, the pot is yours!`)
                return
            }
            
        }
        else {
            cardsOnTable.push(shuffedDealtDeck.pop())
            oneRoundCheckOrFold(players)
            console.log(players, cardsOnTable)
            if(players.length === 1){
                alert(`Winner winner, chicken dinner! Congratulations ${players[0].name}, the pot is yours!`)
                return
            }
            else{
                
            }
        }
    }
}
function oneRoundCheckOrFold(players){
    for (let i = 0; i < players.length; i++){
        let checkOrFold = undefined
        while(checkOrFold != 'check' && checkOrFold != 'fold'){
            checkOrFold = prompt(`${players[i].name}, will you check or fold?`)
        }
        if (checkOrFold === 'fold'){
            alert(`${players[i].name} is OUT!`);
            players.splice(i, 1)
        }
    }
}
  
function comparison(players){
    let rank = -1;
    for (let i = 0; i < players.length; i++){
        // sanity check
        if (players[i].hand.length !== 2) throw new Error('Something went wrong')
        else{
            identifyHands(players[i].hand, cardsOnTable)
        }
    }
}
function identifyHands(playerHand, communityCards) {
    const allCards = playerHand.concat(communityCards);
    const cardValues = allCards.map(card => card.number);
    const cardSuits = allCards.map(card => card.suit);
  
    if(isRoyalFlush(playerHand, communityCards)) {
      return 'Royal Flush';
    } else if(isStraightFlush(playerHand, communityCards)) {
      return 'Straight Flush';
    } else if (isFourOfaKind(playerHand, communityCards)) {
      return 'Four of a Kind';
    } else if (isFullHouse(playerHand, communityCards)) {
      return 'Full House';
    } else if(isFlush(playerHand, communityCards)) {
      return 'Flush';
    } else if (isStraight(playerHand, communityCards)) {
      return 'Straight';
    } else if(isThreeOfaKind(playerHand, communityCards)) {
      return 'Three of a Kind'; 
    } else if (isTwoPair(playerHand, communityCards)) {
      return 'Two Pair';
    } else if(isPair(playerHand, communityCards)) {
      return 'Pair';
    } else {
      return 'High Card';  
    }
}

function getRank(playerHand, communityCards) {
    if (isRoyalFlush(playerHand, communityCards)) {
      return 9;
    } else if (isStraightFlush(playerHand, communityCards)) {
      return 8;
    } else if (isFourOfaKind(playerHand, communityCards)) {
      return 7;
    } else if (isFullHouse(playerHand, communityCards)) {
      return 6;
    } else if (isFlush(playerHand, communityCards)) {
      return 5;
    } else if (isStraight(playerHand, communityCards)) {
      return 4;
    } else if (isThreeOfaKind(playerHand, communityCards)) {
      return 3;
    } else if (isTwoPair(playerHand, communityCards)) {
      return 2;
    } else if (isPair(playerHand, communityCards)) {
      return 1;
    } else {
      return 0; // high card
    }
}
// just a shuffled deck in random order [spade3, heart10, dimond5 ...]
const shuffledDeck = shuffleDeck(createDeck())
// an array of player instances e.g. [player('wenzhen', []), player('josh', []), player('jason', [])]
const players = createPlayers()
  
dealCards(players, shuffledDeck)  
playGame(shuffledDeck)

function isPair(playerHand, communityCards) {
    const allCards = playerHand.concat(communityCards);
    const cardValues = allCards.map(card => card.number);
    const duplicates = new Set(cardValues.filter((value, index, array) => array.indexOf(value) !== index));
    return duplicates.size === 1;
}
  
function isTwoPair(playerHand, communityCards) {
    const allCards = playerHand.concat(communityCards);
    const cardValues = allCards.map(card => card.number);
    const duplicates = new Set(cardValues.filter((value, index, array) => array.indexOf(value) !== index));
    if (duplicates.size !== 2) {
      return false;
    }
    const sortedDuplicates = [...duplicates].sort((a, b) => b - a);
    if (sortedDuplicates[0] === sortedDuplicates[1]) {
      return true;
    } else {
      return false;
    }
}
  
    // 3 of a kind
function isThreeOfaKind(playerHand, communityCards) {
    const allCards = playerHand.concat(communityCards);
    const cardValues = allCards.map(card => card.number);
    const duplicates = new Set(cardValues.filter((value, index, array) => array.indexOf(value) !==index));
    return duplicates.size===2;
}
    // straight
function isStraight(playerHand, communityCards) {
    const allCards = playerHand.concat(communityCards);
    const cardValues = allCards.map(card => card.number);
    cardValues.sort((a, b) => a- b);
  
    for (let i = 0; i < cardValues.length - 4; i++) {
      if (cardValues[i + 4] - cardValues[i] === 4) {
        return true;
      }
    }
    return false;
}
    // flush
function isFlush(playerHand, communityCards) {
    const allCards = playerHand.concat(communityCards);
    const cardSuit = allCards.map(card => card.suit);
    if(cardSuit.length >= 5) {
      return true
    } else {
     return false;
    }
}
    // full house
function isFullHouse(playerHand, cards) {
    const allCards = playerHand.concat(communityCards);
    const cardValues = allCards.map(card => card.number);
    const valueCounts = {};
    cardValues.forEach(value => {
      if (value in valueCounts) {
        valueCounts[value] += 1;
      } else {
        valueCounts[value] = 1;
      }
    });
    const counts = Object.values(valueCounts);
    return counts.includes(2) && counts.includes(3);
}
    // 4 of a kind
function isFourOfaKind(playerHand, cards) {
    const allCards = playerHand.concat(communityCards);
    const cardValues = allCards.map(card => card.number);
    const duplicates = new Set(cardValues.filter((value, index, array) => array.indexOf(value) !==index));
    return duplicates.size===3;
}
    // straight flush
function isStraightFlush(playerHand, cards) {
    const allCards = playerHand.concat(communityCards);
    const sortedCards = allCards.sort((a, b) => a.number - b.number);
    const straight = sortedCards.some((card, index) => {
      if (index < 4) {
        return false;
      } else {
        const previousCards = sortedCards.slice(index - 4, index);
        return previousCards.every((previousCard, i) => previousCard.number === card.number - i - 1 && previousCard.suit === card.suit);
      }
    });
    return straight;
}
    // royal flush
function isRoyalFlush(playerHand, cards) {
    const allCards = playerHand.concat(communityCards);
    const royalValues = [10, 11, 12, 13, 1];
    const royalCards = allCards.filter(card => royalValues.includes(card.number) && card.suit === allCards[0].suit);
  
    if (royalCards.length === 5) {
      return true;
    } else {
      return false;
    }
}