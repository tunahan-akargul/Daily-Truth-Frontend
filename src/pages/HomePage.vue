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

    const handleSignInClick = () => {
        router.push('/signin');
    };

    const handleSignUpClick = () => {
        router.push('/signup');
    };
</script>

<template>
    <div>
        <H1>Welcome to <span class="text-primary"> {{ projectName }}</span></H1>
        <h2>Sign in or Sign up</h2>
        
        <!-- Example of different icon usage -->
        <div class="icon-examples mt-4">

        </div>
    </div>
    <div class="mt-6 mb-4">
        <v-btn 
            color="primary" 
            variant="outlined" 
            class="buttons rounded-pill my-4 py-4"
            @click="handleSignInClick"
        >
            <v-icon class="mr-4" left>mdi-login</v-icon>
            SIGN IN
        </v-btn>
    </div>
    <div>
        <v-btn 
            color="primary" 
            variant="outlined" 
            class="buttons rounded-pill my-4 py-4"
            @click="handleSignUpClick"
        >
            <v-icon class="mr-4" left>mdi-account-plus</v-icon>
            SIGN UP
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