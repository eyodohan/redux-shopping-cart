// Styles
import { Wrapper } from './Cart.styles';
// import CartItem from '../CartItem/CartItem';
// Types
import { CartItemType } from '../../services/productService';
import CartItem from '../CartItem/CartItem';
import { useSelector } from 'react-redux';
import { selectCartItems } from '../../features/cart/cartSlice';

const Cart: React.FC = () => {
  const cartItems = useSelector(selectCartItems);
  const calculateTotal = (items: CartItemType[]) =>
    items.reduce((acc: number, item) => acc + item.amount * item.price, 0);

  return (
    <Wrapper>
      <h2>Your shopping cart</h2>
      {cartItems.length === 0 ? <p>No items in cart</p> : null}
      {cartItems.map((item) => (
        <CartItem key={item.id} item={item} />
      ))}
      <h2>Total: ${calculateTotal(cartItems).toFixed(2)}</h2>
    </Wrapper>
  );
};

export default Cart;
