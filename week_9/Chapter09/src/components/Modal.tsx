import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../store/store';
import { closeModal } from '../slices/ModalSlice';
import { clearCart } from '../slices/cartSlice'; // 기존 action

const Modal = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state: RootState) => state.modal.isOpen);

  if (!isOpen) return null;

  const handleCancel = () => {
    dispatch(closeModal());
  };

  const handleConfirm = () => {
    dispatch(clearCart());
    dispatch(closeModal());
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-xl p-6 w-80 text-center">
        <h2 className="text-xl font-semibold mb-4">정말 삭제하겠습니까?</h2>
        <p className="text-sm text-gray-600 mb-6">이 작업은 되돌릴 수 없습니다.</p>
        <div className="flex justify-center gap-4">
          <button
            onClick={handleCancel}
            className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
          >
            아니요
          </button>
          <button
            onClick={handleConfirm}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            네
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
