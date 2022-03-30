import ProductCard from '../product-card/product-card.component';
import './category-preview.styles.scss'

import { Link } from 'react-router-dom';

const CategoryPreview = ({ title, products }) => {
  return (
    <div className='category-preview-container'>
      <h2>
        {/* span inside h2 because it becomes clickable. So we want to make sure
        this is only clickable on the text and not the h2. We'll use flexbox so the h2
        will span the entire width of the page and we don't want all that to be clickable
        */}
        <Link className='title' to={title}>{title.toUpperCase()}</Link>
      </h2>
      <div className='preview'>
        {
          // underscore is saying we want to ignore the product
          products.filter((_, idx) => idx < 4)
          .map((product) => 
          <ProductCard key={product.id} product={product} />
          )
        }
      </div>
    </div>
  )
}

export default CategoryPreview;