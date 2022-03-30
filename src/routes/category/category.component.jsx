import { useParams } from "react-router-dom";
import { useContext, useState, useEffect, Fragment } from "react";
import { CategoriesContext } from "../../contexts/categories.context";
import ProductCard from "../../components/product-card/product-card.component";
import "./category.styles.scss";




/* 
useParams allows us to get the URL parameter as an object.
*/

const Category = () => {
  // Get category parameter from URL
  const { category } = useParams();

  // Get our categories data from context (which gets them from firebase)
  const { categoriesMap } = useContext(CategoriesContext);

  /* 
  We could say here const products = categoriesMap[category], 
  but this will happen every time this component re-renders.
  So instead we will use useState and useEffect. Bc only time
  we want to change these
  
  The only time we want to change these is if the category value changes
  or if categoriesMap changes.
  */

  /* 
  The app broke here because categoriesMap, which is retrieved asynchronously, 
  is still undefined by the time categoriesMap[category] is invoked below.
  So we need to build in a safeguard.
  In our code nested in the div below, we add 'products &&' to the beginning
  to say to only render products if it is defined.
  Then in our useState call we give it categoriesMap instead of an empty array
  because we know that it is going to be an empty array by default as well.
  */
  const [products, setProducts] = useState(categoriesMap[category]);

  // Whenever category and categoriesMap changes, do this:
  useEffect(() => {
    setProducts(categoriesMap[category]);
  }, [category, categoriesMap]);

  return (
    <Fragment>
      <h2 className="category-title">{category.toUpperCase()}</h2>
      <div className="category-container">
        {products &&
          products.map((product) => (
          <ProductCard key={product.id} product={product}></ProductCard>
        ))}
      </div>
    </Fragment>
  );
};

export default Category;
