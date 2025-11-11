// Component Imports
import DepartmentList from '@views/apps/hrManagement/transfers'
// import { fetchBranches } from '@/app/server/actions'

// Data Imports
import { fetchTransfers } from '@/app/server/actions'

const DepartmentListApp = async () => {
  // Vars
  const data = await fetchTransfers()
    // const data = await fetchBranches()

  return <DepartmentList departmentData={data} />
}

export default DepartmentListApp
