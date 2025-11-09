// Component Imports
import DepartmentList from '@views/apps/hrManagement/performance/employeeGoals'
// import { fetchBranches } from '@/app/server/actions'

// Data Imports
import { fetchEmployeeGoal } from '@/app/server/actions'

const DepartmentListApp = async () => {
  // Vars
  const data = await fetchEmployeeGoal()
    // const data = await fetchBranches()

  return <DepartmentList departmentData={data} />
}

export default DepartmentListApp
