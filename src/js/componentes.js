import { Tarea} from "./classes/index";
import { listaTareas } from "../index";

// Variables cogidas del DOM/HTML
// Cojo el input donde escribimos las tareas.
const nuevaTarea = document.querySelector('.new-todo');
// Cojo el padre de las li, que es el elemento ul.
const ul = document.querySelector('.todo-list');
// Cojo el botón de eliminar completados del HTML.
const borrarCompletados = document.querySelector('.clear-completed');
// Cojo la lista donde se encuentran los botones que realizan los filtros.
const filtros = document.querySelector('.filters');
// Cojo cada uno de los filtros para poder recorrer el vector.
const filtrosMarco = document.querySelectorAll('.filtro');

// Cojo el footer para ocultarlo cuando no hay ninguna tarea.
const footer = document.querySelector('.footer');
// Cojo el strong donde se muestran el número de tareas pendientes.
let numPendHTML = document.querySelector('strong');

// Funciones
// Función que sirve para que cuando escribamos una tarea se renderice en el HTML.
export const anadirTareaHTML = (tarea) => {

    const tareasHTML = `
        <li class="${(tarea.completado) ? 'completed' : ''}" data-id="${tarea.id}">
            <div class="view">
                <input class="toggle" type="checkbox" ${(tarea.completado) ? 'checked' : ''}>
                <label>${tarea.tarea}</label>
                <button class="destroy"></button>
            </div>
            <input class="edit" value="Create a TodoMVC template">
        </li>
    `;
    ul.innerHTML += tareasHTML;
};
// Función que muestra y oculta el footer si hay tareas o no.
export const mostrarFooter = () => {
    // Si hay algo en la lista de taras, lo muestra. Y si no, lo oculta.
    if (listaTareas.listaTareas.length !== 0) {
        footer.classList.remove('hidden');
    } else {
        footer.classList.add('hidden');
    }

}
// Función que muestra y oculta el número de elementos pendientes en un span dentro del footer.
export const mostrarPendientes = () => {
    const contarPendientes = listaTareas.listaTareas.filter((tarea) => tarea.completado === false);
    numPendHTML.textContent = contarPendientes.length;
};
// Función que muestra el botón de eliminar completadas cuando hay taras ya hechas.
export const mostrarBorrarCompletadas = () => {
    const hayCompletadas = listaTareas.listaTareas.filter((tarea) => tarea.completado === true);
    (hayCompletadas.length > 0) ? (borrarCompletados.classList.remove('hidden')) : (borrarCompletados.classList.add('hidden'));
}
// Eventos
// Evento que al pulsa la tecla Enter crea la tarea, añade la tarea al HTML y la añade a la lista de tareas.
nuevaTarea.addEventListener('keyup', (evento) => {

    // Hacemos una condición que será si se pulsa la tecla Enter y si hay contenido dentro del cuadro de tipo texto.
    // Eliminar los espacios al inicio y al final.
    if (evento.key === 'Enter' && nuevaTarea.value.trim().length > 0) {
        // Creo una nueva instancia a la tarea.
        const nuevaTareaCreada = new Tarea(nuevaTarea.value);
        // Añadimos la nueva tarea al vector.
        listaTareas.anadirTarea(nuevaTareaCreada);
        // Añadimos la tarea al HTML.
        anadirTareaHTML(nuevaTareaCreada);
        // Borramos el contenido del input de texto.
        nuevaTarea.value = '';
    }
    mostrarFooter();
    mostrarPendientes();
    mostrarBorrarCompletadas();
});
// Evento que al marcar los elementos como completados y da funcionalidad al botón de borrar.
ul.addEventListener('click', (evento) => {
    // Hacemos click en una de las partes del texto y tenemos que saber donde pulsamos, tenemos una propiedad en el target que se llama
    // localName que nos va a decir dónde pulsamos, podremos pulsar en el checkbox, en el lable o en el botón de eliminar, pues tendremos que hacer
    // condiciones según donde pulsemos.
    const nombreElemento = evento.target.localName;
    // Tengo que coger la li donde hago clic para que cuando pulsemos el botón de eliminar, borre toda la tarea.
    const tareaSeleccionada = evento.target.parentElement.parentElement;
    // Cojo el id único de cada una de las tareas, este id está en el atributo de HTML data-id.
    const tareaId = tareaSeleccionada.dataset.id;
    //const tareaId = tareaSeleccionada.getAttribute('data-id');

    // Una vez que tenemos toda la información haremos un condicional, si se pulsa en el check se llama al método marcarCompletado.
    // se pulsa el botón de eliminar se llama al método de eliminarTarea.
    if (nombreElemento === 'input') {
        listaTareas.marcarCompletado(tareaId);
        // En la consola vemos que va cambiando la propiedad completado pero no tacha la tarea, para hacer eso tenemos que jugar
        // con las clases y añadirle y quitarle la clase completed al li.
        tareaSeleccionada.classList.toggle('completed');
    }
    if (nombreElemento === 'button') {
        listaTareas.eliminarTarea(tareaId);
        ul.removeChild(tareaSeleccionada);
    }
    mostrarFooter();
    mostrarPendientes();
    mostrarBorrarCompletadas();
});
// Eliminar completados.
borrarCompletados.addEventListener('click', () => {
    // Llamamos al método de la clase eliminarCompletados.
    listaTareas.eliminarCompletados();
    // Recorremos la ul donde están los li, esta es un vector y con la propiedad children puedo sacar el número de elementos.
    // Tendremos que recorrer el vector al revés desde el último elemento al primero, porque si lo recorremos del inicio al final,
    // como se borra un elemento, las posiciones del vector ya no coinciden.
    for (let index = ul.children.length - 1; index >= 0; index--) {
        // Guardo lo que hay en cada una de las posiciones en una variable.
        const elemento = ul.children[index];
        // Hago un condicional en el que le digo si contiene la clase completed, si es verdad lo elimino de la lista.
        if (elemento.classList.contains('completed')) {
            elemento.remove();
        }
    }
    mostrarFooter();
    mostrarPendientes();
    mostrarBorrarCompletadas();
});

