// Component Imports
import DepartmentList from '@views/apps/hrManagement/announcements'
// import { fetchBranches } from '@/app/server/actions'

// Data Imports
import { fetchAnnouncements } from '@/app/server/actions'

const DepartmentListApp = async () => {
  // Vars
  const data = await fetchAnnouncements()
    // const data = await fetchBranches()

  return <DepartmentList departmentData={data} />
}

export default DepartmentListApp
