// Component Imports
import HiringList from '@views/apps/hrManagement/Hiring'

// Data Imports
import { fetchHiring } from '@/app/server/actions'

const HiringListApp = async () => {
  // Fetch Hiring Data
  const data = await fetchHiring()

  return <HiringList hiringData={data} />
}

export default HiringListApp
