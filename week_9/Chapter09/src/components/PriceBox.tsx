import { useSelector } from 'react-redux';
import { useDisPatch } from '../hooks/useCustomRedux';
import { openModal } from '../slices/ModalSlice';

const PriceBox = () => {
  const { total } = useSelector((state) => state.cart);
  const dispatch = useDisPatch();

  const handleInitializeCart = () => {
    dispatch(openModal());
  };

  return (
    <div className="p-12 flex justify-end">
      <button
        onClick={handleInitializeCart}
        className="border p-4 rounded-md cursor-pointer"
      >
        전체삭제
      </button>
      <div>총 가격: {total} 원</div>
    </div>
  );
};

export default PriceBox;
