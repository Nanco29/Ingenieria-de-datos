<script setup>
    import { ref } from 'vue';
    import textoDef from '../assets/mknap1-1.txt'
    import VisorInstancia from './VisorInstancia.vue';
    import EditorSolucion from './EditorSolucion.vue';

    const cargado = ref(false);
    const inputTexto = ref(textoDef);
    const datosInstancia = ref(null);

    function cargar() {
        let res = {
            items: [],
            mochilas: [],
            restricciones: []
        };

        if(inputTexto.value) {
            let lines = inputTexto.value.trim().split("\n");            
            
            // Línea 1: datos generales
            let datosGen = lines[0].split(" ");            
            let numItems = parseInt(datosGen[0]);
            let numMochilas = parseInt(datosGen[1]);

            // Línea 2: valores de items
            let cuentaItems = 0;
            let arrActual = null;
            let cuentaArr = 0;
            let lineaActual = 0;

            while(cuentaItems < numItems) {
                if(arrActual == null) {
                    lineaActual++;
                    arrActual = lines[lineaActual].trim().split(" ");
                    cuentaArr = 0;
                }

                let sigValor = parseInt(arrActual[cuentaArr]);
                res.items[cuentaItems] = sigValor;
                cuentaItems++;
                cuentaArr++;

                if(cuentaArr >= arrActual.length)
                    arrActual = null;                
            }

            // Líneas [3, 3 + n - 1]: restricciones // con n = cantidad de mochilas
            let cuentaMochilas = 0;            
            arrActual = null;

            while(cuentaMochilas < numMochilas) {
                cuentaItems = 0;
                res.mochilas.push([]);
                res.restricciones.push([]);

                while(cuentaItems < numItems) {
                    if(arrActual == null) {
                        lineaActual++;
                        arrActual = lines[lineaActual].trim().split(" ");
                        cuentaArr = 0;
                    }

                    let sigValor = parseInt(arrActual[cuentaArr]);
                    res.restricciones[cuentaMochilas][cuentaItems] = sigValor;
                    cuentaItems++;
                    cuentaArr++;
                    
                    if(cuentaArr >= arrActual.length)
                        arrActual = null; 
                } 
               
                cuentaMochilas++;
            }

            // Línea 3 + n: capacidades mochilas // con n = cantidad de mochilas
            cuentaMochilas = 0;            
            arrActual = null;

            while(cuentaMochilas < numMochilas) {
                if(arrActual == null) {
                    lineaActual++;
                    arrActual = lines[lineaActual].trim().split(" ");
                    cuentaArr = 0;
                }

                let sigValor = parseInt(arrActual[cuentaArr]);
                res.mochilas[cuentaMochilas] = sigValor;
                cuentaMochilas++;
                cuentaArr++;
                
                if(cuentaArr >= arrActual.length)
                    arrActual = null;
            }

            // Bandera...
            cargado.value = true;
        }
        
        datosInstancia.value = res;
    }

    function reiniciar() {
        cargado.value = false;
        datosInstancia.value = null;
    }
</script>

<template>
    <div class="contenedoGral">
        <h2>Carga de dataset</h2>

        <span v-if="!cargado">Ingrese el texto completo de la instancia:</span><br v-if="!cargado"/>
        <textarea v-if="!cargado" v-model="inputTexto" cols="50" rows="5"></textarea><br v-if="!cargado"/>
        <button v-if="!cargado" @click="cargar">Cargar</button>&nbsp;
        <button @click="reiniciar">Reiniciar</button>

        <div v-if="cargado">
            <hr>
            <h2>Editor de solución</h2>
            <EditorSolucion v-bind:datos-instancia="datosInstancia"/>
            
            <hr>
            <h2>Datos cargados</h2>
            <VisorInstancia v-bind:datos-instancia="datosInstancia"/>            
        </div>
    </div>
</template>

<style scoped>
    textarea {
        resize: none;
        margin: 2px;
    }

    span {
        margin: 2px; 
    }
</style>