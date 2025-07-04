import React, { useContext } from "react";
import Rating from "@mui/material/Rating";
import CurrencyFormat from "./CurrencyFormat"; // Assuming this is in the same directory
import styles from "./product.module.css";
import { Link } from "react-router-dom";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import { Type } from "../../Utility/action.type";

const ProductCard = ({ product, flex, renderDesc, renderAdd }) => {
  if (!product) return null;

  const { image, title, id, rating, price, description } = product;

  // eslint-disable-next-line no-unused-vars
  const [state, dispatch] = useContext(DataContext);

  const addToCart = () => {
    dispatch({
      type: Type.ADD_TO_BASKET,
      item: { image, title, id, rating, price, description, amount: 1 }, // Added amount
    });
  };

  return (
    <div className={`${styles.card} ${flex ? styles.productFlexed : ""}`}>
      {/* On detail page (flex=true), image is part of the layout, not necessarily a link to itself.
          But for consistency with grid view, keeping Link. Can be conditionally removed if needed. */}
      <Link to={`/products/${id}`} className={styles.imageLinkWrapper}>
        <div className={styles.imageContainer}>
          <img
            src={image || "https://source.unsplash.com/random/640x480/?product"}
            alt={title || "Product image"}
            className={styles.productImage}
          />
        </div>
      </Link>

      <div className={styles.content}>
        <h3 className={styles.title}>{title || "Untitled Product"}</h3>

        {/* Moved rating above description for typical Amazon layout */}
        <div className={styles.ratingAndPriceContainer}> {/* New wrapper for flex layout */}
          {rating && (rating.rate > 0 || rating.count > 0) && (
            <div className={styles.ratingContainer}>
              <Rating
                value={rating?.rate || 0}
                precision={0.1}
                readOnly
                size="small" // MUI size prop
                sx={flex ? { fontSize: "1.25rem" } : {}} // Slightly larger stars for detail view
              />
              <a href="#reviews" className={styles.ratingCount}>
                ({rating?.count || 0} ratings)
              </a>
            </div>
          )}

          <div className={styles.price}>
            <CurrencyFormat amount={price || 0} />
          </div>
        </div>


        {renderDesc && (
          <div className={styles.descriptionDetail}>
            <h4>About this item</h4>
            {/* Split description into bullet points if it contains newlines, or display as paragraph */}
            {description && typeof description === 'string' && description.includes('\n') ? (
              <ul>
                {description.split('\n').map((line, index) => (
                  line.trim() && <li key={index}>{line.trim()}</li>
                ))}
              </ul>
            ) : (
              <p>{description}</p>
            )}
          </div>
        )}

        {renderAdd && (
          <div className={styles.addToCartContainer}> {/* Wrapper for button if needed for positioning */}
            <button
              type="button"
              className={styles.addToCart}
              onClick={addToCart}
            >
              Add to Cart
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;