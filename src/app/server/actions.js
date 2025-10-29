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


export const createBranch = async (formData) => {
  try {
    // Map form fields to backend expected structure
    const payload = {
      branchName: formData.branchName, // ya koi aur field jo branch ka name ho
      address: {
        Plot: formData.Plot, // yahan form me Plot field nahi hai, address ka pura text use kar sakte ho
        City: formData.City, // username ko City ke liye use kiya
        State: formData.State || '', // agar tumhare form me state field hai to
        Country: formData.Country,
        Pincode: formData.Pincode || '' // agar tumhare form me pincode hai
      },
      contact: {
        phone: formData.phone,
        emailid: formData.emailid
      },
      status: formData.status
    }
console.log("TODAYDEBUG",formData,payload)
    const res = await fetch(`${process.env.API_URL}/zobiz/create-branch`, {
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

    const branchData = await res.json()
    console.log("DEBUG createBranch:", branchData)
    return branchData
  } catch (err) {
    console.error('Failed to create branch:', err)
    throw err
  }
}




export const fetchBranches = async () => {
  try {
    const res = await fetch(`${process.env.API_URL}/zobiz/fetch-branch`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      cache: 'no-store' // ensures latest data
    })

    if (!res.ok) {
      const errorText = await res.text()
      throw new Error(`Failed to fetch branches: ${errorText}`)
    }

    const data = await res.json()
    console.log('Fetched Branch Data:', data)
    return data.data // return only branch array
  } catch (error) {
    console.error('Error fetching branches:', error)
    throw error
  }
}

export const fetchCountBranches = async () => {
  try {
    const res = await fetch(`${process.env.API_URL}/zobiz/total-count-branch`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      cache: 'no-store' // ensures latest data
    })

    if (!res.ok) {
      const errorText = await res.text()
      throw new Error(`Failed to fetch branches: ${errorText}`)
    }

    const data = await res.json()
    console.log('Fetched Count Branch Data:', data)
    return data.data // return only branch array
  } catch (error) {
    console.error('Error fetching branches:', error)
    throw error
  }
}

export const createDepartment = async (formData) => {
  try {
    // Map form fields to backend expected structure
    const payload = formData
console.log("TODAYDEBUG",formData,payload)
    const res = await fetch(`${process.env.API_URL}/zobiz/create-department`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload),
      cache: 'no-store'
    })

    if (!res.ok) {
      const errorText = await res.text()
      throw new Error(`Failed to create department: ${errorText}`)
    }

    const departmentData = await res.json()
    console.log("DEBUG createDepartment:", departmentData)
    return departmentData
  } catch (err) {
    console.error('Failed to create department:', err)
    throw err
  }
}

export const fetchCountDepartments = async () => {
  try {
    const res = await fetch(`${process.env.API_URL}/zobiz/total-count-department`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      cache: 'no-store' // ensures latest data
    })

    if (!res.ok) {
      const errorText = await res.text()
      throw new Error(`Failed to fetch data: ${errorText}`)
    }

    const data = await res.json()
    console.log('Fetched Count Department Data:', data)
    return data.data // return only branch array
  } catch (error) {
    console.error('Error fetching Department:', error)
    throw error
  }
}

export const fetchDepartments = async () => {
  try {
    const res = await fetch(`${process.env.API_URL}/zobiz/fetch-department`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      cache: 'no-store' // ensures latest data
    })

    if (!res.ok) {
      const errorText = await res.text()
      throw new Error(`Failed to fetch departments: ${errorText}`)
    }

    const data = await res.json()
    console.log('Fetched Department Data:', data)
    return data.data // return only branch array
  } catch (error) {
    console.error('Error fetching departments:', error)
    throw error
  }
}


export const fetchListOfBranch = async () => {
  try {
    const res = await fetch(`${process.env.API_URL}/zobiz/list-of-branch`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      cache: 'no-store' // ensures latest data
    })

    if (!res.ok) {
      const errorText = await res.text()
      throw new Error(`Failed to fetch departments: ${errorText}`)
    }

    const data = await res.json()
    console.log(' Data:', data)
    return data.data // return only branch array
  } catch (error) {
    console.error('Error fetching:', error)
    throw error
  }
}

export const editDepartment = async (formData) => {
  try {
    // Map form fields to backend expected structure
    const payload = formData
    console.log("TODAYDEBUG",formData,payload)
    const res = await fetch(`${process.env.API_URL}/zobiz/edit-department-details`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload),
      cache: 'no-store'
    })

    if (!res.ok) {
      const errorText = await res.text()
      throw new Error(`Failed to create department: ${errorText}`)
    }

    const departmentData = await res.json()
    console.log("DEBUG updateDeaprtment:", departmentData)
    return departmentData
  } catch (err) {
    console.error('Failed to update department:', err)
    throw err
  }
}


