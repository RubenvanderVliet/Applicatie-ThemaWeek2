document.addEventListener('DOMContentLoaded', function () {
  const transfers = [
    { club: 'Barcelona', badge: 'img/FCBarcelona.png', in: ['Messi', 'Neymar'], out: ['Griezmann', 'Dembele'] },
    { club: 'Bayern Munich', badge: 'img/FCBayernMunchen.png', in: ['Haaland', 'Upamecano'], out: ['Lewandowski', 'Kimmich'] },
    { club: 'Manchester United', badge: 'img/ManU.png', in: ['Sancho', 'Varane'], out: ['Pogba', 'Rashford'] },
    { club: 'AC Milan', badge: 'img/AcM.png', in: ['Tomori', 'Giroud'], out: ['Donnarumma', 'Ibrahimovic'] },
    { club: 'Manchester City', badge: 'img/mcity.png', in: ['Grealish', 'Kane'], out: ['Sterling', 'Aguero'] },
    { club: 'Real Madrid', badge: 'img/rmadrid.png', in: ['Mbappe', 'Alaba'], out: ['Benzema', 'Varane'] },
    { club: 'Liverpool', badge: 'img/liverpool.png', in: ['Konate', 'Salah'], out: ['Wijnaldum', 'Firmino'] },
    { club: 'PSG', badge: 'img/PSG.png', in: ['Yoro', 'Oshimen'], out: ['Mbappe', 'Donnarumma'] },
  ];

  const transferList = document.querySelector('#transfer-list');
  const searchInput = document.querySelector('#search-input');

  transfers.forEach(transfer => {
    const transferItem = document.createElement('div');
    transferItem.classList.add('transfer-item');
    transferItem.dataset.club = transfer.club.toLowerCase(); // Store lowercase club name for case-insensitive search

    const incomingPlayers = transfer.in.join(', ');
    const outgoingPlayers = transfer.out.join(', ');

    transferItem.innerHTML = `
        <div class="club-info" onclick="showTransferDetails('${transfer.club}', '${incomingPlayers}', '${outgoingPlayers}')">
          <img src="${transfer.badge}" alt="${transfer.club} badge" class="club-badge">
          <h2>${transfer.club} Transfer Rumors</h2>
        </div>
        <hr>
        <ul>
          <li><strong>Incoming players:</strong> ${incomingPlayers}</li>
          <li><strong>Outgoing players:</strong> ${outgoingPlayers}</li>
        </ul>
      `;

    transferList.appendChild(transferItem);
  });

  searchInput.oninput = function () {
    const searchTerm = searchInput.value.toLowerCase();

    transfers.forEach(transfer => {
      const transferItem = document.querySelector(`[data-club="${transfer.club.toLowerCase()}"]`);
      if (transferItem) {
        const isVisible = transfer.club.toLowerCase().includes(searchTerm);
        transferItem.style.display = isVisible ? 'block' : 'none';
      }
    });
  };
});

window.showTransferDetails = function (club, incoming, outgoing) {
  const overlay = document.createElement('div');
  overlay.classList.add('overlay');

  const popup = document.createElement('div');
  popup.classList.add('popup');
  popup.innerHTML = `
      <h2>${club} Transfer Rumors</h2>
      <p><strong>Incoming players:</strong> ${incoming}</p>
      <p><strong>Outgoing players:</strong> ${outgoing}</p>
      <button onclick="closePopup()">Close</button>
    `;

  overlay.appendChild(popup);
  document.body.appendChild(overlay);
};

window.closePopup = function () {
  const overlay = document.querySelector('.overlay');
  overlay.parentNode.removeChild(overlay);
};
