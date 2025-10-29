// Component Imports
import DepartmentList from '@views/apps/hrManagement/documentTypes'
// import { fetchBranches } from '@/app/server/actions'

// Data Imports
import { fetchDocument } from '@/app/server/actions'

const DepartmentListApp = async () => {
  // Vars
  const data = await fetchDocument()
    // const data = await fetchBranches()

  return <DepartmentList departmentData={data} />
}

export default DepartmentListApp
