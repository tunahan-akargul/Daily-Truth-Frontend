<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const projectName = 'ThiDay';
const lockIcon = ref('mdi-lock');
const lockButton = ref(null)
const welcomeTitle = ref(null)
const responseTitle = ref(null)
const question = ref(null)
const sendButton = ref(null)
const responseWord = ref('')
const responeInputValue = ref('')
const errorMessage = ref('')
const sendIcon = ref('mdi-send')
const success = ref('')

const handleOpenQuestion = () => {
    lockIcon.value = 'mdi-lock-open'
    const btnEl = lockButton.value?.$el
    if (btnEl) {
        btnEl.classList.remove('goneAnimation')
        void btnEl.offsetWidth
        btnEl.classList.add('goneAnimation', 'pointer-events-none')
    }

    const titleEl = welcomeTitle.value
    if (titleEl) {
        titleEl.classList.remove('titleSlideAnimation')
        void titleEl.offsetWidth
        titleEl.classList.add('titleSlideAnimation')
    }

    const questionEl = question.value
    if (questionEl) {
        questionEl.classList.remove('opacity-0', 'pointer-events-none')
        void questionEl.offsetWidth
        questionEl.classList.add('showAnimation', 'pointer-events-auto')
    }

    const sendBtnEl = sendButton.value?.$el
    if (sendBtnEl) {
        sendBtnEl.classList.remove('opacity-0', 'pointer-events-none')
        void sendBtnEl.offsetWidth
        sendBtnEl.classList.add('showAnimation', 'pointer-events-auto')
    }
    success.value = 'primary'
}

const handleSendQuestion = async () => {
    console.log(responeInputValue.value)
    if (responeInputValue.value.trim() === '' || responeInputValue.value.trim() === null || responeInputValue.value.trim() === undefined) {
        errorMessage.value = 'Please enter a word.'
    } else {
        try {
            const response = await fetch(`/api/post-word`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text: responeInputValue.value })
            });
            if (response.ok) {
                await successMovements()
                return;
            } else {
                // Get the error details from the response
                const errorData = await response.json().catch(() => null);
                console.error('Send failed:', response.status, response.statusText, errorData);
                
                // Display more detailed error message
                if (errorData && errorData.message) {
                    errorMessage.value = `Error: ${errorData.message}`
                } else if (response.status === 400) {
                    errorMessage.value = 'Bad Request: Check the data format or required fields.'
                } else {
                    errorMessage.value = `Send failed (${response.status}): ${response.statusText || 'Please try again.'}`
                }
            }
        } catch (error) {
            console.error('Error signing up:', error);
            if (error.name === 'TypeError' && error.message.includes('fetch')) {
                errorMessage.value = 'Unable to connect to server. Please check your connection and try again.'
            } else {
                errorMessage.value = 'Send request failed. Please try again.'
            }
        }
    }
}

