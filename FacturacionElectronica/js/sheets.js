let emisor;
let receptor;
let token;

async function getEmisor(){
    let response;
    try {
        response = await gapi.client.sheets.spreadsheets.values.get({
            spreadsheetId: '1J__Pzj8RNIrwlojeF-mjBdWYtt9GH3QH3Je5SamLfSI',
            range: 'h.emisor!A:H', // Asegúrate de que este rango cubra todas las columnas necesarias.
        });
    } catch (err) {
        console.error('The API returned an error: ' + err);
        return;
    }

    const rows = response.result.values;
    if (rows.length > 0) {
        const tableBody = document.getElementById('hEmisorTableBody');
        tableBody.innerHTML = ''; // Limpiar el cuerpo de la tabla antes de agregar nuevos datos.
        // Saltarse la primera fila si contiene los encabezados de las columnas.
        rows.slice(1).forEach((row) => {
            // Crea una fila de tabla por cada registro.
            let tr = `<tr>
                        <td>${row[0]}</td>
                        <td>${row[1]}</td>
                        <td>${row[2]}</td>
                        <td>${row[3]}</td>
                        <td>${row[4]}</td>
                        <td>${row[5]}</td>
                        <td>${row[6]}</td>
                        <td>${row[7]}</td>
                        <td class="text-center">
                          <button class="btn btn-dark">Modificar</button>
                          <button class="btn btn-danger">Eliminar</button>
                        </td>
                      </tr>`;
            tableBody.innerHTML += tr;
        });
        document.getElementById("H.EmisorSection").style.display = "none"; // Mostrar la sección.
    } else {
        document.getElementById('H.EmisorSection').innerHTML = '<p>No se encontraron datos.</p>';
    }
}


async function getToken() {
    let response;
    try {
        response = await gapi.client.sheets.spreadsheets.values.get({
            spreadsheetId: '1J__Pzj8RNIrwlojeF-mjBdWYtt9GH3QH3Je5SamLfSI',
            range: 'h.token!A:D', // Asegúrate de que este rango cubra todas las columnas necesarias.
        });
    } catch (err) {
        console.error('The API returned an error: ' + err);
        return;
    }

    const rows = response.result.values;
    if (rows.length > 0) {
        const tableBody = document.getElementById('hTokenTableBody');
        tableBody.innerHTML = ''; // Limpiar el cuerpo de la tabla antes de agregar nuevos datos.
        // Saltarse la primera fila si contiene los encabezados de las columnas.
        rows.slice(1).forEach((row) => {
            // Crea una fila de tabla por cada registro.
            let tr = `<tr>
                        <td>${row[0]}</td>
                        <td>${row[1]}</td>
                        <td>${row[2]}</td>
                        <td>${row[3]}</td>
                    </tr>`;
            tableBody.innerHTML += tr;
        });
        document.getElementById("H.TokenSection").style.display = "block"; // Mostrar la sección.
    } else {
        document.getElementById('H.TokenSection').innerHTML = '<p>No se encontraron datos.</p>';
    }
}

// Llama a la función para obtener y mostrar los datos del token.


async function getReceptor(){
    let response;
    try {
        response = await gapi.client.sheets.spreadsheets.values.get({
            spreadsheetId: '1J__Pzj8RNIrwlojeF-mjBdWYtt9GH3QH3Je5SamLfSI',
            range: 'h.receptor!A:K', // Asegúrate de que este rango cubra todas las columnas necesarias.
        });
    } catch (err) {
        console.error('The API returned an error: ' + err);
        return;
    }

    const rows = response.result.values;
    if (rows.length > 0) {
        const tableBody = document.getElementById('hReceptorTableBody');
        tableBody.innerHTML = ''; // Limpiar el cuerpo de la tabla antes de agregar nuevos datos.
        // Saltarse la primera fila si contiene los encabezados de las columnas.
        rows.slice(1).forEach((row) => {
            // Crea una fila de tabla por cada registro.
            let tr = `<tr>
                        <td>${row[0]}</td>
                        <td>${row[1]}</td>
                        <td>${row[3]}</td>
                        
                       
                        <td class="text-center">
                          <button class="btn btn-dark">Modificar</button>
                          <button class="btn btn-danger">Eliminar</button>
                        </td>
                      </tr>`;
            tableBody.innerHTML += tr;
        });
        document.getElementById("H.ReceptorSection").style.display = "none"; 
    } else {
        document.getElementById('H.ReceptorSection').innerHTML = '<p>No se encontraron datos.</p>';
    }
}

