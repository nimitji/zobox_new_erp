// // // 'use client'

// // // import { useEffect, useState } from 'react'
// // // import { useParams } from 'next/navigation'
// // // import { Card, Typography, Grid, Chip, Box, CircularProgress } from '@mui/material'
// // // // import StarIcon from '@mui/icons-material/Star'
// // // import Divider from '@mui/material/Divider'

// // // // 🧠 API
// // // import { fetchEmployeeReviewById } from '../../../../../../app/server/actions'

// // // // 📦 Custom Components
// // // import CustomTextField from '@core/components/mui/TextField'

// // // const ReviewDetailsPage = () => {
// // //   const { id } = useParams()
// // //   const [review, setReview] = useState(null)
// // //   const [loading, setLoading] = useState(true)

// // //   useEffect(() => {
// // //     const loadReview = async () => {
// // //       try {
// // //         const res = await fetchEmployeeReviewById(id)
// // //         setReview(res.data)
// // //       } catch (err) {
// // //         console.error('Error fetching review details:', err)
// // //       } finally {
// // //         setLoading(false)
// // //       }
// // //     }
// // //     if (id) loadReview()
// // //   }, [id])

// // //   if (loading) return <CircularProgress sx={{ m: 4 }} />

// // //   if (!review)
// // //     return <Typography sx={{ p: 4 }}>No review details found for this ID.</Typography>

// // //   return (
// // //     <Box p={4}>
// // //       <Typography variant='h4' fontWeight='bold' mb={3}>
// // //         Review Details
// // //       </Typography>

// // //       {/* 🔹 Review Information */}
// // //       <Card variant='outlined' sx={{ p: 4, mb: 3 }}>
// // //         <Typography variant='h6' mb={1}>
// // //           Review Information
// // //         </Typography>
// // //         <Typography variant='body2' color='text.secondary' mb={3}>
// // //           Details about this performance review
// // //         </Typography>

// // //         <Grid container spacing={3}>
// // //           <Grid item xs={12} sm={6}>
// // //             <CustomTextField label='Employee' value={review.employeeName || '-'} fullWidth InputProps={{ readOnly: true }} />
// // //           </Grid>
// // //           <Grid item xs={12} sm={6}>
// // //             <CustomTextField label='Reviewer' value={review.reviewerName || '-'} fullWidth InputProps={{ readOnly: true }} />
// // //           </Grid>
// // //           <Grid item xs={12} sm={6}>
// // //             <CustomTextField label='Review Cycle' value={review.reviewCycleName || '-'} fullWidth InputProps={{ readOnly: true }} />
// // //           </Grid>
// // //           <Grid item xs={12} sm={3}>
// // //             <CustomTextField label='Review Date' value={review.reviewDate || '-'} fullWidth InputProps={{ readOnly: true }} />
// // //           </Grid>
// // //           <Grid item xs={12} sm={3}>
// // //             <CustomTextField
// // //               label='Status'
// // //               value={review.status}
// // //               fullWidth
// // //               InputProps={{ readOnly: true }}
// // //             />
// // //           </Grid>
// // //         </Grid>
// // //       </Card>

// // //       {/* ⭐ Overall Rating */}
// // //       <Card variant='outlined' sx={{ p: 4, mb: 3 }}>
// // //         <Typography variant='h6'>Overall Rating</Typography>
// // //         <Divider sx={{ my: 2 }} />
// // //         <Box display='flex' alignItems='center' justifyContent='space-between'>
// // //           <Typography variant='body1'>
// // //             {review.comments || 'No comments provided.'}
// // //           </Typography>
// // //           <Typography variant='h5' color='primary' display='flex' alignItems='center' gap={1}>
// // //             {review.rating ?? '-'}
// // //             <StarIcon fontSize='medium' color='warning' />
// // //           </Typography>
// // //         </Box>
// // //       </Card>

