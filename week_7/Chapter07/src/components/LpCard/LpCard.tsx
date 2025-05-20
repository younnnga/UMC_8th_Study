// src/components/LpCard/LpCard.tsx
import { Lp } from "../../types/lp";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

interface LpCardProps {
  lp: Lp;
}

const LpCard = ({ lp }: LpCardProps) => {
  const navigate = useNavigate();
  const { accessToken } = useAuth();

  const handleClick = () => {
    if (!accessToken) {
      // 로그인 안 된 상태
      const confirmed = window.confirm("로그인이 필요한 서비스입니다. 로그인 페이지로 이동할까요?");
      if (confirmed) {
        navigate("/login");
      }
      return;
    }
    // 로그인 되어 있으면 상세 페이지로 이동
    navigate(`/lp/${lp.id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer"
    >
      <div className="relative aspect-square overflow-hidden group hover:scale-110 hover:shadow-xl transition-transform duration-300">
        <img
          src={lp.thumbnail}
          alt={lp.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <h3 className="text-sm font-semibold leading-tight">{lp.title}</h3>
          <div className="flex justify-between text-xs mt-2">
            <p>
              {new Date(lp.createdAt).toLocaleDateString("ko-KR", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </p>
            <p>♥ {lp.likes?.length ?? 0}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LpCard;
