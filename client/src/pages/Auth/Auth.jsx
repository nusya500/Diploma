import React, { useState, useEffect, useContext } from 'react'
import Styles from "./Auth.module.css"
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import { useHttp } from "../../hooks/http.hook"
import { AuthContext } from '../../context/AuthContext'
import { useMessage } from '../../hooks/message.hook'

const Auth = () => {
    toast.configure({
        autoClose: 3000,
        draggable: true
    })

    const auth = useContext(AuthContext)
    const message = useMessage()
    const { loading, request, error, clearError } = useHttp()
    const [loginForm, setLoginForm] = useState({
        login: '',
        password: ''
    })
    const [regForm, setRegForm] = useState({
        login: '',
        password: '',
        fullname: '',
        email: '',
        age: ''
    })

    const [show, setShow] = useState(false)

    useEffect(() => {
        message(error, 'error')
        clearError()
    }, [message, error, clearError])

    const showBlock = e => {
        e.preventDefault()
        setShow(!show)
    }

    const loginChangeHandler = e => {
        setLoginForm({ ...loginForm, [e.target.name]: e.target.value })
    }

    const regChangeHandler = e => {
        setRegForm({ ...regForm, [e.target.name]: e.target.value })
    }

    const registerHandler = async (e) => {
        e.preventDefault()
        if (regForm.login !== "" || regForm.password !== "" || regForm.fullname !== '' || regForm.email !== '' || regForm.age !== '') {
            try {
                const data = await request("/api/auth/register", "POST", { ...regForm })
                message(data.message, 'success')
                setShow(false)
            } catch (e) {}
        } else {
            message("Inputs should not be empty", 'error')
        }

        localStorage.setItem('guessed', 0)
    }
    
    const loginHandler = async (e) => {
        e.preventDefault()
        if (loginForm.login !== "" || loginForm.password !== "") {
            try {
                const data = await request("/api/auth/login", "POST", { ...loginForm })
                auth.login(data.token, data.userId)
            } catch (e) {}
        } else {
            message("Inputs should not be empty", 'error')
        }
    }

    console.log(regForm)
    console.log(loginForm)

    const loginObj = [
        { id: "login", name: "Логин" },
        { id: "password", name: "Пароль" }
    ]

    const regObj = [
        { id: "login", name: "Логин" },
        { id: "password", name: "Пароль" },
        { id: "fullname", name: "Полное имя" },
        { id: "email", name: "Email" },
        { id: "age", name: "Возраст" }
    ]

    const loginItems = loginObj.map(({id, name, text}) => {
        return(
            <div key={ id } className={Styles.inputBlock}>
                <input type={id === "password" ? "password" : "text"} 
                    className={Styles.input} 
                    name={ id }
                    autoComplete="off"
                    placeholder={ name }
                    onChange={loginChangeHandler} />
                <label htmlFor={ id } className={Styles.label}>{ name }</label>
                { show ? <p className={Styles.warn}>{ text }</p> : <span></span> }
            </div>
        )
    })

    const regItems = regObj.map(({id, name, text}) => {
        return(
            <div key={ id } className={Styles.inputBlock}>
                <input type={id === "password" ? "password" : id === 'age' ? 'number' : "text"} 
                    className={Styles.input} 
                    name={ id }
                    autoComplete="off"
                    placeholder={ name } 
                    onChange={regChangeHandler} />
                <label htmlFor={ id } className={Styles.label}>{ name }</label>
            </div>
        )
    })

    return(
        <div className={Styles.block}>
            <div className={!show ? Styles.page : `${Styles.page} ${Styles.hidden}`}>
                <h1 className={Styles.heading}>Вход</h1>
                <form action="#" className={Styles.form} id="form">
                    { loginItems }
                </form>
                <p className={Styles.signUp}>{"Ещё не зарегистрированы?"}{" "}
                    <a 
                        href="/" 
                        className={Styles.sign}
                        onClick={showBlock}>Создать</a>
                </p>
                <div className={Styles.buttons}>
                    <a
                        href="/"
                        className={loading ? 'loading' : Styles.btn}
                        onClick={loginHandler}>{loading ? "" : "Войти"}</a>
                </div>
            </div>
            <div className={show ? Styles.page : `${Styles.page} ${Styles.hidden}`}>
                <h1 className={Styles.heading}>Регистрация</h1>
                <form action="#" className={Styles.form}>
                    { regItems }
                </form>
                <div className={Styles.buttons}>
                    <a 
                        href="/"
                        style={{marginBottom: '15px'}}
                        className={loading ? 'loading' : Styles.btn}
                        onClick={registerHandler}>{loading ? "" : "Создать"}</a>
                </div>
                <p className={`${Styles.signUp} ${Styles.mb}`}>{"Или вернуться в"}{" "}
                    <a 
                        href="/" 
                        className={Styles.sign}
                        onClick={showBlock}>Войти</a>
                </p>
            </div>
        </div>
    )
}

export default Auth

