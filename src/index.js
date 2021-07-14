// Importamos el CSS desde la carpeta donde se encuentra.
import './css/style.css';

// Importamos la clase que necesitamos.
import { ListaTareas } from './js/classes/index';

// Importamos las funciones que necesita para que funcione la aplicación.
import {anadirTareaHTML, mostrarFooter, mostrarPendientes, mostrarBorrarCompletadas} from './js/componentes'

// Llamadas a las funciones
export const listaTareas = new ListaTareas();
// Tengo que llamar a la función que dibuja el HTML.
listaTareas.listaTareas.forEach((tarea) => anadirTareaHTML(tarea));
mostrarFooter();
mostrarPendientes();
mostrarBorrarCompletadas();

