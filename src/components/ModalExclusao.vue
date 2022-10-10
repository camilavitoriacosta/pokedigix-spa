<script>
export default {
    name: 'modal-exclusao',
    methods: {
        deletar() {
            this.$emit('remover');
        }
    }
    // props: {
    // },
}
</script>

<template>
    <!-- Modal -->
    <div class="modal fade" id="modalConfimacaoExclusao" tabindex="-1" aria-labelledby="modalConfimacaoExclusao"
        aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Confirmação de exclusão</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <slot></slot>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                    <button @click="deletar()" class="btn btn-dark" data-bs-dismiss="modal">
                        Remover
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>