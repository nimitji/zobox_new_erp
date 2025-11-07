


// 'use client'

// import { useEffect, useState } from 'react'
// import { useSearchParams } from 'next/navigation'
// import {
//   Box,
//   Typography,
//   Paper,
//   Button,
//   Grid,
//   Slider,
//   TextField,
//   Divider,
//   Chip,
//   CircularProgress
// } from '@mui/material'
// import {
//   fetchEmployeeReviewById,
//   fetchIndicatorDetailsEmployeeReview
// } from '../../../../../../app/server/actions'

// // ⭐ Helper to render stars visually
// const renderStars = rating => {
//   const filled = Math.round(rating)
//   const total = 5
//   return (
//     <span style={{ color: '#FFD700', fontSize: 18 }}>
//       {'⭐'.repeat(filled)}
//       {'☆'.repeat(total - filled)}
//     </span>
//   )
// }

// const ReviewDetailsPage = () => {
//   const searchParams = useSearchParams()
//   const _id = searchParams.get('_id')

//   const [review, setReview] = useState(null)
//   const [indicators, setIndicators] = useState({})
//   const [loading, setLoading] = useState(true)
//   const [submitting, setSubmitting] = useState(false)

//   // 🔹 Fetch review details + indicator details
//   useEffect(() => {
//     const loadData = async () => {
//       try {
//         setLoading(true)

//         // Fetch review details
//         const reviewRes = await fetchEmployeeReviewById(_id)
//         setReview(reviewRes.data)

//         // Fetch indicators
//         const indicatorRes = await fetchIndicatorDetailsEmployeeReview()

//         // Group indicators by category
//         const grouped = indicatorRes.data.reduce((acc, item) => {
//           const category = item.category?.category || 'Other'
//           if (!acc[category]) acc[category] = []
//           acc[category].push({ ...item, rating: 3, comment: '' })
//           return acc
//         }, {})

//         setIndicators(grouped)
//       } catch (error) {
//         console.error('❌ Error fetching data:', error)
//       } finally {
//         setLoading(false)
//       }
//     }

//     if (_id) loadData()
//   }, [_id])

//   // ⭐ Update rating
//   const handleRatingChange = (category, index, value) => {
//     setIndicators(prev => {
//       const updated = { ...prev }
//       updated[category][index].rating = value
//       return updated
//     })
//   }

//   // 🧾 Update comment
//   const handleCommentChange = (category, index, value) => {
//     setIndicators(prev => {
//       const updated = { ...prev }
//       updated[category][index].comment = value
//       return updated
//     })
//   }

//   // 🚀 Prepare formatted body for API
//   const prepareSubmitBody = () => {
//     return {
//       employeeReviewId: _id,
//       performanceRating: Object.keys(indicators).map(category => ({
//         indicatorCategory: indicators[category][0]?.category?._id,
//         performanceRating: indicators[category].map(ind => ({
//           indicator: ind._id,
//           rating: ind.rating.toString(),
//           comment: ind.comment
//         }))
//       }))
//     }
//   }

//   // 🚀 Submit handler
//   const handleSubmit = async () => {
//     try {
//       setSubmitting(true)

//       const payload = prepareSubmitBody()
//       console.log('📦 Final Submit Body:', JSON.stringify(payload, null, 2))

//       const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/zobiz/save-employee-performance-rating`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(payload)
//       })

//       const data = await res.json()
//       console.log('✅ Review submitted successfully:', data)
//       alert('Review submitted successfully!')
//     } catch (error) {
//       console.error('❌ Error submitting review:', error)
//       alert('Something went wrong while submitting.')
//     } finally {
//       setSubmitting(false)
//     }
//   }

//   // 🕓 Loader / empty states
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

//   // 🧱 Main UI
//   return (
//     <Box p={4} sx={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
//       {/* Back Button */}
//       <Button
//         variant='outlined'
//         sx={{
//           mb: 3,
//           borderRadius: 2,
//           fontWeight: 500,
//           textTransform: 'none'
//         }}
//         onClick={() => window.history.back()}
//       >
//         Back to Reviews
//       </Button>

//       <Typography variant='h4' fontWeight='bold' mb={3}>
//         Conduct Performance Review
//       </Typography>

//       {/* Review Info */}
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
//         <Typography variant='h5' fontWeight='bold'>
//           Review Information
//         </Typography>
//         <Typography variant='body2' color='text.secondary' mb={3}>
//           You are conducting a performance review for:
//         </Typography>

