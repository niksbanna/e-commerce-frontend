import React, { useEffect, Fragment, useState } from "react";
import "./ProductDetails.css";
import { useSelector, useDispatch } from "react-redux";
import { getProductDetails, getProduct } from "../../actions/productAction.js";
import { useParams } from "react-router-dom";
import ReviewCard from "./ReviewCard.js";
import Loader from "../layout/Loader/Loader";
import { Rating } from "@material-ui/lab";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@material-ui/core";

const ProductDetails = () => {
  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const decreaseQuantity = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const addToCartHandler = () => {
    alert("Item Added To Cart");
  };

  const submitReviewToggle = () => {
    setOpen(!open);
  };

  const reviewSubmitHandler = () => {
    const myForm = new FormData();
    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("productId", id);

    setOpen(false);
  };

  const { id } = useParams();
  const dispatch = useDispatch();
  const { product, error, loading } = useSelector(
    (state) => state.productDetails
  );

  const options = {
    size: "large",
    name: "product-rating", // Unique name for the Rating component
    value: parseInt(product.ratings),
    readOnly: true,
    precision: 0.5,
  };

  useEffect(() => {
    if (error) {
      return alert(error);
    }

    dispatch(getProduct());
    dispatch(getProductDetails(id));
  }, [dispatch, error, id]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="ProductDetails">
            <div>
              <div>
                {product.images &&
                  product.images.map((item, i) => (
                    <img
                      className="CarouselImage"
                      key={i}
                      src={item.url}
                      alt={`${i} Slide`}
                    />
                  ))}
              </div>
            </div>

            <div>
              <div className="detailsBlock-1">
                <h2>{product.name}</h2>
                <p>Product # {product._id}</p>
              </div>
              <div className="detailsBlock-2">
                <Rating {...options} />
                <span className="detailsBlock-2-span">
                  {" "}
                  ({product.numOfReviews} Reviews)
                </span>
              </div>
              <div className="detailsBlock-3">
                <h1>{`₹${product.price}`}</h1>
                <div className="detailsBlock-3-1">
                  <div className="detailsBlock-3-1-1">
                    <button onClick={decreaseQuantity}>-</button>
                    <input readOnly type="number" value={quantity} />
                    <button onClick={increaseQuantity}>+</button>
                  </div>
                  <button onClick={addToCartHandler}>Add To Cart</button>
                </div>
                <p>
                  <b
                    className={product.Stock < 1 ? "redColor" : "greenColor"}
                  >
                    {product.Stock < 1 ? "OutOfStock" : "InStock"}
                  </b>
                </p>
              </div>

              <div className="detailsBlock-4">
                <p>{product.description}</p>
              </div>

              <button className="submitReview" onClick={submitReviewToggle}>
                Submit Review
              </button>
            </div>
          </div>

          <h3 className="reviewsHeading">REVIEWS</h3>

          <Dialog
            aria-labelledby="simple-dialog-title"
            open={open}
            onClose={submitReviewToggle}
          >
            <DialogTitle>Submit Review</DialogTitle>
            <DialogContent className="submitDialog">
              <Rating
                name="review-rating" // Unique name for the Rating component in the dialog
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                size="large"
              />
              <textarea
                className="submitDialogTextArea"
                cols="30"
                rows="5"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </DialogContent>
            <DialogActions>
              <Button onClick={submitReviewToggle} color="secondary">
                Cancel
              </Button>
              <Button onClick={reviewSubmitHandler} color="primary">
                Submit
              </Button>
            </DialogActions>
          </Dialog>

          {product.reviews && product.reviews.length > 0 ? (
            <div className="reviews">
              {product.reviews.map((review) => (
                <ReviewCard key={review._id} review={review} />
              ))}
            </div>
          ) : (
            <p className="noReviews">No Reviews Yet</p>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default ProductDetails;
