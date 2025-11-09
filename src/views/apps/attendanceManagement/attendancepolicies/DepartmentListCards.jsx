'use client'

import { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid2'
import HorizontalWithSubtitle from '@components/card-statistics/HorizontalWithSubtitle'
import { fetchCountAttendancePolicy } from '../../../../app/server/actions'

const DepartmentListCards = () => {
  const [cardsData, setCardsData] = useState([])

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetchCountAttendancePolicy()
        console.log('Fetched deparment data ✅', response)
        setCardsData(response)
      } catch (error) {
        console.error('Error fetching department count ❌', error)
      }
    }
    getData()
  }, [])

  return (
    <Grid container spacing={6}>
      {cardsData.length > 0 ? (
        cardsData.map((item, i) => (
          <Grid key={i} size={{ xs: 12, sm: 6, md: 3 }}>
            <HorizontalWithSubtitle {...item} />
          </Grid>
        ))
      ) : (
        <p className="p-4">Loading...</p>
      )}
    </Grid>
  )
}

export default DepartmentListCards

