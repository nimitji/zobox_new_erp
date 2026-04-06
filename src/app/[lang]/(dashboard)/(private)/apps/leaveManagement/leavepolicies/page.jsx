// // // Component Imports
// import DepartmentList from '@views/apps/attendanceManagement/attendanceregularization'
// // import { fetchBranches } from '@/app/server/actions'

// // Data Imports
// import { fetchAttendanceRegularizations } from '@/app/server/actions'

// const DepartmentListApp = async () => {
//   // Vars
//   const data = await fetchAttendanceRegularizations()
//     // const data = await fetchBranches()

//   return <DepartmentList departmentData={data} />
// }

// export default DepartmentListApp


import DepartmentList from '@views/apps/leaveManagement/leavepolicies'
import { fetchLeavePolicy } from '@/app/server/actions'


const DepartmentListApp = async () => {
  // 🧠 Get session server-side

  const data = await fetchLeavePolicy()

  return <DepartmentList departmentData={data} />
}

export default DepartmentListApp

