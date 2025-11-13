// Component Imports
import DepartmentList from '@views/apps/payrollManagement/salarycomponent'
// import { fetchBranches } from '@/app/server/actions'

// Data Imports
import { fetchSalaryComponent } from '@/app/server/actions'

const DepartmentListApp = async () => {
  // Vars
  const data = await fetchSalaryComponent()
    // const data = await fetchBranches()

  return <DepartmentList departmentData={data} />
}

export default DepartmentListApp
