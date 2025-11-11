// Component Imports
import DepartmentList from '@views/apps/hrManagement/trips'
// import { fetchBranches } from '@/app/server/actions'

// Data Imports
import { fetchTrips } from '@/app/server/actions'

const DepartmentListApp = async () => {
  // Vars
  const data = await fetchTrips()
    // const data = await fetchBranches()

  return <DepartmentList departmentData={data} />
}

export default DepartmentListApp
