
//Se crea la clase nodo
class Nodo {
    constructor(pEstado) {
      this._estado = pEstado;
      this._hijos = [];
      this._padre = null;
      this._direccion = null; // Agregar atributo para la acción o paso tomado

    }
  
    // Getter y Setter para el atributo estado
    get estado() {
      return this._estado;
    }
  
    set estado(nuevoEstado) {
      this._estado = nuevoEstado;
    }
  
    // Getter y Setter para el atributo hijos
    get hijos() {
      return this._hijos;
    }
  
    set hijos(nuevosHijos) {
      this._hijos = nuevosHijos;
      if(nuevosHijos != null){
        for (const h of nuevosHijos) {
          h._padre = this
        }
      }
    }
  
    // Getter y Setter para el atributo padre
    get padre() {
      return this._padre;
    }
  
    set padre(nuevoPadre) {
      this._padre = nuevoPadre;
    }

    // Getter para el atributo accion
    get direccion() {
      return this._direccion;
    }
    set direccion(nuevoPadre) {
      this._direccion = nuevoPadre;
    }
  }


module.exports = Nodo;