// // //       {/* 🧩 Performance Ratings */}
// // //       <Card variant='outlined' sx={{ p: 4 }}>
// // //         <Typography variant='h6' mb={2}>
// // //           Performance Ratings
// // //         </Typography>
// // //         {review.performanceRating && review.performanceRating.length > 0 ? (
// // //           review.performanceRating.map((item, index) => (
// // //             <Box key={index} mb={3}>
// // //               <Typography variant='subtitle1' fontWeight='bold'>
// // //                 {item.category}
// // //               </Typography>
// // //               <Typography variant='body2' color='text.secondary' mb={1}>
// // //                 {item.indicator}
// // //               </Typography>
// // //               <Typography display='flex' alignItems='center' gap={1}>
// // //                 <span>{item.score ?? '-'}</span>
// // //                 <StarIcon fontSize='small' color='warning' />
// // //               </Typography>
// // //               <Divider sx={{ my: 2 }} />
// // //             </Box>
// // //           ))
// // //         ) : (
// // //           <Typography>No performance ratings found.</Typography>
// // //         )}
// // //       </Card>
// // //     </Box>
// // //   )
// // // }

// // // export default ReviewDetailsPage


// // 'use client'

// // import { useState, useEffect } from 'react'
// // import { useParams } from 'next/navigation'
// // import { Card, Typography, Grid, Box, CircularProgress, Divider } from '@mui/material'

// // // 📦 Custom Components
// // import CustomTextField from '@core/components/mui/TextField'

// // const ReviewDetailsPage = () => {
// //   const { id } = useParams()
// //   const [review, setReview] = useState(null)
// //   const [loading, setLoading] = useState(true)

// //   // 🧩 Static Data (for now)
// //   const staticData = {
// //     _id: id,
// //     employeeName: 'John Doe',
// //     reviewerName: 'Jane Smith',
// //     reviewCycleName: 'Q4 2025 Performance Review',
// //     reviewDate: '2025-11-20',
// //     status: 'Scheduled',
// //     comments: 'Excellent performance overall. Exceeded expectations in teamwork and leadership.',
// //     rating: 4,
// //     performanceRating: [
// //       { category: 'Teamwork', indicator: 'Collaboration and communication', score: 4 },
// //       { category: 'Productivity', indicator: 'Efficiency and task completion', score: 5 },
// //       { category: 'Leadership', indicator: 'Motivation and team guidance', score: 4 }
// //     ]
// //   }

// //   useEffect(() => {
// //     // Simulate API delay
// //     const timer = setTimeout(() => {
// //       setReview(staticData)
// //       setLoading(false)
// //     }, 1000)
// //     return () => clearTimeout(timer)
// //   }, [id])

// //   if (loading) return <CircularProgress sx={{ m: 4 }} />
// //   if (!review)
// //     return <Typography sx={{ p: 4 }}>No review details found for this ID.</Typography>

// //   // Helper: Render stars visually
// //   const renderStars = (count = 0) => {
// //     return (
// //       <span style={{ color: '#FFD700', fontSize: '20px' }}>
// //         {'⭐'.repeat(count)}
// //         {'☆'.repeat(5 - count)}
// //       </span>
// //     )
// //   }

// //   return (
// //     <Box p={4}>
// //       <Typography variant='h4' fontWeight='bold' mb={3}>
// //         Review Details
// //       </Typography>

// //       {/* 🔹 Review Information */}
// //       <Card variant='outlined' sx={{ p: 4, mb: 3 }}>
// //         <Typography variant='h6' mb={1}>
// //           Review Information
// //         </Typography>
// //         <Typography variant='body2' color='text.secondary' mb={3}>
// //           Details about this performance review
// //         </Typography>

