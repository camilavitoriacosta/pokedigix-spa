<script>
import { Toast } from 'bootstrap';
import MessagemErroDTO from "../models/MessagemErroDTO"

export default {
    name: 'mensagem-erro',
    props: {
        mensagemDeErro: MessagemErroDTO,
        ativo: Boolean
    },
    mounted() {
        // Emits on mount
        this.emitInterface();
    },

    methods: {
        emitInterface() {
            this.$emit("interface", {
                ativar: () => this.ativar()
            });
        },

        ativar() {
            const toastLiveExample = document.getElementById('liveToast')
            const toast = new Toast(toastLiveExample)
            toast.show()
        }
    }
}

</script>
<template>
    <div class="toast-container position-absolute top-0 end-0 mt-5 p-3">
        <div id="liveToast" class="toast bg-danger text-white" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="toast-body">
                {{ mensagemDeErro.tipo }}: {{ mensagemDeErro.mensagem }}
            </div>
        </div>
    </div>
</template>