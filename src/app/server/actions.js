/**
 * ! The server actions below are used to fetch the static data from the fake-db. If you're using an ORM
 * ! (Object-Relational Mapping) or a database, you can swap the code below with your own database queries.
 */
'use server'

// Data Imports
import { db as eCommerceData } from '@/fake-db/apps/ecommerce'
import { db as academyData } from '@/fake-db/apps/academy'
import { db as vehicleData } from '@/fake-db/apps/logistics'
import { db as invoiceData } from '@/fake-db/apps/invoice'
import { db as userData } from '@/fake-db/apps/userList'
import { db as permissionData } from '@/fake-db/apps/permissions'
import { db as profileData } from '@/fake-db/pages/userProfile'
import { db as faqData } from '@/fake-db/pages/faq'
import { db as pricingData } from '@/fake-db/pages/pricing'
import { db as statisticsData } from '@/fake-db/pages/widgetExamples'

export const getEcommerceData = async () => {
  return eCommerceData
}

export const getAcademyData = async () => {
  return academyData
}

export const getLogisticsData = async () => {
  return vehicleData
}

export const getInvoiceData = async () => {
  return invoiceData
}

export const getUserDatas = async () => {
  return userData
}

// src/app/server/actions.js

export const getUserData = async () => {
  const res = await fetch(`${process.env.API_URL}/zobiz/fetch-role`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
     
    },
    cache: 'no-store' // ensures fresh data every request
  })

  if (!res.ok) {
    const errorText = await res.text()
    throw new Error(`Failed to fetch roles: ${errorText}`)
  }

  const data = await res.json()
  console.log("DEBUG",data)
  return data?.data || [] // adjust if your backend wraps response differently
}

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'

export const createBranch = async (formData) => {
  try {
    // Map form fields to backend expected structure
    const payload = {
      branchName: formData.fullName, // ya koi aur field jo branch ka name ho
      address: {
        Plot: formData.fullName, // yahan form me Plot field nahi hai, address ka pura text use kar sakte ho
        City: formData.username, // username ko City ke liye use kiya
        State: formData.state || '', // agar tumhare form me state field hai to
        Country: formData.country,
        Pincode: formData.pincode || '' // agar tumhare form me pincode hai
      },
      contact: {
        phone: formData.contact,
        emailid: formData.email
      },
      status: formData.status
    }

    const res = await fetch(`${API_BASE}/zobiz/create-branch`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload),
      cache: 'no-store'
    })

    if (!res.ok) {
      const errorText = await res.text()
      throw new Error(`Failed to create branch: ${errorText}`)
    }

    const data = await res.json()
    console.log("DEBUG createBranch:", data)
    return data
  } catch (err) {
    console.error('Failed to create branch:', err)
    throw err
  }
}



export const getPermissionsData = async () => {
  return permissionData
}

export const getProfileData = async () => {
  return profileData
}

export const getFaqData = async () => {
  return faqData
}

export const getPricingData = async () => {
  return pricingData
}

export const getStatisticsData = async () => {
  return statisticsData
}
