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
    const message = ref('\u00A0');
    async function checkEmailExists(email) {
        try {
            const response = await fetch(`/api/check-email?email=${encodeURIComponent(email)}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            return data.exists;
        } catch (error) {
            console.error('Error checking email:', error);
            return false;
        }
    }

    async function signIn (){

        const exists = await checkEmailExists(email.value);
        if (!exists) {
            message.value = 'This email is not registered.';
            return;
        }

        if(email.value === '' || password.value === ''){
            message.value = 'Please fill in all fields.';
            return;
        }

        if (password.value.length < 8){
            message.value = 'Password must be at least 8 characters long.';
            return;
        }

        if(email.value.includes('@gmail.com') === true){

            try{
                const payload = {
                    email: email.value,
                    password: password.value
                }

                const response = await fetch('/api/signin', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });
                
                if (response.ok) {
                    const data = await response.json();
                    
                    if (data.passwordControl === true){
                        router.push({
                            path: '/main',
                            query: {
                                email: email.value
                            }
                        });
                        return;
                    } else {
                        message.value = 'Password is incorrect.';
                        return; 
                    }
                } else {
                    console.log("Sign in failed");
                    console.error('Sign in failed:', response.status, response.statusText);

                    if (response.status === 401) {
                        message.value = 'Password is incorrect.';
                    } else {
                        let errorMessage = 'Please try again.';
                        try {
                            const errorText = await response.text();
                            if (errorText) {
                                errorMessage = errorText;
                            }
                        } catch (e) {
                        }
                        message.value = `Sign in failed: ${errorMessage}`;
                    }
                    return;
                }
            } catch (error) {
                console.error('Error signing in:', error);

                if (error.name === 'TypeError' && error.message.includes('fetch')) {
                    message.value = 'Unable to connect to server. Please check your connection and try again.';
                } else {
                    message.value = 'Sign in failed. Please try again.';
                }
            }
        }else{
            message.value = 'Please enter a valid email.'
            return;
        }
    }
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
        <v-alert 
            class="text-center text-h6 pa-0"
            variant="text"
            color="error"
        >{{ message }}</v-alert>
    </div>
    <div>
        <v-btn 
            color="primary" 
            variant="outlined" 
            class="buttons rounded-pill my-4 py-4"
            @click="signIn"
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