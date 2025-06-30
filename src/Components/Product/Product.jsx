// import React, { useEffect, useState } from "react";
// import ProductCard from "./ProductCard";
// import axios from 'axios';
// import styles from './Product.module.css';

// const Product = () => {
//     const [products, setProducts] = useState([]);
//     // const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         axios.get('https://fakestoreapi.com/products')
//             .then((res) => {
//                 setProducts(res.data);
//                 // setLoading(false);
//             })
//             .catch((err) => {
//                 console.error("Error fetching products:", err);
//                 setError("Failed to load products. Please try again later.");
//                 // setLoading(false);
//             });
//     }, []);

//     // if (loading) {
//     //     return <p className={styles.loading}>Loading products...</p>;
//     // }

//     if (error) {
//         return <p className={styles.error}>{error}</p>;
//     }

//     return (
//         <section className={styles.productSection}>
//             {products.map((singleProduct) => (
//                 <ProductCard renderAdd={true} product={singleProduct} key={singleProduct.id} />
//             ))}
//         </section>
//     );
// };

// export default Product;




import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard"; // Make sure path is correct
import axios from 'axios';
import styles from './Product.module.css'; // Make sure path to CSS module is correct

const Product = () => {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // Good practice to show initial loading
    const [error, setError] = useState(null);

    useEffect(() => {
        setIsLoading(true); // Set loading true at the start of fetch
        axios.get('https://fakestoreapi.com/products')
            .then((res) => {
                setProducts(res.data);
                setIsLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching products:", err);
                setError("Failed to load products. Please try again later.");
                setIsLoading(false);
            });
    }, []);

    if (isLoading) { // Changed from loading to isLoading
        return <p className={styles.loading}>Loading products...</p>;
    }

    if (error) {
        return <p className={styles.error}>{error}</p>;
    }

    if (products.length === 0 && !isLoading) { // Handle case where API returns empty array
        return <p className={styles.loading}>No products found.</p>;
    }

    return (
        <section className={styles.productSection}>
            {products.map((singleProduct) => (
                <ProductCard
                    renderAdd={true}
                    product={singleProduct}
                    key={singleProduct.id}
                    // flex={false} // Explicitly false, or rely on default
                    // renderDesc={false} // Explicitly false, or rely on default
                />
            ))}
        </section>
    );
};

export default Product;