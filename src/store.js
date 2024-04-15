import { reactive, readonly } from "vue";

const store = reactive({
    flashMessage: 'Приложение загрузилось',
    flashShow: 2,
})

export const useStore = () => {
    const setFlashMessage = (message) => {
        store.flashMessage = message;
    };

    const setFlashShow = (show) => {
        store.flashShow = show;
    };

    return { store: readonly(store), setFlashMessage, setFlashShow };
}