

'use client'

import { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid2'
import HorizontalWithSubtitle from '@components/card-statistics/HorizontalWithSubtitle'
import { fetchCountSalaryAdvanceRequest } from '../../../../app/server/actions'
import { useSession } from 'next-auth/react'

const DepartmentListCards = () => {
  const { data: session } = useSession()   // ✅ Token access from session
  const [cardsData, setCardsData] = useState([])

  useEffect(() => {
    const getData = async () => {
      try {
        // ⭐ Get token safely
        const token = session?.user?.accessToken

        if (!token) {
          console.warn('⚠️ No access token found — user not logged in.')
          return
        }

        // ⭐ API call with token
        const response = await fetchCountSalaryAdvanceRequest(token)
        console.log('Fetched employee salary data ✅', response)

        setCardsData(response)
      } catch (error) {
        console.error('Error fetching employee salary count ❌', error)
      }
    }

    // ⭐ Run only when session is ready
    if (session) getData()
  }, [session])

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



