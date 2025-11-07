// Component Imports
import DepartmentList from '@views/apps/hrManagement/resignations'
// import { fetchBranches } from '@/app/server/actions'

// Data Imports
import { fetchResignation } from '@/app/server/actions'

const DepartmentListApp = async () => {
  // Vars
  const data = await fetchResignation()
  console.log("NIMIT",data)
    // const data = await fetchBranches()

  return <DepartmentList departmentData={data} />
}

export default DepartmentListApp
