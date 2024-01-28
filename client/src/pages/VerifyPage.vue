<template>
  <q-card class="q-ma-lg q-pa-md">
        <q-btn label="verify from app one" class="q-mt-md" @click="onverify(3010)" />
        <q-btn label="verify from app two" class="q-mt-md" @click="onverify(3020)" />
  </q-card>
</template>

<script setup lang="ts">
import { useApp } from 'src/stores/app';
import { useUser } from 'src/stores/user';

const { $notify } = useApp();
const $user = useUser();

async function onverify(port: number) {
    const url = `http://localhost:${port}/user/info/${$user.username}`;

    try {
        const data = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${$user.access_token}`,
            },
        }).then(async response => {
            const json = await response.json();
            if (response.ok) {
                return json;
            }

            throw json;
        });

        console.log('response data', { data });
        $notify.success('verified');
    }
    catch(error) {
        console.error({ error });
        $notify.error(error?.message ?? error);
    }

}
</script>
