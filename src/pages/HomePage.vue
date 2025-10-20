<script setup>
    import { ref } from 'vue';
    import { useRouter } from 'vue-router';

    const router = useRouter();

    const projectName = 'ThiDay';
    const lockIcon = ref('mdi-lock');
    const lockButton = ref(null)
    const title = ref(null)
    const question = ref(null)
    const sendButton = ref(null)
    const questionValue = ref('')
    const errorMessage = ref('')

    const handleOpenQuestion = () => {
        lockIcon.value = 'mdi-lock-open';
        const btnEl = lockButton.value?.$el
        if (btnEl) {
            btnEl.classList.remove('goneAnimation')
            void btnEl.offsetWidth
            btnEl.classList.add('goneAnimation','pointer-events-none')
        }

        const titleEl = title.value
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
    }

    const handleSendQuestion = () => {
        console.log(questionValue.value)
        if (questionValue.value.trim() === '' || questionValue.value.trim() === null || questionValue.value.trim() === undefined) {
            console.log("ow its bad");
            errorMessage.value = 'Please enter a word.'
        } else {
            errorMessage.value = ''
        }
    }
</script>

<template>
    <div>
        <div ref="title" style="position: absolute; left: 50%; transform: translateX(-50%); top: 37%; width: 100%;">
            <H1>Welcome to  <span class="specialTitle"> {{ projectName }} </span></H1>
            <h2 class="secondary-font">Response a Question Thi Day</h2>
        </div>
    </div>
    <div style="position: absolute; left: 50%; transform: translateX(-50%); top: 50%; width: 100%;">
        <v-btn 
            color="secondary" 
            variant="tonal" 
            class="buttons rounded-pill my-4 py-6 px-10"
            @click="handleOpenQuestion"
            ref="lockButton">
            <v-icon size="small" class="mr-2">{{ lockIcon }}</v-icon>
            Open Today's Question
        </v-btn>
    </div>
    <div class="mt-8 mb-1 fs-1 opacity-0 pointer-events-none" ref="question">
        <span>Everyone thought that but i dont wanna be like that everyone. knows it</span>
        <span class="d-inline-flex align-center">
        <span class="bracket">&nbsp;[</span>
        <v-text-field
            class="mx-2 wordInput"
            variant="underlined"
            color="primary"
            density="compact"
            min-width="180"
            v-model="questionValue"
            hide-details
        />
        <span class="bracket">]&nbsp;</span>
        </span>
        <span>yeas that my thik than the internet.</span>
    </div>
    <div class="text-center">
        <v-alert 
            class="pointer-events-none"
            color="error" 
            variant="text">
            {{errorMessage}}&nbsp;
        </v-alert>
    </div>
    <div>
        <v-btn 
            color="primary" 
            variant="flat" 
            class="buttons rounded-pill my-4 py-6 px-10 opacity-0 pointer-events-none"
            @click="handleSendQuestion"
            ref="sendButton">
            <v-icon size="small" class="mr-2">mdi-send</v-icon>
            SEND
        </v-btn>
    </div>
    <div class="footer">
        <a 
        href="https://www.linkedin.com/in/tunahan-akargul/" 
        target="_blank" 
        rel="noopener noreferrer">
            <v-avatar
            color="primary"
            variant="elevated" 
            rounded="circle" size="48" 
            class="mr-4">
                <v-icon size="large">mdi-linkedin</v-icon>
            </v-avatar>
        </a>
        <div class="d-inline-flex align-center justify-center gap-3">
            <span>© 2025</span>
            <img class="d-inline-block" style="max-width: 100px;" src="/public/TheThidayLogo.png"></img>
            <span>- thiday.com</span>
        </div>
        <a 
        href="https://github.com/tunahan-akargul" 
        target="_blank" 
        rel="noopener noreferrer">
            <v-avatar 
            color="primary" 
            variant="flat" 
            rounded="circle" 
            class="ml-4"
            size="48">
                <v-icon size="large">mdi-github</v-icon>
            </v-avatar>
        </a>
    </div>
</template>

<style scoped>
    .topSide{
        position: absolute;
        top: 100px;
        left: 30%;
        
    }
    .buttons{
        height: auto;
        font-size: 2rem;
    }
    .footer{
        position: absolute;
        bottom: 20px;
        left: 0;
        right: 0;
        z-index: 1;
    }
    @keyframes titleSlideAnimation{
        100%{
            top: 8vw;
        }
    }
    @keyframes goneAnimation{
        0%{
            opacity: 1;
        }
        100%{
            opacity: 0;
        }
    }
    @keyframes comeAnimation{
        0%{
            opacity: 0;
        }
        100%{
            opacity: 1;
        }
    }
    .goneAnimation{
        animation: goneAnimation 0.5s linear forwards;
    }
    .showAnimation{
        animation: comeAnimation 1.5s linear 1s both;
    }
    .titleSlideAnimation{
        animation: titleSlideAnimation 1s ease-in-out forwards;
    }

    .wordInput ::v-deep input {
        color: var(--color-primary);
        font-size: var(--fs-1);
        width: 100%;
        max-width: 600px;
        text-align: center;
        border-bottom-width: 15px !important;
    }
    .bracket{
        color: var(--color-primary);
    }
</style>