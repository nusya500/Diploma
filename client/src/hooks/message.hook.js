import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { useCallback } from "react"

export const useMessage = () => {
    return useCallback((text, type) => {
        if (text && type === 'success') {
            toast.success(text)
        } else {
            toast.error(text)
        }
    }, [])
}