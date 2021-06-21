import React, {useEffect} from 'react'
import { useDispatch, useSelector} from 'react-redux'
import { Link } from 'react-router-dom'
import { Carousel, Image} from 'react-bootstrap'
import Loader from './loader'
import Message from './Message'
import { listTopProducts } from '../actions/productActions'

function ProductCarousel() {
    const dispatch = useDispatch()

    const productTopRated = useSelector(state => state.productTopRated)
    const { error, loading, products } = productTopRated

    useEffect(() =>{
        dispatch(listTopProducts())
    }, [dispatch])
    return (
        <div>
            
        </div>
    )
}

export default ProductCarousel
