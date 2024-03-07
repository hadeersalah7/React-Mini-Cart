import { useContext } from "react";
import { CreateCart } from "./store/storeContext";
export default function Product({
  id,
  image,
  title,
  price,
  description,
}) {
  const {handleAddCart} = useContext(CreateCart)
  return (
    <article className="product">
      <img src={image} alt={title} />
      <div className="product-content">
        <div>
          <h3>{title}</h3>
          <p className='product-price'>${price}</p>
          <p>{description}</p>
        </div>
        <p className='product-actions'>
          <button onClick={() => handleAddCart(id)}>Add to Cart</button>
        </p>
      </div>
    </article>
  );
}
