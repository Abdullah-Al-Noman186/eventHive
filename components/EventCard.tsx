import Link from "next/link";

interface Props {
  event: {
    _id: string;
    title: string;
    shortDescription: string;
    date: string;
    venue: string;
    price?: number;
    rating?: number;
    imageUrl?: string;
    category: string;
  };
}

export default function EventCard({ event }: Props) {
  const rating = event.rating ?? 0;
  const price = event.price ?? 0;

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col">
      <img
  src={event.imageUrl || "https://placehold.co/400x200"}
  alt={event.title}
  className="w-full h-48 object-cover"
  onLoad={() => console.log("Loaded:", event.title)}
  onError={(e) => {
    console.log("Failed:", event.title);
    console.log("URL:", event.imageUrl);
    console.log(e);
  }}
/>
     

      <div className="p-4 flex flex-col flex-1">
        <span className="text-xs text-black font-semibold uppercase tracking-wide">
          {event.category}
        </span>

        <h3 className="font-bold text-green-500 text-lg mt-1 leading-tight line-clamp-1">
          {event.title}
        </h3>

        <p className="text-gray-500 text-sm mt-1 line-clamp-2">
          {event.shortDescription}
        </p>

        <div className="mt-3 text-xs text-black space-y-1">
          <div>📅 {event.date}</div>
          <div>📍 {event.venue}</div>
        </div>

        <div className="flex items-center text-black justify-between mt-4 pt-3 border-t">
          <span
            className={`font-bold text-sm ${
              price === 0 ? "text-green-500" : "text-accent"
            }`}
          >
            {price === 0 ? "Free" : `$${price}`}
          </span>

          <span className="text-yellow-400 text-sm">
            {"★".repeat(Math.round(rating))}
            {"☆".repeat(5 - Math.round(rating))}{" "}
            {rating.toFixed(1)}
          </span>
        </div>

        <Link
          href={`/events/${event._id}`}
          className="mt-4 block text-center bg-blue-800 text-white py-2 rounded-xl text-sm font-semibold hover:opacity-90 transition"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}