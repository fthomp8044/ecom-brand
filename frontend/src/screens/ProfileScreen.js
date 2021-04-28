import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import {Form, Button, Row, Col } from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { getUserDetails, updateUserProfile } from '../actions/userActions'
import { userUpdateProfileReducer } from '../reducers/userReducers'
import { USER_UPDATE_PROFILE_FAIL, USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'


function ProfileScreen({ history }) {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')


    const dispatch = useDispatch()



    const userDetails = useSelector(state  => state.userDetails)
    //destruct userlogin fron userDetailsReducer
    const { error, loading, user } = userDetails

    const userLogin = useSelector(state  => state.userLogin)
    const { userInfo } = userLogin

    const userUpdateProfile = useSelector(state  => state.userUpdateProfile)
    const { success } = userUpdateProfile

    // redirect the user to login if its not authenticated
    useEffect(() => {
        if (!userInfo) {
            history.push('/login')
        }else {
            // check to see if the user info data has already  been loaded
            if(!user || user.name || success){
                dispatch({type:USER_UPDATE_PROFILE_RESET})
                dispatch(getUserDetails('profile'))
            } else {
                setName(user.name)
                setEmail(user.email)
            }
        }
    }, [dispatch, history, userInfo, user, success])

    const submitHandler = (e) => {
         e.preventDefault()

         if(password != confirmPassword) {
             setMessage('Passwords do not match')
         } else {
             dispatch(updateUserProfile({
                 'id':user._id,
                 'name':name,
                 'email':email,
                 'password':password
                }))
                setMessage('')
         }
    }
    return (
        <Row>
          <Col md={3}>
                <h2>User Profile</h2>
                {message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='name'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        required
                        type='name'
                        placeholder='Enter name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        >

                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        required
                        type='email'
                        placeholder='Enter email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        >

                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='passwordConfirm'>
                    <Form.Label>Confirm Passord</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Confirm Password'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Button type='submit' variant='primarty'>
                    Update
                </Button>
            </Form>
            </Col> 

            <Col md={9}>
                <h2>My Orders</h2>
            </Col>   
        </Row>
    )
}

<<<<<<< HEAD
export default ProfileScreen
=======
export default ProfileScreen
>>>>>>> 8ed703b5daa57c2a27b843dc28b12cc0fab7857f
