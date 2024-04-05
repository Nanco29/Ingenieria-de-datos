<script setup>
    const props = defineProps(['datosInstancia']);
</script>

<template>
    <div class="visorInstancia">
        <div class="fila">
            <div class="espacio">&nbsp;</div>
            <div class="itemsSection">
                <div class="titulo">ITEMS</div>
                <div class="items">                    
                    <div v-for="item in props.datosInstancia.items" :key="item">
                        {{ item }}
                    </div>
                </div>
            </div>
        </div>
        <div class="fila">
            <div class="mochilasSection">
                <div class="titulo">MOCHILAS</div>
                <div class="mochilas">                    
                    <div v-for="item in props.datosInstancia.mochilas" :key="item">
                        {{ item }}
                    </div>
                </div>
            </div>
            <div class="restriccionesSection">
                <div class="titulo">RESTRICCIONES</div>
                <div class="restrRow" v-for="i in props.datosInstancia.restricciones.length" :key="i">
                    <div class="restricciones" v-for="item in props.datosInstancia.restricciones[i - 1]" :key="item">
                            {{ item }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .visorInstancia {
        display: flex;
        flex-direction: column;
    }

    .fila {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        align-items: center;
        margin: 3px;
    }

    .titulo {
        background-color: darkblue;
        color: white;
        font-weight: bolder;
    }

    .espacio {
        flex: 1;
        margin-left: 2px;
        min-width: 100px;
    }

    .itemsSection {
        display: flex;
        flex-direction: column;
        flex: 9;
        border: 1px solid grey;
        margin-left: 5px;
        text-align: center;
    }

    .items {
        display: flex;
        flex-direction: row;        
    }

    .items div {
        flex: 1;
        background-color: lightgray;
        margin: 1px;
    }

    .mochilasSection {
        display: flex;
        flex-direction: column;
        flex: 1;
        border: 1px solid grey;       
        text-align: center;
        min-width: 100px;
    }

    .mochilas {
        display: flex;
        flex-direction: column;
    }

    .mochilas div {
        flex: 1;
        background-color: lightgray;
        margin: 1px;
    }

    .restriccionesSection {
        display: flex;
        flex-direction: column;
        flex: 9;
        border: 1px solid grey;
        margin-left: 5px;        
        align-content: stretch;
        text-align: center;
    }

    .restrRow {
        display: flex;
        flex-direction: row;        
        flex: 1;
    }

    .restricciones {
        display: flex;
        flex-direction: column;
        flex: 1;
        background-color: lightgray;
        margin: 1px;
    }
</style>