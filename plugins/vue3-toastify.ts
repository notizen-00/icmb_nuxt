import Vue3Toastify, { toast,type ToastContainerOptions } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(Vue3Toastify, {
    bodyClassName: "custom-class-2",
    position: 'top-center',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    containerClassName: "my-toast",
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  } as ToastContainerOptions);

  return {
    provide: { toast },
  };
});