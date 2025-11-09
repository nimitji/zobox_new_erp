// Component Imports
import DepartmentList from '@views/apps/hrManagement/performance/indicatorCategories'
// import { fetchBranches } from '@/app/server/actions'

// Data Imports
import { fetchCategoryIndicator } from '@/app/server/actions'

const DepartmentListApp = async () => {
  // Vars
  const data = await fetchCategoryIndicator()
    // const data = await fetchBranches()

  return <DepartmentList departmentData={data} />
}

export default DepartmentListApp
