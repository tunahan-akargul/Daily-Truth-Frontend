<script setup>
    import { ref, onMounted } from 'vue'
    const topResponses = [{ text: 'Response 1', score: 30 },
    { text: 'Response 2', score: 30 },
    { text: 'Response 3', score: 30 },
    { text: 'Response 4', score: 30 },
    { text: 'Response 5', score: 30 },
    { text: 'Response 6', score: 30 },
    { text: 'Response 7', score: 30 },
    { text: 'Response 8', score: 30 },
    { text: 'Response 9', score: 30 },
    { text: 'Response 10', score: 30 },
    ]
    import { useRouter } from 'vue-router'
    const seeResponse = ref(false)
    const responseWord = ref('')

    const handleGetResponse = async () => {
        try {
            const response = await fetch(`/api/get-word/${new Date().toISOString().split('T')[0]}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            });

            if (response.ok) {
                const data = await response.json();
                return data.text.charAt(0).toUpperCase() + data.text.slice(1).toLowerCase() || 'Trying to get word...';
            } else if (response.status == "404") {
                return 'Not found any word'
            }
            else {
                return 'Trying to get word...'
            }
        } catch (error) {
            return 'Unable to load word...'
        }
    }

    onMounted(async () => {
        responseWord.value = await handleGetResponse()
    })
</script>


<template>
    <div>
        <div ref="responseTitle" class="my-10">
            <H1>Your response is <span class="specialTitle"> {{ responseWord }} </span></H1>
            <h2 class="secondary-font">Look the other ones responses.</h2>
        </div>
    </div>

    <div class="my10 mb-1 fs-1 pointer-events-none" ref="question">
            <span>Everyone thought that but i dont wanna be like that everyone. knows it</span>
            <span class="d-inline-flex align-center">
                <span class="bracket">&nbsp;[</span>
                    <v-text-field class="mx-2 wordInput" variant="underlined" color="primary" density="compact"
                        min-width="180" hide-details />
                    <span class="bracket">]&nbsp;</span>
                </span>
            <span>yeas that my thik than the internet.</span>
        </div>

    <v-card color="backgroundSecondary" class="v-card my-10">
        <v-card-title class="fs-1 specialTitle">Top 10 Today's Responses</v-card-title>
        <v-btn 
            v-if="!seeResponse" 
            @click="seeResponse = !seeResponse"
            color="secondary" 
            variant="text">
            See Them
        </v-btn>
        <div v-if="seeResponse">
            <v-card-text><span>1.</span> <span>{{ topResponses[0].text }}</span> <span>{{ topResponses[0].score }}</span></v-card-text>
            <v-card-text><span>2.</span> <span>{{ topResponses[1].text }}</span> <span>{{ topResponses[1].score }}</span></v-card-text>
            <v-card-text><span>3.</span> <span>{{ topResponses[2].text }}</span> <span>{{ topResponses[2].score }}</span></v-card-text>
            <v-card-text><span>4.</span> <span>{{ topResponses[3].text }}</span> <span>{{ topResponses[3].score }}</span></v-card-text>
            <v-card-text><span>5.</span> <span>{{ topResponses[4].text }}</span> <span>{{ topResponses[4].score }}</span></v-card-text>
            <v-card-text><span>6.</span> <span>{{ topResponses[5].text }}</span> <span>{{ topResponses[5].score }}</span></v-card-text>
            <v-card-text><span>7.</span> <span>{{ topResponses[6].text }}</span> <span>{{ topResponses[6].score }}</span></v-card-text>
            <v-card-text><span>8.</span> <span>{{ topResponses[7].text }}</span> <span>{{ topResponses[7].score }}</span></v-card-text>
            <v-card-text><span>9.</span> <span>{{ topResponses[8].text }}</span> <span>{{ topResponses[8].score }}</span></v-card-text>
            <v-card-text style="border: none;"><span>10.</span> <span>{{ topResponses[9].text }}</span> <span>{{ topResponses[9].score }}</span></v-card-text>
        </div>
        
    </v-card>
</template>
<style scoped>
    .v-card {
        width: 80vw;
        margin: 0 auto;
        border: 3px solid var(--color-secondary);
        border-radius: 10px;
        padding: 10px;
    }
    .v-card-title{
        border-bottom: 3px solid var(--color-secondary);
        margin-bottom: 1vw;
    }
    .v-card-text{
        display: flex;
        justify-content: space-between;
        align-items: center;
        text-align: center;
        font-size: var(--fs-6);
        font-weight: bold;
        color: var(--color-success);
        border-bottom: 1px solid var(--color-secondary);
        padding: 1vw 3vw;
    }
    .bracket {
        color: var(--color-primary);
    }
</style>