// //         <Grid container spacing={3}>
// //           <Grid item xs={12} sm={6}>
// //             <CustomTextField
// //               label='Employee'
// //               value={review.employeeName || '-'}
// //               fullWidth
// //               InputProps={{ readOnly: true }}
// //             />
// //           </Grid>
// //           <Grid item xs={12} sm={6}>
// //             <CustomTextField
// //               label='Reviewer'
// //               value={review.reviewerName || '-'}
// //               fullWidth
// //               InputProps={{ readOnly: true }}
// //             />
// //           </Grid>
// //           <Grid item xs={12} sm={6}>
// //             <CustomTextField
// //               label='Review Cycle'
// //               value={review.reviewCycleName || '-'}
// //               fullWidth
// //               InputProps={{ readOnly: true }}
// //             />
// //           </Grid>
// //           <Grid item xs={12} sm={3}>
// //             <CustomTextField
// //               label='Review Date'
// //               value={review.reviewDate || '-'}
// //               fullWidth
// //               InputProps={{ readOnly: true }}
// //             />
// //           </Grid>
// //           <Grid item xs={12} sm={3}>
// //             <CustomTextField
// //               label='Status'
// //               value={review.status}
// //               fullWidth
// //               InputProps={{ readOnly: true }}
// //             />
// //           </Grid>
// //         </Grid>
// //       </Card>

// //       {/* ⭐ Overall Rating */}
// //       <Card variant='outlined' sx={{ p: 4, mb: 3 }}>
// //         <Typography variant='h6'>Overall Rating</Typography>
// //         <Divider sx={{ my: 2 }} />
// //         <Box display='flex' alignItems='center' justifyContent='space-between'>
// //           <Typography variant='body1'>
// //             {review.comments || 'No comments provided.'}
// //           </Typography>
// //           <Typography variant='h5' color='primary' display='flex' alignItems='center' gap={1}>
// //             {review.rating ?? '-'} / 5&nbsp;{renderStars(review.rating)}
// //           </Typography>
// //         </Box>
// //       </Card>

// //       {/* 🧩 Performance Ratings */}
// //       <Card variant='outlined' sx={{ p: 4 }}>
// //         <Typography variant='h6' mb={2}>
// //           Performance Ratings
// //         </Typography>
// //         {review.performanceRating && review.performanceRating.length > 0 ? (
// //           review.performanceRating.map((item, index) => (
// //             <Box key={index} mb={3}>
// //               <Typography variant='subtitle1' fontWeight='bold'>
// //                 {item.category}
// //               </Typography>
// //               <Typography variant='body2' color='text.secondary' mb={1}>
// //                 {item.indicator}
// //               </Typography>
// //               <Typography display='flex' alignItems='center' gap={1}>
// //                 {renderStars(item.score)} <span>({item.score}/5)</span>
// //               </Typography>
// //               <Divider sx={{ my: 2 }} />
// //             </Box>
// //           ))
// //         ) : (
// //           <Typography>No performance ratings found.</Typography>
// //         )}
// //       </Card>
// //     </Box>
// //   )
// // }

// // export default ReviewDetailsPage

// 'use client'

// import { useEffect, useState } from 'react'
// import { useParams } from 'next/navigation'
// import {
//   Card,
//   Typography,
//   Grid,
//   Box,
//   Chip,
//   CircularProgress,
//   Divider,
//   Paper
// } from '@mui/material'

// // 📦 Custom Components
// import CustomTextField from '@core/components/mui/TextField'

// // 🧩 Dummy Static Data
// const staticData = {
//   employeeName: 'Dr. Rowland Murphy',
//   reviewerName: 'Helena Willms',
//   reviewCycleName: 'Quarterly Business Review',
//   reviewDate: '2025-02-28',
//   status: 'Completed',
//   comments:
//     'Excellent work quality and dedication to achieving team objectives.',
//   rating: 4.0,
//   performanceRating: [
//     {
//       title: 'Job Performance',
//       indicators: [
//         {
//           name: 'Task Completion Rate',
//           type: 'Percentage',
//           comments:
//             'Consistently meets performance standards with room for improvement.',
//           rating: 4.0
//         },
//         {
//           name: 'Goal Achievement',
//           type: 'Percentage',
//           comments: 'Success rate in achieving individual and team objectives.',
//           rating: 4.5
//         }
//       ]
//     }
//   ]
// }

