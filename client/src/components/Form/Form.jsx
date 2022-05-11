import React, { useState } from 'react'
import Styles from './Form.module.css'

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import { useAuth } from '../../hooks/auth.hook'
import { useHttp } from '../../hooks/http.hook'
import { useSuccess } from '../../hooks/success.hook'
import { useError } from '../../hooks/error.hook'
import { useHistory } from 'react-router-dom'

export const Form = ({ component, data, url, set }) => {
    toast.configure({
        position: 'top-center',
        autoClose: 3000,
        draggable: true,
    })

    const { code } = useAuth()
    const { request, loading, API_URL } = useHttp()
    const successMessage = useSuccess()
    const errorMessage = useError()
    const [form, setForm] = useState({})
    const history = useHistory()

    const postHandler = async () => {
        try {
            if (component === 'createUser') {
                delete form['delete']
                delete form.user['role']
            } else if (component === 'createPatientCard') {
                delete form.patient['delete']
                delete form.address['delete']
            }
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
            if (component === 'createUser') {
                history.push('panel/profile/createUser')
            } else if (component === 'createPatientCard') {
                history.push('panel/patients/create')
            }
        } catch (e) {
            errorMessage(e.messageRU)
        }
    }

    const changeHandler = (e) => {
        if (component === 'createUser') {
            setForm(set(form, e.target.name, e.target.value))
        } else if (component === 'createPatientCard') {
            setForm(set(form, e.target.name, e.target.value))
        }
    }

    return (
        <div className={Styles.form}>
            <div className={Styles.block}>
                {data
                    ? data.map(element => {
                        return (
                            element.map(({ type, name, label, select }, i) => {
                                if (select) {
                                    return (
                                        select.map(({ name, options }, i) => {
                                            return (
                                                <div
                                                    key={i}
                                                    className={`${Styles.item} ${Styles.relative}`}
                                                >
                                                    <select
                                                        className={Styles.select}
                                                        name={name}
                                                        onChange={changeHandler}
                                                    >
                                                        {options.map((element) => {
                                                            return element
                                                                ? element.map(
                                                                      ({ label, id }, i) => {
                                                                          return label ===
                                                                              '' ? null : (
                                                                              <option
                                                                                  key={i}
                                                                                  value={id}
                                                                              >
                                                                                  {label}
                                                                              </option>
                                                                          )
                                                                      }
                                                                  )
                                                                : ''
                                                        })}
                                                    </select>
                                                    <i
                                                        className={`material-icons ${Styles.icon}`}
                                                    >
                                                        play_arrow
                                                    </i>
                                                </div>
                                            )
                                        })
                                    )
                                }
                                return (
                                    <div key={i} className={Styles.item}>
                                        <input
                                            type={type}
                                            className={Styles.input}
                                            name={name}
                                            placeholder={label}
                                            autoComplete="off"
                                            onChange={changeHandler}
                                        />
                                    </div>
                                )
                            })
                        )
                    })
                    : ''}
            </div>
            <div className={Styles.button}>
                <button
                    type="submit"
                    onClick={() => {postHandler()}}
                    className={loading ? 'loading' : Styles.submit}
                >
                    Создать
                </button>
            </div>
        </div>
    )
}
