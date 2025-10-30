// // MUI Imports
// import Grid from '@mui/material/Grid2'

// // Component Imports
// import HorizontalWithSubtitle from '@components/card-statistics/HorizontalWithSubtitle'
// import { fetchCountUser } from '../../../../../app/server/actions'

// // Vars
// // const data = [
// //   {
// //     title: 'Session',
// //     stats: '21,459',
// //     avatarIcon: 'tabler-users',
// //     avatarColor: 'primary',
// //     trend: 'positive',
// //     trendNumber: '29%',
// //     subtitle: 'Total User'
// //   },
// //   {
// //     title: 'Paid Users',
// //     stats: '4,567',
// //     avatarIcon: 'tabler-user-plus',
// //     avatarColor: 'error',
// //     trend: 'positive',
// //     trendNumber: '18%',
// //     subtitle: 'Last week analytics'
// //   },
// //   {
// //     title: 'Active Users',
// //     stats: '19,860',
// //     avatarIcon: 'tabler-user-check',
// //     avatarColor: 'success',
// //     trend: 'negative',
// //     trendNumber: '14%',
// //     subtitle: 'Last week analytics'
// //   },
// //   {
// //     title: 'Pending Users',
// //     stats: '237',
// //     avatarIcon: 'tabler-user-search',
// //     avatarColor: 'warning',
// //     trend: 'positive',
// //     trendNumber: '42%',
// //     subtitle: 'Last week analytics'
// //   }
// // ]

// const UserListCards = () => {
//   return (
//     <Grid container spacing={6}>
//       {data.map((item, i) => (
//         <Grid key={i} size={{ xs: 12, sm: 6, md: 3 }}>
//           <HorizontalWithSubtitle {...item} />
//         </Grid>
//       ))}
//     </Grid>
//   )
// }

// export default UserListCards





'use client'

import { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid2'
import HorizontalWithSubtitle from '@components/card-statistics/HorizontalWithSubtitle'
import { fetchCountUser } from '../../../../../app/server/actions'
const UserListCards = () => {
  const [cardsData, setCardsData] = useState([])

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetchCountUser()
        console.log('Fetched document data ✅', response)
        setCardsData(response)
      } catch (error) {
        console.error('Error fetching document count ❌', error)
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

export default UserListCards

