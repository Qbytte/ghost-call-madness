const setup = () => {
  let userID;
  let stationID;
  let bool;

  do {
    userID = prompt('Insert your DM:');
    stationID = prompt('Insert your station name:');

    if (
      confirm(
        `Is this information correct? \nCLI User ID: ${userID} \nStation Name: ${stationID}`
      ) &&
      userID &&
      stationID
    ) {
      localStorage.setItem('ghostUserID', userID);
      localStorage.setItem('ghostStationID', stationID);
      bool = true;
    } else {
      alert('Insert the information again please')
    }
  } while (!bool);
};

const updateCredentials = () => {
  const userID = localStorage.getItem('ghostUserID');
  const stationID = localStorage.getItem('ghostStationID');

  const userSpan = document.querySelector('#js-userID');
  const stationSpan = document.querySelector('#js-stationID');

  userSpan.textContent = userID;
  stationSpan.textContent = stationID;
};

const submitData = (callId) => {
  const userID = localStorage.getItem('ghostUserID');
  const stationID = localStorage.getItem('ghostStationID');
  const gd = new Date();

  const yr = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(gd);
  const mo = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(gd);
  const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(gd);
  const hr = new Intl.DateTimeFormat('en', {
    hour: '2-digit',
    hour12: false,
  }).format(gd);
  const mn = new Intl.DateTimeFormat('en', { minute: 'numeric' }).format(gd);

  const date = `${yr}-${mo}-${da}`;
  let hour;
  if (mn <= 9) {
    hour = `${hr}:0${mn}`;
  } else {
    hour = `${hr}:${mn}`;
  }
  const desc = 'Nobody was on the line.';

  const link = `https://docs.google.com/forms/d/e/1FAIpQLSd470VihtYsAQsX1Z4KGYw5_kkdzneAgdjguK2_Z4V5_meaPg/viewform?usp=pp_url&entry.1723038825=${userID}&entry.1660251929=${stationID}&entry.1236880167=${date}&entry.757929743=${hour}&entry.1241883286=${callId}&entry.1266643092=Ghost+call&entry.1752359905=${desc}`;

  const formWin = window.open(link, 'Autofill Form');
  setTimeout(() => {
    formWin.document.querySelector('[jsname="M2UYVd"]').click();
  }, 1000);
};

(() => {
  if (
    !localStorage.getItem('ghostUserID') &&
    !localStorage.getItem('ghostStationID')
  ) {
    setTimeout(() => {
      setup();
      updateCredentials();
    }, 120);
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
        'The call ID is a 10 digit long number and can not contain an alphanumeric value'
      );
    }
  });
})();
