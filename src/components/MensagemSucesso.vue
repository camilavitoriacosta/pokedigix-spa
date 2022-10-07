<script>
export default {
    name: 'mensagem-sucesso',
    props: {
        salvo: Boolean,
    },
}
</script>

<template>
    <div class="alert alert-success alert-dismissible fade show" role="alert" v-if="salvo">
        <slot></slot>
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
</template>