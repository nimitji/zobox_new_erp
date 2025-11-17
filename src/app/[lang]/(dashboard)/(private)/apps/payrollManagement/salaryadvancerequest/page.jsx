// Component Imports
import DepartmentList from '@views/apps/payrollManagement/salaryadvancerequest'
// import { fetchBranches } from '@/app/server/actions'

// Data Imports
import { fetchSalaryAdvanceRequest } from '@/app/server/actions'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../../../../../../libs/auth' // adjust relative path

const DepartmentListApp = async () => {
   const session = await getServerSession(authOptions)
  const token = session?.user?.accessToken
  console.log("NIMIT123",session)

  if (!token) {
    console.error('❌ No session token found')
    return <div>Unauthorized access — please log in again.</div>
  }
  // Vars
  const data = await fetchSalaryAdvanceRequest(token)
    // const data = await fetchBranches()

  return <DepartmentList departmentData={data} />
}

export default DepartmentListApp
