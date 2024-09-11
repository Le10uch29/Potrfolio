
function createNumbersArray(count) {
  const arrNumbers = [];

  for (let i = 1; i <= count; i++) {
    arrNumbers.push(i, i);

  }
  return arrNumbers;
}


// Этап 2. Создайте функцию перемешивания массива.Функция принимает в аргументе исходный массив и возвращает перемешанный массив. arr - массив чисел

function shuffle(arr) {


  for (let i = 0; i < arr.length; i++) {
    let randomIndex = Math.floor(Math.random() * arr.length);

    let temp = arr[i];
    arr[i] = arr[randomIndex];
    arr[randomIndex] = temp;
  }
  return arr;
}


// Этап 3. Используйте две созданные функции для создания массива перемешанными номерами. На основе этого массива вы можете создать DOM-элементы карточек. У каждой карточки будет свой номер из массива произвольных чисел. Вы также можете создать для этого специальную функцию. count - количество пар.
function startGame(count) {
  let firstCard = null;
  let secondCard = null;

  let arrNumber = createNumbersArray(count);
  let shuffledArray = shuffle(arrNumber);

  let columns = 2;
  if (count === 3) {
    columns = 3;
  }

  if (count === 4) {
    columns = 4;
  }

  if (count === 5) {
    columns = 5;
  }

  if (count === 6) {
    columns = 4;
  }

  const game = document.getElementById('game');
  game.style = `grid-template-columns: repeat(${columns}, 1fr);`
  game.innerHTML = "";

  for (const cardNumber of shuffledArray) {
    let card = document.createElement('div');
    card.textContent = cardNumber;
    card.classList.add('card');


    card.addEventListener('click', function () {
      if (card.classList.contains('open') || card.classList.contains('succses')) {
        return;
      }

      if (firstCard !== null && secondCard !== null) {
        firstCard.classList.remove('open')
        secondCard.classList.remove('open')
        firstCard = null
        secondCard = null
      }

      card.classList.add('open')


      if (firstCard === null) {
        firstCard = card;
      } else {
        secondCard = card;
      }

      if (firstCard !== null && secondCard !== null) {
        let firstCardNumber = firstCard.textContent
        let secondCardNumber = secondCard.textContent

        if (firstCardNumber === secondCardNumber) {
          firstCard.classList.add('succses')
          secondCard.classList.add('succses')
        }
      }

      if (shuffledArray.length === document.querySelectorAll('.succses').length) {
        setTimeout(function () {
          alert('--Беда!')
          game.innerHTML = "";
          startGameShow();
        }, 400);


      }
    });
    game.append(card);
  }
}

function startGameShow() {
  let buttonContainer = document.createElement('div');
  buttonContainer.classList.add('container');
  let startGameButton = document.createElement('button');
  startGameButton.textContent = 'Начать Игру';
  startGameButton.classList.add('button');

  startGameButton.addEventListener('click', function () {
    let count = Number(prompt('Выберите сложность игры от 1 - до....', 4));
    startGame(count);
    if (startGameShow) {
      buttonContainer.remove()
    }

  });

  buttonContainer.append(startGameButton);
  document.body.append(buttonContainer);


}

startGameShow();
