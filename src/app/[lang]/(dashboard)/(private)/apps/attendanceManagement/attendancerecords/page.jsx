// Component Imports
import DepartmentList from '@views/apps/attendanceManagement/attendancerecords'
// import { fetchBranches } from '@/app/server/actions'

// Data Imports
import { fetchAttendanceRecords } from '@/app/server/actions'

const DepartmentListApp = async () => {
  // Vars
  const data = await fetchAttendanceRecords()
    // const data = await fetchBranches()

  return <DepartmentList departmentData={data} />
}

export default DepartmentListApp
