<script setup>
    import { ref } from 'vue';
    import { useRouter } from 'vue-router';

    const router = useRouter();

    const props = defineProps({
        projectName: {
            type: String,
            default: 'Precious'
        }
    });
</script>

<template>
    <div>
        <H1>Welcome to <span class="text-primary"> {{ projectName }}</span></H1>
    </div>
</template>

<style scoped>
    .buttons{
        width: 500px;
        height: auto;
        font-size: 3rem;
    }

</style>