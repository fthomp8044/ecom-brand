import React, {useState, useEffect} from 'react'
import {Form, Button, Col} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import {savePaymentMethod} from '../actions/cartActions'

function PaymentScreen({history}) {

    const cart = useSelector(state => state.cart)
    const {shippingAddress} = cart

    const dispatch = useDispatch()

<<<<<<< HEAD
    const [paymentMethod, setPaymentMethod] =useState('PayPal')
=======
    const [paymentMethod, setPaymentMethod] = useState('PayPal')
>>>>>>> 8ed703b5daa57c2a27b843dc28b12cc0fab7857f

    if(!shippingAddress.address){
        history.push('/shipping')
    }

    const submitHandler = (e) =>{
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
<<<<<<< HEAD
        history.push('/placeholder')
=======
        history.push('/placeorder')
>>>>>>> 8ed703b5daa57c2a27b843dc28b12cc0fab7857f
    }

    return (
        <FormContainer>
            <CheckoutSteps step1 step2 step3/>

            <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label as='legend'>Select Method</Form.Label>
                    <Col>
                        <Form.Check
                            type='radio'
                            label='Paypal or Credit Card'
                            id='paypal'
                            name='paymentMethod'
                            checked
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        >

                        </Form.Check>
                    </Col>
                </Form.Group>

                <Button type='submit' vaiant='primary'>Continue</Button>
            </Form>

            
        </FormContainer>
    )
}

<<<<<<< HEAD
export default PaymentScreen
=======
export default PaymentScreen
>>>>>>> 8ed703b5daa57c2a27b843dc28b12cc0fab7857f
