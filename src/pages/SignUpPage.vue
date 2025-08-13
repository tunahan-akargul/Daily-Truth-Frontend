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

    const handleBackClick = () => {
        router.push('/');
    };

    const email = ref('');
    const password = ref('');
    const name = ref('');
    const surname = ref('');
    const message = ref('\u00A0');

    async function checkEmailExists(email) {
        try {
            const res = await fetch(`/api/check-email?email=${encodeURIComponent(email)}`);
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            const data = await res.json();
            return data.exists;
        } catch (error) {
            console.error('Error checking email:', error);
            return false;
        }
    }

    async function signUp (){

        const exists = await checkEmailExists(email.value);
        if (exists) {
            message.value = 'This email is already registered.';
            return;
        }

        if(name.value === '' || surname.value === '' || email.value === '' || password.value === ''){
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
                    name: name.value,
                    surname: surname.value,
                    email: email.value,
                    password: password.value
                }

                const response = await fetch('/api/signup', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });
                
                if (response.ok) {
                    console.log("The post is successful");
                    name.value = '';
                    surname.value = '';
                    email.value = '';
                    password.value = '';
                } else {
                    console.error('Sign up failed:', response.status, response.statusText);
                    message.value = `Sign up failed: ${response.statusText || 'Please try again.'}`;
                }
            } catch (error) {
                console.error('Error signing up:', error);
                // Check if it's a network error
                if (error.name === 'TypeError' && error.message.includes('fetch')) {
                    message.value = 'Unable to connect to server. Please check your connection and try again.';
                } else {
                    message.value = 'Sign up failed. Please try again.';
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
            <H1 class="ml-6">Sign Up to <span class="text-primary"> {{ projectName }}</span></H1>
        </div>
        <h2 class="text-left">Name</h2>
        <v-text-field
            label="Name"
            variant="outlined"
            class="mb-4"
            v-model="name"
            hide-details
        ></v-text-field>
        <h2 class="text-left">Surname</h2>
        <v-text-field
            label="Surname"
            variant="outlined"
            class="mb-4"
            v-model="surname"
            hide-details
        ></v-text-field>
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
            @click="signUp"
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