const handleGetResponse = async () => {
    const response = await fetch(`/api/get-word/${new Date().toISOString()}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    });
    if (response.ok) {
        const data = await response.json();
        if (data.word) {
            return data.word;
        } else {
            console.log('No word found')
            console.log(`${new Date().toISOString()}`)
            return 'Trying to get word...';
        }
    } else {
        console.log(`${new Date().toISOString()}`)

        return 'Trying to get word...';
    }
}

const successMovements = async () => {
    console.log("The post is successful")
    errorMessage.value = ''
    responeInputValue.value = ''
    sendIcon.value = 'mdi-check'
    success.value = 'success'
    
    // Fetch the response word
    responseWord.value = await handleGetResponse()
    
    setTimeout(() => {
        const btnEl = sendButton.value?.$el
        btnEl.classList.remove('showAnimation')
        void btnEl.offsetWidth
        btnEl.classList.add('goneAnimation', 'pointer-events-none')
        question.value.classList.remove('showAnimation')
        void question.value.offsetWidth
        question.value.classList.add('goneAnimation', 'pointer-events-none')
        welcomeTitle.value.classList.remove('titleSlideAnimation')
        void welcomeTitle.value.offsetWidth
        welcomeTitle.value.classList.add('titleGoneAnimation')

        setTimeout(() => {
            responseTitle.value.classList.add('titleComeAnimation')
            console.log('The response title is coming')
        }, 1000);
    }, 1000);
}
</script>

<template>
    <div>
        <div>
            <div ref="welcomeTitle" style="position: absolute; left: 50%; transform: translateX(-50%); top: 37%; width: 100%;">
                <H1>Welcome to <span class="specialTitle"> {{ projectName }} </span></H1>
                <h2 class="secondary-font">Response a Question Thi Day</h2>
            </div>
        </div>
        <div style="position: absolute; left: 50%; transform: translateX(-50%); top: 50%; width: 100%;">
            <v-btn color="secondary" variant="tonal" class="buttons rounded-pill my-4 py-6 px-10"
                @click="handleOpenQuestion" ref="lockButton">
                <v-icon size="small" class="mr-2">{{ lockIcon }}</v-icon>
                Open Today's Question
            </v-btn>
        </div>
        <div class="mt-8 mb-1 fs-1 opacity-0 pointer-events-none" ref="question">
            <span>Everyone thought that but i dont wanna be like that everyone. knows it</span>
            <span class="d-inline-flex align-center">
                <span class="bracket">&nbsp;[</span>
                <v-text-field class="mx-2 wordInput" variant="underlined" color="primary" density="compact"
                    min-width="180" v-model="responeInputValue" hide-details />
                <span class="bracket">]&nbsp;</span>
            </span>
            <span>yeas that my thik than the internet.</span>
        </div>
        <div class="text-center">
            <v-alert class="pointer-events-none" color="error" variant="text">
                {{ errorMessage }}&nbsp;
            </v-alert>
        </div>
        <div>
            <v-btn :color="success" variant="flat"
                :class="['buttons', 'rounded-pill', 'my-4', 'py-6', 'px-10', success ? 'showAnimation' : 'opacity-0 pointer-events-none']"
                @click="handleSendQuestion" ref="sendButton" width="250">
                <v-icon size="small" class="mr-2">{{ sendIcon }}</v-icon>
                {{ success === 'primary' ? 'SEND' : 'SENT!' }}
            </v-btn>
        </div>
    </div>

    <div>
        <div ref="responseTitle" style="position: absolute; left: 50%; transform: translateX(-50%); top: -120px; width: 100%;">
            <H1>Your response is <span class="specialTitle"> {{ responseWord }} </span></H1>
            <h2 class="secondary-font">Look the other ones responses.</h2>
        </div>
    </div>
    <div class="footer">
        <a href="https://www.linkedin.com/in/tunahan-akargul/" target="_blank" rel="noopener noreferrer">
            <v-avatar color="primary" variant="elevated" rounded="circle" size="48" class="mr-4">
                <v-icon size="large">mdi-linkedin</v-icon>
            </v-avatar>
        </a>
        <div class="d-inline-flex align-center justify-center gap-3">
            <span>© 2025</span>
            <img class="d-inline-block" style="max-width: 100px;" src="/public/TheThidayLogo.png"></img>
            <span>- thiday.com</span>
        </div>
        <a href="https://github.com/tunahan-akargul" target="_blank" rel="noopener noreferrer">
            <v-avatar color="primary" variant="flat" rounded="circle" class="ml-4" size="48">
                <v-icon size="large">mdi-github</v-icon>
            </v-avatar>
        </a>
    </div>
</template>

<style scoped>
.topSide {
    position: absolute;
    top: 100px;
    left: 30%;

}

.buttons {
    height: auto;
    font-size: 2rem;
}

.footer {
    position: absolute;
    bottom: 20px;
    left: 0;
    right: 0;
    z-index: 1;
}

@keyframes titleSlideAnimation {
    100% {
        top: 8vw;
    }
}

@keyframes titleComeAnimation {
    0% {
        top: -120px;
    }

    100% {
        top: 8vw;
    }
}

@keyframes titleGoneAnimation {
    0% {
        top: 8vw;
    }

    100% {
        top: -120px;
    }
}

@keyframes goneAnimation {
    0% {
        opacity: 1;
    }

    100% {
        opacity: 0;
    }
}

@keyframes comeAnimation {
    0% {
        opacity: 0;
    }

    100% {
        opacity: 1;
    }
}

.goneAnimation {
    animation: goneAnimation 0.5s linear forwards;
}

.showAnimation {
    animation: comeAnimation 1.5s linear 1s both;
}

.titleSlideAnimation {
    animation: titleSlideAnimation 1s ease-in-out forwards;
}

.titleGoneAnimation {
    animation: titleGoneAnimation 1s ease-in forwards;
}

.titleComeAnimation {
    animation: titleComeAnimation 1s ease-out forwards;
}

.wordInput ::v-deep input {
    color: var(--color-primary);
    font-size: var(--fs-1);
    width: 100%;
    max-width: 600px;
    text-align: center;
    border-bottom-width: 15px !important;
}

.bracket {
    color: var(--color-primary);
}
</style>