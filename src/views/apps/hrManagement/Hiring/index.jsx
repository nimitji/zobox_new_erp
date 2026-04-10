// MUI Imports
import Grid from '@mui/material/Grid2'

// Component Imports
import HiringListTable from './HiringListTable'
import HiringListCards from './HiringListCards'

const HiringList = ({ hiringData }) => {
  return (
    <Grid container spacing={6}>
      <Grid size={{ xs: 12 }}>
        <HiringListCards />
      </Grid>

      <Grid size={{ xs: 12 }}>
        <HiringListTable tableData={hiringData} />
      </Grid>
    </Grid>
  )
}

export default HiringList
