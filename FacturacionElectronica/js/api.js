//API="AIzaSyAIPDRfAJcv_cXME1ltyTgmi0WLwFLuXqY"
//IDCliente="135925497494-bbnq1fkal8i9qivu7u7ncjrl2eki7hnj.apps.googleusercontent.com"

/* exported gapiLoaded */
/* exported gisLoaded */
/* exported handleAuthClick */
/* exported handleSignoutClick */

// TODO(developer): Set to client ID and API key from the Developer Console
const CLIENT_ID ="135925497494-bbnq1fkal8i9qivu7u7ncjrl2eki7hnj.apps.googleusercontent.com";
const API_KEY = "AIzaSyAIPDRfAJcv_cXME1ltyTgmi0WLwFLuXqY";

// Discovery doc URL for APIs used by the quickstart
const DISCOVERY_DOC =
  "https://sheets.googleapis.com/$discovery/rest?version=v4";

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
const SCOPES = "https://www.googleapis.com/auth/spreadsheets";

let tokenClient;
let gapiInited = false;
let gisInited = false;

document.getElementById("gapi").addEventListener("load", gapiLoaded);
document.getElementById("gis").addEventListener("load", gisLoaded);

document.getElementById("authorize_button").style.visibility = "hidden";
document.getElementById("signout_button").style.visibility = "hidden";

/**
 * Callback after api.js is loaded.
 */
function gapiLoaded() {
  gapi.load("client", initializeGapiClient);
}

/**
 * Callback after the API client is loaded. Loads the
 * discovery doc to initialize the API.
 */
async function initializeGapiClient() {
  await gapi.client.init({
    apiKey: API_KEY,
    discoveryDocs: [DISCOVERY_DOC],
  });
  gapiInited = true;
  maybeEnableButtons();
}

/**
 * Callback after Google Identity Services are loaded.
 */
function gisLoaded() {
  tokenClient = google.accounts.oauth2.initTokenClient({
    client_id: CLIENT_ID,
    scope: SCOPES,
    callback: "", // defined later
  });
  gisInited = true;
  maybeEnableButtons();
}

/**
 * Enables user interaction after all libraries are loaded.
 */
function maybeEnableButtons() {
  if (gapiInited && gisInited) {
    document.getElementById("authorize_button").style.visibility = "visible";
  }
}

/**
 *  Sign in the user upon button click.
 */
function handleAuthClick() {
  tokenClient.callback = async (resp) => {
    console.log("Callback de autenticación iniciado.");
    if (resp.error !== undefined) {
      console.error("Error de autenticación:", resp.error);
      throw resp;
    }
    console.log("Autenticación exitosa, token recibido:", resp);
    document.getElementById("signout_button").style.visibility = "visible";
    document.getElementById("authorize_button").innerText = "Refresh";
    await getLastToken();
    console.log("Llamando a cargarEmisoresDesdeGoogleSheets...");
    await cargarEmisoresDesdeGoogleSheets();
    await cargarReceptoresDesdeGoogleSheets();
  };

  if (gapi.client.getToken() === null) {
    console.log("Solicitando nuevo token de acceso...");
    tokenClient.requestAccessToken({ prompt: "consent" });
  } else {
    console.log("Usando token de acceso existente...");
    tokenClient.requestAccessToken({ prompt: "" });
  }
}

/**
 *  Sign in the user upon button click.
 */
function handleAuthClickHistoriales() {
  tokenClient.callback = async (resp) => {
    console.log("Callback de autenticación iniciado.");
    if (resp.error !== undefined) {
      console.error("Error de autenticación:", resp.error);
      throw resp;
    }
    console.log("Autenticación exitosa, token recibido:", resp);
    document.getElementById("signout_button").style.visibility = "visible";
    document.getElementById("authorize_button").innerText = "Refresh";
   await fetchData();
   await getLastToken();
  };

  if (gapi.client.getToken() === null) {
    console.log("Solicitando nuevo token de acceso...");
    tokenClient.requestAccessToken({ prompt: "consent" });
  } else {
    console.log("Usando token de acceso existente...");
    tokenClient.requestAccessToken({ prompt: "" });
  }
}

/**
 * Fetch data after authorization.
 */
async function fetchData() {
  try {
    console.log("Llamando a getEmisor...");
    await getEmisor();
    console.log("Llamando a getToken...");
    await getToken();
    console.log("Llamando a getReceptor...");
    await getReceptor();
    console.log("Llamando a getDteHistory...");
    await getDteHistory();
    
  } catch (err) {
    console.error("Error en fetchData:", err);
  }
}


/**
 *  Sign out the user upon button click.
 */
function handleSignoutClick() {
  const token = gapi.client.getToken();
  if (token !== null) {
    google.accounts.oauth2.revoke(token.access_token);
    gapi.client.setToken("");
    document.getElementById("content").innerText = "";
    document.getElementById("authorize_button").innerText = "Authorize";
    document.getElementById("signout_button").style.visibility = "hidden";
  }
}


//inicio
function showEmisor() {
  hideAllSections();
  document.getElementById("emisorSection").style.display = "block";
}

function showReceptor() {
  hideAllSections();
  document.getElementById("receptorSection").style.display = "block";
}

function showDetalles() {
  hideAllSections();
  document.getElementById("detallesSection").style.display = "block";
}

function showToken() {
  hideAllSections();
  document.getElementById("tokenSection").style.display = "block";
}

function showTiposdeDocumento() {
  hideAllSections();
  document.getElementById("TiposdeDocumentoSection").style.display = "block";
}

function hideAllSections() {
  document.getElementById("emisorSection").style.display = "none";
  document.getElementById("receptorSection").style.display = "none";
  document.getElementById("detallesSection").style.display = "none";
  document.getElementById("tokenSection").style.display = "none";
  document.getElementById("TiposdeDocumentoSection").style.display = "none";
}

let currentSectionIndex = 0;
const sectionIds = [
  "tokenSection",
  "TiposdeDocumentoSection",
  "emisorSection",
  "receptorSection",
  "detallesSection",
];

function showSection(index) {
  for (let i = 0; i < sectionIds.length; i++) {
    document.getElementById(sectionIds[i]).style.display =
      i === index ? "block" : "none";
  }
  currentSectionIndex = index;
}

function navigate(direction) {
  if (direction === "forward" && currentSectionIndex < sectionIds.length - 1) {
    showSection(currentSectionIndex + 1);
  } else if (direction === "backward" && currentSectionIndex > 0) {
    showSection(currentSectionIndex - 1);
  }
}

// Mostrar la primera sección al cargar la página
showSection(currentSectionIndex);
