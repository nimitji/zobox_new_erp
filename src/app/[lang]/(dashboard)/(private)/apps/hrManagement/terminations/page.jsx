// Component Imports
import DepartmentList from '@views/apps/hrManagement/terminations'
// import { fetchBranches } from '@/app/server/actions'

// Data Imports
import { fetchTermination } from '@/app/server/actions'

const DepartmentListApp = async () => {
  // Vars
  const data = await fetchTermination()
  console.log("Data",data)

  return <DepartmentList departmentData={data} />
}

export default DepartmentListApp
