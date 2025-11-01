// Component Imports
import DepartmentList from '@views/apps/hrManagement/promotions'
// import { fetchBranches } from '@/app/server/actions'

// Data Imports
import { fetchPromotions } from '@/app/server/actions'

const DepartmentListApp = async () => {
  // Vars
  const data = await fetchPromotions()
    // const data = await fetchBranches()

  return <DepartmentList departmentData={data} />
}

export default DepartmentListApp
