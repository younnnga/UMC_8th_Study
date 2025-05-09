interface LPCardProps {
  title: string;
  artist: string;
  imageUrl: string;
}

const LPCard = ({ title, artist, imageUrl }: LPCardProps) => {
  return (
    <div className="bg-white shadow-md rounded-xl overflow-hidden">
      <img src={imageUrl} alt={title} className="w-full h-48 object-cover" />
      <div className="p-3">
        <h3 className="font-bold">{title}</h3>
        <p className="text-sm text-gray-600">{artist}</p>
      </div>
    </div>
  );
};

export default LPCard;
