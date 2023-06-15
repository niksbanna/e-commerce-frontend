import { Fragment, useEffect } from 'react';
import ProductCard from './ProductCard';
import './Home.css';
import { useSelector, useDispatch } from 'react-redux';
import { getProduct } from '../../actions/productAction'
import Loader from '../layout/Loader/Loader';
import MetaData from "../layout/MetaData"
import { ToastContainer, toast } from "react-toastify";


const Home = () => {
  const dispatch = useDispatch();
  const { loading, error, products, productCount } = useSelector((state) => state.products);
  const userName = localStorage.getItem('user');
  const notifyAlert = () => {
    toast.error(`Error: ${error}`, {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };
  useEffect(() => {
    if (error) {
      notifyAlert();
    }
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
          <ToastContainer
            position="bottom-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
