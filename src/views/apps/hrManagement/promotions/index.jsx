// MUI Imports
import Grid from '@mui/material/Grid2'

// Component Imports
import BranchListTable from './DepartmentListTable'
import BranchListCards from './DepartmentListCards'

const UserList = ({ departmentData }) => {
  return (
    <Grid container spacing={6}>
      <Grid size={{ xs: 12 }}>
        <BranchListCards />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <BranchListTable tableData={departmentData} />
      </Grid>
    </Grid>
  )
}

export default UserList
