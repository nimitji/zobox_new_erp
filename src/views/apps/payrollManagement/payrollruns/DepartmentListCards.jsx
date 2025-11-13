'use client'

import { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid2'
import HorizontalWithSubtitle from '@components/card-statistics/HorizontalWithSubtitle'
import { fetchCountAttendanceRegularization } from '../../../../app/server/actions'
import { useSession } from 'next-auth/react' // ✅ Import this

const DepartmentListCards = () => {
  const { data: session } = useSession() // ✅ Access the NextAuth session
  const [cardsData, setCardsData] = useState([])

  useEffect(() => {
    const getData = async () => {
      try {
        // ✅ Safely read token from session
        const token = session?.user?.accessToken

        if (!token) {
          console.warn('⚠️ No access token found — user not logged in.')
          return
        }

        // ✅ Pass token to your fetch action
        const response = await fetchCountAttendanceRegularization(token)
        console.log('Fetched attendance count ✅', response)
        setCardsData(response)
      } catch (error) {
        console.error('❌ Error fetching attendance count:', error)
      }
    }

    if (session) getData()
  }, [session]) // ✅ only run when session is available

  return (
    <Grid container spacing={6}>
      {cardsData?.length > 0 ? (
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
