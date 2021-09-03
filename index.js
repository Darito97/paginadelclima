const [formulario, busqueda, cargando, nombre, temperatura, datos, principal, seccion] = [
    document.querySelector('#formulario'),
    document.querySelector('#busqueda'),
    document.querySelector('#cargandoBox'),
    document.querySelector('#nombre'),
    document.querySelector('#temperatura'),
    document.querySelector('#datos'),
    document.querySelector('#principal'),
    document.querySelector('#seccion'),
];
const [sol, nublado, lluvia] = [
    document.querySelector('#sol'),
    document.querySelector('#nublado'),
    document.querySelector('#lluvia'),
]

formulario.addEventListener('submit', (e) => {
    e.preventDefault();
    Buscar(busqueda.value);
    busqueda.value = '';
})

window.onload = () => {
    Buscar('Londres');
}

const Buscar = async (nombreDeCiudad) => {
    seccion.scrollIntoView({ behavior: "smooth" });
    cargando.style = 'display: flex';
    nombre.className = 'ocultado';
    datos.className = 'ocultado';
    principal.className = 'ocultado';
    const API = 'http://api.openweathermap.org/data/2.5/weather?q=' + nombreDeCiudad + '&lang=sp&appid=b6102a84903cfbb41770382059089ef1&units=metric';
    const obtenerRespuesta = await fetch(API);
    const clima = await obtenerRespuesta.json();
    ActualizarDatosDeInterfaz(clima, nombreDeCiudad);
}

const ActualizarDatosDeInterfaz = (clima, nombreDeCiudad) => {
    nombre.innerText = nombreDeCiudad;
    temperatura.innerText = parseInt(clima.main.temp) + '°C';
    const descripcion = (clima.weather[0].description === 'muy nuboso') ? 'Muy nublado' : clima.weather[0].description;
    datos.innerHTML =
        '<p> Descripción: <br /><strong>' + descripcion + '</strong><br />Temperatura maxima: <strong>' + parseInt(clima.main.temp_max) + '°C</strong><br />Temperatura minima: <strong>' + parseInt(clima.main.temp_min) + '°C</strong><br /><br />Humedad: <strong>' + clima.main.humidity + '%</strong><br />Presión: <strong>' + clima.main.pressure + 'hPa</strong><br /><p>Porcentaje de nubes: <strong>' + clima.clouds.all + '%</strong> <br /><br />Velocidad del viento: <strong>' + clima.wind.speed + 'km/h</strong><br />Angulo de viento: <strong>' + clima.wind.deg + '°</strong><br /><br />Latitud: <strong>' + clima.coord.lat + '</strong> <br />Longitud: <strong>' + clima.coord.lon + '</strong> <br /></p>';
    cargando.style = 'display: none;';
    asignarImagen(clima.weather[0].main);
    nombre.className = '';
    datos.className = 'datos';
    principal.className = 'datos';
}

const asignarImagen = (tipoDeClima) => {
    if (tipoDeClima === 'Clear') {
        sol.className = '';
        lluvia.className = 'ocultado';
        nublado.className = 'ocultado';
    }
    else if (tipoDeClima === 'Rain') {
        sol.className = 'ocultado';
        lluvia.className = '';
        nublado.className = 'ocultado';
    }
    else {
        sol.className = 'ocultado';
        lluvia.className = 'ocultado';
        nublado.className = '';
    }
}
