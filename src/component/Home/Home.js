   import { Fragment, useEffect } from 'react';
import Product from './ProductCard';
import { FaMousePointer } from 'react-icons/fa';
import './Home.css';
import { useSelector, useDispatch } from 'react-redux';
import{getProduct} from '../../actions/productAction'
import Loader from '../layout/Loader/Loader';

// import {useAlert} from 'react-alert'
const Home = () => {

  // const alert=useAlert()
  const dispatch = useDispatch();
  const { loading, error, products, productCount } = useSelector((state) => state.products);

  useEffect(() => {
    // if(error){
    //   return alert.error("Error")
    // }
    // dispatch(getProduct());
  }, [dispatch,error ]);
console.log(loading)
  return (
   <Fragment>
   {
   <Fragment>
    <div className='banner'>
      <p>Welcome to Ecom</p>
      <h1>FIND AMAZING PRODUCTS BELOW</h1>
      <a href='#container'>
           <button>
          Scroll <FaMousePointer />
        </button>
      </a>
    </div>
   
    <h2 className='homeHeading'>Featured Products</h2>
    <div className='container' id='container'>
      {products && products.map((product) => <Product product={product}  key={product._id}  />)}
     
    </div>
  </Fragment>
   } 
   </Fragment>
  );
};

export default Home;
