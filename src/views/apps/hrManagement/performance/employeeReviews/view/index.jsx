// MUI Imports
import Grid from '@mui/material/Grid2'

// Component Imports

import ReviewDetailsPage from './employeeReviewDetails'

const UserList = ({ departmentData }) => {
  return (
    <Grid container spacing={6}>
      {/* <Grid size={{ xs: 12 }}>
        <BranchListCards />
      </Grid> */}
       <Grid size={{ xs: 12 }}>
       <ReviewDetailsPage tableData={departmentData} />
       </Grid> 
    </Grid>
  )
}

export default UserList
