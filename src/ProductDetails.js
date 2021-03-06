import React from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { useGlobalContext } from "./context";
import Modal from "./Modal";

const ProductDetails = () => {
  const obj = useParams();
  const id = parseInt(obj.id);
  const { state, openModal } = useGlobalContext();

  const item = state.products.find((item) => item.id === id);
  const { image, name, price, info } = item;

  const checkItem = () => {
    return state.cart.filter((item) => item.id === id).length > 0;
  };
  const addedFrom = "detailsPage";

  return (
    <>
      <div className="product-details-container">
        <h1>{name}</h1>
        <div className="product-container">
          <img src={image} alt={name} />
          <div className="product-info">
            <div className="product-title">
              <h4>{name}</h4>
              <p>${price}.00</p>
            </div>

            <div className="product-details">
              <h5>Key Information</h5>
              <div className="product-ul">
                {info.map((item, index) => {
                  return (
                    <ul key={index}>
                      <li>{item}</li>
                    </ul>
                  );
                })}
              </div>
            </div>
            <div className="product-links">
              <Link to="/products" className="btn btn-blue">
                Back To Products
              </Link>
              <button
                className={
                  checkItem() ? "btn btn-green disabled" : "btn btn-green"
                }
                onClick={() => openModal(id, addedFrom)}
              >
                {checkItem() ? "Added To Cart" : "Add to Cart"}
              </button>
            </div>
          </div>
        </div>
        {state.detailsModal && <Modal />}
      </div>
    </>
  );
};

export default ProductDetails;
