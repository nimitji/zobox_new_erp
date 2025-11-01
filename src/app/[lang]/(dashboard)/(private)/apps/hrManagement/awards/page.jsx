// Component Imports
import DepartmentList from '@views/apps/hrManagement/awards'
// import { fetchBranches } from '@/app/server/actions'

// Data Imports
import { fetchAward} from    '@/app/server/actions'


const DepartmentListApp = async () => {
  // Vars
  const data = await    fetchAward()
    // const data = await fetchBranches()

  return <DepartmentList departmentData={data} />
}

export default DepartmentListApp