// const ReviewDetailsPage = () => {
//   const { id } = useParams()
//   const [review, setReview] = useState(null)
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     // Simulate API load delay
//     const timer = setTimeout(() => {
//       setReview(staticData)
//       setLoading(false)
//     }, 800)
//     return () => clearTimeout(timer)
//   }, [id])

//   if (loading) return <CircularProgress sx={{ m: 6 }} />
//   if (!review) return <Typography sx={{ p: 4 }}>No review found</Typography>

//   return (
//     <Box p={4} sx={{ backgroundColor: '#fafafa', minHeight: '100vh' }}>
//       {/* Header */}
//       <Typography variant='h4' fontWeight='bold' mb={3}>
//         Review Details
//       </Typography>

//       {/* 🔹 Review Information */}
//       <Paper
//         variant='outlined'
//         sx={{
//           p: 4,
//           mb: 4,
//           borderRadius: 3,
//           backgroundColor: 'white',
//           boxShadow: '0 2px 6px rgba(0,0,0,0.05)'
//         }}
//       >
//         <Typography variant='h6' fontWeight='bold' gutterBottom>
//           Review Information
//         </Typography>
//         <Typography variant='body2' color='text.secondary' mb={3}>
//           Details about this performance review
//         </Typography>

//         <Grid container spacing={2}>
//           <Grid item xs={12} sm={6}>
//             <Typography fontWeight='500'>Employee</Typography>
//             <Typography variant='body1' mb={2}>
//               {review.employeeName}
//             </Typography>
//           </Grid>
//           <Grid item xs={12} sm={6}>
//             <Typography fontWeight='500'>Reviewer</Typography>
//             <Typography variant='body1' mb={2}>
//               {review.reviewerName}
//             </Typography>
//           </Grid>
//           <Grid item xs={12} sm={6}>
//             <Typography fontWeight='500'>Review Cycle</Typography>
//             <Typography variant='body1' mb={2}>
//               {review.reviewCycleName}
//             </Typography>
//           </Grid>
//           <Grid item xs={12} sm={3}>
//             <Typography fontWeight='500'>Review Date</Typography>
//             <Typography variant='body1' mb={2}>
//               {review.reviewDate}
//             </Typography>
//           </Grid>
//           <Grid item xs={12} sm={3}>
//             <Typography fontWeight='500'>Status</Typography>
//             <Chip
//               label={review.status}
//               color='success'
//               variant='tonal'
//               size='small'
//               sx={{ fontWeight: 600, textTransform: 'capitalize' }}
//             />
//           </Grid>
//         </Grid>
//       </Paper>

//       {/* ⭐ Overall Rating */}
//       <Paper
//         variant='outlined'
//         sx={{
//           p: 4,
//           mb: 4,
//           borderRadius: 3,
//           backgroundColor: 'white',
//           boxShadow: '0 2px 6px rgba(0,0,0,0.05)'
//         }}
//       >
//         <Typography variant='h6' fontWeight='bold' gutterBottom>
//           Overall Rating
//         </Typography>
//         <Divider sx={{ my: 2 }} />
//         <Box display='flex' alignItems='center' justifyContent='space-between'>
//           <Typography variant='body1'>{review.comments}</Typography>
//           <Typography
//             variant='h5'
//             color='warning.main'
//             display='flex'
//             alignItems='center'
//             gap={0.5}
//           >
//             {review.rating.toFixed(1)}{' '}
//             <span style={{ color: '#FFD700', fontSize: '22px' }}>⭐</span>
//           </Typography>
//         </Box>
//       </Paper>

