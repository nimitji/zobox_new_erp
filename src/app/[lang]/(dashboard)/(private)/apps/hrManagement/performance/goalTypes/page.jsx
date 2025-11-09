// Component Imports
import DepartmentList from '@views/apps/hrManagement/performance/goalTypes'
// import { fetchBranches } from '@/app/server/actions'

// Data Imports
import { fetchGoalType } from '@/app/server/actions'

const DepartmentListApp = async () => {
  // Vars
  const data = await fetchGoalType()
    // const data = await fetchBranches()

  return <DepartmentList departmentData={data} />
}

export default DepartmentListApp
