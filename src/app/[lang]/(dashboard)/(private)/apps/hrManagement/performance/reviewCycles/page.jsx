// Component Imports
import DepartmentList from '@views/apps/hrManagement/performance/reviewCycles'
// import { fetchBranches } from '@/app/server/actions'

// Data Imports
import { fetchReviewCycle } from '@/app/server/actions'

const DepartmentListApp = async () => {
  // Vars
  const data = await fetchReviewCycle()
    // const data = await fetchBranches()

  return <DepartmentList departmentData={data} />
}

export default DepartmentListApp