//       {/* 🧩 Performance Ratings */}
//       <Paper
//         variant='outlined'
//         sx={{
//           p: 4,
//           mb: 4,
//           borderRadius: 3,
//           backgroundColor: 'white',
//           boxShadow: '0 2px 6px rgba(0,0,0,0.05)'
//         }}
//       >
//         <Typography variant='h6' fontWeight='bold' mb={3}>
//           Performance Ratings
//         </Typography>
//         {review.performanceRating.map((category, idx) => (
//           <Box key={idx} mb={4}>
//             <Typography variant='subtitle1' fontWeight='bold' mb={2}>
//               {category.title}
//             </Typography>
//             {category.indicators.map((ind, i) => (
//               <Box
//                 key={i}
//                 sx={{
//                   border: '1px solid #eee',
//                   borderRadius: 2,
//                   p: 2,
//                   mb: 2,
//                   backgroundColor: '#fcfcfc'
//                 }}
//               >
//                 <Box
//                   display='flex'
//                   justifyContent='space-between'
//                   alignItems='center'
//                   mb={1}
//                 >
//                   <Typography fontWeight='500'>{ind.name}</Typography>
//                   <Typography
//                     variant='h6'
//                     color='warning.main'
//                     display='flex'
//                     alignItems='center'
//                     gap={0.3}
//                   >
//                     {ind.rating.toFixed(1)}{' '}
//                     <span style={{ color: '#FFD700', fontSize: '18px' }}>⭐</span>
//                   </Typography>
//                 </Box>
//                 <Typography
//                   variant='body2'
//                   color='text.secondary'
//                   fontStyle='italic'
//                 >
//                   {ind.type}
//                 </Typography>
//                 <Typography
//                   variant='body2'
//                   color='text.secondary'
//                   mt={1}
//                   sx={{ whiteSpace: 'pre-wrap' }}
//                 >
//                   {ind.comments}
//                 </Typography>
//               </Box>
//             ))}
//           </Box>
//         ))}
//       </Paper>
//     </Box>
//   )
// }

// export default ReviewDetailsPage


// 'use client'

// import { useEffect, useState } from 'react'
// import { useParams } from 'next/navigation'
// import {
//   Box,
//   Typography,
//   Grid,
//   Chip,
//   CircularProgress,
//   Divider,
//   Paper
// } from '@mui/material'
// // import StarIcon from '@mui/icons-material/Star'

// // ✅ API import
// import { fetchEmployeeReviewById } from '../../../../../../app/server/actions'

// // ⭐ Render star rating visually
// const renderStars = (rating = 0) => {
//   const filled = Math.round(rating)
//   const empty = 5 - filled
//   return (
//     <span style={{ color: '#FFD700', fontSize: 20 }}>
//       {'⭐'.repeat(filled)}
//       {'☆'.repeat(empty)}
//     </span>
//   )
// }

// const ReviewDetailsPage = () => {
//   const { id } = useParams()
//   const [review, setReview] = useState(null)
//   const [loading, setLoading] = useState(true)

//   // 🔹 Fetch Review by ID
//   useEffect(() => {
//     const loadReview = async () => {
//       try {
//         const res = await fetchEmployeeReviewById(id)
//         if (res?.success && res.data) {
//           // ✅ Group performanceRating by indicatorCategory
//           const grouped = res.data.performanceRating.reduce((acc, item) => {
//             const category = item.indicatorCategory?.category || 'Other'
//             if (!acc[category]) acc[category] = []
//             acc[category].push(item)
//             return acc
//           }, {})

//           setReview({ ...res.data, groupedRatings: grouped })
//         }
//       } catch (err) {
//         console.error('❌ Error fetching review details:', err)
//       } finally {
//         setLoading(false)
//       }
//     }

//     if (id) loadReview()
//   }, [id])

//   if (loading)
//     return (
//       <Box display='flex' justifyContent='center' alignItems='center' height='70vh'>
//         <CircularProgress />
//       </Box>
//     )

//   if (!review)
//     return (
//       <Typography sx={{ p: 4, textAlign: 'center' }}>
//         No review details found for this ID.
//       </Typography>
//     )

//   // ✅ Extract data
//   const {
//     employeeName,
//     reviewerName,
//     reviewCycleName,
//     reviewDate,
//     status,
//     rating,
//     groupedRatings
//   } = review

//   return (
//     <Box p={4} sx={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
//       {/* 🔙 Back */}
//       <Typography
//         variant='h4'
//         fontWeight='bold'
//         mb={3}
//         sx={{ color: '#2B3380' }}
//       >
//         Review Details
//       </Typography>