// Evento para seleccionar los elementos completados y no completados.
filtros.addEventListener('click', (evento) => {
    // Recorremos las a y le quitamos el cuadrado cuando pulsamos en cualquier lado de la ul
    filtrosMarco.forEach((filtro) => filtro.classList.remove('selected'));
    // Ponemos el marco en el elemento seleccionado.
    evento.target.classList.add('selected');
    // Ponemos el texto que tiene el elemento seleccionado en una variable y después hacemos un switch
    // para cada uno de los casos.
    const textoFiltroSeleccionado = evento.target.text;
    // Podríamos añadir una medida de seguridad y es que si pulso donde no hay elemento,
    // o sea, la constante textoFiltroSeleccionado está vacía que salga del evento.
    if (!textoFiltroSeleccionado) { return }
    // Tenemos que recorrer el vector donde se encuentran las lipara saber cuáles están completados y cuáles no.
    for (const elemento of ul.children) {
        // El primer paso es quitar a todos los elementos la clase hidden por que si no,
        // el filtro del switch se lo asigna y se quita, además nos servirá para que funcione el botón
        // de Tareas, ya que mostrará todas ellas.
        elemento.classList.remove('hidden');
        // Según el botón que yo pulse ocultará las completadas o las que no.
        switch (textoFiltroSeleccionado) {
            case 'Pendientes':
                // Comprobamos si el elemento seleccionado tiene la clase "complete". Si es así, le asignamos
                // la clase CSS hidden que oculta los elementos con el display: none.
                if (elemento.classList.contains('completed')) {
                    elemento.classList.add('hidden');
                }
                break;
            case 'Completadas':
                // Comprobamos si el elemento seleccionado no tiene la clase "complete". Si es así, le asignamos
                // la clase CSS hidden que oculta los elementos con el display: none.
                if (!elemento.classList.contains('completed')) {
                    elemento.classList.add('hidden');
                }
                break;
        }
    }


});
// Añado el evento que al hacer doble clic sobre una label automáticamente la pueda modificar añadiendo el
// atributo contentEditable="true".
ul.addEventListener('dblclick', (evento) => {
    const nombreElemento = evento.target.localName;
    const tareaSeleccionada = evento.target.parentElement.parentElement;
    const tareaId = tareaSeleccionada.dataset.id;
    // Accedenis a la label que hemos pulsado y le ponemos el contentEditable = true
    if( nombreElemento === 'label'){
       const etiquetaSeleccionada = tareaSeleccionada.children[0].children[1];
       console.log(etiquetaSeleccionada);
       etiquetaSeleccionada.setAttribute('contenteditable', true);
       etiquetaSeleccionada.setAttribute('style', 'border:1px solid #000000');
       // Una vez que editamos la etiqueta, ponemos el evento para que cuando pulsemos la tecla enter deje de ser editable.
       etiquetaSeleccionada.addEventListener('keypress', (evento) => {
            if(evento.key === 'Enter'){
                // Tenemos que coger el valor que hay dentro de la etiqueta y guardarlo en una constante para modificarlo en el vector.
                const textoLabel = etiquetaSeleccionada.innerHTML;
                console.log(textoLabel);
                etiquetaSeleccionada.setAttribute('contenteditable', false);
                etiquetaSeleccionada.removeAttribute('style');
                // Tendremos que modificar la tarea que hemos editado usando su id.
                listaTareas.listaTareas.forEach((tarea) => {
                    // Lo que hay en el atributo es texto y lo que hay en la clase es un número.
                    if(tarea.id == tareaId){
                        tarea.tarea = textoLabel;
                        // Faltaría actualizar el local Storage
                        listaTareas.guardarLocalStorage();
                    }
                });
            }
       });
    }
});