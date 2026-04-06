// Component Imports
import DepartmentList from '@views/apps/leaveManagement/leavetypes'
// import { fetchBranches } from '@/app/server/actions'

// Data Imports
import { fetchLeaveType } from '@/app/server/actions'

const DepartmentListApp = async () => {
  // Vars
  const data = await fetchLeaveType()
    // const data = await fetchBranches()

  return <DepartmentList departmentData={data} />
}

export default DepartmentListApp
