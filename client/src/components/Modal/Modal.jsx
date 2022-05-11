import React, { useCallback, useEffect, useState } from 'react'
import { useAuth } from '../../hooks/auth.hook'
import { useHttp } from '../../hooks/http.hook'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import { useSuccess } from '../../hooks/success.hook'
import { useError } from '../../hooks/error.hook'
import { useHistory } from 'react-router-dom'

import Styles from './Modal.module.css'

export const Modal = ({ id, component, url, heading, data, setOpen }) => {
    toast.configure({
        autoClose: 3000,
        draggable: true
    })

    const { code } = useAuth()
    const { request, loading, API_URL } = useHttp()
    const successMessage = useSuccess()
    const errorMessage = useError()
    const history = useHistory()
    const [form, setForm] = useState({})

    const postHandler = async () => {
        try {
            const posted = await request(
                `${API_URL}${url}`,
                'POST',
                { ...form },
                {
                    Authorization: `Basic ${code.hashed}`,
                }
            )
            if (posted.successful === false) {
                errorMessage(posted.messageRU)
            } else {
                successMessage(posted.messageRU)
            }
            history.push('/')
            if (component === 'report') {
                history.push(`panel/patients/${id}`)
            }
        } catch (e) {
            errorMessage(e.messageRU)
        }
    }

    const changeHandler = e => {     
        setForm({ 
            ...form, [e.target.name]: e.target.value
        })
    }

    const escHandler = useCallback((event) => {
        if(event.keyCode === 27) {
            setOpen(false)
        }
    }, [setOpen])

    useEffect(() => {
        document.addEventListener("keydown", escHandler, false)
        return () => {
            document.removeEventListener("keydown", escHandler, false)
        }
    }, [escHandler])

    return (
        <div className={Styles.modal}>
            <div className={Styles.overlay} onClick={() => setOpen(false)}></div>
            <div className={Styles.post}>
                <h3 className={Styles.title}>
                    { heading }
                    <i className={`material-icons ${Styles.icon}`} onClick={() => setOpen(false)}>close</i>
                </h3>
                <form action="#" className={Styles.body}>
                    {
                        data
                        ? data.map(({ type, name, label }, i) => {
                            return (
                                <input
                                    key={ i }
                                    type={type}
                                    className={Styles.input}
                                    name={name}
                                    placeholder={label}
                                    autoComplete="off"
                                    onChange={changeHandler}
                                />
                            )
                        }) : ''
                    }
                    <div className={Styles.button}>
                        <button
                            type="submit"
                            onClick={e => {e.preventDefault(); postHandler()}}
                            className={loading ? 'loading' : Styles.submit}
                        >
                            Создать
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
