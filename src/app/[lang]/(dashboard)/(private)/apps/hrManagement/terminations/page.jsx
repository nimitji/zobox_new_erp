// Component Imports
import DepartmentList from '@views/apps/hrManagement/terminations'
// import { fetchBranches } from '@/app/server/actions'

// Data Imports
import { fetchDepartments } from '@/app/server/actions'

const DepartmentListApp = async () => {
  // Vars
  const data = await fetchDepartments()
    // const data = await fetchBranches()

  return <DepartmentList departmentData={data} />
}

export default DepartmentListApp