// Función para enviar datos a la hoja de Google Sheets
function sendDataToSheet(sheetName, data) {
    const sheets = gapi.client.sheets.spreadsheets.values;
    const spreadsheetId = '1J__Pzj8RNIrwlojeF-mjBdWYtt9GH3QH3Je5SamLfSI';
    const range = `${sheetName}!A:Z`;

    sheets.append({
        spreadsheetId: spreadsheetId,
        range: range,
        valueInputOption: 'RAW',
        values: [data]
    }).then(function (response) {
        alert(`Los datos se han enviado correctamente a la hoja "${sheetName}"`);
    }, function (error) {
        console.error("Error al enviar datos a la hoja: ", error);
    });
}

//envio de emisor

async function createEmisor() {
    const emisorData = {
        Nombre: document.getElementById('nombre').value,
        NombreComercial: document.getElementById('nombreComercial').value,
        Actividad: document.getElementById('actividad').value,
        NCR: document.getElementById('ncr').value,
        NIT: document.getElementById('nit').value,
        Departamento: document.getElementById('departamento').value,
        Municipio: document.getElementById('municipio').value,
        Correo: document.getElementById('correo').value,
        FechaCreacion: new Date().toISOString()
    };

    const newRow = [
        emisorData.Nombre,
        emisorData.NombreComercial,
        emisorData.Actividad,
        emisorData.NCR,
        emisorData.NIT,
        emisorData.Departamento,
        emisorData.Municipio,
        emisorData.Correo,
        emisorData.FechaCreacion
    ];

    const sheetName = 'h.emisor';
    sendDataToSheet(sheetName, newRow);
}

document.getElementById('emisorForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevenir el envío del formulario por defecto

    // Llamar a la función createEmisor para enviar los datos del nuevo emisor
    createEmisor();
});


//envio de token
//Evento submit del formulario
// Función para obtener la fecha de creación
function getCreationDate() {
    return new Date().toISOString();
}

// Función para manejar el envío del formulario de Token
document.getElementById('tokenForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevenir el envío del formulario por defecto

    // Obtener los valores de los campos del formulario
    const nit = document.getElementById('nit').value;
    const password = document.getElementById('password').value;
    const apiKey = document.getElementById('apiKey').value;
    const fechaCreacion = getCreationDate(); // Obtener la fecha de creación

    // Crear un arreglo con los datos del formulario, incluyendo la fecha de creación
    const data = [nit, password, apiKey, fechaCreacion];

    // Llamar a la función para enviar los datos a la hoja de Google Sheets
    sendDataToSheet('h.token', data);
});

//envio de receptor
// Función para recopilar los datos del formulario del Receptor
function collectReceptorFormData() {
    const data = {
        Nombre: document.getElementById('nombreReceptor').value,
        TipoDocumento: document.getElementById('tipoDocumento').value,
        NumeroDocumento: document.getElementById('numDocumento').value,
        NRC: document.getElementById('nrc').value,
        Departamento: document.getElementById('departamentoReceptor').value,
        Municipio: document.getElementById('municipioReceptor').value,
        Complemento: document.getElementById('complemento').value,
        Telefono: document.getElementById('telefono').value,
        Actividad: document.getElementById('actividadReceptor').value,
        Correo: document.getElementById('correoReceptor').value,
        FechaCreacion: new Date().toISOString()
    };
    return data;
}

// Función para crear un nuevo receptor
async function createReceptor() {
    const receptorData = collectReceptorFormData();

    const newRow = Object.values(receptorData);
    const sheetName = 'h.receptor';
    sendDataToSheet(sheetName, newRow);
}

// Event listener para el formulario del Receptor
document.getElementById('receptorForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevenir el envío del formulario por defecto
    createReceptor();
});