import {toast} from 'react-toastify';

export const alert = (message: string, type: 'info' | 'success' | 'warning' | 'error' ) => {
    toast(message, {
        type,
        position: "top-right",        
    });
}
