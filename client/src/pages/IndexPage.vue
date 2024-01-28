<template>
  <q-card class="q-ma-lg q-pa-md">
        <q-input v-model="username" label="username" />
        <q-input v-model="password" label="password" />
        <q-btn label="submit to app one" class="q-mt-md" @click="onsubmit(3010)" />
        <q-btn label="submit to app two" class="q-mt-md" @click="onsubmit(3020)" />
  </q-card>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useApp } from 'src/stores/app';
import { useUser } from 'src/stores/user';

const { $notify } = useApp();
const $user = useUser();
const $router = useRouter();

const username = ref('');
const password = ref('');

async function onsubmit(port: number) {
    const url = `http://localhost:${port}/auth/login`;
    const content = {
        username: username.value,
        password: password.value,
    };

    try {
        const data = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(content),
        }).then(async response => {
            const json = await response.json();
            if (response.ok) {
                return json;
            }

            throw json;
        });

        console.log('response data', { data });
        $user.access_token = data.access_token;
        $user.username = data.username;

        $router.push('/verify');
    }
    catch(error) {
        console.error({ error });
        $notify.error(error?.message ?? error);
    }

}
</script>
