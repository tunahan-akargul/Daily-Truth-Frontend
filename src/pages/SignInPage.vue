<script setup>
    import { ref } from 'vue';
    import { useRouter } from 'vue-router';

    // Set up router
    const router = useRouter();

    // Props with default values
    const props = defineProps({
        projectName: {
            type: String,
            default: 'Precious'
        }
    });

    // Function to handle back button click
    const handleBackClick = () => {
        router.push('/');
    };

    const email = ref('');
    const password = ref('');
</script>

<template>
    <div>
        
        
        <div class="d-flex justify-space-between align-center mb-6">
            <v-btn 
            color="secondary" 
            variant="text" 
            @click="handleBackClick"
            class="position-absolute"
            style="margin-left: -130px;"
            >
                <v-icon class="mr-2" left>mdi-arrow-left</v-icon>
                Back
            </v-btn>
            <H1 class="ml-6">Sign In to <span class="text-primary"> {{ projectName }}</span></H1>
        </div>
        
        <h2 class="text-left">Email</h2>
        <v-text-field
            label="Email"
            variant="outlined"
            class="mb-4"
            v-model="email"
            hide-details
        ></v-text-field>
        <h2 class="text-left">Password</h2>
        <v-text-field
            label="Password"
            type="password"
            variant="outlined"
            class="mb-4"
            v-model="password"
            hide-details
        ></v-text-field>
    </div>
    <div>
        <v-btn 
            color="primary" 
            variant="outlined" 
            class="buttons rounded-pill my-4 py-4"
        >
            <v-icon class="mr-4" left>mdi-login</v-icon>
            SIGN IN
        </v-btn>
    </div>
</template>

<style scoped>
    .buttons{
        width: 500px;
        height: auto;
        font-size: 3rem;
    }
</style>