export const editBranch = async (formData) => {
  try {
    // Map form fields to backend expected structure
    const payload = {
      _id:formData._id,
      branchName: formData.branchName, // ya koi aur field jo branch ka name ho
      address: {
        Plot: formData.Plot, // yahan form me Plot field nahi hai, address ka pura text use kar sakte ho
        City: formData.City, // username ko City ke liye use kiya
        State: formData.State || '', // agar tumhare form me state field hai to
        Country: formData.Country,
        Pincode: formData.Pincode || '' // agar tumhare form me pincode hai
      },
      contact: {
        phone: formData.phone,
        emailid: formData.emailid
      },
      status: formData.status
    }
console.log("TODAYDEBUG",formData,payload)
    const res = await fetch(`${process.env.API_URL}/zobiz/edit-branch-details`, {
      method: 'PUT',
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

    const branchData = await res.json()
    console.log("DEBUG updateBranch:", branchData)
    return branchData
  } catch (err) {
    console.error('Failed to update branch:', err)
    throw err
  }
}

export const fetchListOfDepartment = async () => {
  try {
    const res = await fetch(`${process.env.API_URL}/zobiz/list-of-department`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      cache: 'no-store' // ensures latest data
    })

    if (!res.ok) {
      const errorText = await res.text()
      throw new Error(`Failed to fetch departments: ${errorText}`)
    }

    const data = await res.json()
    console.log(' Data:', data)
    return data.data // return only branch array
  } catch (error) {
    console.error('Error fetching:', error)
    throw error
  }
}

export const createDesignation = async (formData) => {
  try {
    // Map form fields to backend expected structure
    const payload = formData
console.log("TODAYDEBUG",formData,payload)
    const res = await fetch(`${process.env.API_URL}/zobiz/create-designation`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload),
      cache: 'no-store'
    })

    if (!res.ok) {
      const errorText = await res.text()
      throw new Error(`Failed to create department: ${errorText}`)
    }

    const departmentData = await res.json()
    console.log("DEBUG createDepartment:", departmentData)
    return departmentData
  } catch (err) {
    console.error('Failed to create department:', err)
    throw err
  }
}

export const fetchCountDesignation = async () => {
  try {
    const res = await fetch(`${process.env.API_URL}/zobiz/total-count-designation`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      cache: 'no-store' // ensures latest data
    })

    if (!res.ok) {
      const errorText = await res.text()
      throw new Error(`Failed to fetch data: ${errorText}`)
    }

    const data = await res.json()
    console.log('Fetched Count Department Data:', data)
    return data.data // return only branch array
  } catch (error) {
    console.error('Error fetching Department:', error)
    throw error
  }
}

export const fetchDesignation = async () => {
  try {
    const res = await fetch(`${process.env.API_URL}/zobiz/fetch-designation`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      cache: 'no-store' // ensures latest data
    })

    if (!res.ok) {
      const errorText = await res.text()
      throw new Error(`Failed to fetch departments: ${errorText}`)
    }

    const data = await res.json()
    console.log('Fetched Department Data:', data)
    return data.data // return only branch array
  } catch (error) {
    console.error('Error fetching departments:', error)
    throw error
  }
}

export const editDesignation = async (formData) => {
  try {
    // Map form fields to backend expected structure
    const payload = formData
console.log("TODAYDEBUG",formData,payload)
    const res = await fetch(`${process.env.API_URL}/zobiz/edit-designation-details`, {
      method: 'PUT',
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

    const branchData = await res.json()
    console.log("DEBUG updateBranch:", branchData)
    return branchData
  } catch (err) {
    console.error('Failed to update branch:', err)
    throw err
  }
}

export const createDocuments = async (formData) => {
  try {
    // Map form fields to backend expected structure
    const payload = formData
console.log("TODAYDEBUG",formData,payload)
    const res = await fetch(`${process.env.API_URL}/zobiz/create-document-data`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload),
      cache: 'no-store'
    })

    if (!res.ok) {
      const errorText = await res.text()
      throw new Error(`Failed to create department: ${errorText}`)
    }

    const departmentData = await res.json()
    console.log("DEBUG createDepartment:", departmentData)
    return departmentData
  } catch (err) {
    console.error('Failed to create department:', err)
    throw err
  }
}
export const fetchCountDocument = async () => {
  try {
    const res = await fetch(`${process.env.API_URL}/zobiz/total-count-document`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      cache: 'no-store' // ensures latest data
    })

    if (!res.ok) {
      const errorText = await res.text()
      throw new Error(`Failed to fetch data: ${errorText}`)
    }

    const data = await res.json()
    console.log('Fetched Count Document Data:', data)
    return data.data // return only branch array
  } catch (error) {
    console.error('Error fetching Document:', error)
    throw error
  }
}

export const fetchDocument = async () => {
  try {
    const res = await fetch(`${process.env.API_URL}/zobiz/fetch-document-data`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      cache: 'no-store' // ensures latest data
    })

    if (!res.ok) {
      const errorText = await res.text()
      throw new Error(`Failed to fetch documents: ${errorText}`)
    }

    const data = await res.json()
    console.log('Fetched Document Data:', data)
    return data.data // return only branch array
  } catch (error) {
    console.error('Error fetching documents:', error)
    throw error
  }
}

export const editDocument = async (formData) => {
  try {
    // Map form fields to backend expected structure
    const payload = formData
console.log("TODAYDEBUG",formData,payload)
    const res = await fetch(`${process.env.API_URL}/zobiz/edit-document-details`, {
      method: 'PUT',
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

    const branchData = await res.json()
    console.log("DEBUG updateBranch:", branchData)
    return branchData
  } catch (err) {
    console.error('Failed to update branch:', err)
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