//         <Grid container spacing={3}>
//           <Grid item xs={12} sm={6}>
//             <Typography fontWeight='500'>Employee</Typography>
//             <Typography variant='h6' fontWeight='bold'>
//               {review.employeeName || '-'}
//             </Typography>
//           </Grid>
//           <Grid item xs={12} sm={6}>
//             <Typography fontWeight='500'>Reviewer</Typography>
//             <Typography variant='h6' fontWeight='bold'>
//               {review.reviewerName || '-'}
//             </Typography>
//           </Grid>
//           <Grid item xs={12} sm={6}>
//             <Typography fontWeight='500'>Review Cycle</Typography>
//             <Typography variant='h6' fontWeight='bold'>
//               {review.reviewCycleName || '-'}
//             </Typography>
//           </Grid>
//           <Grid item xs={12} sm={3}>
//             <Typography fontWeight='500'>Review Date</Typography>
//             <Typography variant='h6' fontWeight='bold'>
//               {review.reviewDate
//                 ? new Date(review.reviewDate).toLocaleDateString()
//                 : '-'}
//             </Typography>
//           </Grid>
//           <Grid item xs={12} sm={3}>
//             <Typography fontWeight='500'>Status</Typography>
//             <Chip
//               label={review.status || 'Pending'}
//               color={
//                 review.status === 'Completed'
//                   ? 'success'
//                   : review.status === 'Scheduled'
//                   ? 'info'
//                   : 'warning'
//               }
//               variant='outlined'
//               size='small'
//             />
//           </Grid>
//         </Grid>
//       </Paper>

//       {/* Performance Indicators */}
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
//         <Typography variant='h5' fontWeight='bold' mb={2}>
//           Performance Indicators
//         </Typography>
//         <Typography variant='body2' color='text.secondary' mb={4}>
//           Rate the employee on each performance indicator:
//         </Typography>

//         {Object.keys(indicators).map(category => (
//           <Box key={category} mb={4}>
//             <Typography
//               variant='subtitle1'
//               fontWeight='bold'
//               mb={2}
//               sx={{
//                 pb: 1,
//                 borderBottom: '2px solid #f0f0f0',
//                 color: 'text.primary'
//               }}
//             >
//               {category}
//             </Typography>

//             {indicators[category].map((indicator, index) => (
//               <Box
//                 key={indicator._id}
//                 sx={{
//                   border: '1px solid #eaeaea',
//                   borderRadius: 2,
//                   p: 3,
//                   mb: 3,
//                   backgroundColor: '#fcfcfc',
//                   transition: 'box-shadow 0.2s',
//                   '&:hover': { boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }
//                 }}
//               >
//                 <Box
//                   display='flex'
//                   justifyContent='space-between'
//                   alignItems='center'
//                   mb={1}
//                 >
//                   <Typography fontWeight='600' fontSize='1rem'>
//                     {indicator.indicatorName}
//                   </Typography>
//                   <Typography
//                     display='flex'
//                     alignItems='center'
//                     gap={0.5}
//                     fontWeight='500'
//                     color='primary.main'
//                   >
//                     {indicator.rating} {renderStars(indicator.rating)}
//                   </Typography>
//                 </Box>

//                 <Typography variant='body2' color='text.secondary' mb={2}>
//                   {indicator.description}
//                 </Typography>

//                 <Typography variant='body2' fontWeight='500' mb={1}>
//                   Rating
//                 </Typography>
//                 <Slider
//                   value={indicator.rating}
//                   min={1}
//                   max={5}
//                   step={0.5}
//                   marks={[
//                     { value: 1, label: 'Poor' },
//                     { value: 3, label: 'Average' },
//                     { value: 5, label: 'Excellent' }
//                   ]}
//                   valueLabelDisplay='auto'
//                   onChange={(_, value) =>
//                     handleRatingChange(category, index, value)
//                   }
//                   sx={{
//                     color: 'primary.main',
//                     '& .MuiSlider-markLabel': {
//                       mt: 2,
//                       fontSize: 12,
//                       color: '#777'
//                     }
//                   }}
//                 />

//                 <Typography variant='body2' fontWeight='500' mt={2} mb={1}>
//                   Comments
//                 </Typography>
//                 <TextField
//                   fullWidth
//                   multiline
//                   minRows={2}
//                   placeholder='Add feedback for this indicator...'
//                   value={indicator.comment}
//                   onChange={e =>
//                     handleCommentChange(category, index, e.target.value)
//                   }
//                 />
//               </Box>
//             ))}
//             <Divider sx={{ my: 4 }} />
//           </Box>
//         ))}
//       </Paper>

