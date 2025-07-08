import { getPublicWorkshops } from '../../api/customerApi';
import WorkshopCard from '../../components/WorkshopCard';
import { Workshop } from '@/types';

// The return type of the function is now explicitly Promise<Workshop[]>
async function fetchWorkshops(): Promise<Workshop[]> {
  try {
    const workshops = await getPublicWorkshops();
    return workshops;
  } catch (error) {
    console.error("Failed to fetch workshops:", error);
    return [];
  }
}

const WorkshopsPage = async () => {
  const workshops = await fetchWorkshops();

  return (
    <div>
      <h1 className="text-4xl font-bold text-center mb-8">Available Workshops</h1>
      {workshops.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {workshops.map((workshop) => (
            <WorkshopCard key={workshop.id} workshop={workshop} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No workshops available at the moment. Please check back later!</p>
      )}
    </div>
  );
};

export default WorkshopsPage;