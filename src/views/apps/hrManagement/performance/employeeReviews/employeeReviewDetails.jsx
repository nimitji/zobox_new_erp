'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { Card, Typography, Grid, Chip, Box, CircularProgress } from '@mui/material'
import StarIcon from '@mui/icons-material/Star'
import Divider from '@mui/material/Divider'

// 🧠 API
import { fetchEmployeeReviewById } from '../../../../../app/server/actions'

// 📦 Custom Components
import CustomTextField from '@core/components/mui/TextField'

const ReviewDetailsPage = () => {
  const { id } = useParams()
  const [review, setReview] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadReview = async () => {
      try {
        const res = await fetchEmployeeReviewById(id)
        setReview(res.data)
      } catch (err) {
        console.error('Error fetching review details:', err)
      } finally {
        setLoading(false)
      }
    }
    if (id) loadReview()
  }, [id])

  if (loading) return <CircularProgress sx={{ m: 4 }} />

  if (!review)
    return <Typography sx={{ p: 4 }}>No review details found for this ID.</Typography>

  return (
    <Box p={4}>
      <Typography variant='h4' fontWeight='bold' mb={3}>
        Review Details
      </Typography>

      {/* 🔹 Review Information */}
      <Card variant='outlined' sx={{ p: 4, mb: 3 }}>
        <Typography variant='h6' mb={1}>
          Review Information
        </Typography>
        <Typography variant='body2' color='text.secondary' mb={3}>
          Details about this performance review
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <CustomTextField label='Employee' value={review.employeeName || '-'} fullWidth InputProps={{ readOnly: true }} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomTextField label='Reviewer' value={review.reviewerName || '-'} fullWidth InputProps={{ readOnly: true }} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomTextField label='Review Cycle' value={review.reviewCycleName || '-'} fullWidth InputProps={{ readOnly: true }} />
          </Grid>
          <Grid item xs={12} sm={3}>
            <CustomTextField label='Review Date' value={review.reviewDate || '-'} fullWidth InputProps={{ readOnly: true }} />
          </Grid>
          <Grid item xs={12} sm={3}>
            <CustomTextField
              label='Status'
              value={review.status}
              fullWidth
              InputProps={{ readOnly: true }}
            />
          </Grid>
        </Grid>
      </Card>

      {/* ⭐ Overall Rating */}
      <Card variant='outlined' sx={{ p: 4, mb: 3 }}>
        <Typography variant='h6'>Overall Rating</Typography>
        <Divider sx={{ my: 2 }} />
        <Box display='flex' alignItems='center' justifyContent='space-between'>
          <Typography variant='body1'>
            {review.comments || 'No comments provided.'}
          </Typography>
          <Typography variant='h5' color='primary' display='flex' alignItems='center' gap={1}>
            {review.rating ?? '-'}
            <StarIcon fontSize='medium' color='warning' />
          </Typography>
        </Box>
      </Card>

      {/* 🧩 Performance Ratings */}
      <Card variant='outlined' sx={{ p: 4 }}>
        <Typography variant='h6' mb={2}>
          Performance Ratings
        </Typography>
        {review.performanceRating && review.performanceRating.length > 0 ? (
          review.performanceRating.map((item, index) => (
            <Box key={index} mb={3}>
              <Typography variant='subtitle1' fontWeight='bold'>
                {item.category}
              </Typography>
              <Typography variant='body2' color='text.secondary' mb={1}>
                {item.indicator}
              </Typography>
              <Typography display='flex' alignItems='center' gap={1}>
                <span>{item.score ?? '-'}</span>
                <StarIcon fontSize='small' color='warning' />
              </Typography>
              <Divider sx={{ my: 2 }} />
            </Box>
          ))
        ) : (
          <Typography>No performance ratings found.</Typography>
        )}
      </Card>
    </Box>
  )
}

export default ReviewDetailsPage