//       {/* Submit Buttons */}
//       <Box display='flex' justifyContent='flex-end' gap={2}>
//         <Button
//           variant='contained'
//           color='primary'
//           sx={{ borderRadius: 2, px: 4 }}
//           disabled={submitting}
//           onClick={handleSubmit}
//         >
//           {submitting ? 'Submitting...' : 'Submit Review'}
//         </Button>
//       </Box>
//     </Box>
//   )
// }

// export default ReviewDetailsPage



'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'

// 📦 MUI Imports
import {
  Box,
  Typography,
  Paper,
  Button,
  Grid,
  Slider,
  TextField,
  Divider,
  Chip,
  CircularProgress,
  Snackbar
} from '@mui/material'
import MuiAlert from '@mui/material/Alert'

// 🧠 API Imports
import {
  fetchEmployeeReviewById,
  fetchIndicatorDetailsEmployeeReview
} from '../../../../../../app/server/actions'

// ⭐ Helper for rating stars
const renderStars = rating => {
  const filled = Math.round(rating)
  const total = 5
  return (
    <span style={{ color: '#FFD700', fontSize: 18 }}>
      {'⭐'.repeat(filled)}
      {'☆'.repeat(total - filled)}
    </span>
  )
}

const ReviewDetailsPage = () => {
  const searchParams = useSearchParams()
  const _id = searchParams.get('_id')

  const [review, setReview] = useState(null)
  const [indicators, setIndicators] = useState({})
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  // 🔔 Snackbar state
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  })

  const handleCloseSnackbar = () => setSnackbar(prev => ({ ...prev, open: false }))

  // 🔹 Load data
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true)

        const reviewRes = await fetchEmployeeReviewById(_id)
        setReview(reviewRes.data)

        const indicatorRes = await fetchIndicatorDetailsEmployeeReview()

        // Group indicators by category
        const grouped = indicatorRes.data.reduce((acc, item) => {
          const category = item.category?.category || 'Other'
          if (!acc[category]) acc[category] = []
          acc[category].push({ ...item, rating: 3, comment: '' })
          return acc
        }, {})

        setIndicators(grouped)
      } catch (error) {
        console.error('❌ Error fetching data:', error)
        setSnackbar({
          open: true,
          message: 'Failed to load review details.',
          severity: 'error'
        })
      } finally {
        setLoading(false)
      }
    }

    if (_id) loadData()
  }, [_id])

  // ⭐ Update rating
  const handleRatingChange = (category, index, value) => {
    setIndicators(prev => {
      const updated = { ...prev }
      updated[category][index].rating = value
      return updated
    })
  }

  // 🧾 Update comment
  const handleCommentChange = (category, index, value) => {
    setIndicators(prev => {
      const updated = { ...prev }
      updated[category][index].comment = value
      return updated
    })
  }

  // 🚀 Prepare formatted body
  const prepareSubmitBody = () => ({
    employeeReviewId: _id,
    performanceRating: Object.keys(indicators).map(category => ({
      indicatorCategory: indicators[category][0]?.category?._id,
      performanceRating: indicators[category].map(ind => ({
        indicator: ind._id,
        rating: ind.rating.toString(),
        comment: ind.comment
      }))
    }))
  })

  // 🚀 Submit handler
  const handleSubmit = async () => {
    try {
      setSubmitting(true)
      const payload = prepareSubmitBody()
      console.log('📦 Final Submit Body:', payload)

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/zobiz/save-employee-performance-rating`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        }
      )

      const data = await res.json()
      console.log('✅ Review submitted:', data)

      if (res.ok && data.success) {
        setSnackbar({
          open: true,
          message: data.message || 'Review submitted successfully!',
          severity: 'success'
        })
      } else {
        setSnackbar({
          open: true,
          message: data.message || 'Failed to submit review.',
          severity: 'error'
        })
      }
    } catch (error) {
      console.error('❌ Error submitting review:', error)
      setSnackbar({
        open: true,
        message: 'Something went wrong while submitting.',
        severity: 'error'
      })
    } finally {
      setSubmitting(false)
    }
  }

  // 🕓 Loader
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

  // 🧱 UI
  return (
    <Box p={4} sx={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      {/* 🔔 Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MuiAlert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          variant='filled'
          sx={{
            width: '100%',
            backgroundColor: snackbar.severity === 'success' ? '#2B3380' : '#D32F2F',
            color: 'white',
            fontWeight: 500
          }}
        >
          {snackbar.message}
        </MuiAlert>
      </Snackbar>

      {/* 🔙 Back Button */}
      <Button
        variant='outlined'
        sx={{
          mb: 3,
          borderRadius: 2,
          fontWeight: 500,
          textTransform: 'none'
        }}
        onClick={() => window.history.back()}
      >
        Back to Reviews
      </Button>

      <Typography variant='h4' fontWeight='bold' mb={3}>
        Conduct Performance Review
      </Typography>

      {/* Review Info */}
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
        <Typography variant='h5' fontWeight='bold'>
          Review Information
        </Typography>
        <Typography variant='body2' color='text.secondary' mb={3}>
          You are conducting a performance review for:
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Typography fontWeight='500'>Employee</Typography>
            <Typography variant='h6' fontWeight='bold'>
              {review.employeeName || '-'}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography fontWeight='500'>Reviewer</Typography>
            <Typography variant='h6' fontWeight='bold'>
              {review.reviewerName || '-'}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography fontWeight='500'>Review Cycle</Typography>
            <Typography variant='h6' fontWeight='bold'>
              {review.reviewCycleName || '-'}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Typography fontWeight='500'>Review Date</Typography>
            <Typography variant='h6' fontWeight='bold'>
              {review.reviewDate
                ? new Date(review.reviewDate).toLocaleDateString()
                : '-'}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Typography fontWeight='500'>Status</Typography>
            <Chip
              label={review.status || 'Pending'}
              color={
                review.status === 'Completed'
                  ? 'success'
                  : review.status === 'Scheduled'
                  ? 'info'
                  : 'warning'
              }
              variant='outlined'
              size='small'
            />
          </Grid>
        </Grid>
      </Paper>

      {/* Performance Indicators */}
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
        <Typography variant='h5' fontWeight='bold' mb={2}>
          Performance Indicators
        </Typography>

        {Object.keys(indicators).map(category => (
          <Box key={category} mb={4}>
            <Typography
              variant='subtitle1'
              fontWeight='bold'
              mb={2}
              sx={{
                pb: 1,
                borderBottom: '2px solid #f0f0f0',
                color: 'text.primary'
              }}
            >
              {category}
            </Typography>

            {indicators[category].map((indicator, index) => (
              <Box
                key={indicator._id}
                sx={{
                  border: '1px solid #eaeaea',
                  borderRadius: 2,
                  p: 3,
                  mb: 3,
                  backgroundColor: '#fcfcfc'
                }}
              >
                <Box
                  display='flex'
                  justifyContent='space-between'
                  alignItems='center'
                  mb={1}
                >
                  <Typography fontWeight='600' fontSize='1rem'>
                    {indicator.indicatorName}
                  </Typography>
                  <Typography
                    display='flex'
                    alignItems='center'
                    gap={0.5}
                    fontWeight='500'
                    color='primary.main'
                  >
                    {indicator.rating} {renderStars(indicator.rating)}
                  </Typography>
                </Box>

                <Typography variant='body2' color='text.secondary' mb={2}>
                  {indicator.description}
                </Typography>

                <Typography variant='body2' fontWeight='500' mb={1}>
                  Rating
                </Typography>
                <Slider
                  value={indicator.rating}
                  min={1}
                  max={5}
                  step={0.5}
                  marks={[
                    { value: 1, label: 'Poor' },
                    { value: 3, label: 'Average' },
                    { value: 5, label: 'Excellent' }
                  ]}
                  valueLabelDisplay='auto'
                  onChange={(_, value) =>
                    handleRatingChange(category, index, value)
                  }
                  sx={{
                    color: 'primary.main',
                    '& .MuiSlider-markLabel': {
                      mt: 2,
                      fontSize: 12,
                      color: '#777'
                    }
                  }}
                />

                <Typography variant='body2' fontWeight='500' mt={2} mb={1}>
                  Comments
                </Typography>
                <TextField
                  fullWidth
                  multiline
                  minRows={2}
                  placeholder='Add feedback...'
                  value={indicator.comment}
                  onChange={e =>
                    handleCommentChange(category, index, e.target.value)
                  }
                />
              </Box>
            ))}
            <Divider sx={{ my: 4 }} />
          </Box>
        ))}
      </Paper>

      {/* ✅ Submit Button */}
      <Box display='flex' justifyContent='flex-end' gap={2}>
        <Button
          variant='contained'
          color='primary'
          sx={{ borderRadius: 2, px: 4 }}
          disabled={submitting}
          onClick={handleSubmit}
        >
          {submitting ? 'Submitting...' : 'Submit Review'}
        </Button>
      </Box>
    </Box>
  )
}

export default ReviewDetailsPage






