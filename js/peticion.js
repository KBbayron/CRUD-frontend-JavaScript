let idPersonaEditada = null;

const agregar = new Personas();
const addData = document.getElementById('data');
const eliminarPersona = document.getElementById('table');
const editarPersona = document.getElementById('table');
const listaPersonas = document.querySelector('#table tbody');
cargarEventos();

function cargarEventos() {
    addData.addEventListener('click', (e) => { agregar.ingreso(e) });
    eliminarPersona.addEventListener('click', (e) => { agregar.salida(e) });
    editarPersona.addEventListener('click', (e) => { agregar.editarPersona(e) });
    document.addEventListener('DOMContentLoaded', agregar.leerlocalStorage());
}