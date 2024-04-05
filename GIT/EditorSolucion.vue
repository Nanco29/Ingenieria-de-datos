<script setup>
    import { ref } from 'vue';
    import builderSolucion from './solucion.js';    

    const props = defineProps(['datosInstancia']);
    const sol = ref(builderSolucion(props.datosInstancia));

    function cambiarItem(item) {
        sol.value.cambiar(item);
    }

</script>

<template>
    <div>
        Activar o desactivar items para incorporarlos a la solución:<br/>
        <button @click="cambiarItem(index)" :class="{active: sol.estaSeleccionado(index)}" v-for="(item, index) in props.datosInstancia.items" :key="index">
            {{ item }}
        </button><br/><br/>

        Valor actual de función objetivo: <span style="font-weight: bolder; color: blue;">{{ sol.obtenerResultado() }}</span><br><br>

        Capacidades de las mochilas:<br/>
        <div style="display: flex;">
            <div class="capMochila" :class="{ 'sobrecargada': sol.estaSobrecargada(index) }" v-for="(mochila, index) in props.datosInstancia.mochilas" :key="index">
                <span>{{ sol.obtenerCapacidad(index) }}</span> / {{ mochila }}
            </div>
        </div>
    </div>
</template>

<style scoped>
    button {
        border: 1px solid black;
        background-color: white;
        margin: 3px;
    }

    .active {
        background-color: blue;
        color: white;
        border-style: inset;
    }

    .capMochila {
        margin: 3px;
        font-size: small;
        border: 1px solid grey;
        padding: 3px;
    }

    .capMochila span {
        font-weight: bolder;
    }

    .sobrecargada {
        color: red;
    }
</style>