// Component Imports
import DepartmentList from '@views/apps/hrManagement/awardTypes'
// import { fetchBranches } from '@/app/server/actions'

// Data Imports
import { fetchAwardTypes } from '@/app/server/actions'

const DepartmentListApp = async () => {
  // Vars
  const data = await fetchAwardTypes()
    // const data = await fetchBranches()

  return <DepartmentList departmentData={data} />
}

export default DepartmentListApp
