// Component Imports
import DesignationList from '@views/apps/hrManagement/designations'
// import { fetchBranches } from '@/app/server/actions'

// Data Imports
import { fetchDesignation } from '@/app/server/actions'

const DepartmentListApp = async () => {
  // Vars
  const data = await fetchDesignation()
    // const data = await fetchBranches()

  return <DesignationList departmentData={data} />
}

export default DepartmentListApp
