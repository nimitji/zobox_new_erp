// Component Imports
import DepartmentList from '@views/apps/hrManagement/holidays'
// import { fetchBranches } from '@/app/server/actions'

// Data Imports
import { fetchHolidays } from '@/app/server/actions'

const DepartmentListApp = async () => {
  // Vars
  const data = await fetchHolidays()
    // const data = await fetchBranches()

  return <DepartmentList departmentData={data} />
}

export default DepartmentListApp
