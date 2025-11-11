// Component Imports
import DepartmentList from '@views/apps/hrManagement/complaints'
// import { fetchBranches } from '@/app/server/actions'

// Data Imports
import { fetchComplaints } from '@/app/server/actions'

const DepartmentListApp = async () => {
  // Vars
  const data = await fetchComplaints()
    // const data = await fetchBranches()

  return <DepartmentList departmentData={data} />
}

export default DepartmentListApp
