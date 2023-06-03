// Function to create a new card
const idList = '6478257c3e4c0b7b570042cf';
const key = '91a7b189fd0a1fd4199165231fe26158';
const token = 'ATTAcf50109e9e620150d0939f56739960a4b7b47b882233f4914ebc0e7fc059cfed664D4329';
const createCard = async () => {
  const name = document.getElementById('name').value;
  const description = document.getElementById('description').value;
  const dueDate = document.getElementById('dueDate').value;
  const startDate = document.getElementById('startDate').value;



  const url = `https://api.trello.com/1/cards?key=${key}&token=${token}&idList=${idList}`;

  fetch(url, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: name,
      desc: description,
      due: dueDate,
      startDate: startDate
    })
  })
    .then(response => {
      if (response.ok) {
        console.log('Card created successfully.');
        alert('Card created successfully');
        fetchAndDisplayCards();
      } else {
        console.error('Failed to create card.');
      }
    })
    .catch(err => {
      console.error('Error:', err);
    });
};

const cardForm = document.getElementById('cardForm');


cardForm.addEventListener('submit', e => {
  e.preventDefault();

  createCard();
});


// function to display the card
const fetchAndDisplayCards = async () => {

  const url = `https://api.trello.com/1/lists/${idList}/cards?key=${key}&token=${token}`;

  fetch(url)
    .then(response => response.json())
    .then(cards => {
      const cardContainer = document.getElementById('cardContainer');


      cardContainer.innerHTML = '';
      console.log(cards);

      if (cards.length === 0) {
        const messageElement = document.createElement('p');
        messageElement.textContent = 'No cards available. Create one!';
        cardContainer.appendChild(messageElement);
      } else {
        cards.forEach(card => {
          const cardElement = document.createElement('div');
          cardElement.classList.add('card');

          const titleElement = document.createElement('h2');
          titleElement.textContent = card.name;
          cardElement.appendChild(titleElement);

          const descriptionElement = document.createElement('p');
          descriptionElement.textContent = card.desc;
          cardElement.appendChild(descriptionElement);

          cardContainer.appendChild(cardElement);
        });
      }
    })

    .catch(error => {
      console.error('Error fetching cards:', error);
    });

};

fetchAndDisplayCards();
