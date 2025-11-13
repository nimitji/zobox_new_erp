// Component Imports
import DepartmentList from '@views/apps/payrollManagement/employeesalary'
// import { fetchBranches } from '@/app/server/actions'

// Data Imports
import { fetchAttendancePolicy } from '@/app/server/actions'

const DepartmentListApp = async () => {
  // Vars
  const data = await fetchAttendancePolicy()
    // const data = await fetchBranches()

  return <DepartmentList departmentData={data} />
}

export default DepartmentListApp
