const setup = () => {
  let userID;
  let stationID;
  let bool;

  do {
    userID = prompt('Inserta tu CLI user:');
    stationID = prompt('Inserta tu station name:');

    if (
      confirm(
        `¿Estos datos son correctos? \nCLI User ID: ${userID} \nStation Name: ${stationID}`
      ) &&
      userID &&
      stationID
    ) {
      const gd = new Date();
      document.cookie = `ghostUserID=${userID}; expires=Sun, 31 Dec ${gd.getFullYear() + 1
        } 12:00:00 UTC; secure`;
      document.cookie = `ghostStationID=${stationID}; expires=Sun, 31 Dec ${gd.getFullYear() + 1
        } 12:00:00 UTC; secure`;
      bool = true;
    } else {
      if (!confirm('¿Quieres ingrasar los datos nuevamente?')) {
        bool = true;
      }
    }
  } while (!bool);
};

const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop().split(';').shift();
  }
};

const updateCredentials = () => {
  const userID = getCookie('ghostUserID');
  const stationID = getCookie('ghostStationID');

  const userSpan = document.querySelector('#js-userID');
  const stationSpan = document.querySelector('#js-stationID');

  userSpan.textContent = userID;
  stationSpan.textContent = stationID;
};

const testData = () => {
  const gd = new Date();

  const link = `https://docs.google.com/forms/d/e/1FAIpQLSd470VihtYsAQsX1Z4KGYw5_kkdzneAgdjguK2_Z4V5_meaPg/viewform?usp=pp_url
        &entry.1723038825=${userID}
        &entry.1660251929=${stationID}
        &entry.1236880167=${date}
        &entry.757929743=${hr}
        &entry.1241883286=${callId}
        &entry.1266643092=Ghost+Call
        &entry.1752359905=${desc}`
}

const submitData = (callId) => {
  
  const userID = getCookie('ghostUserID');
  const stationID = getCookie('ghostStationID');
  const gd = new Date();

  let yr = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(gd);
  let mo = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(gd);
  let da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(gd);
  let hr = new Intl.DateTimeFormat('en', { hour: '2-digit', hour12: false}).format(gd);
  let mn = new Intl.DateTimeFormat('en', { minute: '2-digit'}).format(gd);
  
  const date = `${yr}-${mo}-${da}`;
  const hour = `${hr}:${mn}`;
  const desc = 'Nobody was on the line.';

  const link = `https://docs.google.com/forms/d/e/1FAIpQLSd470VihtYsAQsX1Z4KGYw5_kkdzneAgdjguK2_Z4V5_meaPg/viewform?usp=pp_url&entry.1723038825=${userID}&entry.1660251929=${stationID}&entry.1236880167=${date}&entry.757929743=${hour}&entry.1241883286=${callId}&entry.1266643092=Ghost+Call&entry.1752359905=${desc}`;

  window.location = link;
  setTimeout(() => {
    document.querySelector('[jsname="M2UYVd"]').click();
  }, 2000);
}

(() => {
  if(!getCookie('ghostUserID') && !getCookie('ghostStationID')){
    setup();
  }
  updateCredentials();

  document.querySelector('#creds-btn').addEventListener('click', () => {
    setup();
    updateCredentials();
  });

  document.querySelector('#submit-btn').addEventListener('click', () => {
    let id = document.querySelector('#call-id').value;
    id = id.replace(' ', '');

    if (id.length === 10 && id.match(/[a-z]/gi) === null) {
      submitData(id);
    } else {
      alert(
        'El call ID consta de 10 digitos y no puede contener un valor alfanumérico'
      );
    }
  });
})();