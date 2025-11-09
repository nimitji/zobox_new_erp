// Component Imports
import DepartmentList from '@views/apps/attendanceManagement/shift'
// import { fetchBranches } from '@/app/server/actions'

// Data Imports
import { fetchShift } from '@/app/server/actions'

const DepartmentListApp = async () => {
  // Vars
  const data = await fetchShift()
    // const data = await fetchBranches()

  return <DepartmentList departmentData={data} />
}

export default DepartmentListApp
