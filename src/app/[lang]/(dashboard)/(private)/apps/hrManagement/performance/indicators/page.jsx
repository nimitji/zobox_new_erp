// Component Imports
import DepartmentList from '@views/apps/hrManagement/performance/indicators'
// import { fetchBranches } from '@/app/server/actions'

// Data Imports
import { fetchIndicator } from '@/app/server/actions'

const DepartmentListApp = async () => {
  // Vars
  const data = await fetchIndicator()
    // const data = await fetchBranches()

  return <DepartmentList departmentData={data} />
}

export default DepartmentListApp
