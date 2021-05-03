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
      document.cookie = `ghostUserID=${userID}; expires=Sun, 31 Dec ${
        gd.getFullYear() + 1
      } 12:00:00 UTC; secure`;
      document.cookie = `ghostStationID=${stationID}; expires=Sun, 31 Dec ${
        gd.getFullYear() + 1
      } 12:00:00 UTC; secure`;
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

const submitData = (callID) => {
  const userID = getCookie('ghostUserID');
  const stationID = getCookie('ghostStationID');

  const form = {
    boxUserID: 'r9cfb39c2e81a408bb43a35038f95fd5c',
    boxStationID: 'rc7377d2c86864253941b9e1655c322f5',
    boxDate: 'r3c66eec0605b4110abc3dd8382f6cee1',
    boxTime: 'rddac66fdc58946cba49aa45e8a8982f1',
    boxCallID: 'rdd14bbfd20ac4b698483d6894e9b29fe',
    dropIncident: 'SelectId_0',
    boxDetails: 'r4cfd057baebc4cf8a7fa89e5d478a639',
  };

  const gd = new Date();

  let data = {
    boxUserID: userID,
    boxStationID: stationID,
    boxDate: `${gd.getMonth() + 1}/${gd.getDate()}/${gd.getFullYear()}`,
    boxTime: `${gd.getHours()}:${gd.getMinutes()}`,
    boxCallID: callID,
    dropIncident: '',
    boxDetails:
      'Nobody was on the line, gave ghost call script and released the line',
  };

  for (q in form) {
    try {
      switch (q) {
        case 'boxDetails':
          const textarea = document.querySelector(
            `.office-form-textfield textarea`
          );
          textarea.focus();
          textarea.value = data[q];
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
          input.focus();
          input.value = data[q];
      }
    } catch (err) {
      console.log(
        `El formulario de este sitio no coincide con el preestablecido. \n${err}`
      );
      return;
    }
  }
  // document.querySelector('.__submit-button__').click(); // Don't uncomment this line while debugging

  // window.location =
  //   'https://forms.office.com/Pages/ResponsePage.aspx?id=5cDDXNoiuU2Zz34io0bvPEGhD5z2OjhLuRf4EFJZBGlUM1VCQUsySFJOSlgxQU80NkNXM1lBR1pIUS4u'; // Nor this one
};

const updateCredentials = () => {
  const userID = getCookie('ghostUserID');
  const stationID = getCookie('ghostStationID');

  const userSpan = document.querySelector('#js-userID');
  const stationSpan = document.querySelector('#js-stationID');

  userSpan.textContent = userID;
  stationSpan.textContent = stationID;
};

const init = () => {
  if (!getCookie('ghostUserID') && !getCookie('ghostStationID')) {
    setup();
  }

  const app = `
    <div class="container">
      <h1>Ghost call madness</h1>
      <div class="creds-showcase">
        <strong>CLI user: </strong><span id="js-userID"></span>
        <strong>Station ID: </strong><span id="js-stationID"></span>
      </div>
      <button class="button" id="creds-btn">Change credentials</button>
      <div class="call-form">
        <label for="call-id">Call ID: </label>
        <input
          class="input"
          type="text"
          name="call-id"
          id="call-id"
          maxlength="10"
          autocomplete="off"
        />
        <button type="button" class="button" id="submit-btn">Submit ID</button>
      </div>
    </div>
  `;

  try {
    const header = document.querySelector('.office-form-title');
    header.innerHTML += app;
  } catch (err) {
    console.log(`Este sitio no cuenta con un formulario. \n${err}`);
    return;
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
};

(() => {
  setTimeout(init, 1000);
})();
