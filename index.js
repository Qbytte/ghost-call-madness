const setup = () => {
  let userID;
  let stationID;
  let bool;

  do {
    userID = prompt('Inserta tu CLI user:');
    stationID = prompt('Inserta tu station name:');

    if (
      confirm(
        `Estos datos son correctos? \nCLI User ID: ${userID} \nStation Name: ${stationID}`
      )
    ) {
      document.cookie = `ghostUserID=${userID}; expires=Sun, 31 Dec 2022 12:00:00 UTC; secure`;
      document.cookie = `ghostStationID=${stationID}; expires=Sun, 31 Dec 2022 12:00:00 UTC; secure`;
      bool = true;
    } else {
      alert('Ingresa los datos nuevamente');
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

(() => {
  if (!getCookie('ghostUserID') && !getCookie('ghostStationID')) {
    setup();
  }

  let callID;
  let bool;

  do {
    callID = prompt('Inserta el Call ID a reportar:');
    if (callID.length === 10) {
      bool = true;
    } else {
      alert('El call ID consta de 10 digitos');
    }
  } while (!bool);

  let userID = getCookie('ghostUserID');
  let stationID = getCookie('ghostStationID');

  const form = {
    boxUserID: 'r9cfb39c2e81a408bb43a35038f95fd5c',
    boxStationID: 'rc7377d2c86864253941b9e1655c322f5',
    boxDate: 'r3c66eec0605b4110abc3dd8382f6cee1',
    boxTime: 'rddac66fdc58946cba49aa45e8a8982f1',
    boxCallID: 'rdd14bbfd20ac4b698483d6894e9b29fe',
    dropIncident: 'SelectId_0',
    boxDetails: 'r4cfd057baebc4cf8a7fa89e5d478a639',
  };

  const date = new Date();

  let data = {
    boxUserID: userID,
    boxStationID: stationID,
    boxDate: `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`,
    boxTime: `${date.getHours()}:${date.getMinutes()}`,
    boxCallID: callID,
    dropIncident: '',
    boxDetails:
      'Nobody was on the line, gave ghost call script and released the line',
  };

  for (q in form) {
    try {
      switch (q) {
        case 'boxDetails':
          document.querySelector(`.office-form-textfield textarea`).value =
            data[q];
          break;
        case 'dropIncident':
          document.querySelector(`#${form[q]}`).click();
          setTimeout(() => {
            document.querySelector(`[aria-label="Ghost Call"]`).click();
          }, 150);
          break;
        default:
          const input = document.querySelector(
            `[aria-labelledby="QuestionId_${form[q]}"] input`
          );
          input.value = data[q];
      }
    } catch (err) {
      console.log(`Este sitio no cuenta con un formulario. ${err}`);
    }
  }
  // document.querySelector('.__submit-button__').click(); // Don't uncomment this line

  window.location =
    'https://forms.office.com/Pages/ResponsePage.aspx?id=5cDDXNoiuU2Zz34io0bvPEGhD5z2OjhLuRf4EFJZBGlUM1VCQUsySFJOSlgxQU80NkNXM1lBR1pIUS4u';
})();
