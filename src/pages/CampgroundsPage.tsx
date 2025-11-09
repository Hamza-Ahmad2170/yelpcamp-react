import { campgroundService } from "@/api/services";
import CampgroundCard from "@/components/CampgroundCard";
import { useQuery } from "@tanstack/react-query";

function CampgroundsPage() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["campgrounds"],
    queryFn: () => campgroundService.getAllCampgrounds(6),
    select: (data) => data.data,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error || !data) return <div>Error: {error?.message}</div>;
  console.log(data);

  return (
    <section className="mx-auto grid max-w-7xl grid-cols-3 gap-8 px-4 lg:px-8">
      {data.campgrounds.map((campground) => (
        <CampgroundCard key={campground.id} campground={campground} />
      ))}
    </section>
  );
}
export { CampgroundsPage };
