import { Drawer, LinearProgress, Grid, Badge } from '@material-ui/core';
import { AddShoppingCart } from '@material-ui/icons';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Wrapper, StyledButton } from './App.styles';
import { useAppDispatch, useAppSelector } from './app/hooks';
import Cart from './components/Cart/Cart';
import Item from './components/Item/Item';
import {
  addToCart,
  getTotalItems,
  removeFromCart,
} from './features/cart/cartSlice';
import {
  getAllProducts,
  selectAllProducts,
  selectError,
  selectIsLoading,
  selectProducts,
} from './features/product/productsSlice';
import { CartItemType } from './services/productService';

const App = () => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectIsLoading);
  const error = useAppSelector(selectError);
  const products = useSelector(selectAllProducts);
  const totalItems = useSelector(getTotalItems);

  const [cartOpen, setCartOpen] = useState(false);
  useEffect(() => {
    dispatch(getAllProducts());
  }, []);

  const handleAddToCart = (clickedItem: CartItemType) => {
    dispatch(addToCart(clickedItem));
  };

  const handleRemoveFromCart = (id: number) => {
    dispatch(removeFromCart(id));
  };

  if (isLoading) return <LinearProgress />;
  if (error) return <div>Something went wrong...</div>;
  return (
    <Wrapper>
      <Drawer anchor='right' open={cartOpen} onClose={() => setCartOpen(false)}>
        <Cart />
      </Drawer>
      <StyledButton onClick={() => setCartOpen(true)}>
        <Badge badgeContent={totalItems} color='error'>
          <AddShoppingCart />
        </Badge>
      </StyledButton>
      <Grid container spacing={3}>
        {products?.map((item) => (
          <Grid item key={item.id} xs={12} sm={4}>
            <Item item={item} handleAddToCart={handleAddToCart} />
          </Grid>
        ))}
      </Grid>
    </Wrapper>
  );
};

export default App;
