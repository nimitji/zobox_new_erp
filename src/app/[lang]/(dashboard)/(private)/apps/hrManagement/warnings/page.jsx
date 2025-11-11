// Component Imports
import DepartmentList from '@views/apps/hrManagement/warnings'
// import { fetchBranches } from '@/app/server/actions'

// Data Imports
import { fetchWarning } from '@/app/server/actions'

const DepartmentListApp = async () => {
  // Vars
  const data = await fetchWarning()
    // const data = await fetchBranches()

  return <DepartmentList departmentData={data} />
}

export default DepartmentListApp
