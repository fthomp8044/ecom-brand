import React, { useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import {Form, Button, Row, Col } from 'react-bootstrap'

import {useDispatch, useSelector} from 'react-redux'
import Loader from '../../../src/components/Loader'
import Message from '../../../src/components/Message'
import FormContainer from '../components/FormContainer'
import {login} from '../actions/userActions'



function LoginScreen() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    return (
        <div>
            Login screen
        </div>
    )
}

export default LoginScreen
