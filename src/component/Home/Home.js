import { Fragment, useEffect } from 'react';
import ProductCard from './ProductCard';
import { FaMousePointer } from 'react-icons/fa';
import './Home.css';
import { useSelector, useDispatch } from 'react-redux';
import { getProduct } from '../../actions/productAction'
import { useNavigate } from 'react-router-dom';
import Loader from '../layout/Loader/Loader';
import MetaData from "../layout/MetaData"

// import {useAlert} from 'react-alert'
const Home = () => {
  const dispatch = useDispatch();
  const { loading, error, products, productCount } = useSelector((state) => state.products);
  console.log(loading, error, products, productCount);
  const navigate = useNavigate()
  const userName = localStorage.getItem('user')
  useEffect(() => {
    // if(error){
    //   return alert.error("Error")
    // }
    dispatch(getProduct());
  }, []);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="ECOMMERCE" />

          <div className="banner">
            <p>Welcome to Ecommerce
              {
                userName && (<span> {userName}</span>)
              }
            </p>
            <h1>FIND AMAZING PRODUCTS BELOW</h1>

            <a href="#container">
              <button>
                Scroll
              </button>
            </a>
          </div>

          <h2 className="homeHeading">Featured Products</h2>

          <div className="container" id="container">
            {products &&
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
