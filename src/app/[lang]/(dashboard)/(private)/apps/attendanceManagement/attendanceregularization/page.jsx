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


import DepartmentList from '@views/apps/attendanceManagement/attendanceregularization'
import { fetchAttendanceRegularizations } from '@/app/server/actions'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../../../../../../libs/auth' // adjust relative path

const DepartmentListApp = async () => {
  // 🧠 Get session server-side
  const session = await getServerSession(authOptions)
  const token = session?.user?.accessToken
  console.log("NIMIT",token)

  if (!token) {
    console.error('❌ No session token found')
    return <div>Unauthorized access — please log in again.</div>
  }

  const data = await fetchAttendanceRegularizations(token)

  return <DepartmentList departmentData={data} />
}

export default DepartmentListApp