//       {/* 🔹 Review Information */}
//       <Paper
//         elevation={0}
//         sx={{
//           p: 4,
//           mb: 4,
//           borderRadius: 3,
//           backgroundColor: 'white',
//           border: '1px solid #e0e0e0'
//         }}
//       >
//         <Typography variant='h6' fontWeight='bold'>
//           Review Information
//         </Typography>
//         <Typography variant='body2' color='text.secondary' mb={3}>
//           Details about this performance review
//         </Typography>

//         <Grid container spacing={3}>
//           <Grid item xs={12} sm={6}>
//             <Typography fontWeight='500'>Employee</Typography>
//             <Typography variant='h6'>{employeeName}</Typography>
//           </Grid>
//           <Grid item xs={12} sm={6}>
//             <Typography fontWeight='500'>Reviewer</Typography>
//             <Typography variant='h6'>{reviewerName}</Typography>
//           </Grid>
//           <Grid item xs={12} sm={6}>
//             <Typography fontWeight='500'>Review Cycle</Typography>
//             <Typography variant='h6'>{reviewCycleName}</Typography>
//           </Grid>
//           <Grid item xs={12} sm={3}>
//             <Typography fontWeight='500'>Review Date</Typography>
//             <Typography variant='h6'>
//               {new Date(reviewDate).toLocaleDateString()}
//             </Typography>
//           </Grid>
//           <Grid item xs={12} sm={3}>
//             <Typography fontWeight='500'>Status</Typography>
//             <Chip
//               label={status}
//               color={
//                 status === 'Completed'
//                   ? 'success'
//                   : status === 'Scheduled'
//                   ? 'info'
//                   : 'warning'
//               }
//               variant='outlined'
//               size='small'
//               sx={{ fontWeight: 600 }}
//             />
//           </Grid>
//         </Grid>
//       </Paper>

//       {/* ⭐ Overall Rating */}
//       <Paper
//         elevation={0}
//         sx={{
//           p: 4,
//           mb: 4,
//           borderRadius: 3,
//           backgroundColor: 'white',
//           border: '1px solid #e0e0e0'
//         }}
//       >
//         <Typography variant='h6' fontWeight='bold'>
//           Overall Rating
//         </Typography>
//         <Divider sx={{ my: 2 }} />
//         <Box display='flex' alignItems='center' justifyContent='space-between'>
//           <Typography variant='body1'>
//             Excellent work quality and dedication to achieving team objectives.
//           </Typography>
//           <Typography
//             variant='h5'
//             color='warning.main'
//             display='flex'
//             alignItems='center'
//             gap={1}
//           >
//             {rating}
//             {/* <StarIcon sx={{ color: '#FFD700' }} /> */}
//           </Typography>
//         </Box>
//       </Paper>

//       {/* 🧩 Performance Ratings */}
//       <Paper
//         elevation={0}
//         sx={{
//           p: 4,
//           borderRadius: 3,
//           backgroundColor: 'white',
//           border: '1px solid #e0e0e0'
//         }}
//       >
//         <Typography variant='h6' fontWeight='bold' mb={3}>
//           Performance Ratings
//         </Typography>

//         {Object.keys(groupedRatings).map(category => (
//           <Box key={category} mb={4}>
//             <Typography
//               variant='subtitle1'
//               fontWeight='bold'
//               mb={2}
//               sx={{
//                 borderBottom: '2px solid #f0f0f0',
//                 pb: 1,
//                 color: 'text.primary'
//               }}
//             >
//               {category}
//             </Typography>

//             {groupedRatings[category].map((item, idx) => (
//               <Box
//                 key={idx}
//                 sx={{
//                   border: '1px solid #eee',
//                   borderRadius: 2,
//                   p: 3,
//                   mb: 2,
//                   backgroundColor: '#fcfcfc'
//                 }}
//               >
//                 <Box
//                   display='flex'
//                   justifyContent='space-between'
//                   alignItems='center'
//                   mb={1}
//                 >
//                   <Typography fontWeight='500'>
//                     {item.indicator?.indicatorName}
//                   </Typography>
//                   <Typography
//                     variant='h6'
//                     color='warning.main'
//                     display='flex'
//                     alignItems='center'
//                     gap={0.3}
//                   >
//                     {item.rating}/5
//                     {/* <StarIcon sx={{ color: '#FFD700' }} /> */}
//                   </Typography>
//                 </Box>

