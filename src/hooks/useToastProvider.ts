import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ToastProvider = (type: string, content: string, idLoading?: string, limit?: number, customClassName?: string) => {
    let notify;
    const toastConfig: any = {
        position: 'top-right',
        style: { top: '1vw', right: '1vw', fontWeight: 'bold' },
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        className: customClassName,
    };

    switch (type) {
        case 'success':
            notify = () => toast.success(content, { ...toastConfig });
            return notify();
        case 'warning':
            notify = () => toast.warning(content, { ...toastConfig });
            return notify();
        case 'error':
            notify = () => toast.error(content, { ...toastConfig });
            return notify();
        case 'custom':
            notify = () => toast(content, { ...toastConfig });
            return notify();
        case 'loading':
            const id = toast.loading(content, { ...toastConfig });
            return id;
        case 'update success':
            return toast.update(idLoading!, {
                render: `${content}`,
                type: 'success',
                isLoading: false,
                ...toastConfig,
            });
        case 'update reject':
            return toast.update(idLoading!, {
                render: `${content}`,
                type: 'error',
                isLoading: false,
                ...toastConfig,
            });
        default:
            return null;
    }
};

export default ToastProvider;
