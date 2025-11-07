import DepartmentList from '@views/apps/hrManagement/performance/employeeReviews/view'
// import { fetchBranches } from '@/app/server/actions'

// Data Imports
import { fetchEmployeeReviewCycle } from '@/app/server/actions'

const DepartmentListApp = async () => {
  // Vars
  const data = await fetchEmployeeReviewCycle()
    // const data = await fetchBranches()

  return <DepartmentList departmentData={data} />
}

export default DepartmentListApp
