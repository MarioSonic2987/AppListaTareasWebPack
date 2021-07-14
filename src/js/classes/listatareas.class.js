// Crearemos otra clase que guarde la lista de tareas y en la que se puedan realizar varios métodos, como añadir elementos, eliminar elementos, eliminar todos, etc.
export class ListaTareas {
    constructor() {
        // El constructor va a ser un vector en el cual se almacenan todas las tareas que se crean e inicialmente está vacía.
        //this.listaTareas = [];
        this.cargarLocalStorage();
    }
    // El primer método que tiene que existir es el de añadir elementos a la lista de tareas.
    anadirTarea(tarea) {
        this.listaTareas.push(tarea);
        console.log(this.listaTareas);
        this.guardarLocalStorage();
    }
    // Otro método será el de eliminar el elemento seleccionado de la lista de tareas.
    eliminarTarea(id) {
        this.listaTareas = this.listaTareas.filter((tarea) => tarea.id != id);
        this.guardarLocalStorage();
    }
    // Otro método que será el de eliminar todos los elementos que hemos completado.
    eliminarCompletados() {
        // Filtraremos todos los elementos que no tengan this.completado = true.
        this.listaTareas = this.listaTareas.filter((tarea) => tarea.completado == false);
        this.guardarLocalStorage();
    }
    marcarCompletado(id) {
        // Para marcar completado tendré que recorrer el vector y comprobar cada uno de los id con el que recibiré del evento y cuando coincidan
        // le tengo que cambiar el estado.
        for (const tarea of this.listaTareas) {
            if (tarea.id == id) {
                // En tarea.id voy a tener un número que es el que se crea automáticamente cuando creamos la tarea
                // que estará guardado en el atributo data-id.
                // Cuando pulso en el checkbox, cambiará de estado, si está en true, a false y si es false, a true.
                tarea.completado = !tarea.completado;

                this.guardarLocalStorage();
                break;
            }

        }

    }
    guardarLocalStorage() {
        localStorage.setItem('tareas', JSON.stringify(this.listaTareas));
    }
    cargarLocalStorage() {
        // Cuando cargamos datos del local Storage tenemos dos posibilidades, si no hay nada, creamos un vector
        // vacío, y si hay algo, cargamos los datos del local. Esto servirá para que en el constructor llamemos
        // a esta función.
        // if(localStorage.getItem(this.key)){
        //     this.listaTareas = JSON.parse(localStorage.getItem(this.key));
        // } else {
        //     this.listaTareas = [];
        // }
        this.listaTareas = (localStorage.getItem('tareas')) ? (JSON.parse(localStorage.getItem('tareas'))) : ([]);

    }
}