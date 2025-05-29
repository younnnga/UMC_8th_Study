import { useCartActions, useCartInfo } from '../hooks/useCartstore';
import CartItem from './CartItem'


const CartList = () => {
  const {cartItems} = useCartInfo();
  const { openModal } = useCartActions(); // ✅ openModal 사용


  const handleAllClearButton = () => {
    openModal(); // ✅ 모달 열기
  };

  return (
    <div className='flex flex-col items-center justify-center'>
      {cartItems.length === 0 && (
        <div className='my-10'>
          <p className='text-2xl font-semibold'>장바구니가 비어있습니다.</p>
        </div>
      )}
      <ul>
        {cartItems.map((item) => (
          <CartItem key={item.id} lp={item}/>
        ))}
      </ul>
      <button
        onClick={handleAllClearButton}
        className='p-4 border rounded-md my-10'
      >   
        전체삭제
      </button>
    </div>
  );
};

export default CartList
