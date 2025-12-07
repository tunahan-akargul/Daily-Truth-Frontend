<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const projectName = 'ThiDay'
const lockIcon = ref('mdi-lock')
const clockIcon = ref('mdi-clock')
const lockButton = ref(null)
const welcomeTitle = ref(null)
const question = ref(null)
const sendButton = ref(null)
const responseWord = ref('')
const responseInputValue = ref('')
const errorMessage = ref('')
const sendIcon = ref('mdi-send')
const isSent = ref(false)
const alreadyResponse = ref(false)

onMounted(async () => {
    responseWord.value = await handleGetResponse()
    if (responseWord.value != 'Not found any word' && responseWord.value != 'Unable to load word...') {
        alreadyResponse.value = true
        router.push("")
    }
})

const buttonColor = computed(() => {
    if (isSent.value) return 'success'
    if (lockIcon.value === 'mdi-lock-open') return 'primary'
    return ''
})

const applyAnimation = (element, animationClass, additionalClasses = []) => {
    if (!element) return
    
    element.classList.remove('goneAnimation', 'showAnimation', 'titleSlideAnimation', 'titleGoneAnimation', 'titleComeAnimation')
    void element.offsetWidth
    element.classList.add(animationClass, ...additionalClasses)
}

const handleOpenQuestion = () => {
    lockIcon.value = 'mdi-lock-open'
    
    const btnEl = lockButton.value?.$el
    applyAnimation(btnEl, 'goneAnimation', ['pointer-events-none'])
    
    applyAnimation(welcomeTitle.value, 'titleSlideAnimation')
    
    const questionEl = question.value
    if (questionEl) {
        questionEl.classList.remove('opacity-0', 'pointer-events-none')
        applyAnimation(questionEl, 'showAnimation', ['pointer-events-auto'])
    }
    
    const sendBtnEl = sendButton.value?.$el
    if (sendBtnEl) {
        sendBtnEl.classList.remove('opacity-0', 'pointer-events-none')
        applyAnimation(sendBtnEl, 'showAnimation', ['pointer-events-auto'])
    }
}

const handleSendQuestion = async () => {
    const trimmedValue = responseInputValue.value.trim()
    
    if (!trimmedValue) {
        errorMessage.value = 'Please enter a word.'
        return
    }
    
    try {
        const response = await fetch(`/api/post-word`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text: trimmedValue })
        });
        
        if (response.ok) {
            await successMovements()
        } else {
            const errorData = await response.json().catch(() => null);
            
            if (errorData?.message) {
                errorMessage.value = `Error: ${errorData.message}`
            } else if (response.status === 400) {
                errorMessage.value = 'Bad Request: Check the data format or required fields.'
            } else {
                errorMessage.value = `Send failed (${response.status}): ${response.statusText || 'Please try again.'}`
            }
        }
    } catch (error) {
        if (error.name === 'TypeError' && error.message.includes('fetch')) {
            errorMessage.value = 'Unable to connect to server. Please check your connection and try again.'
        } else {
            errorMessage.value = 'Send request failed. Please try again.'
        }
    }
}

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

const successMovements = async () => {
    errorMessage.value = ''
    responseInputValue.value = ''
    sendIcon.value = 'mdi-check'
    isSent.value = true
    
    responseWord.value = await handleGetResponse()
    
    setTimeout(() => {
        const btnEl = sendButton.value?.$el
        applyAnimation(btnEl, 'goneAnimation', ['pointer-events-none'])
        applyAnimation(question.value, 'goneAnimation', ['pointer-events-none'])
        applyAnimation(welcomeTitle.value, 'titleGoneAnimation')

        setTimeout(() => {
            router.push('/top')
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
        <div v-if="!alreadyResponse" style="position: absolute; left: 50%; transform: translateX(-50%); top: 50%; width: 100%;">
            <v-btn  color="secondary" variant="tonal" class="buttons rounded-pill my-4 py-6 px-10"
                @click="handleOpenQuestion" ref="lockButton">
                <v-icon size="small" class="mr-2">{{ lockIcon }}</v-icon>
                Open Today's Question
            </v-btn>
        </div>
        <div v-if="alreadyResponse" style="position: absolute; left: 50%; transform: translateX(-50%); top: 50%; width: 100%;">
            <v-btn  color="secondary" variant="tonal" class="buttons rounded-pill my-4 py-6 px-10"
                @click="router.push('/top')" ref="lockButton">
                <v-icon size="small" class="mr-2">{{ clockIcon }}</v-icon>
                You're early! Look at the other responses.
            </v-btn>
        </div>
        <div class="mt-8 mb-1 fs-1 opacity-0 pointer-events-none" ref="question">
            <span>Everyone thought that but i dont wanna be like that everyone. knows it</span>
            <span class="d-inline-flex align-center">
                <span class="bracket">&nbsp;[</span>
                <v-text-field class="mx-2 wordInput" variant="underlined" color="primary" density="compact"
                    min-width="180" v-model="responseInputValue" hide-details />
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
            <v-btn :color="buttonColor" variant="flat"
                :class="['buttons', 'rounded-pill', 'my-4', 'py-6', 'px-10', buttonColor ? 'showAnimation' : 'opacity-0 pointer-events-none']"
                @click="handleSendQuestion" ref="sendButton" width="250">
                <v-icon size="small" class="mr-2">{{ sendIcon }}</v-icon>
                {{ isSent ? 'SENT!' : 'SEND' }}
            </v-btn>
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
            <img class="d-inline-block" style="max-width: 100px;" src="/TheThidayLogo.png"></img>
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