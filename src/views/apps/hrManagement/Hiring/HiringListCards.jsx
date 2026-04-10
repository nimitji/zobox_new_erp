
import Grid from '@mui/material/Grid2'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

const HiringListCards = () => {
  const data = [
    { title: 'Total Jobs', value: 24 },
    { title: 'Open Positions', value: 12 },
    { title: 'Closed Positions', value: 8 },
    { title: 'Candidates Applied', value: 156 }
  ]

  return (
    <Grid container spacing={4}>
      {data.map((item, index) => (
        <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
          <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
            <CardContent>
              <Typography variant='h6'>{item.title}</Typography>
              <Typography variant='h4' sx={{ mt: 2 }}>
                {item.value}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  )
}

export default HiringListCards
