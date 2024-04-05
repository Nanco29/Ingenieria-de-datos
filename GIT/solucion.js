module.exports = function(datosInstancia) {
    return {
        solucionActual: new Array(datosInstancia.items.length).fill(false, 0, datosInstancia.items.length),
        capsMochilas: new Array(datosInstancia.mochilas.length).fill(0, 0, datosInstancia.mochilas.length),
        calculoFO: 0,
        activar: function(item, validar = false) {            
            if(!this.solucionActual[item]) {                
                for(let i = 0; i < datosInstancia.mochilas.length; i++) {
                    let nuevaCapacidad = this.capsMochilas[i] + datosInstancia.restricciones[i][item];

                    if(validar && nuevaCapacidad > datosInstancia.mochilas[i])
                        return false;

                    this.capsMochilas[i] = nuevaCapacidad;                    
                }

                this.solucionActual[item] = true;
                this.calculoFO += datosInstancia.items[item];                
            }

            return true;
        },
        desactivar: function(item) {
            if(this.solucionActual[item]) {
                this.solucionActual[item] = false;
                this.calculoFO -= datosInstancia.items[item];
    
                for(let i = 0; i < datosInstancia.mochilas.length; i++)
                    this.capsMochilas[i] -= datosInstancia.restricciones[i][item];
            }

            return true;
        },
        cambiar: function(item) {            
            if(!this.solucionActual[item]) 
                return this.activar(item);
            else   
                return this.desactivar(item);
        },
        estaSeleccionado: function(item) {
            return this.solucionActual[item];
        },
        estaSobrecargada: function(mochila) {
            return this.capsMochilas[mochila] > datosInstancia.mochilas[mochila];
        },
        obtenerCapacidad: function(mochila) {
            return this.capsMochilas[mochila];
        },
        obtenerResultado: function() {
            return this.calculoFO;
        }
    }
}