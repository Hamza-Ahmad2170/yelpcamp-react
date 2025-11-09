import type { Campground } from "@/api/services/campground/campground.types";
import { Badge } from "./ui/badge";
import { Star } from "lucide-react";
import LocationPin from "@/assets/icon/location-pin.svg?react";
import { Button } from "./ui/button";
import { Link } from "react-router";

interface Props {
  campground: Campground;
}

function CampgroundCard({ campground }: Props) {
  return (
    <div className="grid grid-rows-[auto_1fr] overflow-hidden rounded-2xl bg-white shadow-lg transition-shadow hover:shadow-2xl">
      <div className="relative">
        <img
          src={campground.imageUrl}
          alt={campground.title}
          className="h-64 w-full object-cover"
        />
        <Badge
          className="text-forest-700 absolute top-4 right-4 border-0 px-3 py-1 text-sm font-bold opacity-90"
          variant="secondary"
        >
          ${campground.price}/night
        </Badge>
      </div>
      <div className="grid grid-rows-[auto_auto_1fr_auto] gap-3 p-6">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-xl font-bold text-gray-900 capitalize">
            {campground.title}
          </h3>
          <div className="flex items-center gap-1 whitespace-nowrap">
            <Star
              className="fill-yellow-400 text-white"
              size={22}
              strokeWidth={1}
            />
            <span className="font-medium text-gray-700">
              {campground.avgRating}
            </span>
          </div>
        </div>
        <p className="flex h-fit items-center gap-2 text-gray-600">
          <LocationPin className="fill-forest-600 h-6 w-3 text-white" />
          {campground.location}
        </p>
        <p className="line-clamp-3 text-gray-700">{campground.description}</p>
        <Button
          asChild
          variant="forest"
          className="h-12 w-full rounded-lg text-base font-semibold"
        >
          <Link to={`/campgrounds/${campground.id}`}>View Details</Link>
        </Button>
      </div>
    </div>
  );
}
export default CampgroundCard;
