import { Star } from 'lucide-react';

interface Props {
  rating?: number;
  onClick: (number: number) => void;
}
const Rating = ({ rating, onClick }: Props) => {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          onClick={(e) => {
            e.preventDefault();
            onClick(star);
          }}
          className={`${
            star <= (rating || 0) ? 'text-yellow-400' : 'text-gray-300'
          }`}
        >
          <Star
            size={16}
            fill={star <= (rating || 0) ? 'currentColor' : 'none'}
          />
        </button>
      ))}
    </div>
  );
};

export default Rating;