//                 <Typography variant='body2' color='text.secondary'>
//                   {item.indicator?.description}
//                 </Typography>

//                 <Typography
//                   variant='body2'
//                   color='text.secondary'
//                   mt={1}
//                   fontStyle='italic'
//                 >
//                   Measurement Unit: {item.indicator?.measurementUnit}
//                 </Typography>

//                 <Typography variant='body2' color='text.secondary' mt={1}>
//                   Target Value: {item.indicator?.targetValue}
//                 </Typography>

//                 <Typography variant='body2' color='text.primary' mt={1}>
//                   Comment: {item.comment}
//                 </Typography>
//               </Box>
//             ))}
//           </Box>
//         ))}
//       </Paper>
//     </Box>
//   )
// }

// export default ReviewDetailsPage

'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import {
  Box,
  Typography,
  Grid,
  Chip,
  CircularProgress,
  Divider,
  Paper
} from '@mui/material'

// ✅ API import
import { fetchEmployeeReviewById } from '../../../../../../app/server/actions'

// ⭐ Render star rating visually
const renderStars = (rating = 0) => {
  const filled = Math.round(parseFloat(rating))
  const empty = 5 - filled
  return (
    <span style={{ color: '#FFD700', fontSize: 20 }}>
      {'⭐'.repeat(filled)}
      {'☆'.repeat(empty)}
    </span>
  )
}

