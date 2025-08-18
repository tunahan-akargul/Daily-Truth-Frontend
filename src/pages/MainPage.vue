<script setup>
    import { ref, onMounted } from 'vue';
    import { useRoute } from 'vue-router';

    const route = useRoute();

    const props = defineProps({
        projectName: {
            type: String,
            default: 'Precious'
        }
    });

    const email = ref(route.query.email || 'Can not find email');
    const name = ref('');
    const surname = ref('');
    const selectedImage = ref(null);
    const fileInput = ref(null);

    const selectImage = () => {
        fileInput.value.click();
    };

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                selectedImage.value = e.target.result;
            };            
        }
    };

    async function getUserDetails(email) {
        try {
            const response = await fetch(`/api/get-details?email=${encodeURIComponent(email)}`);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            if (data.name === null || data.surname === null || data.name === undefined || data.surname === undefined || data.name === '' || data.surname === ''){
                name.value = 'Can not find name';
                surname.value = 'Can not find surname';
            } else {
                name.value = data.name;
                surname.value = data.surname;
            }
        } catch (error) {
            console.error('Error checking email:', error);
            return false;
        }
    }

    onMounted(() => {
        getUserDetails(email.value);
    });
</script>

<template>
    <div>
        <H1>Welcome to <span class="text-primary"> {{ projectName }}</span></H1>

        <v-card color="backgroundSecondary" class="profileDetails rounded-xl mt-10">
            <v-card-title class="text-center font-weight-bold fs-3">Profile Details</v-card-title>
            <v-divider></v-divider>
            <v-card-text class="d-flex">
                <v-tooltip location="top" text="Click to add photo" color="primary" class="custom-tooltip">
                    <template v-slot:activator="{props}">
                        <v-avatar 
                            v-bind="props"
                            class="mr-10 rounded-xl" 
                            style="width: 170px; height: 170px; min-width: 170px; cursor: pointer;"
                            @click="selectImage">
                            <v-img 
                                v-if="selectedImage" 
                                :src="selectedImage" 
                                cover
                                style="width: 100%; height: 100%;">
                            </v-img>
                            <v-icon 
                                v-else 
                                color="primary" 
                                size="170">
                                mdi-account-circle-outline
                            </v-icon>
                        </v-avatar>
                    </template>
                </v-tooltip>
                
                <!-- Hidden file input -->
                <input 
                    ref="fileInput"
                    type="file" 
                    accept="image/*" 
                    @change="handleImageUpload"
                    style="display: none;">
                
                <div class="flex-grow-1">
                    <v-col class="d-flex align-center fs-5"><div class="d-flex justify-space-between mr-5" style="width: 25%;"><span class="text-primary font-weight-bold">Email</span><span class="text-secondary">:</span> </div><span class="font-weight-bold">{{ email }}</span></v-col>
                    <v-col class="d-flex align-center fs-5"><div class="d-flex justify-space-between mr-5" style="width: 25%;"><span class="text-primary font-weight-bold">Name</span><span class="text-secondary">:</span> </div><span class="font-weight-bold">{{ name }}</span></v-col>
                    <v-col class="d-flex align-center fs-5"><div class="d-flex justify-space-between mr-5" style="width: 25%;"><span class="text-primary font-weight-bold">Surname</span><span class="text-secondary">:</span> </div><span class="font-weight-bold">{{ surname }}</span></v-col>
                </div>
            </v-card-text>
        </v-card>
    </div>
</template>

<style scoped>
    .buttons{
        width: 500px;
        height: auto;
        font-size: 3rem;
    }

    .profileDetails{
        width: 42vw;
        border: 2px solid #ffb74d;
    }

</style>