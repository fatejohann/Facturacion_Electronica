let emisor;
let receptor;
let token;

// Función para enviar datos a la hoja de Google Sheets
function sendDataToSheet(sheetName, data) {
    const sheets = gapi.client.sheets.spreadsheets.values;
    const spreadsheetId = '1J__Pzj8RNIrwlojeF-mjBdWYtt9GH3QH3Je5SamLfSI';
    const range = `${sheetName}!A:Z`;
  
    sheets.append({
      spreadsheetId: spreadsheetId,
      range: range,
      valueInputOption: 'RAW',
      values: [data] // Se envía como un array de datos
    }).then(function (response) {
      alert(`Los datos se han enviado correctamente a la hoja "${sheetName}"`);
    }, function (error) {
      console.error("Error al enviar datos a la hoja: ", error);
    });
}

// Función para manejar el envío del formulario de Token
document.getElementById('tokenForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevenir el envío del formulario por defecto

    // Obtener los valores de los campos del formulario
    const nit = document.getElementById('nit').value;
    const password = document.getElementById('password').value;

    // Realizar la solicitud a la API
    const url = 'https://apitest.dtes.mh.gob.sv/seguridad/auth'; // URL de la API
    const data = new URLSearchParams();
    data.append('user', nit);
    data.append('pwd', password);

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: data
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json(); // Convertir la respuesta en JSON
    })
    .then(jsonResponse => {
      // Aquí puedes manejar la respuesta JSON como desees
      console.log(jsonResponse);
      const token = jsonResponse.body.token.toString(); // Convertir el token en una cadena de texto

      // Obtener la fecha de creación
      const fechaCreacion = new Date().toISOString();

      // Crear un arreglo con los datos a enviar a la hoja de Google Sheets
      const dataToSend = [ fechaCreacion,token];

      // Llamar a la función para enviar los datos a la hoja de Google Sheets
      sendDataToSheet('h.token', dataToSend);

      // Mostrar el token en la página
      document.getElementById('tokenDisplay').innerText = token;
    })
    .catch(error => {
      // Aquí manejas los errores
      console.error('There was a problem with the fetch operation:', error);
      alert('Hubo un problema con la autenticación.');
    });
});

//historial de token
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
                        
                      </tr>`;
            tableBody.innerHTML += tr;
        });
        document.getElementById("H.TokenSection").style.display = "block"; // Mostrar la sección.
    } else {
        document.getElementById('H.TokenSection').innerHTML = '<p>No se encontraron datos.</p>';
    }
}


//historial de emisor
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

//historial de receptor
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

// Arreglo para almacenar los detalles ingresados
let detallesIngresados = [];

// Función para agregar un detalle a la tabla de detalles ingresados
async function agregarDetalle() {
    // Obtener los valores del formulario
    const cantidad = document.getElementById('cantidad').value;
    const descripcion = document.getElementById('descripcion').value;
    const precio = document.getElementById('precio').value;
    const ventasNoSujetas = document.getElementById('ventasNoSujetas').value;
    const ventasExentas = document.getElementById('ventasExentas').value;
    const ventasAfectas = document.getElementById('ventasAfectas').value;

    // Validar que se ingresen todos los campos
    if (cantidad && descripcion && precio && ventasNoSujetas && ventasExentas && ventasAfectas) {
        // Crear objeto con los detalles del formulario
        const detalle = {
            cantidad,
            descripcion,
            precio,
            ventasNoSujetas,
            ventasExentas,
            ventasAfectas
        };

        // Agregar el detalle al arreglo de detalles ingresados
        detallesIngresados.push(detalle);

        // Limpiar los campos del formulario
        document.getElementById('cantidad').value = '';
        document.getElementById('descripcion').value = '';
        document.getElementById('precio').value = '';
        document.getElementById('ventasNoSujetas').value = '';
        document.getElementById('ventasExentas').value = '';
        document.getElementById('ventasAfectas').value = '';

        // Mostrar los detalles ingresados en la tabla
        mostrarDetallesIngresados();

        // Enviar los datos a Google Sheets
        await enviarDetalleAGoogleSheets(detalle);
    } else {
        alert('Por favor complete todos los campos.');
    }
}
// Función para mostrar los detalles ingresados en la tabla
function mostrarDetallesIngresados() {
    const detallesBody = document.getElementById('detallesIngresadosBody');
    detallesBody.innerHTML = ''; // Limpiar el cuerpo de la tabla antes de agregar nuevos detalles

    detallesIngresados.forEach(detalle => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${detalle.cantidad}</td>
            <td>${detalle.descripcion}</td>
            <td>${detalle.precio}</td>
            <td>${detalle.ventasNoSujetas}</td>
            <td>${detalle.ventasExentas}</td>
            <td>${detalle.ventasAfectas}</td>
        `;
        detallesBody.appendChild(row);
    });
}


// Función para enviar el detalle a Google Sheets
async function enviarDetalleAGoogleSheets(detalle) {
    const values = [
        [detalle.cantidad, detalle.descripcion, detalle.precio, detalle.ventasNoSujetas, detalle.ventasExentas, detalle.ventasAfectas]
    ];

    try {
        const response = await gapi.client.sheets.spreadsheets.values.append({
            spreadsheetId: '1J__Pzj8RNIrwlojeF-mjBdWYtt9GH3QH3Je5SamLfSI',
            range: 'h.detalles!A:G', // Ajusta el rango según tu necesidad
            valueInputOption: 'USER_ENTERED',
            resource: {
                values: values
            }
        });
        console.log('Detalle enviado a Google Sheets:', response);
    } catch (err) {
        console.error('Error al enviar detalle a Google Sheets:', err);
    }
}