const ReviewDetailsPage = () => {
  const searchParams = useSearchParams()
  const id = searchParams.get('_id') // ✅ fetch _id from URL query

  const [review, setReview] = useState(null)
  const [loading, setLoading] = useState(true)

  // 🔹 Fetch Review by ID
  useEffect(() => {
    const loadReview = async () => {
      try {
        if (!id) return
        const res = await fetchEmployeeReviewById(id)
        if (res?.success && res.data) {
          // ✅ Group performanceRating by indicatorCategory
          const grouped = res.data.performanceRating.reduce((acc, item) => {
            const category = item.indicatorCategory?.category || 'Other'
            if (!acc[category]) acc[category] = []
            acc[category].push(item)
            return acc
          }, {})

          setReview({ ...res.data, groupedRatings: grouped })
        }
      } catch (err) {
        console.error('❌ Error fetching review details:', err)
      } finally {
        setLoading(false)
      }
    }

    loadReview()
  }, [id])

  if (loading)
    return (
      <Box display='flex' justifyContent='center' alignItems='center' height='70vh'>
        <CircularProgress />
      </Box>
    )

  if (!review)
    return (
      <Typography sx={{ p: 4, textAlign: 'center' }}>
        No review details found for this ID.
      </Typography>
    )

  // ✅ Extract data
  const {
    employeeName,
    reviewerName,
    reviewCycleName,
    reviewDate,
    status,
    rating,
    groupedRatings
  } = review

  return (
    <Box p={4} sx={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      {/* 🔙 Header */}
      <Typography
        variant='h4'
        fontWeight='bold'
        mb={3}
        sx={{ color: '#2B3380' }}
      >
        Review Details
      </Typography>

      {/* 🔹 Review Information */}
      <Paper
        elevation={0}
        sx={{
          p: 4,
          mb: 4,
          borderRadius: 3,
          backgroundColor: 'white',
          border: '1px solid #e0e0e0'
        }}
      >
        <Typography variant='h6' fontWeight='bold'>
          Review Information
        </Typography>
        <Typography variant='body2' color='text.secondary' mb={3}>
          Details about this performance review
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Typography fontWeight='500'>Employee</Typography>
            <Typography variant='h6'>{employeeName}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography fontWeight='500'>Reviewer</Typography>
            <Typography variant='h6'>{reviewerName}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography fontWeight='500'>Review Cycle</Typography>
            <Typography variant='h6'>{reviewCycleName}</Typography>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Typography fontWeight='500'>Review Date</Typography>
            <Typography variant='h6'>
              {new Date(reviewDate).toLocaleDateString()}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Typography fontWeight='500'>Status</Typography>
            <Chip
              label={status}
              color={
                status === 'Completed'
                  ? 'success'
                  : status === 'Scheduled'
                  ? 'info'
                  : 'warning'
              }
              variant='outlined'
              size='small'
              sx={{ fontWeight: 600 }}
            />
          </Grid>
        </Grid>
      </Paper>

      {/* ⭐ Overall Rating */}
      <Paper
        elevation={0}
        sx={{
          p: 4,
          mb: 4,
          borderRadius: 3,
          backgroundColor: 'white',
          border: '1px solid #e0e0e0'
        }}
      >
        <Typography variant='h6' fontWeight='bold'>
          Overall Rating
        </Typography>
        <Divider sx={{ my: 2 }} />
        <Box display='flex' alignItems='center' justifyContent='space-between'>
          <Typography variant='body1'>
            Excellent work quality and dedication to achieving team objectives.
          </Typography>
          <Typography
            variant='h5'
            color='warning.main'
            display='flex'
            alignItems='center'
            gap={1}
          >
            {rating} {renderStars(parseFloat(rating))}
          </Typography>
        </Box>
      </Paper>

      {/* 🧩 Performance Ratings */}
      <Paper
        elevation={0}
        sx={{
          p: 4,
          borderRadius: 3,
          backgroundColor: 'white',
          border: '1px solid #e0e0e0'
        }}
      >
        <Typography variant='h6' fontWeight='bold' mb={3}>
          Performance Ratings
        </Typography>

        {Object.keys(groupedRatings).map(category => (
          <Box key={category} mb={4}>
            <Typography
              variant='subtitle1'
              fontWeight='bold'
              mb={2}
              sx={{
                borderBottom: '2px solid #f0f0f0',
                pb: 1,
                color: 'text.primary'
              }}
            >
              {category}
            </Typography>

            {groupedRatings[category].map((item, idx) => (
              <Box
                key={idx}
                sx={{
                  border: '1px solid #eee',
                  borderRadius: 2,
                  p: 3,
                  mb: 2,
                  backgroundColor: '#fcfcfc'
                }}
              >
                <Box
                  display='flex'
                  justifyContent='space-between'
                  alignItems='center'
                  mb={1}
                >
                  <Typography fontWeight='500'>
                    {item.indicator?.indicatorName}
                  </Typography>
                  <Typography
                    variant='h6'
                    color='warning.main'
                    display='flex'
                    alignItems='center'
                    gap={0.3}
                  >
                    {item.rating}/5 {renderStars(item.rating)}
                  </Typography>
                </Box>

                <Typography variant='body2' color='text.secondary'>
                  {item.indicator?.description}
                </Typography>

                {/* <Typography
                  variant='body2'
                  color='text.secondary'
                  mt={1}
                  fontStyle='italic'
                >
                 {item.indicator?.measurementUnit}
                </Typography> */}
                <Box
  component="span"
  sx={{
    display: 'inline-block',
    border: '1.5px solid #2B3380', // blue border
    color: '#2B3380',
    fontWeight: 600,
    borderRadius: '6px',
    px: 1.5,
    py: 0.5,
    fontSize: '0.8rem',
    mt: 1,
  }}
>
  {item.indicator?.measurementUnit || 'N/A'}
</Box>


                <Typography variant='body2' color='text.secondary' mt={1}>
                   Comments
                </Typography>

                <Typography variant='body2' color='text.primary' mt={1}>
                  {item.comment}
                </Typography>
              </Box>
            ))}
          </Box>
        ))}
      </Paper>
    </Box>
  )
}

export default ReviewDetailsPage


