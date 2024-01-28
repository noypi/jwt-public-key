
export const get_notify = ($q) => ({
    error(message: string) {
        $q.notify({
            message,
            color: 'negative',
            icon: 'error',
        });
    },

    success(message: string) {
        $q.notify({
            message,
            color: 'positive',
            icon: 'check',
        });
    },
});
