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
import { encrypt, decrypt } from '@/utils/crypto'

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

  console.log("DEBUG", data)

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

    console.log("TODAYDEBUG", formData, payload)

    //  const encryptedData = encrypt(JSON.stringify(payload));

    const res = await fetch(`${process.env.API_URL}/zobiz/create-branch`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        payload
      }),
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

// --------------fetchBranches---------------//
export const fetchBranches = async () => {
  try {
    const res = await fetch(`${process.env.API_URL}/zobiz/fetch-branch`,
      // const res = await fetch(`https://jaycon.live.kevalindigital.com/jaycon/fetch-branch`,
      {
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

    //     const data = await res.json()

    //     console.log('Fetched Branch Data:', data)

    //     // const decryptedPayload= decrypt(data.data)
    //     //  const parsedBody = JSON.parse(decryptedPayload);

    //     return data.data // return only branch array
    //   } catch (error) {
    //     console.error('Error fetching branches:', error)
    //     throw error
    //   }
    // }
    const data = await res.json();

    console.log("Fetched Encrypted Branch Data:", data);

    // ✅ Decrypt the response
    const decryptedPayload = decrypt(data.data);

    // ✅ Convert decrypted string → JSON
    const parsedBody = JSON.parse(decryptedPayload);

    console.log("Decrypted Branch Data:", parsedBody);

    return parsedBody; // final usable data
  } catch (error) {
    console.error("Error fetching branch data:", error.message);
    throw error;
  }
}

// ------fetch count branches----//
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

      throw new Error(`Failed to fetch branch count: ${errorText}`)
    }

    //     const data = await res.json()
    //     // const decryptedPayload= decrypt(data.data)
    //     //  const parsedBody = JSON.parse(decryptedPayload);

    //     // console.log('Fetched Count Branch Data:', data)

    //     return data.data // return only branch array
    //   } catch (error) {
    //     console.error('Error fetching branches:', error)
    //     throw error
    //   }
    // }
    const data = await res.json();

    console.log("Fetched Encrypted Branch Count Data:", data);

    // ✅ Decrypt the response
    const decryptedPayload = decrypt(data.data);

    // ✅ Convert decrypted string → JSON
    const parsedBody = JSON.parse(decryptedPayload);

    console.log("Decrypted Branch Count Data:", parsedBody);

    return parsedBody; // final usable data
  } catch (error) {
    console.error("Error fetching branch count:", error.message);
    throw error;
  }
}

// ---create department---//
export const createDepartment = async (formData) => {
  try {
    // Map form fields to backend expected structure
    const payload = formData

    console.log("TODAYDEBUG", formData, payload)

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

    //     return departmentData
    //   } catch (err) {
    //     console.error('Failed to create department:', err)
    //     throw err
    //   }
    // }

    // ✅ Decrypt the response
    const decryptedPayload = decrypt(departmentData.data);

    // ✅ Convert decrypted string → JSON
    const parsedBody = JSON.parse(decryptedPayload);

    console.log("Decrypted Create Department Data:", parsedBody);

    return parsedBody; // final usable data
  } catch (error) {
    console.error("Error fetching Create Department Data:", error.message);
    throw error;
  }
}

//----count depatrment----//
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

    //     return data.data // return only branch array
    //   } catch (error) {
    //     console.error('Error fetching Department:', error)
    //     throw error
    //   }
    // }

    // ✅ Decrypt the response
    const decryptedPayload = decrypt(data.data);

    // ✅ Convert decrypted string → JSON
    const parsedBody = JSON.parse(decryptedPayload);

    console.log("Decrypted Branch Count Data:", parsedBody);

    return parsedBody; // final usable data
  } catch (error) {
    console.error("Error fetching department count:", error.message);
    throw error;
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

    //     return data.data // return only branch array
    //   } catch (error) {
    //     console.error('Error fetching departments:', error)
    //     throw error
    //   }
    // }

    // ✅ Decrypt the response
    const decryptedPayload = decrypt(data.data);

    // ✅ Convert decrypted string → JSON
    const parsedBody = JSON.parse(decryptedPayload);

    console.log("Decrypted Department Data:", parsedBody);

    return parsedBody; // final usable data
  } catch (error) {
    console.error("Error fetching Department data:", error.message);
    throw error;
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

    console.log('List of Branch Data:', data)

    //     return data.data // return only branch array
    //   } catch (error) {
    //     console.error('Error fetching:', error)
    //     throw error
    //   }
    // }
    // ✅ Decrypt the response
    const decryptedPayload = decrypt(data.data);

    // ✅ Convert decrypted string → JSON
    const parsedBody = JSON.parse(decryptedPayload);

    console.log("Decrypted List of Branch Data:", parsedBody);

    return parsedBody; // final usable data
  } catch (error) {
    console.error("Error fetching List of Branch Data:", error.message);
    throw error;
  }
}

export const editDepartment = async (formData) => {
  try {
    // Map form fields to backend expected structure
    const payload = formData

    console.log("TODAYDEBUG", formData, payload)

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

    //     return departmentData
    //   } catch (err) {
    //     console.error('Failed to update department:', err)
    //     throw err
    //   }
    // }
    // ✅ Decrypt the response
    const decryptedPayload = decrypt(departmentData.data);

    // ✅ Convert decrypted string → JSON
    const parsedBody = JSON.parse(decryptedPayload);

    console.log("Decrypted edit dept Data:", parsedBody);

    return parsedBody; // final usable data
  } catch (error) {
    console.error("Error fetching editdept Data:", error.message);
    throw error;
  }
}


export const editBranch = async (formData) => {
  try {
    // Map form fields to backend expected structure
    const payload = {
      _id: formData._id,
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

    console.log("TODAYDEBUG", formData, payload)

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
    // ✅ Decrypt the response
    const decryptedPayload = decrypt(branchData.data);

    // ✅ Convert decrypted string → JSON
    const parsedBody = JSON.parse(decryptedPayload);

    console.log("Decrypted edit Branch Data:", parsedBody);

    return parsedBody; // final usable data
  } catch (error) {
    console.error("Error fetching edit Branch Data:", error.message);
    throw error;
  }
}
//     return branchData
//   } catch (err) {
//     console.error('Failed to update branch:', err)
//     throw err
//   }
// }

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
    // ✅ Decrypt the response
    const decryptedPayload = decrypt(data.data);

    // ✅ Convert decrypted string → JSON
    const parsedBody = JSON.parse(decryptedPayload);

    console.log("Decrypted List of dept Data:", parsedBody);

    return parsedBody; // final usable data
  } catch (error) {
    console.error("Error fetching List of dept Data:", error.message);
    throw error;
  }
}
//     return data.data // return only branch array
//   } catch (error) {
//     console.error('Error fetching:', error)
//     throw error
//   }
// }

export const createDesignation = async (formData) => {
  try {
    // Map form fields to backend expected structure
    const payload = formData

    console.log("TODAYDEBUG", formData, payload)

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

    console.log("DEBUG createDesignation:", departmentData)
    // ✅ Decrypt the response
    const decryptedPayload = decrypt(departmentData.data);

    // ✅ Convert decrypted string → JSON
    const parsedBody = JSON.parse(decryptedPayload);

    console.log("Decrypted create Designation Data:", parsedBody);

    return parsedBody; // final usable data
  } catch (error) {
    console.error("Error fetching create Designation Data:", error.message);
    throw error;
  }
}
// return departmentData
//   } catch (err) {
//     console.error('Failed to create department:', err)
//     throw err
//   }
// }

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
    // ✅ Decrypt the response
    const decryptedPayload = decrypt(data.data);

    // ✅ Convert decrypted string → JSON
    const parsedBody = JSON.parse(decryptedPayload);

    console.log("Decrypted create Designation Data:", parsedBody);

    return parsedBody; // final usable data
  } catch (error) {
    console.error("Error fetching List of Branch Data:", error.message);
    throw error;
  }
}
//     return data.data // return only branch array
//   } catch (error) {
//     console.error('Error fetching Department:', error)
//     throw error
//   }
// }

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

      throw new Error(`Failed to fetchDesignation: ${errorText}`)
    }

    const data = await res.json()

    console.log('Fetched Department Data:', data)
    // ✅ Decrypt the response
    const decryptedPayload = decrypt(data.data);

    // ✅ Convert decrypted string → JSON
    const parsedBody = JSON.parse(decryptedPayload);

    console.log("Decrypted fetchDesignation Data:", parsedBody);

    return parsedBody; // final usable data
  } catch (error) {
    console.error("Error fetching Designation Data:", error.message);
    throw error;
  }
}
//   return data.data // return only branch array
// } catch (error) {
//   console.error('Error fetching departments:', error)
//   throw error
// }
// }

export const editDesignation = async (formData) => {
  try {
    // Map form fields to backend expected structure
    const payload = formData

    console.log("TODAYDEBUG", formData, payload)

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
    // ✅ Decrypt the response
    const decryptedPayload = decrypt(branchData.data);

    // ✅ Convert decrypted string → JSON
    const parsedBody = JSON.parse(decryptedPayload);

    console.log("Decrypted editDesignation Data:", parsedBody);

    return parsedBody; // final usable data
  } catch (error) {
    console.error("Error fetching editDesignation Data:", error.message);
    throw error;
  }
}
//     return branchData
//   } catch (err) {
//     console.error('Failed to update branch:', err)
//     throw err
//   }
// }

export const createDocuments = async (formData) => {
  try {
    // Map form fields to backend expected structure
    const payload = formData

    console.log("TODAYDEBUG", formData, payload)

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

    console.log("DEBUG createDocuments:", departmentData)
    // ✅ Decrypt the response
    const decryptedPayload = decrypt(departmentData.data);

    // ✅ Convert decrypted string → JSON
    const parsedBody = JSON.parse(decryptedPayload);

    console.log("Decrypted createDocuments Data:", parsedBody);

    return parsedBody; // final usable data
  } catch (error) {
    console.error("Error fetching createDocuments Data:", error.message);
    throw error;
  }
}
//     return departmentData
//   } catch (err) {
//     console.error('Failed to create department:', err)
//     throw err
//   }
// }

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
    // ✅ Decrypt the response
    const decryptedPayload = decrypt(data.data);

    // ✅ Convert decrypted string → JSON
    const parsedBody = JSON.parse(decryptedPayload);

    console.log("Decrypted fetchCountDocument Data:", parsedBody);

    return parsedBody; // final usable data
  } catch (error) {
    console.error("Error fetching fetchCountDocument Data:", error.message);
    throw error;
  }
}
//     return data.data // return only branch array
//   } catch (error) {
//     console.error('Error fetching Document:', error)
//     throw error
//   }
// }

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
    // ✅ Decrypt the response
    const decryptedPayload = decrypt(data.data);

    // ✅ Convert decrypted string → JSON
    const parsedBody = JSON.parse(decryptedPayload);

    console.log("Decrypted  Data:", parsedBody);

    return parsedBody; // final usable data
  } catch (error) {
    console.error("Error fetching  Data:", error.message);
    throw error;
  }
}
//     return data.data // return only branch array
//   } catch (error) {
//     console.error('Error fetching documents:', error)
//     throw error
//   }
// }

export const editDocument = async (formData) => {
  try {
    // Map form fields to backend expected structure
    const payload = formData

    console.log("TODAYDEBUG", formData, payload)

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
    // ✅ Decrypt the response
    const decryptedPayload = decrypt(branchData.data);

    // ✅ Convert decrypted string → JSON
    const parsedBody = JSON.parse(decryptedPayload);

    console.log("Decrypted  Data:", parsedBody);

    return parsedBody; // final usable data
  } catch (error) {
    console.error("Error fetching  Data:", error.message);
    throw error;
  }
}
//     return branchData
//   } catch (err) {
//     console.error('Failed to update branch:', err)
//     throw err
//   }
// }


export const fetchListOfRole = async () => {
  try {
    const res = await fetch(`${process.env.API_URL}/zobiz/fetch-role-list`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      cache: 'no-store' // ensures latest data
    })

    if (!res.ok) {
      const errorText = await res.text()

      throw new Error(`Failed to fetch roles: ${errorText}`)
    }

    const data = await res.json()

    console.log(' DataPOOJA:', data)
    // ✅ Decrypt the response
    const decryptedPayload = decrypt(data.data);

    // ✅ Convert decrypted string → JSON
    const parsedBody = JSON.parse(decryptedPayload);

    console.log("Decrypted  Data:", parsedBody);

    return parsedBody; // final usable data
  } catch (error) {
    console.error("Error fetching t Data:", error.message);
    throw error;
  }
}
//     return data.data // return only branch array
//   } catch (error) {
//     console.error('Error fetching:', error)
//     throw error
//   }
// }

export const fetchListOfDesignation = async () => {
  try {
    const res = await fetch(`${process.env.API_URL}/zobiz/list-of-designation`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      cache: 'no-store' // ensures latest data
    })

    if (!res.ok) {
      const errorText = await res.text()

      throw new Error(`Failed to fetch designation: ${errorText}`)
    }

    const data = await res.json()

    console.log(' Data:', data)
    // ✅ Decrypt the response
    const decryptedPayload = decrypt(data.data);

    // ✅ Convert decrypted string → JSON
    const parsedBody = JSON.parse(decryptedPayload);

    console.log("Decrypted t Data:", parsedBody);

    return parsedBody; // final usable data
  } catch (error) {
    console.error("Error fetching  Data:", error.message);
    throw error;
  }
}
//     return data.data // return only branch array
//   } catch (error) {
//     console.error('Error fetching:', error)
//     throw error
//   }
// }

export const fetchListOfDesignationBasedOnDepartment = async (selectedDepartment) => {
  try {
    const res = await fetch(`${process.env.API_URL}/zobiz/fetch-designations-by-department/${selectedDepartment}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      cache: 'no-store' // ensures latest data
    })

    if (!res.ok) {
      const errorText = await res.text()

      throw new Error(`Failed to fetch designation: ${errorText}`)
    }

    const data = await res.json()

    console.log(' Data:', data)
    // ✅ Decrypt the response
    const decryptedPayload = decrypt(data.data);

    // ✅ Convert decrypted string → JSON
    const parsedBody = JSON.parse(decryptedPayload);

    console.log("Decrypted  Data:", parsedBody);

    return parsedBody; // final usable data
  } catch (error) {
    console.error("Error fetching Data:", error.message);
    throw error;
  }
}
//     return data.data // return only branch array
//   } catch (error) {
//     console.error('Error fetching:', error)
//     throw error
//   }
// }

export const fetchListOfUser = async () => {
  try {
    const res = await fetch(`${process.env.API_URL}/zobiz/list-of-users`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      cache: 'no-store' // ensures latest data
    })

    if (!res.ok) {
      const errorText = await res.text()

      throw new Error(`Failed to fetch user: ${errorText}`)
    }

    const data = await res.json()

    console.log(' Data:', data)
    // ✅ Decrypt the response
    const decryptedPayload = decrypt(data.data);

    // ✅ Convert decrypted string → JSON
    const parsedBody = JSON.parse(decryptedPayload);

    console.log("Decrypted  Data:", parsedBody);

    return parsedBody; // final usable data
  } catch (error) {
    console.error("Error fetching  Data:", error.message);
    throw error;
  }
}
//     return data.data // return only branch array
//   } catch (error) {
//     console.error('Error fetching:', error)
//     throw error
//   }
// }


export const fetchListOfAwardTypes = async () => {
  try {
    const res = await fetch(`${process.env.API_URL}/zobiz/list-of-award-types`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      cache: 'no-store' // ensures latest data
    })

    if (!res.ok) {
      const errorText = await res.text()

      throw new Error(`Failed to fetch user: ${errorText}`)
    }

    const data = await res.json()

    console.log(' Data:', data)
    // ✅ Decrypt the response
    const decryptedPayload = decrypt(data.data);

    // ✅ Convert decrypted string → JSON
    const parsedBody = JSON.parse(decryptedPayload);

    console.log("Decrypted  Data:", parsedBody);

    return parsedBody; // final usable data
  } catch (error) {
    console.error("Error fetching  Data:", error.message);
    throw error;
  }
}
//     return data.data // return only branch array
//   } catch (error) {
//     console.error('Error fetching:', error)
//     throw error
//   }
// }

export const createEmployee = async (formData) => {
  try {
    // Map form fields to backend expected structure
    const payload = formData

    console.log("TODAYDEBUG", formData, payload)

    const res = await fetch(`${process.env.API_URL}/zobiz/create-employee`, {
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

    const employeeData = await res.json()

    console.log("DEBUG createDepartment:", employeeData)
    // ✅ Decrypt the response
    const decryptedPayload = decrypt(employeeData.data);

    // ✅ Convert decrypted string → JSON
    const parsedBody = JSON.parse(decryptedPayload);

    console.log("Decrypted  Data:", parsedBody);

    return parsedBody; // final usable data
  } catch (error) {
    console.error("Error fetching  Data:", error.message);
    throw error;
  }
}
//     return employeeData
//   } catch (err) {
//     console.error('Failed to create department:', err)
//     throw err
//   }
// }

export const fetchEmployeeData = async () => {
  try {
    const res = await fetch(`${process.env.API_URL}/zobiz/fetch-employee-details`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      cache: 'no-store' // ensures latest data
    })

    if (!res.ok) {
      const errorText = await res.text()

      throw new Error(`Failed to fetch users: ${errorText}`)
    }

    const data = await res.json()

    console.log('Fetched Users Data:', data)
    // ✅ Decrypt the response
    const decryptedPayload = decrypt(data.data);

    // ✅ Convert decrypted string → JSON
    const parsedBody = JSON.parse(decryptedPayload);

    console.log("Decrypted  Data:", parsedBody);

    return parsedBody; // final usable data
  } catch (error) {
    console.error("Error fetching  Data:", error.message);
    throw error;
  }
}
//     return data.data // return only branch array
//   } catch (error) {
//     console.error('Error fetching users:', error)
//     throw error
//   }
// }

// app/api/user.js

export const changeUserPassword = async (_id, passworddata) => {
  try {
    let payload = { password: passworddata }
    console.log('POOJA', `${process.env.API_URL}`, payload)
    const res = await fetch(`${process.env.API_URL}/zobiz/change-password/${_id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
    console.log("pooja", res)
    // If server sends invalid JSON or fails
    if (!res.ok) {
      throw new Error(`Request failed with status ${res.status}`)
    }

    const result = await res.json()
    // ✅ Decrypt the response
    const decryptedPayload = decrypt(result);

    // ✅ Convert decrypted string → JSON
    const parsedBody = JSON.parse(decryptedPayload);

    console.log("Decrypted  Data:", parsedBody);

    return parsedBody; // final usable data
  } catch (error) {
    console.error('❌ changeUserPassword error:', error)
    return {
      success: false,
      message: 'Server error while changing password.'
    }
  }
}
// } catch (error) {
//   console.error("Error fetching  Data:", error.message);
//   throw error;
// }

//   return result



export const updateUserAddress = async (userId, addressData) => {
  try {
    console.log("PIHU", userId, addressData)

    const res = await fetch(`${process.env.API_URL}/zobiz/update-address/${userId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(addressData)
    })
    const result = await res.json()
    // ✅ Decrypt the response
    const decryptedPayload = decrypt(result);

    // ✅ Convert decrypted string → JSON
    const parsedBody = JSON.parse(decryptedPayload);

    console.log("Decrypted  Data:", parsedBody);

    return parsedBody; // final usable data
  } catch (error) {
    // const result = await res.json()
    // return result
    // } catch (err) {
    console.error('❌ updateUserAddress error:', err)
    return { success: false, message: 'Network or server error' }
  }
}

export const updateUserPermanentAddress = async (userId, addressData) => {
  try {
    console.log("PIHU", userId, addressData)

    const res = await fetch(`${process.env.API_URL}/zobiz/update-permanent-address/${userId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(addressData)
    })

  //   const result = await res.json()
  //   return result
  // } catch (err) {
  const result = await res.json()
    // ✅ Decrypt the response
    const decryptedPayload = decrypt(result);

    // ✅ Convert decrypted string → JSON
    const parsedBody = JSON.parse(decryptedPayload);

    console.log("Decrypted  Data:", parsedBody);

    return parsedBody; // final usable data
    } catch (error) {
    console.error('❌ updateUserAddress error:', err)
    return { success: false, message: 'Network or server error' }
  }
}

export const updateUserBankDetails = async (userId, bank) => {
  try {
    console.log("PIHU")

    const res = await fetch(`${process.env.API_URL}/zobiz/update-user-bank/${userId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bank)
    })

  //   const result = await res.json()
  //   return result
  // } catch (err) {
  const result = await res.json()
    // ✅ Decrypt the response
    const decryptedPayload = decrypt(result);

    // ✅ Convert decrypted string → JSON
    const parsedBody = JSON.parse(decryptedPayload);

    console.log("Decrypted  Data:", parsedBody);

    return parsedBody; // final usable data
    } catch (error) {
    console.error('❌ updateUserAddress error:', err)
    return { success: false, message: 'Network or server error' }
  }
}

export const updateUserFamilyDetails = async (userId, family) => {
  try {
    console.log("PIHU")

    const res = await fetch(`${process.env.API_URL}/zobiz/update-user-family-details/${userId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(family)
    })

  //   const result = await res.json()
  //   return result
  // } catch (err) {
  const result = await res.json()
    // ✅ Decrypt the response
    const decryptedPayload = decrypt(result);

    // ✅ Convert decrypted string → JSON
    const parsedBody = JSON.parse(decryptedPayload);

    console.log("Decrypted  Data:", parsedBody);

    return parsedBody; // final usable data
    } catch (error) {
    console.error('❌ updateUserAddress error:', err)
    return { success: false, message: 'Network or server error' }
  }
}



export const createAwardTypes = async (formData) => {
  try {
    // Map form fields to backend expected structure
    const payload = formData

    console.log("TODAYDEBUG", formData, payload)

    const res = await fetch(`${process.env.API_URL}/zobiz/create-award-types`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload),
      cache: 'no-store'
    })

    if (!res.ok) {
      const errorText = await res.text()

      throw new Error(`Failed to create award types: ${errorText}`)
    }

    const awardTypesData = await res.json()

    console.log("DEBUG createDepartment:", awardTypesData)
// ✅ Decrypt the response
    const decryptedPayload = decrypt(awardTypesData.data);

    // ✅ Convert decrypted string → JSON
    const parsedBody = JSON.parse(decryptedPayload);

    console.log("Decrypted  Data:", parsedBody);

    return parsedBody; // final usable data
  } catch (error) {
    console.error("Error fetching  Data:", error.message);
    throw error;
  }
}
//     return awardTypesData
//   } catch (err) {
//     console.error('Failed to create department:', err)
//     throw err
//   }
// }

export const fetchCountAwardTypes = async () => {
  try {
    const res = await fetch(`${process.env.API_URL}/zobiz/total-count-award-types`, {
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

    console.log('Fetched Count Award Types Data:', data)
// ✅ Decrypt the response
    const decryptedPayload = decrypt(data.data);

    // ✅ Convert decrypted string → JSON
    const parsedBody = JSON.parse(decryptedPayload);

    console.log("Decrypted  Data:", parsedBody);

    return parsedBody; // final usable data
  } catch (error) {
    console.error("Error fetching  Data:", error.message);
    throw error;
  }
}
//     return data.data // return only branch array
//   } catch (error) {
//     console.error('Error fetching Award Types:', error)
//     throw error
//   }
// }

export const fetchAwardTypes = async () => {
  try {
    const res = await fetch(`${process.env.API_URL}/zobiz/fetch-award-types`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      cache: 'no-store' // ensures latest data
    })
    console.log("DEBUG", res)

    if (!res.ok) {
      const errorText = await res.text()

      throw new Error(`Failed to fetch award types: ${errorText}`)
    }

    const data = await res.json()

    console.log('Fetched Award Types Data:', data)
// ✅ Decrypt the response
    const decryptedPayload = decrypt(data.data);

    // ✅ Convert decrypted string → JSON
    const parsedBody = JSON.parse(decryptedPayload);

    console.log("Decrypted  Data:", parsedBody);

    return parsedBody; // final usable data
  } catch (error) {
    console.error("Error fetching  Data:", error.message);
    throw error;
  }
}
//     return data.data // return only branch array
//   } catch (error) {
//     console.error('Error fetching award types:', error)
//     throw error
//   }
// }

export const editAwardTypes = async (formData) => {
  try {
    // Map form fields to backend expected structure
    const payload = formData

    console.log("TODAYDEBUG", formData, payload)

    const res = await fetch(`${process.env.API_URL}/zobiz/edit-award-types`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload),
      cache: 'no-store'
    })

    if (!res.ok) {
      const errorText = await res.text()

      throw new Error(`Failed to create award types: ${errorText}`)
    }

    const awardTypesData = await res.json()

    console.log("DEBUG update Award Types:", awardTypesData)
// ✅ Decrypt the response
    const decryptedPayload = decrypt(awardTypesData.data);

    // ✅ Convert decrypted string → JSON
    const parsedBody = JSON.parse(decryptedPayload);

    console.log("Decrypted  Data:", parsedBody);

    return parsedBody; // final usable data
  } catch (error) {
    console.error("Error fetching  Data:", error.message);
    throw error;
  }
}
//     return awardTypesData
//   } catch (err) {
//     console.error('Failed to update awad types:', err)
//     throw err
//   }
// }



export const createAward = async (formData) => {
  try {
    // Map form fields to backend expected structure
    const payload = formData

    console.log("TODAYDEBUG", formData, payload)
    for (let pair of formData.entries()) {
      console.log(pair[0] + ':', pair[1])
    }

    const res = await fetch(`${process.env.API_URL}/zobiz/create-award`, {
      method: 'POST',
      // headers: {
      //   'Content-Type': 'application/json'
      // },
      body: payload,
      // cache: 'no-store'
    })

    if (!res.ok) {
      const errorText = await res.text()

      throw new Error(`Failed to create department: ${errorText}`)
    }

    const awardData = await res.json()

    console.log("DEBUG createAward:", awardData)
// ✅ Decrypt the response
    const decryptedPayload = decrypt(awardData.data);

    // ✅ Convert decrypted string → JSON
    const parsedBody = JSON.parse(decryptedPayload);

    console.log("Decrypted  Data:", parsedBody);

    return parsedBody; // final usable data
  } catch (error) {
    console.error("Error fetching  Data:", error.message);
    throw error;
  }
}
//     return awardData
//   } catch (err) {
//     console.error('Failed to create award:', err)
//     throw err
//   }
// }



export const fetchCountAward = async () => {
  try {
    const res = await fetch(`${process.env.API_URL}/zobiz/total-count-award`, {
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

    console.log('Fetched Count Award ', data)
// ✅ Decrypt the response
    const decryptedPayload = decrypt(data.data);

    // ✅ Convert decrypted string → JSON
    const parsedBody = JSON.parse(decryptedPayload);

    console.log("Decrypted  Data:", parsedBody);

    return parsedBody; // final usable data
  } catch (error) {
    console.error("Error fetching  Data:", error.message);
    throw error;
  }
}
//     return data.data // return only branch array
//   } catch (error) {
//     console.error('Error fetching Award:', error)
//     throw error
//   }
// }

export const fetchAward = async () => {
  try {
    const res = await fetch(`${process.env.API_URL}/zobiz/fetch-award-details`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      cache: 'no-store' // ensures latest data
    })
    console.log("DEBUG", res)

    if (!res.ok) {
      const errorText = await res.text()

      throw new Error(`Failed to fetch award types: ${errorText}`)
    }

    const data = await res.json()

    console.log('Fetched Award  Data:', data)
// ✅ Decrypt the response
    const decryptedPayload = decrypt(data.data);

    // ✅ Convert decrypted string → JSON
    const parsedBody = JSON.parse(decryptedPayload);

    console.log("Decrypted  Data:", parsedBody);

    return parsedBody; // final usable data
  } catch (error) {
    console.error("Error fetching  Data:", error.message);
    throw error;
  }
}
//     return data.data // return only branch array
//   } catch (error) {
//     console.error('Error fetching award ', error)
//     throw error
//   }
// }


export const fetchUserDesignation = async (id) => {
  try {
    const res = await fetch(`${process.env.API_URL}/zobiz/fetch-designation-of-user/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      cache: 'no-store' // ensures latest data
    })
    console.log("DEBUG", res)

    if (!res.ok) {
      const errorText = await res.text()

      throw new Error(`Failed to fetch award types: ${errorText}`)
    }

    const data = await res.json()

    console.log('Fetched user designation  Data:', data)
// ✅ Decrypt the response
    const decryptedPayload = decrypt(data.data);

    // ✅ Convert decrypted string → JSON
    const parsedBody = JSON.parse(decryptedPayload);

    console.log("Decrypted  Data:", parsedBody);

    return parsedBody; // final usable data
  } catch (error) {
    console.error("Error fetching  Data:", error.message);
    throw error;
  }
}
//     return data// return only branch array
//   } catch (error) {
//     console.error('Error fetching user designation ', error)
//     throw error
//   }
// }

export const fetchListOfNewDesignation = async () => {
  try {
    const res = await fetch(`${process.env.API_URL}/zobiz/list-of-new-designation`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      cache: 'no-store' // ensures latest data
    })

    if (!res.ok) {
      const errorText = await res.text()

      throw new Error(`Failed to fetch user: ${errorText}`)
    }

    const data = await res.json()

    console.log(' Data:', data)
// ✅ Decrypt the response
    const decryptedPayload = decrypt(data.data);

    // ✅ Convert decrypted string → JSON
    const parsedBody = JSON.parse(decryptedPayload);

    console.log("Decrypted  Data:", parsedBody);

    return parsedBody; // final usable data
  } catch (error) {
    console.error("Error fetching  Data:", error.message);
    throw error;
  }
}
//     return data // return only branch array
//   } catch (error) {
//     console.error('Error fetching:', error)
//     throw error
//   }
// }



// export const updateUserDetails = async (userId, formData) => {
//   try {
//     console.log("PIHU")

//     const res = await fetch(`${process.env.API_URL}/zobiz/update-user/${userId}`, {
//       method: 'PUT',
//       // headers: { 'Content-Type': 'application/json' },
//       body: formData
//     })

//     // const result = await res.json()
//     return res
//   } catch (err) {
//     console.error('❌ updateUserAddress error:', err)
//     return { success: false, message: 'Network or server error' }
//   }
// }

export const fetchCountUser = async () => {
  try {
    const res = await fetch(`${process.env.API_URL}/zobiz/total-count-employee`, {
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

    console.log('Fetched Count Employee Data:', data)
// ✅ Decrypt the response
    const decryptedPayload = decrypt(data.data);

    // ✅ Convert decrypted string → JSON
    const parsedBody = JSON.parse(decryptedPayload);

    console.log("Decrypted  Data:", parsedBody);

    return parsedBody; // final usable data
  } catch (error) {
    console.error("Error fetching  Data:", error.message);
    throw error;
  }
}
//     return data.data // return only branch array
//   } catch (error) {
//     console.error('Error fetching Employee:', error)
//     throw error
//   }
// }

// export const createPromotions = async (formData) => {
//   try {
//     // Map form fields to backend expected structure
//     const payload = formData

// console.log("TODAYDEBUG",formData,payload)

//     const res = await fetch(`${process.env.API_URL}/zobiz/create-promotions`, {
//       method: 'POST',
//       body: payload

//     })

//     if (!res.ok) {
//       const errorText = await res.text()

//       throw new Error(`Failed to create department: ${errorText}`)
//     }

//     const departmentData = await res.json()

//     console.log("DEBUG createDepartment:", departmentData)

// return departmentData
//   } catch (err) {
//     console.error('Failed to create department:', err)
//     throw err
//   }
// }

export const createPromotions = async (formData) => {
  try {
    // 🧠 Create a FormData object (for file + text upload)
    const form = new FormData()

    // Append all fields from formData
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        // If it's an object (like FileList), handle accordingly
        if (Array.isArray(value)) {
          value.forEach((v) => form.append(key, v))
        } else {
          form.append(key, value)
        }
      }
    })

    console.log("📤 Sending Promotion Data:", Object.fromEntries(form.entries()))

    const res = await fetch(`${process.env.API_URL}/zobiz/create-promotions`, {
      method: 'POST',
      body: form // ✅ send FormData (no need for Content-Type header)
    })

    if (!res.ok) {
      const errorText = await res.text()
      throw new Error(`Failed to create promotion: ${errorText}`)
    }

    const data = await res.json()
    console.log("✅ Promotion Created:", data)
     // ✅ Decrypt the response
    const decryptedPayload = decrypt(data.data);

    // ✅ Convert decrypted string → JSON
    const parsedBody = JSON.parse(decryptedPayload);

    console.log("Decrypted  Data:", parsedBody);

    return parsedBody; // final usable data
  } catch (error) {
    console.error("Error fetching  Data:", error.message);
    throw error;
  }
}
//     return data

//   } catch (err) {
//     console.error('❌ Failed to create promotion:', err)
//     throw err
//   }
// }


export const fetchCountPromotion = async () => {
  try {
    const res = await fetch(`${process.env.API_URL}/zobiz/total-count-promotions`, {
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

    console.log('Fetched Count Promotion Data:', data)
 // ✅ Decrypt the response
    const decryptedPayload = decrypt(data.data);

    // ✅ Convert decrypted string → JSON
    const parsedBody = JSON.parse(decryptedPayload);

    console.log("Decrypted  Data:", parsedBody);

    return parsedBody; // final usable data
  } catch (error) {
    console.error("Error fetching  Data:", error.message);
    throw error;
  }
}
//     return data.data // return only branch array
//   } catch (error) {
//     console.error('Error fetching Promotion:', error)
//     throw error
//   }
// }

export const fetchPromotions = async () => {
  try {
    const res = await fetch(`${process.env.API_URL}/zobiz/get-promotions`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      cache: 'no-store' // ensures latest data
    })
    console.log("DEBUG", res)

    if (!res.ok) {
      const errorText = await res.text()

      throw new Error(`Failed to fetch award types: ${errorText}`)
    }

    const data = await res.json()

    console.log('Fetched Award  Data:', data)
 // ✅ Decrypt the response
    const decryptedPayload = decrypt(data.data);

    // ✅ Convert decrypted string → JSON
    const parsedBody = JSON.parse(decryptedPayload);

    console.log("Decrypted  Data:", parsedBody);

    return parsedBody; // final usable data
  } catch (error) {
    console.error("Error fetching  Data:", error.message);
    throw error;
  }
}
//     return data.data // return only branch array
//   } catch (error) {
//     console.error('Error fetching award ', error)
//     throw error
//   }
// }





export const createCategoryIndicator = async (formData) => {
  try {
    // Map form fields to backend expected structure
    const payload = formData

    console.log("TODAYDEBUG", formData, process.env.API_URL)

    const res = await fetch(`${process.env.API_URL}/zobiz/create-indicator-category`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload),
      cache: 'no-store'
    })

    if (!res.ok) {
      const errorText = await res.text()

      throw new Error(`Failed to create category indicator: ${errorText}`)
    }

    const departmentData = await res.json()

    console.log("DEBUG createCategoryIndicator:", departmentData)
 // ✅ Decrypt the response
    const decryptedPayload = decrypt(departmentData.data);

    // ✅ Convert decrypted string → JSON
    const parsedBody = JSON.parse(decryptedPayload);

    console.log("Decrypted  Data:", parsedBody);

    return parsedBody; // final usable data
  } catch (error) {
    console.error("Error fetching  Data:", error.message);
    throw error;
  }
}
//     return departmentData
//   } catch (err) {
//     console.error('Failed to create category indicator:', err)
//     throw err
//   }
// }


export const fetchCountCategoryIndicator = async () => {
  try {
    const res = await fetch(`${process.env.API_URL}/zobiz/total-count-indicator-category`, {
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

    console.log('Fetched Count Category Indicator Data:', data)
 // ✅ Decrypt the response
    const decryptedPayload = decrypt(data.data);

    // ✅ Convert decrypted string → JSON
    const parsedBody = JSON.parse(decryptedPayload);

    console.log("Decrypted  Data:", parsedBody);

    return parsedBody; // final usable data
  } catch (error) {
    console.error("Error fetching  Data:", error.message);
    throw error;
  }
}
//     return data.data // return only branch array
//   } catch (error) {
//     console.error('Error fetching Category Indicator:', error)
//     throw error
//   }
// }



export const fetchCategoryIndicator = async () => {
  try {
    const res = await fetch(`${process.env.API_URL}/zobiz/fetch-indicator-category`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      cache: 'no-store' // ensures latest data
    })

    if (!res.ok) {
      const errorText = await res.text()

      throw new Error(`Failed to fetch category indicator: ${errorText}`)
    }

    const data = await res.json()

    console.log('Fetched category indicator Data:', data)
 // ✅ Decrypt the response
    const decryptedPayload = decrypt(data.data);

    // ✅ Convert decrypted string → JSON
    const parsedBody = JSON.parse(decryptedPayload);

    console.log("Decrypted  Data:", parsedBody);

    return parsedBody; // final usable data
  } catch (error) {
    console.error("Error fetching  Data:", error.message);
    throw error;
  }
}
//     return data.data // return only branch array
//   } catch (error) {
//     console.error('Error fetching category indicator:', error)
//     throw error
//   }
// }


export const editCategoryIndicator = async (formData) => {
  try {
    // Map form fields to backend expected structure
    const payload = formData

    console.log("TODAYDEBUG", formData, payload)

    const res = await fetch(`${process.env.API_URL}/zobiz/edit-indicatorcategory`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload),
      cache: 'no-store'
    })

    if (!res.ok) {
      const errorText = await res.text()

      throw new Error(`Failed to edit category indicator: ${errorText}`)
    }

    const departmentData = await res.json()

    console.log("DEBUG updateCategoryIndicator:", departmentData)
 // ✅ Decrypt the response
    const decryptedPayload = decrypt(departmentData.data);

    // ✅ Convert decrypted string → JSON
    const parsedBody = JSON.parse(decryptedPayload);

    console.log("Decrypted  Data:", parsedBody);

    return parsedBody; // final usable data
  } catch (error) {
    console.error("Error fetching  Data:", error.message);
    throw error;
  }
}
//     return departmentData
//   } catch (err) {
//     console.error('Failed to update category indicator:', err)
//     throw err
//   }
// }
//Inndicator

export const fetchListOfCategoryIndicator = async () => {
  try {
    const res = await fetch(`${process.env.API_URL}/zobiz/list-of-indicator-category`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      cache: 'no-store' // ensures latest data
    })

    if (!res.ok) {
      const errorText = await res.text()

      throw new Error(`Failed to fetch category indicator: ${errorText}`)
    }

    const data = await res.json()

    console.log(' Data:', data)
 // ✅ Decrypt the response
    const decryptedPayload = decrypt(data.data);

    // ✅ Convert decrypted string → JSON
    const parsedBody = JSON.parse(decryptedPayload);

    console.log("Decrypted  Data:", parsedBody);

    return parsedBody; // final usable data
  } catch (error) {
    console.error("Error fetching  Data:", error.message);
    throw error;
  }
}
//     return data.data // return only category indicator array
//   } catch (error) {
//     console.error('Error fetching:', error)
//     throw error
//   }
// }

export const createIndicator = async (formData) => {
  try {
    // Map form fields to backend expected structure
    const payload = formData

    console.log("TODAYDEBUG", formData, process.env.API_URL)

    const res = await fetch(`${process.env.API_URL}/zobiz/create-indicator`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload),
      cache: 'no-store'
    })

    if (!res.ok) {
      const errorText = await res.text()

      throw new Error(`Failed to create indicator: ${errorText}`)
    }

    const departmentData = await res.json()

    console.log("DEBUG createIndicator:", departmentData)
 // ✅ Decrypt the response
    const decryptedPayload = decrypt(departmentData.data);

    // ✅ Convert decrypted string → JSON
    const parsedBody = JSON.parse(decryptedPayload);

    console.log("Decrypted  Data:", parsedBody);

    return parsedBody; // final usable data
  } catch (error) {
    console.error("Error fetching  Data:", error.message);
    throw error;
  }
}
//     return departmentData
//   } catch (err) {
//     console.error('Failed to create indicator:', err)
//     throw err
//   }
// }

export const fetchIndicator = async () => {
  try {
    const res = await fetch(`${process.env.API_URL}/zobiz/fetch-indicator-details`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      cache: 'no-store' // ensures latest data
    })

    if (!res.ok) {
      const errorText = await res.text()

      throw new Error(`Failed to fetch indicator: ${errorText}`)
    }

    const data = await res.json()

    console.log('Fetched category  Data:', data)
 // ✅ Decrypt the response
    const decryptedPayload = decrypt(data.data);

    // ✅ Convert decrypted string → JSON
    const parsedBody = JSON.parse(decryptedPayload);

    console.log("Decrypted  Data:", parsedBody);

    return parsedBody; // final usable data
  } catch (error) {
    console.error("Error fetching  Data:", error.message);
    throw error;
  }
}
//     return data.data // return only indicator array
//   } catch (error) {
//     console.error('Error fetching  indicator:', error)
//     throw error
//   }
// }
// app/server/actions.js
// export const fetchIndicator = async () => {
//   try {
//     const res = await fetch(`${process.env.API_URL}/zobiz/fetch-indicator-details`, {
//       method: 'GET',
//       headers: { 'Content-Type': 'application/json' },
//       cache: 'no-store' // ensures latest data
//     })

//     if (!res.ok) {
//       const errorText = await res.text()
//       throw new Error(`Failed to fetch indicator: ${errorText}`)
//     }

//     const json = await res.json()

//     console.log('📦 Fetched indicator data:', json)

//     // ✅ Always return a consistent shape
//     return {
//       success: json.success ?? true,
//       message: json.message ?? 'Fetched successfully',
//       data: json.data ?? []
//     }
//   } catch (error) {
//     console.error('❌ Error fetching indicator:', error)
//     return { success: false, message: error.message, data: [] }
//   }
// }

// app/server/actions.js
// export const fetchIndicator = async () => {
//   try {
//     const res = await fetch(`${process.env.API_URL}/zobiz/fetch-indicator-details`, {
//       method: 'GET',
//       headers: { 'Content-Type': 'application/json' },
//       cache: 'no-store'
//     })

//     // Parse JSON once, safely
//     const json = await res.json()

//     // ✅ Check HTTP errors (only non-200)
//     if (!res.ok) {
//       throw new Error(`HTTP ${res.status}: ${json.message || 'Failed to fetch indicators'}`)
//     }

//     // ✅ Handle successful but empty data
//     if (!Array.isArray(json.data) || json.data.length === 0) {
//       console.warn('⚠️ No indicator records found')
//       return {
//         success: true,
//         message: json.message || 'No indicators found',
//         data: []
//       }
//     }

//     // ✅ Normal case: data exists
//     return {
//       success: true,
//       message: json.message || 'Indicators fetched successfully',
//       data: json.data
//     }
//   } catch (error) {
//     console.error('❌ fetchIndicator failed:', error)
//     return { success: false, message: error.message, data: [] }
//   }
// }



export const fetchCountIndicator = async () => {
  try {
    const res = await fetch(`${process.env.API_URL}/zobiz/total-count-indicator`, {
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

    console.log('Fetched Count  Indicator Data:', data)
 // ✅ Decrypt the response
    const decryptedPayload = decrypt(data.data);

    // ✅ Convert decrypted string → JSON
    const parsedBody = JSON.parse(decryptedPayload);

    console.log("Decrypted  Data:", parsedBody);

    return parsedBody; // final usable data
  } catch (error) {
    console.error("Error fetching  Data:", error.message);
    throw error;
  }
}
//     return data.data // return only indicator array
//   } catch (error) {
//     console.error('Error fetching  Indicator:', error)
//     throw error
//   }
// }

export const editIndicator = async (formData) => {
  try {
    // Map form fields to backend expected structure
    const payload = formData

    console.log("TODAYDEBUG", formData, payload)

    const res = await fetch(`${process.env.API_URL}/zobiz/edit-indicator`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload),
      cache: 'no-store'
    })

    if (!res.ok) {
      const errorText = await res.text()

      throw new Error(`Failed to edit indicator: ${errorText}`)
    }

    const departmentData = await res.json()

    console.log("DEBUG updateIndicator:", departmentData)
 // ✅ Decrypt the response
    const decryptedPayload = decrypt(departmentData.data);

    // ✅ Convert decrypted string → JSON
    const parsedBody = JSON.parse(decryptedPayload);

    console.log("Decrypted  Data:", parsedBody);

    return parsedBody; // final usable data
  } catch (error) {
    console.error("Error fetching  Data:", error.message);
    throw error;
  }
}
//     return departmentData
//   } catch (err) {
//     console.error('Failed to update indicator:', err)
//     throw err
//   }
// }


export const createGoalType = async (formData) => {
  try {
    // Map form fields to backend expected structure
    const payload = formData

    console.log("TODAYDEBUG", formData, process.env.API_URL)

    const res = await fetch(`${process.env.API_URL}/zobiz/create-goal-type`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload),
      cache: 'no-store'
    })

    if (!res.ok) {
      const errorText = await res.text()

      throw new Error(`Failed to create GoalType: ${errorText}`)
    }

    const departmentData = await res.json()

    console.log("DEBUG createGoalType:", departmentData)
 // ✅ Decrypt the response
    const decryptedPayload = decrypt(departmentData.data);

    // ✅ Convert decrypted string → JSON
    const parsedBody = JSON.parse(decryptedPayload);

    console.log("Decrypted  Data:", parsedBody);

    return parsedBody; // final usable data
  } catch (error) {
    console.error("Error fetching  Data:", error.message);
    throw error;
  }
}
//     return departmentData
//   } catch (err) {
//     console.error('Failed to create GoalType:', err)
//     throw err
//   }
// }

export const fetchGoalType = async () => {
  try {
    const res = await fetch(`${process.env.API_URL}/zobiz/fetch-goal-type`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      cache: 'no-store' // ensures latest data
    })

    if (!res.ok) {
      const errorText = await res.text()

      throw new Error(`Failed to fetch GoalType: ${errorText}`)
    }

    const data = await res.json()

    console.log('Fetched category  Data:', data)
 // ✅ Decrypt the response
    const decryptedPayload = decrypt(data.data);

    // ✅ Convert decrypted string → JSON
    const parsedBody = JSON.parse(decryptedPayload);

    console.log("Decrypted  Data:", parsedBody);

    return parsedBody; // final usable data
  } catch (error) {
    console.error("Error fetching  Data:", error.message);
    throw error;
  }
}
//     return data.data // return only GoalType array
//   } catch (error) {
//     console.error('Error fetching  GoalType:', error)
//     throw error
//   }
// }

export const fetchCountGoalType = async () => {
  try {
    const res = await fetch(`${process.env.API_URL}/zobiz/total-count-goal-type`, {
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

    console.log('Fetched Count  GoalType Data:', data)
 // ✅ Decrypt the response
    const decryptedPayload = decrypt(data.data);

    // ✅ Convert decrypted string → JSON
    const parsedBody = JSON.parse(decryptedPayload);

    console.log("Decrypted  Data:", parsedBody);

    return parsedBody; // final usable data
  } catch (error) {
    console.error("Error fetching  Data:", error.message);
    throw error;
  }
}
//     return data.data // return only GoalType array
//   } catch (error) {
//     console.error('Error fetching  GoalType:', error)
//     throw error
//   }
// }

export const editGoalType = async (formData) => {
  try {
    // Map form fields to backend expected structure
    const payload = formData

    console.log("TODAYDEBUG", formData, payload)

    const res = await fetch(`${process.env.API_URL}/zobiz/edit-goaltype`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload),
      cache: 'no-store'
    })

    if (!res.ok) {
      const errorText = await res.text()

      throw new Error(`Failed to edit GoalType: ${errorText}`)
    }

    const departmentData = await res.json()

    console.log("DEBUG updateGoalType:", departmentData)
 // ✅ Decrypt the response
    const decryptedPayload = decrypt(departmentData.data);

    // ✅ Convert decrypted string → JSON
    const parsedBody = JSON.parse(decryptedPayload);

    console.log("Decrypted  Data:", parsedBody);

    return parsedBody; // final usable data
  } catch (error) {
    console.error("Error fetching  Data:", error.message);
    throw error;
  }
}
//     return departmentData
//   } catch (err) {
//     console.error('Failed to update GoalType:', err)
//     throw err
//   }
// }

export const fetchListOfGoalType = async () => {
  try {
    const res = await fetch(`${process.env.API_URL}/zobiz/list-of-goal-type`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      cache: 'no-store' // ensures latest data
    })

    if (!res.ok) {
      const errorText = await res.text()

      throw new Error(`Failed to fetch goal type: ${errorText}`)
    }

    const data = await res.json()

    console.log(' Data:', data)
 // ✅ Decrypt the response
    const decryptedPayload = decrypt(data.data);

    // ✅ Convert decrypted string → JSON
    const parsedBody = JSON.parse(decryptedPayload);

    console.log("Decrypted  Data:", parsedBody);

    return parsedBody; // final usable data
  } catch (error) {
    console.error("Error fetching  Data:", error.message);
    throw error;
  }
}
//     return data.data // return only category indicator array
//   } catch (error) {
//     console.error('Error fetching:', error)
//     throw error
//   }
// }

export const createEmployeeGoal = async (formData) => {
  try {
    // Map form fields to backend expected structure
    const payload = formData

    console.log("TODAYDEBUG", formData, process.env.API_URL)

    const res = await fetch(`${process.env.API_URL}/zobiz/create-employee-goal`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })

    if (!res.ok) {
      const errorText = await res.text()

      throw new Error(`Failed to create employee Goal: ${errorText}`)
    }

    const departmentData = await res.json()

    console.log("DEBUG create employee Goal:", departmentData)
 // ✅ Decrypt the response
    const decryptedPayload = decrypt(data.data);

    // ✅ Convert decrypted string → JSON
    const parsedBody = JSON.parse(decryptedPayload);

    console.log("Decrypted  Data:", parsedBody);

    return parsedBody; // final usable data
  } catch (error) {
    console.error("Error fetching  Data:", error.message);
    throw error;
  }
}
//     return departmentData
//   } catch (err) {
//     console.error('Failed to create  employee Goal:', err)
//     throw err
//   }
// }

export const fetchCountEmployeeGoal = async () => {
  try {
    const res = await fetch(`${process.env.API_URL}/zobiz/total-count-employee-goal`, {
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

    console.log('Fetched Count  employee goal Data:', data)
 // ✅ Decrypt the response
    const decryptedPayload = decrypt(data.data);

    // ✅ Convert decrypted string → JSON
    const parsedBody = JSON.parse(decryptedPayload);

    console.log("Decrypted  Data:", parsedBody);

    return parsedBody; // final usable data
  } catch (error) {
    console.error("Error fetching  Data:", error.message);
    throw error;
  }
}
//     return data.data // return only GoalType array
//   } catch (error) {
//     console.error('Error fetching  employee goal:', error)
//     throw error
//   }
// }

export const fetchEmployeeGoal = async () => {
  try {
    const res = await fetch(`${process.env.API_URL}/zobiz/fetch-employee-goals`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      cache: 'no-store' // ensures latest data
    })

    if (!res.ok) {
      const errorText = await res.text()

      throw new Error(`Failed to fetch EmployeeGoal: ${errorText}`)
    }

    const data = await res.json()

    console.log('Fetched category  Data:', data)
 // ✅ Decrypt the response
    const decryptedPayload = decrypt(data.data);

    // ✅ Convert decrypted string → JSON
    const parsedBody = JSON.parse(decryptedPayload);

    console.log("Decrypted  Data:", parsedBody);

    return parsedBody; // final usable data
  } catch (error) {
    console.error("Error fetching  Data:", error.message);
    throw error;
  }
}
//     return data.data // return only EmployeeGoal array
//   } catch (error) {
//     console.error('Error fetching  EmployeeGoal:', error)
//     throw error
//   }
// }
export const editEmployeeGoal = async (formData) => {
  try {
    // Map form fields to backend expected structure
    const payload = formData

    console.log("TODAYDEBUG", formData, payload)

    const res = await fetch(`${process.env.API_URL}/zobiz/edit-employee-goal`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload),
      cache: 'no-store'
    })

    if (!res.ok) {
      const errorText = await res.text()

      throw new Error(`Failed to edit EmployeeGoal: ${errorText}`)
    }

    const departmentData = await res.json()

    console.log("DEBUG updateEmployeeGoal:", departmentData)
 // ✅ Decrypt the response
    const decryptedPayload = decrypt(departmentData.data);

    // ✅ Convert decrypted string → JSON
    const parsedBody = JSON.parse(decryptedPayload);

    console.log("Decrypted  Data:", parsedBody);

    return parsedBody; // final usable data
  } catch (error) {
    console.error("Error fetching  Data:", error.message);
    throw error;
  }
}
//     return departmentData
//   } catch (err) {
//     console.error('Failed to update EmployeeGoal:', err)
//     throw err
//   }
// }

//Review Cycle APIS
export const createReviewCycle = async (formData) => {
  try {
    // Map form fields to backend expected structure
    const payload = formData

    console.log("TODAYDEBUG", formData, process.env.API_URL)

    const res = await fetch(`${process.env.API_URL}/zobiz/create-review-cycle`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload),
      cache: 'no-store'
    })

    if (!res.ok) {
      const errorText = await res.text()

      throw new Error(`Failed to create ReviewCycle: ${errorText}`)
    }

    const departmentData = await res.json()

    console.log("DEBUG createReviewCycle:", departmentData)
 // ✅ Decrypt the response
    const decryptedPayload = decrypt(departmentData.data);

    // ✅ Convert decrypted string → JSON
    const parsedBody = JSON.parse(decryptedPayload);

    console.log("Decrypted  Data:", parsedBody);

    return parsedBody; // final usable data
  } catch (error) {
    console.error("Error fetching  Data:", error.message);
    throw error;
  }
}
//     return departmentData
//   } catch (err) {
//     console.error('Failed to create ReviewCycle:', err)
//     throw err
//   }
// }

export const fetchReviewCycle = async () => {
  try {
    const res = await fetch(`${process.env.API_URL}/zobiz/fetch-review-cycle`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      cache: 'no-store' // ensures latest data
    })

    if (!res.ok) {
      const errorText = await res.text()

      throw new Error(`Failed to fetch ReviewCycle: ${errorText}`)
    }

    const data = await res.json()

    console.log('Fetched category  Data:', data)
 // ✅ Decrypt the response
    const decryptedPayload = decrypt(data.data);

    // ✅ Convert decrypted string → JSON
    const parsedBody = JSON.parse(decryptedPayload);

    console.log("Decrypted  Data:", parsedBody);

    return parsedBody; // final usable data
  } catch (error) {
    console.error("Error fetching  Data:", error.message);
    throw error;
  }
}
//     return data.data // return only ReviewCycle array
//   } catch (error) {
//     console.error('Error fetching  ReviewCycle:', error)
//     throw error
//   }
// }

export const fetchCountReviewCycle = async () => {
  try {
    const res = await fetch(`${process.env.API_URL}/zobiz/total-count-review-cycle`, {
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

    console.log('Fetched Count  ReviewCycle Data:', data)
 // ✅ Decrypt the response
    const decryptedPayload = decrypt(data.data);

    // ✅ Convert decrypted string → JSON
    const parsedBody = JSON.parse(decryptedPayload);

    console.log("Decrypted  Data:", parsedBody);

    return parsedBody; // final usable data
  } catch (error) {
    console.error("Error fetching  Data:", error.message);
    throw error;
  }
}
//     return data.data // return only ReviewCycle array
//   } catch (error) {
//     console.error('Error fetching  ReviewCycle:', error)
//     throw error
//   }
// }

export const editReviewCycle = async (formData) => {
  try {
    // Map form fields to backend expected structure
    const payload = formData

    console.log("TODAYDEBUG", formData, payload)

    const res = await fetch(`${process.env.API_URL}/zobiz/edit-review-cycle`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload),
      cache: 'no-store'
    })

    if (!res.ok) {
      const errorText = await res.text()

      throw new Error(`Failed to edit ReviewCycle: ${errorText}`)
    }

    const departmentData = await res.json()

    console.log("DEBUG updateReviewCycle:", departmentData)
 // ✅ Decrypt the response
    const decryptedPayload = decrypt(data.data);

    // ✅ Convert decrypted string → JSON
    const parsedBody = JSON.parse(decryptedPayload);

    console.log("Decrypted  Data:", parsedBody);

    return parsedBody; // final usable data
  } catch (error) {
    console.error("Error fetching  Data:", error.message);
    throw error;
  }
}
//     return departmentData
//   } catch (err) {
//     console.error('Failed to update ReviewCycle:', err)
//     throw err
//   }
// }
//Employee Review Cycle

export const fetchListOfEmployeeReviewCycle = async () => {
  try {
    const res = await fetch(`${process.env.API_URL}/zobiz/list-of-review-cycle`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      cache: 'no-store' // ensures latest data
    })

    if (!res.ok) {
      const errorText = await res.text()

      throw new Error(`Failed to fetch goal type: ${errorText}`)
    }

    const data = await res.json()

    console.log(' Data:', data)
 // ✅ Decrypt the response
    const decryptedPayload = decrypt(data.data);

    // ✅ Convert decrypted string → JSON
    const parsedBody = JSON.parse(decryptedPayload);

    console.log("Decrypted  Data:", parsedBody);

    return parsedBody; // final usable data
  } catch (error) {
    console.error("Error fetching  Data:", error.message);
    throw error;
  }
}
//     return data.data // return only category indicator array
//   } catch (error) {
//     console.error('Error fetching:', error)
//     throw error
//   }
// }

export const fetchCountEmployeeReviewCycle = async () => {
  try {
    const res = await fetch(`${process.env.API_URL}/zobiz/total-count-employee-review-cycle`, {
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

    console.log('Fetched Count  employee review cycle Data:', data)
 // ✅ Decrypt the response
    const decryptedPayload = decrypt(data.data);

    // ✅ Convert decrypted string → JSON
    const parsedBody = JSON.parse(decryptedPayload);

    console.log("Decrypted  Data:", parsedBody);

    return parsedBody; // final usable data
  } catch (error) {
    console.error("Error fetching  Data:", error.message);
    throw error;
  }
}
//     return data.data // return only Employee Review cycle array
//   } catch (error) {
//     console.error('Error fetching  Employee Review cycle:', error)
//     throw error
//   }
// }

export const createEmployeeReviewCycle = async (formData) => {
  try {
    // Map form fields to backend expected structure
    const payload = formData

    console.log("TODAYDEBUG", formData, process.env.API_URL)

    const res = await fetch(`${process.env.API_URL}/zobiz/create-employee-review-cycle`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })

    if (!res.ok) {
      const errorText = await res.text()

      throw new Error(`Failed to create employee review cycle: ${errorText}`)
    }

    const departmentData = await res.json()

    console.log("DEBUG create employee review cycle:", departmentData)
 // ✅ Decrypt the response
    const decryptedPayload = decrypt(data.data);

    // ✅ Convert decrypted string → JSON
    const parsedBody = JSON.parse(decryptedPayload);

    console.log("Decrypted  Data:", parsedBody);

    return parsedBody; // final usable data
  } catch (error) {
    console.error("Error fetching  Data:", error.message);
    throw error;
  }
}
//     return departmentData
//   } catch (err) {
//     console.error('Failed to create  employee review cycle:', err)
//     throw err
//   }
// }

export const fetchEmployeeReviewCycle = async () => {
  try {
    const res = await fetch(`${process.env.API_URL}/zobiz/fetch-employee-review-cycle`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      cache: 'no-store' // ensures latest data
    })

    if (!res.ok) {
      const errorText = await res.text()

      throw new Error(`Failed to fetch EmployeeReviewCycle: ${errorText}`)
    }

    const data = await res.json()

    console.log('Fetched category  Data:', data)
 // ✅ Decrypt the response
    const decryptedPayload = decrypt(data.data);

    // ✅ Convert decrypted string → JSON
    const parsedBody = JSON.parse(decryptedPayload);

    console.log("Decrypted  Data:", parsedBody);

    return parsedBody; // final usable data
  } catch (error) {
    console.error("Error fetching  Data:", error.message);
    throw error;
  }
}
//     return data.data // return only EmployeeReviewCycle array
//   } catch (error) {
//     console.error('Error fetching  EmployeeReviewCycle:', error)
//     throw error
//   }
// }


// 🧠 Fetch single employee review details by ID
export const fetchEmployeeReviewById = async (id) => {
  try {
    console.log("POOJAIDS", id)
    const res = await fetch(`${process.env.API_URL}/zobiz/fetch-employee-review/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      cache: 'no-store' // always get the latest data
    })

    if (!res.ok) {
      const errorText = await res.text()
      throw new Error(`Failed to fetch review details: ${errorText}`)
    }

    const data = await res.json()

    // Debug log
    console.log('📦 Review Details Fetched:', data)
const decryptedData = decrypt(response.data || response)

    console.log('📦 Decrypted Review Details:', decryptedData)

    if (!decryptedData.success) {
      throw new Error(decryptedData.message || 'Failed to fetch review details')
    }

    return decryptedData
    // if (!data.success) {
    //   throw new Error(data.message || 'Failed to fetch review details')
    // }

    // return data
  } catch (error) {
    console.error('❌ Error fetching employee review details:', error)
    throw error
  }
}


export const fetchIndicatorDetailsEmployeeReview = async () => {
  try {


    const res = await fetch(`${process.env.API_URL}/zobiz/fetch-indicator-details-employee-review`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      cache: 'no-store' // always fetch latest data
    })

    if (!res.ok) {
      const errorText = await res.text()
      throw new Error(`Failed to fetch indicator details: ${errorText}`)
    }

    const data = await res.json()
    console.log('✅ Fetched Indicator Details:', data)
 // ✅ Decrypt the response
    const decryptedPayload = decrypt(data.data);

    // ✅ Convert decrypted string → JSON
    const parsedBody = JSON.parse(decryptedPayload);

    console.log("Decrypted  Data:", parsedBody);

    return parsedBody; // final usable data
  } catch (error) {
    console.error("Error fetching  Data:", error.message);
    throw error;
  }
}
//     // return only array for easy usage
//     return data
//   } catch (error) {
//     console.error('❌ Error fetching indicator details:', error)
//     throw error
//   }
// }

export async function fetchDepartmentsByBranch(branchId) {
  try {
    console.log("TESTDATA", branchId)
    const res = await fetch(`${process.env.API_URL}/zobiz/departments/byBranch/${branchId}`, {
      cache: 'no-store'
    })
    const data = await res.json()
     // ✅ Decrypt the response
    const decryptedPayload = decrypt(data.data);

    // ✅ Convert decrypted string → JSON
    const parsedBody = JSON.parse(decryptedPayload);

    console.log("Decrypted  Data:", parsedBody);

    return parsedBody; // final usable data
  } catch (error) {
    console.error("Error fetching  Data:", error.message);
    throw error;
  }
}
//     return data // { success: true, data: [ { _id, departmentName } ] }
//   } catch (error) {
//     console.error('Error fetching departments by branch:', error)
//     return { success: false, data: [] }
//   }
// }

export async function fetchDesignationsByDepartment(departmentId) {
  try {
    const res = await fetch(`${process.env.API_URL}/zobiz/designations/byDepartment/${departmentId}`, {
      cache: 'no-store'
    })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const data = await res.json()
  //   return data
  // } catch (error) {
  //   console.error('Error fetching designations by department:', error)
  // ✅ Decrypt the response
    const decryptedPayload = decrypt(data.data);

    // ✅ Convert decrypted string → JSON
    const parsedBody = JSON.parse(decryptedPayload);

    console.log("Decrypted  Data:", parsedBody);

    return parsedBody; // final usable data
  } catch (error) {
    console.error("Error fetching  Data:", error.message);
    return { success: false, data: [] }
  }
}

//Resignation 
export const fetchCountResignation = async () => {
  try {
    const res = await fetch(`${process.env.API_URL}/zobiz/total-count-resignation`, {
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

    console.log('Fetched Count Resignations Data:', data)

        // ✅ Decrypt the response
    const decryptedPayload = decrypt(data.data);

    // ✅ Convert decrypted string → JSON
    const parsedBody = JSON.parse(decryptedPayload);

    console.log("Decrypted  Data:", parsedBody);

    return parsedBody; // final usable data
  } catch (error) {
    console.error("Error fetching  Data:", error.message);
    throw error;
  }
}
//     return data.data // return only branch array
//   } catch (error) {
//     console.error('Error fetching Resignations:', error)
//     throw error
//   }
// }


export const createResignation = async (formData) => {
  try {
    // 🚀 POST multipart/form-data (no JSON.stringify, no Content-Type header)
    const res = await fetch(`${process.env.API_URL}/zobiz/create-resignation`, {
      method: 'POST',
      body: formData, // send raw FormData
      cache: 'no-store',
    })

    // 🧾 Handle errors
    if (!res.ok) {
      const errorText = await res.text()
      throw new Error(`Failed to create resignation: ${errorText}`)
    }

    const result = await res.json()
    console.log("✅ createResignation Response:", result)
    
        // ✅ Decrypt the response
    const decryptedPayload = decrypt(result.data);

    // ✅ Convert decrypted string → JSON
    const parsedBody = JSON.parse(decryptedPayload);

    console.log("Decrypted  Data:", parsedBody);

    return parsedBody; // final usable data
  } catch (error) {
    console.error("Error fetching  Data:", error.message);
    throw error;
  }
}
//     return result
//   } catch (err) {
//     console.error('❌ Failed to create resignation:', err)
//     throw err
//   }
// }

export const fetchResignation = async () => {
  try {
    const res = await fetch(`${process.env.API_URL}/zobiz/fetch-resignations`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      cache: 'no-store' // ensures latest data
    })
    console.log("DEBUG", res)

    if (!res.ok) {
      const errorText = await res.text()

      throw new Error(`Failed to fetch resignation: ${errorText}`)
    }

    const data = await res.json()

    console.log('Fetched Resignation Data:', data)

        // ✅ Decrypt the response
    const decryptedPayload = decrypt(data.data);

    // ✅ Convert decrypted string → JSON
    const parsedBody = JSON.parse(decryptedPayload);

    console.log("Decrypted  Data:", parsedBody);

    return parsedBody; // final usable data
  } catch (error) {
    console.error("Error fetching  Data:", error.message);
    throw error;
  }
}
//     return { success: true, data: data.data }
//   } catch (error) {
//     console.error('Error fetching Resignations:', error)
//     throw error
//   }
// }

export const updateResignation = async (formData) => {
  try {

    console.log("NPRSTEST", formData)
    const res = await fetch(`${process.env.API_URL}/zobiz/update-resignation`, {
      method: 'PUT',
      body: formData
    })

    if (!res.ok) {
      const errorText = await res.text()
      throw new Error(`Failed to update resignation: ${errorText}`)
    }

    const data = await res.json()
    
        // ✅ Decrypt the response
    const decryptedPayload = decrypt(data.data);

    // ✅ Convert decrypted string → JSON
    const parsedBody = JSON.parse(decryptedPayload);

    console.log("Decrypted  Data:", parsedBody);

    return parsedBody; // final usable data
  } catch (error) {
    console.error("Error fetching  Data:", error.message);
    throw error;
  }
}
//     return data
//   } catch (err) {
//     console.error('Error updating resignation:', err)
//     throw err
//   }
// }

//Termination
export const fetchCountTermination = async () => {
  try {
    const res = await fetch(`${process.env.API_URL}/zobiz/total-count-termination`, {
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

    console.log('Fetched Count Terminations Data:', data)

        // ✅ Decrypt the response
    const decryptedPayload = decrypt(data.data);

    // ✅ Convert decrypted string → JSON
    const parsedBody = JSON.parse(decryptedPayload);

    console.log("Decrypted  Data:", parsedBody);

    return parsedBody; // final usable data
  } catch (error) {
    console.error("Error fetching  Data:", error.message);
    throw error;
  }
}
//     return data.data // return only branch array
//   } catch (error) {
//     console.error('Error fetching Terminations:', error)
//     throw error
//   }
// }

export const createTermination = async (formData) => {
  try {
    // 🚀 POST multipart/form-data (no JSON.stringify, no Content-Type header)
    const res = await fetch(`${process.env.API_URL}/zobiz/create-termination`, {
      method: 'POST',
      body: formData, // send raw FormData
      cache: 'no-store',
    })

    // 🧾 Handle errors
    if (!res.ok) {
      const errorText = await res.text()
      throw new Error(`Failed to create termination: ${errorText}`)
    }

    const result = await res.json()
    console.log("✅ createTermination Response:", result)
    
        // ✅ Decrypt the response
    const decryptedPayload = decrypt(result.data);

    // ✅ Convert decrypted string → JSON
    const parsedBody = JSON.parse(decryptedPayload);

    console.log("Decrypted  Data:", parsedBody);

    return parsedBody; // final usable data
  } catch (error) {
    console.error("Error fetching  Data:", error.message);
    throw error;
  }
}
//     return result
//   } catch (err) {
//     console.error('❌ Failed to create termination:', err)
//     throw err
//   }
// }

export const fetchTermination = async () => {
  try {
    const res = await fetch(`${process.env.API_URL}/zobiz/fetch-terminations`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      cache: 'no-store' // ensures latest data
    })
    console.log("DEBUG", res)

    if (!res.ok) {
      const errorText = await res.text()

      throw new Error(`Failed to fetch termination: ${errorText}`)
    }

    const data = await res.json()

    console.log('Fetched Termination Data:', data)
    
        // ✅ Decrypt the response
    const decryptedPayload = decrypt(data.data);

    // ✅ Convert decrypted string → JSON
    const parsedBody = JSON.parse(decryptedPayload);

    console.log("Decrypted  Data:", parsedBody);

    return parsedBody; // final usable data
  } catch (error) {
    console.error("Error fetching  Data:", error.message);
    throw error;
  }
}

//     return { success: true, data: data.data }
//   } catch (error) {
//     console.error('Error fetching Terminations:', error)
//     throw error
//   }
// }

//Warning
export const fetchCountWarning = async () => {
  try {
    const res = await fetch(`${process.env.API_URL}/zobiz/total-count-warning`, {
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

    console.log('Fetched Count Warnings Data:', data)

        // ✅ Decrypt the response
    const decryptedPayload = decrypt(data.data);

    // ✅ Convert decrypted string → JSON
    const parsedBody = JSON.parse(decryptedPayload);

    console.log("Decrypted  Data:", parsedBody);

    return parsedBody; // final usable data
  } catch (error) {
    console.error("Error fetching  Data:", error.message);
    throw error;
  }
}
//     return data.data // return only branch array
//   } catch (error) {
//     console.error('Error fetching Warnings:', error)
//     throw error
//   }
// }

export const createWarning = async (formData) => {
  try {
    // 🚀 POST multipart/form-data (no JSON.stringify, no Content-Type header)
    console.log("POOJAFORMDATA", formData)
    const res = await fetch(`${process.env.API_URL}/zobiz/create-warning`, {
      method: 'POST',
      body: formData, // send raw FormData
      cache: 'no-store',
    })

    // 🧾 Handle errors
    if (!res.ok) {
      const errorText = await res.text()
      throw new Error(`Failed to create warning: ${errorText}`)
    }

    const result = await res.json()
    console.log("✅ create  Warning Response:", result)
    
        // ✅ Decrypt the response
    const decryptedPayload = decrypt(data.data);

    // ✅ Convert decrypted string → JSON
    const parsedBody = JSON.parse(decryptedPayload);

    console.log("Decrypted  Data:", parsedBody);

    return parsedBody; // final usable data
  } catch (error) {
    console.error("Error fetching  Data:", error.message);
    throw error;
  }
}
//     return result
//   } catch (err) {
//     console.error('❌ Failed to create warning:', err)
//     throw err
//   }
// }

export const fetchWarning = async () => {
  try {
    const res = await fetch(`${process.env.API_URL}/zobiz/fetch-warnings`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      cache: 'no-store' // ensures latest data
    })
    console.log("DEBUG", res)

    if (!res.ok) {
      const errorText = await res.text()

      throw new Error(`Failed to fetch warnings: ${errorText}`)
    }

    const data = await res.json()

    console.log('Fetched Warning Data:', data)

        // ✅ Decrypt the response
    const decryptedPayload = decrypt(data.data);

    // ✅ Convert decrypted string → JSON
    const parsedBody = JSON.parse(decryptedPayload);

    console.log("Decrypted  Data:", parsedBody);

    return parsedBody; // final usable data
  } catch (error) {
    console.error("Error fetching  Data:", error.message);
    throw error;
  }
}
//     return { success: true, data: data.data }
//   } catch (error) {
//     console.error('Error fetching Warnings:', error)
//     throw error
//   }
// }



//Trip
export const fetchCountTrip = async () => {
  try {
    const res = await fetch(`${process.env.API_URL}/zobiz/total-count-trip`, {
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

    console.log('Fetched Count Trips Data:', data)

        // ✅ Decrypt the response
    const decryptedPayload = decrypt(data.data);

    // ✅ Convert decrypted string → JSON
    const parsedBody = JSON.parse(decryptedPayload);

    console.log("Decrypted  Data:", parsedBody);

    return parsedBody; // final usable data
  } catch (error) {
    console.error("Error fetching  Data:", error.message);
    throw error;
  }
}
//     return data.data // return only branch array
//   } catch (error) {
//     console.error('Error fetching Trips:', error)
//     throw error
//   }
// }

export const createTrip = async (formData) => {
  try {
    // 🚀 POST multipart/form-data (no JSON.stringify, no Content-Type header)
    console.log("POOJAFORMDATA", formData)
    const res = await fetch(`${process.env.API_URL}/zobiz/create-trip`, {
      method: 'POST',
      body: formData, // send raw FormData
      cache: 'no-store',
    })

    // 🧾 Handle errors
    if (!res.ok) {
      const errorText = await res.text()
      throw new Error(`Failed to create trip: ${errorText}`)
    }

    const result = await res.json()
    console.log("✅ create  Trip Response:", result)
    
        // ✅ Decrypt the response
    const decryptedPayload = decrypt(result.data);

    // ✅ Convert decrypted string → JSON
    const parsedBody = JSON.parse(decryptedPayload);

    console.log("Decrypted  Data:", parsedBody);

    return parsedBody; // final usable data
  } catch (error) {
    console.error("Error fetching  Data:", error.message);
    throw error;
  }
}
//     return result
//   } catch (err) {
//     console.error('❌ Failed to create trip:', err)
//     throw err
//   }
// }

export const fetchTrips = async () => {
  try {
    const res = await fetch(`${process.env.API_URL}/zobiz/fetch-trips`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store'
    })

    if (!res.ok) {
      const errorText = await res.text()
      throw new Error(`Failed to fetch trips: ${errorText}`)
    }

    const data = await res.json()
    console.log('Fetched Trips:', data)
    
        // ✅ Decrypt the response
    const decryptedPayload = decrypt(data.data);

    // ✅ Convert decrypted string → JSON
    const parsedBody = JSON.parse(decryptedPayload);

    console.log("Decrypted  Data:", parsedBody);
return { success: true, data:parsedBody}
    // return { success: true, data: data.data } // final usable data
  } catch (error) {
    console.error("Error fetching  Data:", error.message);
    throw error;
  }
}
    
//   } catch (error) {
//     console.error('Error fetching Trips:', error)
//     throw error
//   }
// }
//Complaint
export const fetchCountComplaint = async () => {
  try {
    const res = await fetch(`${process.env.API_URL}/zobiz/total-count-complaint`, {
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

    console.log('Fetched Count Complaints Data:', data)
 // ✅ Decrypt the response
    const decryptedPayload = decrypt(data.data);

    // ✅ Convert decrypted string → JSON
    const parsedBody = JSON.parse(decryptedPayload);

    console.log("Decrypted  Data:", parsedBody);

    return parsedBody; // final usable data
  } catch (error) {
    console.error("Error fetching  Data:", error.message);
    throw error;
  }
}
//     return data.data // return only branch array
//   } catch (error) {
//     console.error('Error fetching Complaints:', error)
//     throw error
//   }
// }

export const createComplaint = async (formData) => {
  try {
    // 🚀 POST multipart/form-data (no JSON.stringify, no Content-Type header)
    console.log("POOJAFORMDATA", formData)
    const res = await fetch(`${process.env.API_URL}/zobiz/create-complaint`, {
      method: 'POST',
      body: formData, // send raw FormData
      cache: 'no-store',
    })

    // 🧾 Handle errors
    if (!res.ok) {
      const errorText = await res.text()
      throw new Error(`Failed to create complaint: ${errorText}`)
    }

    const result = await res.json()
    console.log("✅ create  Complaint Response:", result)
     // ✅ Decrypt the response
    const decryptedPayload = decrypt(result.data);

    // ✅ Convert decrypted string → JSON
    const parsedBody = JSON.parse(decryptedPayload);

    console.log("Decrypted  Data:", parsedBody);

    return parsedBody; // final usable data
  } catch (error) {
    console.error("Error fetching  Data:", error.message);
    throw error;
  }
}
//     return result
//   } catch (err) {
//     console.error('❌ Failed to create complaint:', err)
//     throw err
//   }
// }

export const fetchComplaints = async () => {
  try {
    const res = await fetch(`${process.env.API_URL}/zobiz/fetch-complaints`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store'
    })

    if (!res.ok) {
      const errorText = await res.text()
      throw new Error(`Failed to fetch complaints: ${errorText}`)
    }

    const data = await res.json()
    console.log('Fetched Complaints:', data)
    
    // ✅ Decrypt the response
    const decryptedPayload = decrypt(data.data);

    // ✅ Convert decrypted string → JSON
    const parsedBody = JSON.parse(decryptedPayload);

    console.log("Decrypted  Data:", parsedBody);
return { success: true, data:parsedBody}
  } catch (error) {
    console.error("Error fetching  Data:", error.message);
    throw error;
  }
}
//     return { success: true, data: data.data }
//   } catch (error) {
//     console.error('Error fetching Complaints:', error)
//     throw error
//   }
// }
//Transfer
export const fetchCountTransfer = async () => {
  try {
    const res = await fetch(`${process.env.API_URL}/zobiz/total-count-transfer`, {
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

    console.log('Fetched Count Transfer Data:', data)
// ✅ Decrypt the response
    const decryptedPayload = decrypt(data.data);

    // ✅ Convert decrypted string → JSON
    const parsedBody = JSON.parse(decryptedPayload);

    console.log("Decrypted  Data:", parsedBody);

    return parsedBody; // final usable data
  } catch (error) {
    console.error("Error fetching  Data:", error.message);
    throw error;
  }
}
//     return data.data // return only branch array
//   } catch (error) {
//     console.error('Error fetching Transfer:', error)
//     throw error
//   }
// }
export const createTransfer = async (formData) => {
  try {
    // 🚀 POST multipart/form-data (no JSON.stringify, no Content-Type header)
    console.log("POOJAFORMDATA", formData)
    const res = await fetch(`${process.env.API_URL}/zobiz/create-transfer`, {
      method: 'POST',
      body: formData, // send raw FormData
      cache: 'no-store',
    })

    // 🧾 Handle errors
    if (!res.ok) {
      const errorText = await res.text()
      throw new Error(`Failed to create transfer: ${errorText}`)
    }

    const result = await res.json()
    console.log("✅ create  Transfer Response:", result)
    // ✅ Decrypt the response
    const decryptedPayload = decrypt(result.data);

    // ✅ Convert decrypted string → JSON
    const parsedBody = JSON.parse(decryptedPayload);

    console.log("Decrypted  Data:", parsedBody);

    return parsedBody; // final usable data
  } catch (error) {
    console.error("Error fetching  Data:", error.message);
    throw error;
  }
}
//     return result
//   } catch (err) {
//     console.error('❌ Failed to create transfer:', err)
//     throw err
//   }
// }

export const fetchTransfers = async () => {
  try {
    const res = await fetch(`${process.env.API_URL}/zobiz/fetch-transfers`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store'
    })

    if (!res.ok) {
      const errorText = await res.text()
      throw new Error(`Failed to fetch transfers: ${errorText}`)
    }

    const data = await res.json()
    console.log('Fetched Transfers:', data)
    // ✅ Decrypt the response
    const decryptedPayload = decrypt(data.data);

    // ✅ Convert decrypted string → JSON
    const parsedBody = JSON.parse(decryptedPayload);

    console.log("Decrypted  Data:", parsedBody);

    return parsedBody; // final usable data
  } catch (error) {
    console.error("Error fetching  Data:", error.message);
    throw error;
  }
}
//     return { success: true, data: data.data }
//   } catch (error) {
//     console.error('Error fetching Transfers:', error)
//     throw error
//   }
// }
//Holidays
export const fetchCountHolidays = async () => {
  try {
    const res = await fetch(`${process.env.API_URL}/zobiz/total-count-holidays`, {
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

    console.log('Fetched Count Holidays Data:', data)
// ✅ Decrypt the response
    const decryptedPayload = decrypt(data.data);

    // ✅ Convert decrypted string → JSON
    const parsedBody = JSON.parse(decryptedPayload);

    console.log("Decrypted  Data:", parsedBody);

    return parsedBody; // final usable data
  } catch (error) {
    console.error("Error fetching  Data:", error.message);
    throw error;
  }
}
//     return data.data // return only branch array
//   } catch (error) {
//     console.error('Error fetching Holidays:', error)
//     throw error
//   }
// }

export const createHolidays = async (formData) => {
  try {
    // 🚀 POST multipart/form-data (no JSON.stringify, no Content-Type header)
    console.log("POOJAFORMDATA", formData)
    const res = await fetch(`${process.env.API_URL}/zobiz/create-holiday`, {
      method: 'POST',
      body: formData, // send raw FormData
      cache: 'no-store',
    })

    // 🧾 Handle errors
    if (!res.ok) {
      const errorText = await res.text()
      throw new Error(`Failed to create holiday: ${errorText}`)
    }

    const result = await res.json()
    console.log("✅ create  Holiday Response:", result)
    // ✅ Decrypt the response
    const decryptedPayload = decrypt(result.data);

    // ✅ Convert decrypted string → JSON
    const parsedBody = JSON.parse(decryptedPayload);

    console.log("Decrypted  Data:", parsedBody);

    return parsedBody; // final usable data
  } catch (error) {
    console.error("Error fetching  Data:", error.message);
    throw error;
  }
}
//     return result
//   } catch (err) {
//     console.error('❌ Failed to create holiday:', err)
//     throw err
//   }
// }

export const fetchHolidays = async () => {
  try {
    const res = await fetch(`${process.env.API_URL}/zobiz/fetch-holidays`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store'
    })

    if (!res.ok) {
      const errorText = await res.text()
      throw new Error(`Failed to fetch holidays: ${errorText}`)
    }

    const data = await res.json()
    console.log('Fetched Holidays:', data)
    // ✅ Decrypt the response
    const decryptedPayload = decrypt(data.data);

    // ✅ Convert decrypted string → JSON
    const parsedBody = JSON.parse(decryptedPayload);

    console.log("Decrypted  Data:", parsedBody);
return { success: true, data:parsedBody}
  } catch (error) {
    console.error("Error fetching  Data:", error.message);
    throw error;
  }
}
//     return { success: true, data: data.data }
//   } catch (error) {
//     console.error('Error fetching Holidays:', error)
//     throw error
//   }
// }

//Announcement
export const fetchCountAnnouncement = async () => {
  try {
    const res = await fetch(`${process.env.API_URL}/zobiz/total-count-announcement`, {
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

    console.log('Fetched Count Announcements Data:', data)
// ✅ Decrypt the response
    const decryptedPayload = decrypt(data.data);

    // ✅ Convert decrypted string → JSON
    const parsedBody = JSON.parse(decryptedPayload);

    console.log("Decrypted  Data:", parsedBody);

    return parsedBody; // final usable data
  } catch (error) {
    console.error("Error fetching  Data:", error.message);
    throw error;
  }
}
//     return data.data // return only branch array
//   } catch (error) {
//     console.error('Error fetching Announcements:', error)
//     throw error
//   }
// }


export const createAnnouncements = async (formData) => {
  try {
    // 🚀 POST multipart/form-data (no JSON.stringify, no Content-Type header)
    console.log("POOJAFORMDATA", formData)
    const res = await fetch(`${process.env.API_URL}/zobiz/create-announcement`, {
      method: 'POST',
      body: formData, // send raw FormData
      cache: 'no-store',
    })

    // 🧾 Handle errors
    if (!res.ok) {
      const errorText = await res.text()
      throw new Error(`Failed to create Announcements: ${errorText}`)
    }

    const result = await res.json()
    console.log("✅ create  Holiday Announcements:", result)
// ✅ Decrypt the response
    const decryptedPayload = decrypt(result.data);

    // ✅ Convert decrypted string → JSON
    const parsedBody = JSON.parse(decryptedPayload);

    console.log("Decrypted  Data:", parsedBody);

    return parsedBody; // final usable data
  } catch (error) {
    console.error("Error fetching  Data:", error.message);
    throw error;
  }
}
//     return result
//   } catch (err) {
//     console.error('❌ Failed to create Announcements:', err)
//     throw err
//   }
// }


export const fetchAnnouncements = async () => {
  try {
    const res = await fetch(`${process.env.API_URL}/zobiz/fetch-announcements`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store'
    })

    if (!res.ok) {
      const errorText = await res.text()
      throw new Error(`Failed to fetch announcements: ${errorText}`)
    }

    const data = await res.json()
    console.log('Fetched Announcements:', data)
    // ✅ Decrypt the response
    const decryptedPayload = decrypt(data.data);

    // ✅ Convert decrypted string → JSON
    const parsedBody = JSON.parse(decryptedPayload);

    console.log("Decrypted  Data:", parsedBody);
return { success: true, data:parsedBody}
  } catch (error) {
    console.error("Error fetching  Data:", error.message);
    throw error;
  }
}
//     return { success: true, data: data.data }
//   } catch (error) {
//     console.error('Error fetching Announcements:', error)
//     throw error
//   }
// }

//Attendancemanagemet  Shift
export const fetchCountShift = async () => {
  try {
    const res = await fetch(`${process.env.API_URL}/zobiz/total-count-shift`, {
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

    console.log('Fetched Count Shift Data:', data)
 // ✅ Decrypt the response
    const decryptedPayload = decrypt(data.data);

    // ✅ Convert decrypted string → JSON
    const parsedBody = JSON.parse(decryptedPayload);

    console.log("Decrypted  Data:", parsedBody);

    return parsedBody; // final usable data
  } catch (error) {
    console.error("Error fetching  Data:", error.message);
    throw error;
  }
}
//     return data.data // return only branch array
//   } catch (error) {
//     console.error('Error fetching Shift:', error)
//     throw error
//   }
// }



export const createShift = async (payload) => {
  try {
    const res = await fetch(`${process.env.API_URL}/zobiz/create-shift`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })

    // Parse the response
    const response = await res.json()

    console.log('🔐 Encrypted Response:', response)

    // 🔓 Strict decrypt (only response.data)
    const data = decrypt(response.data)

    console.log('📦 Decrypted Response:', data)

    // // Optional: handle bad status codes
    // if (!res.ok) {
    //   throw new Error(data.message || 'Failed to create shift')
    // }


    // ✅ Same validation style
    if (!data.success) {
      throw new Error(data.message || 'Failed to create shift')
    }
    return data
  } catch (error) {
    console.error('Error in createDepartment:', error)
    return {
      success: false,
      message: error.message || 'Something went wrong'
    }
  }
}


export const fetchShift = async () => {
  try {
    const res = await fetch(`${process.env.API_URL}/zobiz/fetch-shift`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      cache: 'no-store'
    })

    if (!res.ok) {
      const errorText = await res.text()
      throw new Error(`Failed to fetch shifts: ${errorText}`)
    }

    const data = await res.json()
    console.log('Fetched Shifts Data ✅:', data)
 // ✅ Decrypt the response
    const decryptedPayload = decrypt(data.data);

    // ✅ Convert decrypted string → JSON
    const parsedBody = JSON.parse(decryptedPayload);

    console.log("Decrypted  Data:", parsedBody);

    return parsedBody; // final usable data
  } catch (error) {
    console.error("Error fetching  Data:", error.message);
    throw error;
  }
}
//     // return just the array of shifts
//     return data.data
//   } catch (error) {
//     console.error('Error fetching shifts ❌:', error)
//     throw error
//   }
// }


export const editShift = async (formData) => {
  try {
    // Prepare payload directly from formData
    const payload = {
      _id: formData._id,
      shiftName: formData.shiftName,
      description: formData.description,
      startTime: formData.startTime,
      endTime: formData.endTime,
      breakDuration: formData.breakDuration,
      breakStartTime: formData.breakStartTime,
      breakEndTime: formData.breakEndTime,
      afternoonBreakStartTime: formData.afternoonBreakStartTime,
      afternoonBreakEndTime: formData.afternoonBreakEndTime,
      eveningBreakStartTime: formData.eveningBreakStartTime,
      eveningBreakEndTime: formData.eveningBreakEndTime,
      gracePeriod: formData.gracePeriod,
      isNightShift: formData.isNightShift,
      status: formData.status
    };

    console.log("🟡 Sending update shift payload:", payload);

    const res = await fetch(`${process.env.API_URL}/zobiz/edit-attendance-shift`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload),
      cache: 'no-store'
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Failed to update shift: ${errorText}`);
    }

    const shiftData = await res.json();

    console.log("✅ Updated Shift Response:", shiftData);
  // ✅ Decrypt the response
    const decryptedPayload = decrypt(shiftData.data);

    // ✅ Convert decrypted string → JSON
    const parsedBody = JSON.parse(decryptedPayload);

    console.log("Decrypted  Data:", parsedBody);

    return parsedBody; // final usable data
  } catch (error) {
    console.error("Error fetching  Data:", error.message);
    throw error;
  }
}

//     return shiftData;
//   } catch (err) {
//     console.error('❌ Failed to update shift:', err);
//     throw err;
//   }
// };

//Attendance policy

export const fetchCountAttendancePolicy = async () => {
  try {
    const res = await fetch(`${process.env.API_URL}/zobiz/total-count-attendance-policy`, {
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

    console.log('Fetched Count Attendance Policy Data:', data)
  // ✅ Decrypt the response
    const decryptedPayload = decrypt(data.data);

    // ✅ Convert decrypted string → JSON
    const parsedBody = JSON.parse(decryptedPayload);

    console.log("Decrypted  Data:", parsedBody);

    return parsedBody; // final usable data
  } catch (error) {
    console.error("Error fetching  Data:", error.message);
    throw error;
  }
}

//     return data.data // return only branch array
//   } catch (error) {
//     console.error('Error fetching Attendance Policy:', error)
//     throw error
//   }
// }


// ✅ Create Attendance Policy - POST API
export const createAttendancePolicy = async (formData) => {
  try {
    // 🧩 Prepare payload — ensure numeric fields are numbers
    const payload = {
      policyName: formData.policyName,
      description: formData.description,
      lateArrivalGrace: Number(formData.lateArrivalGrace),
      earlyDeparture: Number(formData.earlyDeparture),
      status: formData.status
    }

    console.log('🟢 Sending Attendance Policy Payload:', payload)

    const res = await fetch(`${process.env.API_URL}/zobiz/create-attendance-policy`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload),
      cache: 'no-store'
    })

    // ❌ Handle server errors
    if (!res.ok) {
      const errorText = await res.text()
      throw new Error(`Failed to create attendance policy: ${errorText}`)
    }

    // ✅ Parse response
    const data = await res.json()
    console.log('✅ Attendance Policy Created:', data)
  // ✅ Decrypt the response
    const decryptedPayload = decrypt(data.data);

    // ✅ Convert decrypted string → JSON
    const parsedBody = JSON.parse(decryptedPayload);

    console.log("Decrypted  Data:", parsedBody);

    return parsedBody; // final usable data
  } catch (error) {
    console.error("Error fetching  Data:", error.message);
    throw error;
  }
}

//     return data
//   } catch (error) {
//     console.error('❌ Error creating attendance policy:', error)
//     throw error
//   }
// }

export const fetchAttendancePolicy = async () => {
  try {
    const res = await fetch(`${process.env.API_URL}/zobiz/fetch-attendance-policy`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      cache: 'no-store'
    })

    if (!res.ok) {
      const errorText = await res.text()
      throw new Error(`Failed to fetch atttendance policy: ${errorText}`)
    }

    const data = await res.json()
    console.log('Fetched Attendance Policy Data ✅:', data)
  // ✅ Decrypt the response
    const decryptedPayload = decrypt(data.data);

    // ✅ Convert decrypted string → JSON
    const parsedBody = JSON.parse(decryptedPayload);

    console.log("Decrypted  Data:", parsedBody);

    return parsedBody; // final usable data
  } catch (error) {
    console.error("Error fetching  Data:", error.message);
    throw error;
  }
}

    // return just the array of shifts
//     return data.data
//   } catch (error) {
//     console.error('Error fetching atttendance policy ❌:', error)
//     throw error
//   }
// }

export const editAttendancePolicy = async (formData) => {
  try {
    // 🧩 Prepare payload directly from formData
    const payload = {
      _id: formData._id,
      policyName: formData.policyName,
      description: formData.description,
      lateArrivalGrace: Number(formData.lateArrivalGrace),
      earlyDeparture: Number(formData.earlyDeparture),
      status: formData.status
    };

    console.log("🟡 Sending Attendance Policy Update Payload:", payload);

    const res = await fetch(`${process.env.API_URL}/zobiz/edit-attendance-policy`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload),
      cache: 'no-store'
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Failed to update attendance policy: ${errorText}`);
    }

    const data = await res.json();

    console.log("✅ Attendance Policy Updated Successfully:", data);
  // ✅ Decrypt the response
    const decryptedPayload = decrypt(data.data);

    // ✅ Convert decrypted string → JSON
    const parsedBody = JSON.parse(decryptedPayload);

    console.log("Decrypted  Data:", parsedBody);

    return parsedBody; // final usable data
  } catch (error) {
    console.error("Error fetching  Data:", error.message);
    throw error;
  }
}

//     return data;
//   } catch (err) {
//     console.error('❌ Failed to update attendance policy:', err);
//     throw err;
//   }
// };

//Attendance records
export const fetchCountAttendanceRecord = async (token) => {
  try {

    if (!token) throw new Error('Token missing for fetchCountAttendanceRecord')
    console.log("TOKEN", token)

    const res = await fetch(`${process.env.API_URL}/zobiz/total-count-attendance-records`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'token': token
      },
      cache: 'no-store' // ensures latest data
    })

    if (!res.ok) {
      const errorText = await res.text()

      throw new Error(`Failed to fetch data: ${errorText}`)
    }

    const data = await res.json()

    console.log('Fetched Count Attendance Record Data:', data)
  // ✅ Decrypt the response
    const decryptedPayload = decrypt(data.data);

    // ✅ Convert decrypted string → JSON
    const parsedBody = JSON.parse(decryptedPayload);

    console.log("Decrypted  Data:", parsedBody);

    return parsedBody; // final usable data
  } catch (error) {
    console.error("Error fetching  Data:", error.message);
    throw error;
  }
}

//     return data.data // return only branch array
//   } catch (error) {
//     console.error('Error fetching Attendance Record:', error)
//     throw error
//   }
// }


export const createAttendanceRecord = async (formData) => {
  try {
    // 🧩 Prepare payload to match backend expectations
    const payload = {
      employees: formData.employees,                                // employee ObjectId
      date: formData.date,                                          // ISO date string (YYYY-MM-DD)
      clockIn: formData.clockIn,                                    // HH:mm
      clockOut: formData.clockOut,                                  // HH:mm
      breakHours: formData.breakHours,                              // number or string
      status: formData.status,                                      // Present/Absent/etc.
      isHoliday: formData.isHoliday,                                // boolean
      notes: formData.notes                                         // string
    };

    console.log('🟢 Sending Attendance Record Payload:', payload);

    // 📨 Send POST request to backend API
    const res = await fetch(`${process.env.API_URL}/zobiz/create-attendance-record`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload),
      cache: 'no-store' // ensures fresh API call
    });

    // ❌ Handle HTTP-level errors
    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Failed to create attendance record: ${errorText}`);
    }

    // ✅ Parse backend response
    const data = await res.json();
    console.log('✅ Attendance Record Created:', data);
  // ✅ Decrypt the response
    const decryptedPayload = decrypt(data.data);

    // ✅ Convert decrypted string → JSON
    const parsedBody = JSON.parse(decryptedPayload);

    console.log("Decrypted  Data:", parsedBody);

    return parsedBody; // final usable data
  } catch (error) {
    console.error("Error fetching  Data:", error.message);
    throw error;
  }
}

//     return data;
//   } catch (error) {
//     console.error('❌ Error creating attendance record:', error);
//     throw error;
//   }
// };

export const fetchAttendanceRecords = async (token) => {
  try {
    if (!token) throw new Error('Token missing for fetchAttendanceRegularizations')
    const res = await fetch(`${process.env.API_URL}/zobiz/get-attendance-records`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'token': token
      },
      cache: 'no-store' // always get latest records
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Failed to fetch attendance records: ${errorText}`);
    }

    const data = await res.json();
    console.log('✅ Fetched Attendance Records:', data);
  // ✅ Decrypt the response
    const decryptedPayload = decrypt(data.data);

    // ✅ Convert decrypted string → JSON
    const parsedBody = JSON.parse(decryptedPayload);

    console.log("Decrypted  Data:", parsedBody);

    return parsedBody; // final usable data
  } catch (error) {
    console.error("Error fetching  Data:", error.message);
    throw error;
  }
}

    // Return only the array of records
//     return data.data;
//   } catch (error) {
//     console.error('❌ Error fetching attendance records:', error);
//     throw error;
//   }
// };



export const editAttendanceRecord = async (formData) => {
  try {
    // 🧩 Prepare payload from formData
    const payload = {
      _id: formData._id,
      employeeId: formData.employeeId,
      employee: formData.employee,
      date: formData.date,
      clockIn: formData.clockIn,
      clockOut: formData.clockOut,
      breakHours: formData.breakHours,
      status: formData.status,
      isHoliday: formData.isHoliday ?? false,
      notes: formData.notes || ''
    }

    console.log('🟡 Sending Attendance Record Update Payload:', payload)

    // ✅ API call
    const res = await fetch(`${process.env.API_URL}/zobiz/edit-attendance-record`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        // If your backend uses auth middleware, uncomment below:
        // 'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(payload),
      cache: 'no-store'
    })

    // 🚨 Log the status for debugging
    console.log('📡 editAttendanceRecord Response Status:', res.status)

    if (res.status === 403) {
      throw new Error('Forbidden (403): You might be hitting the wrong endpoint or missing authorization.')
    }

    if (!res.ok) {
      const errorText = await res.text()
      throw new Error(`Failed to update attendance record: ${errorText}`)
    }

    const data = await res.json()
    console.log('✅ Attendance Record Updated Successfully:', data)
      // ✅ Decrypt the response
    const decryptedPayload = decrypt(data.data);

    // ✅ Convert decrypted string → JSON
    const parsedBody = JSON.parse(decryptedPayload);

    console.log("Decrypted  Data:", parsedBody);

    return parsedBody; // final usable data
  } catch (error) {
    console.error("Error fetching  Data:", error.message);
    throw error;
  }
}

//     return data
//   } catch (err) {
//     console.error('❌ Failed to update attendance record:', err)
//     throw err
//   }
// }
//Attendance Regularization

export const fetchCountAttendanceRegularization = async (token) => {
  try {
    if (!token) throw new Error('Token missing for fetchCountAttendanceRegularization')
    console.log("TOKEN", token)
    const res = await fetch(`${process.env.API_URL}/zobiz/total-count-attendance-regularization`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'token': token // ✅ your backend expects token here, not Bearer
      },
      cache: 'no-store'
    })

    if (!res.ok) {
      const errorText = await res.text()
      throw new Error(`Failed to fetch regularization count: ${errorText}`)
    }

    const data = await res.json()
    console.log('✅ Fetched Count Attendance Regularization Data:', data)
  // ✅ Decrypt the response
    const decryptedPayload = decrypt(data.data);

    // ✅ Convert decrypted string → JSON
    const parsedBody = JSON.parse(decryptedPayload);

    console.log("Decrypted  Data:", parsedBody);

    return parsedBody; // final usable data
  } catch (error) {
    console.error("Error fetching  Data:", error.message);
    throw error;
  }
}

    //     return data.data
//   } catch (error) {
//     console.error('❌ Error fetching Attendance Regularization Count:', error)
//     throw error
//   }
// }


export const fetchAttendanceRecordsForAR = async (employeeId, token) => {
  try {
    if (!employeeId) throw new Error('Employee ID missing for fetchAttendanceRecordsForAR');
    if (!token) throw new Error('Token missing for fetchAttendanceRecordsForAR');

    console.log("📩 Fetching Attendance Records For:", employeeId);
    console.log("🔑 Token:", token);

    const res = await fetch(`${process.env.API_URL}/zobiz/fetch-attendance-records-for-ar/${employeeId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'token': token // ✅ Backend expects token here (not Bearer)
      },
      cache: 'no-store'
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Failed to fetch attendance records: ${errorText}`);
    }

    const data = await res.json();
    console.log('✅ Fetched Attendance Records For AR:', data);
// ✅ Decrypt the response
    const decryptedPayload = decrypt(data.data);

    // ✅ Convert decrypted string → JSON
    const parsedBody = JSON.parse(decryptedPayload);

    console.log("Decrypted  Data:", parsedBody);

    return parsedBody; // final usable data
  } catch (error) {
  //   // returns: { success: true, count: <number>, data: [ { _id, displayInfo } ] }
  //   return data;
  // } catch (error) {
    console.error('❌ Error fetching Attendance Records For AR:', error);
    return { success: false, data: [] };
  }
};

export const createAttendanceRegularization = async (payload, token) => {
  try {
    if (!token) throw new Error('Token missing for createAttendanceRegularization')

    const res = await fetch(`${process.env.API_URL}/zobiz/create-attendance-regularization`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        token: token
      },
      body: JSON.stringify(payload),
      cache: 'no-store'
    })

    const data = await res.json()
    // ✅ Decrypt the response
    const decryptedPayload = decrypt(data.data);

    // ✅ Convert decrypted string → JSON
    const parsedBody = JSON.parse(decryptedPayload);

    console.log("Decrypted  Data:", parsedBody);

    return parsedBody; // final usable data
  } catch (error) {
  //   return data
  // } catch (error) {
    console.error('❌ Error in createAttendanceRegularization:', error)
    return {
      success: false,
      message: error.message || 'Something went wrong while creating regularization request'
    }
  }
}


export const fetchAttendanceRegularizations = async (token) => {
  try {
    if (!token) throw new Error('Token missing for fetchAttendanceRegularizations')

    console.log('🔹 Fetching Attendance Regularizations with token:', token)

    const res = await fetch(`${process.env.API_URL}/zobiz/fetch-attendance-regularizations`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'token': token, // ✅ backend expects token here (not Bearer)
      },
      cache: 'no-store',
    })

    if (!res.ok) {
      const errorText = await res.text()
      throw new Error(`Failed to fetch attendance regularizations: ${errorText}`)
    }

    const response = await res.json()

    console.log('🔐 Encrypted Response:', response)

    // 🔓 Decrypt ONLY response.data
    const data = decrypt(response.data)

    console.log('📦 Decrypted Attendance Regularizations:', data)

    // return the array safely
    return data?.data || []
  } catch (error) {
    console.error('❌ Error fetching attendance regularizations:', error)
    throw error
  }
}

export const updateAttendanceRegularization = async (payload, token) => {
  try {
    if (!token) throw new Error('Token missing for updateAttendanceRegularization')

    const res = await fetch(`${process.env.API_URL}/zobiz/update-attendance-regularization`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        token: token // ✅ backend expects 'token' header
      },
      body: JSON.stringify(payload),
      cache: 'no-store'
    })

    // ✅ handle response
    const data = await res.json()

    if (!res.ok) {
      throw new Error(data.message || 'Failed to update attendance regularization')
    }

    console.log('✅ Attendance Regularization updated successfully:', data)
   // ✅ Decrypt the response
    const decryptedPayload = decrypt(data.data);

    // ✅ Convert decrypted string → JSON
    const parsedBody = JSON.parse(decryptedPayload);

    console.log("Decrypted  Data:", parsedBody);

    return parsedBody; // final usable data
  } catch (error) {
    //   return data
  // } catch (error) {
    console.error('❌ Error in updateAttendanceRegularization:', error)
    return {
      success: false,
      message: error.message || 'Something went wrong while updating attendance regularization'
    }
  }
}

//Payroll Management

export const fetchCountSalaryComponent = async () => {
  try {

    const res = await fetch(`${process.env.API_URL}/zobiz/total-salarycomponent-count`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',

      },
      cache: 'no-store'
    })

    if (!res.ok) {
      const errorText = await res.text()
      throw new Error(`Failed to fetch salary component count: ${errorText}`)
    }

    const data = await res.json()
    console.log('✅ Fetched Count Salary Component Data:', data)
    return data.data
  } catch (error) {
    console.error('❌ Error fetching Salary Component Count:', error)
    throw error
  }
}



export const createSalaryComponent = async (formData) => {
  try {


    // 📨 Send POST request to backend API
    const res = await fetch(`${process.env.API_URL}/zobiz/create-salary-component`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData),
      cache: 'no-store' // ensures fresh API call
    });

    // ❌ Handle HTTP-level errors
    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Failed to create salary component: ${errorText}`);
    }

    // ✅ Parse backend response
    const data = await res.json();
    console.log('✅Salary component Created:', data);

    return data;
  } catch (error) {
    console.error('❌ Error creating Salary Component:', error);
    throw error;
  }
};

export const fetchSalaryComponent = async () => {
  try {
    const res = await fetch(`${process.env.API_URL}/zobiz/fetch-salary-component`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      cache: 'no-store' // always get latest records
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Failed to fetch attendance records: ${errorText}`);
    }

    const data = await res.json();
    console.log('✅ Fetched Attendance Records:', data);

    // Return only the array of records
    return data.data;
  } catch (error) {
    console.error('❌ Error fetching attendance records:', error);
    throw error;
  }
};

export const editSararyComponent = async (formData) => {
  try {

    const res = await fetch(`${process.env.API_URL}/zobiz/update-salary-component`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData),
      cache: 'no-store'
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Failed to update salary component: ${errorText}`);
    }

    const data = await res.json();

    console.log("✅ Salary  Component Updated Successfully:", data);

    return data;
  } catch (err) {
    console.error('❌ Failed to update salary component:', err);
    throw err;
  }
};

// export const fetchListOfSalaryComponent = async () => {
//   try {
//     const res = await fetch(`${process.env.API_URL}/zobiz/list-of-salary-component`, {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       cache: 'no-store' // ensures latest data
//     })

//     if (!res.ok) {
//       const errorText = await res.text()

//       throw new Error(`Failed to fetch salary component: ${errorText}`)
//     }

//     const data = await res.json()

//     console.log(' Data:', data)

// return data.data 
//   } catch (error) {
//     console.error('Error fetching:', error)
//     throw error
//   }
// }

export const fetchListOfSalaryComponent = async () => {
  try {
    const res = await fetch(`${process.env.API_URL}/zobiz/list-of-salary-component`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      cache: 'no-store'
    })

    if (!res.ok) {
      const errorText = await res.text()
      throw new Error(`Failed to fetch salary component: ${errorText}`)
    }

    const data = await res.json()
    console.log('✅ Salary Component API Response:', data)

    // If backend returns { success: true, data: [...] }
    if (data?.data && Array.isArray(data.data)) {
      return data.data
    }

    // If backend directly returns array
    if (Array.isArray(data)) {
      return data
    }

    console.warn('⚠️ Unexpected salary component response structure:', data)
    return []
  } catch (error) {
    console.error('❌ Error fetching salary components:', error)
    return []
  }
}

export const fetchCountEmployeeSalary = async (token) => {
  try {

    if (!token) throw new Error('Token missing for fetchCountEmployeeSalary')
    console.log("TOKEN", token)

    const res = await fetch(`${process.env.API_URL}/zobiz/total-count-employee-salary`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'token': token
      },
      cache: 'no-store' // ensures latest data
    })

    if (!res.ok) {
      const errorText = await res.text()

      throw new Error(`Failed to fetch data: ${errorText}`)
    }

    const data = await res.json()

    console.log('Fetched Count Employee Salary Data:', data)

    return data.data // return only branch array
  } catch (error) {
    console.error('Error fetching Emloyee Salary:', error)
    throw error
  }
}
export const createEmployeeSalary = async (formData, token) => {
  try {
    // 🧩 Prepare payload matching backend expectations
    const payload = {
      employee: formData.employee,
      basicSalary: formData.basicSalary,
      salaryComponents: formData.salaryComponents,
      fixedSalary: formData.fixedSalary,
      grossSalary: formData.grossSalary,
      annualSalary: formData.annualSalary,
      isHraFixed: formData.isHraFixed,
      hraFixedAmount: formData.hraFixedAmount,
      isNAPS: formData.isNAPS,
      isNAPS: formData.isNAPS,
      status: formData.status,
      notes: formData.notes,
      employeeStatus: formData.employeeStatus
    };

    console.log('🟢 Sending Salary Payload:', payload);

    // 📨 Send POST request to backend API
    const res = await fetch(`${process.env.API_URL}/zobiz/create-employee-salary`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'token': token // ✅ added auth token
      },
      body: JSON.stringify(payload),
      cache: 'no-store'
    });

    // ❌ Handle HTTP-level errors
    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Failed to create employee salary: ${errorText}`);
    }

    // ✅ Parse backend response
    const data = await res.json();
    console.log('✅ Employee Salary Created:', data);

    return data;
  } catch (error) {
    console.error('❌ Error creating employee salary:', error);
    throw error;
  }
};


export const fetchEmployeeSalary = async (token) => {
  try {
    if (!token) throw new Error('Token missing for fetchEmployeeSalary')

    console.log('🔹 Fetching Employee Salary with token:', token)

    const res = await fetch(`${process.env.API_URL}/zobiz/fetch-employee-salary`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'token': token, // ✅ backend expects token here (not Bearer)
      },
      cache: 'no-store',
    })

    if (!res.ok) {
      const errorText = await res.text()
      throw new Error(`Failed to employee salary: ${errorText}`)
    }

    const data = await res.json()
    console.log('✅ Employee Salary fetched:', data)

    // return the array safely
    return data || []
  } catch (error) {
    console.error('❌ Error fetching employee salary:', error)
    throw error
  }
}


export const updateEmployeeSalary = async (payload, token) => {
  try {
    if (!token) throw new Error('Token missing for updateEmployeeSalary')

    const res = await fetch(`${process.env.API_URL}/zobiz/update-employee-salary`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        token: token // ✅ backend expects 'token' header
      },
      body: JSON.stringify(payload),
      cache: 'no-store'
    })

    // ✅ handle response
    const data = await res.json()

    // if (!res.ok) {
    //   throw new Error(data.message || 'Failed to update employee salary')
    // }

    console.log('✅ Employee Salary updated successfully:', data)
    // return data

    if (!res.ok) {
      return {
        success: false,
        message: data?.message || "Failed to update employee salary"
      }
    }
    console.log("testdebug", {
      success: true,
      message: data?.message || "Employee salary updated successfully!"
    })
    // SUCCESS case
    return {
      success: true,
      message: data?.message || "Employee salary updated successfully!"
    }

  } catch (error) {
    console.error('❌ Error in updateEmployeeSalary:', error)
    return {
      success: false,
      message: error.message || 'Something went wrong while updating employee salary'
    }
  }
}

//Advance Salary Request

export const fetchCountSalaryAdvanceRequest = async (token) => {
  try {

    if (!token) throw new Error('Token missing for fetchAdvanceSalaryRequest')
    console.log("TOKEN", token)

    const res = await fetch(`${process.env.API_URL}/zobiz/total-count-advance-request`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'token': token
      },
      cache: 'no-store' // ensures latest data
    })

    if (!res.ok) {
      const errorText = await res.text()

      throw new Error(`Failed to fetch data: ${errorText}`)
    }

    const data = await res.json()

    console.log('Fetched Count Salary Advance Request Data:', data)

    return data.data // return only branch array
  } catch (error) {
    console.error('Error fetching Salary Advance Request:', error)
    throw error
  }
}


export const createAdvanceSalaryRequest = async (formData, token) => {
  try {
    // 🧩 Prepare payload matching backend expectations
    const payload = {
      employee: formData.employee,
      requestedAmount: formData.requestedAmount,
      status: formData.status,
      notes: formData.notes
    };

    console.log('🟢 Sending Salary advance Payload:', payload);

    // 📨 Send POST request to backend API
    const res = await fetch(`${process.env.API_URL}/zobiz/create-advance-request`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'token': token // ✅ added auth token
      },
      body: JSON.stringify(payload),
      cache: 'no-store'
    });

    // ❌ Handle HTTP-level errors
    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Failed to create employee salary advance request: ${errorText}`);
    }

    // ✅ Parse backend response
    const data = await res.json();
    console.log('✅ Employee Salary  advance requested Created:', data);

    return data;
  } catch (error) {
    console.error('❌ Error creating employee salary request:', error);
    throw error;
  }
};


export const updateAdvanceSalaryRequest = async (payload, token) => {
  try {
    if (!token) throw new Error('Token missing for updateSalaryRequest')
    console.log("DADADADADADA", payload)

    const res = await fetch(`${process.env.API_URL}/zobiz/update-advance-request`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        token: token // ✅ backend expects 'token' header
      },
      body: JSON.stringify(payload),
      cache: 'no-store'
    })

    // ✅ handle response
    const data = await res.json()

    // if (!res.ok) {
    //   throw new Error(data.message || 'Failed to update employee salary')
    // }

    console.log('✅ Employee Salary Advance Request updated successfully:', data)
    // return data

    if (!res.ok) {
      return {
        success: false,
        message: data?.message || "Failed to update employee salary advance request"
      }
    }

    // SUCCESS case
    return {
      success: true,
      message: data?.message || "Employee salary advance request updated successfully!"
    }

  } catch (error) {
    console.error('❌ Error in updateSalaryRequest:', error)
    return {
      success: false,
      message: error.message || 'Something went wrong while updating employee salary request'
    }
  }
}

export const fetchSalaryAdvanceRequest = async (token) => {
  try {
    if (!token) throw new Error('Token missing for fetchSalaryAdvanceRequest')

    console.log('🔹 Fetching Employee Salary with token:', token)

    const res = await fetch(`${process.env.API_URL}/zobiz/fetch-advance-requests`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'token': token, // ✅ backend expects token here (not Bearer)
      },
      cache: 'no-store',
    })

    if (!res.ok) {
      const errorText = await res.text()
      throw new Error(`Failed to employee salary advance: ${errorText}`)
    }

    const data = await res.json()
    console.log('✅ Employee Salary advance fetched:', data)

    // return the array safely
    return data || []
  } catch (error) {
    console.error('❌ Error fetching employee salary advance:', error)
    throw error
  }
}


export const fetchCountLeaveType = async () => {
  try {

    const res = await fetch(`${process.env.API_URL}/zobiz/total-count-leave-type`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',

      },
      cache: 'no-store'
    })

    if (!res.ok) {
      const errorText = await res.text()
      throw new Error(`Failed to fetch leave type count: ${errorText}`)
    }

    const data = await res.json()
    console.log('✅ Fetched Count Leave Type Data:', data)
    return data.data
  } catch (error) {
    console.error('❌ Error fetching Leave Type Count:', error)
    throw error
  }
}

export const createLeaveType = async (payload) => {
  try {
    const res = await fetch(`${process.env.API_URL}/zobiz/create-leave-type`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })

    // Parse the response
    const data = await res.json()

    // Optional: handle bad status codes
    if (!res.ok) {
      throw new Error(data.message || 'Failed to create leaveType')
    }

    return data
  } catch (error) {
    console.error('Error in createLeaveType:', error)
    return {
      success: false,
      message: error.message || 'Something went wrong'
    }
  }
}

export const fetchLeaveType = async () => {
  try {
    const res = await fetch(`${process.env.API_URL}/zobiz/fetch-leave-type`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      cache: 'no-store'
    })

    if (!res.ok) {
      const errorText = await res.text()
      throw new Error(`Failed to fetch leave type: ${errorText}`)
    }

    const data = await res.json()
    console.log('Fetched Leave Type Data ✅:', data)

    // return just the array of shifts
    return data.data
  } catch (error) {
    console.error('Error fetching leave Type ❌:', error)
    throw error
  }
}


export const editLeaveType = async (formData) => {
  try {
    // Prepare payload directly from formData
    const payload = {
      _id: formData._id,
      leaveTypeName: formData.leaveTypeName,
      description: formData.description,
      maxDays: formData.maxDays,
      isPaidStaus: formData.isPaidStaus,
      status: formData.status

    };

    console.log("🟡 Sending update leave type payload:", payload);

    const res = await fetch(`${process.env.API_URL}/zobiz/update-leave-type`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload),
      cache: 'no-store'
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Failed to update leave type: ${errorText}`);
    }

    const leaveTypeData = await res.json();

    console.log("✅ Updated leave type:", leaveTypeData);

    return leaveTypeData;
  } catch (err) {
    console.error('❌ Failed to update leave type:', err);
    throw err;
  }
};


export const fetchListOfLeaveType = async () => {
  try {
    const res = await fetch(`${process.env.API_URL}/zobiz/fetch-list-leave-type`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      cache: 'no-store' // ensures latest data
    })

    if (!res.ok) {
      const errorText = await res.text()

      throw new Error(`Failed to fetch leave type: ${errorText}`)
    }

    const data = await res.json()

    console.log(' Data:', data)

    return data.data // return only branch array
  } catch (error) {
    console.error('Error fetching:', error)
    throw error
  }
}


//Leave Policy

export const fetchCountLeavePolicy = async () => {
  try {

    const res = await fetch(`${process.env.API_URL}/zobiz/total-count-leave-policy`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',

      },
      cache: 'no-store'
    })

    if (!res.ok) {
      const errorText = await res.text()
      throw new Error(`Failed to fetch leave policy count: ${errorText}`)
    }

    const data = await res.json()
    console.log('✅ Fetched Count Leave Policy Data:', data)
    return data.data
  } catch (error) {
    console.error('❌ Error fetching Leave Policy Count:', error)
    throw error
  }
}


export const createLeavePolicy = async (payload) => {
  try {
    const res = await fetch(`${process.env.API_URL}/zobiz/create-leave-policy`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })

    // Parse the response
    const data = await res.json()

    // Optional: handle bad status codes
    if (!res.ok) {
      throw new Error(data.message || 'Failed to create leave policy')
    }

    return data
  } catch (error) {
    console.error('Error in createLeavePolicy:', error)
    return {
      success: false,
      message: error.message || 'Something went wrong'
    }
  }
}

export const fetchLeavePolicy = async () => {
  try {
    const res = await fetch(`${process.env.API_URL}/zobiz/fetch-leave-policies`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      cache: 'no-store'
    })

    if (!res.ok) {
      const errorText = await res.text()
      throw new Error(`Failed to fetch leave policy: ${errorText}`)
    }

    const data = await res.json()
    console.log('Fetched Leave Policy Data ✅:', data)

    // return just the array of shifts
    return data.data
  } catch (error) {
    console.error('Error fetching leave Policy ❌:', error)
    throw error
  }
}


export const editLeavePolicy = async (formData) => {
  try {
    // Prepare payload directly from formData
    const payload = {
      _id: formData._id,
      policyName: formData.policyName,
      description: formData.description,
      leaveType: formData.leaveType,
      accuralType: formData.accuralType,
      accuralRates: formData.accuralRates,
      carryForwardLimit: formData.carryForwardLimit,
      minDays: formData.minDays,
      maxDays: formData.maxDays,
      isRequired: formData.isRequired,
      status: formData.status

    };

    console.log("🟡 Sending update leave policy payload:", payload);

    const res = await fetch(`${process.env.API_URL}/zobiz/update-leave-policy`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload),
      cache: 'no-store'
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Failed to update leave policy: ${errorText}`);
    }

    const leavePolicyData = await res.json();

    console.log("✅ Updated leave policy:", leavePolicyData);

    return leavePolicyData;
  } catch (err) {
    console.error('❌ Failed to update leave policy:', err);
    throw err;
  }
};

//Leave Application

export const fetchCountLeaveApplication = async (token) => {
  try {

    if (!token) throw new Error('Token missing for fetchAdvanceSalaryRequest')
    console.log("TOKEN", token)

    const res = await fetch(`${process.env.API_URL}/zobiz/total-count-leave-application`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'token': token
      },
      cache: 'no-store' // ensures latest data
    })

    if (!res.ok) {
      const errorText = await res.text()

      throw new Error(`Failed to fetch data: ${errorText}`)
    }

    const data = await res.json()

    console.log('Fetched Count Leave Application Data:', data)

    return data.data // return only branch array
  } catch (error) {
    console.error('Error fetching Leave Application:', error)
    throw error
  }
}



export const createLeaveApplication = async (formData, token) => {
  try {
    const payload = new FormData()

    payload.append('employee', formData.employee)
    payload.append('leaveType', formData.leaveType)
    payload.append('startDate', formData.startDate)
    payload.append('endDate', formData.endDate)

    payload.append('reason', formData.reason)
    payload.append('status', formData.status)

    // ✅ FILE / ATTACHMENT
    if (formData.attachments) {
      // FileUploadController single file de raha hai
      payload.append('attachments', formData.attachments)
    }

    console.log('🟢 Sending Leave Application FormData')

    const res = await fetch(
      `${process.env.API_URL}/zobiz/create-leave-application`,
      {
        method: 'POST',
        headers: {
          token // ✅ AUTH ONLY
        },
        body: payload,
        cache: 'no-store'
      }
    )

    if (!res.ok) {
      const errorText = await res.text()
      throw new Error(`Failed to create leave application: ${errorText}`)
    }

    const data = await res.json()
    console.log('✅ Leave application created:', data)

    return data
  } catch (error) {
    console.error('❌ Error creating leave application:', error)
    throw error
  }
}




export const updateLeaveApplication = async (payload, token) => {
  try {
    if (!token) {
      return {
        success: false,
        message: 'Token missing for updateLeaveApplication'
      }
    }

    console.log('📤 UPDATE LEAVE PAYLOAD:', payload)

    const res = await fetch(
      `${process.env.API_URL}/zobiz/update-leave-application`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          token // ✅ backend expects token header
        },
        body: JSON.stringify(payload),
        cache: 'no-store'
      }
    )

    let data = {}
    try {
      data = await res.json()
    } catch (err) {
      // backend did not return JSON
    }

    if (!res.ok) {
      return {
        success: false,
        message: data?.message || 'Failed to update employee leave application'
      }
    }

    console.log('✅ Leave Application updated successfully:', data)

    return {
      success: true,
      message: data?.message || 'Leave application updated successfully'
    }
  } catch (error) {
    console.error('❌ Error in updateLeaveApplication:', error)

    return {
      success: false,
      message:
        error?.message ||
        'Something went wrong while updating employee leave application'
    }
  }
}



export const fetchLeaveApplication = async (token) => {
  try {
    if (!token) throw new Error('Token missing')

    const res = await fetch(`${process.env.API_URL}/zobiz/fetch-leave-application`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        token
      },
      cache: 'no-store'
    })

    if (!res.ok) {
      const errorText = await res.text()
      throw new Error(errorText)
    }

    const json = await res.json()
    console.log('✅ Leave Application API:', json)

    // ✅ IMPORTANT
    return json?.data || []

  } catch (error) {
    console.error('❌ Error fetching leave application:', error)
    return []
  }
}


//Leave Balances

export const fetchCountLeaveBalance = async (token) => {
  try {

    if (!token) throw new Error('Token missing for fetchLeaveBalnce')
    console.log("TOKEN", token)

    const res = await fetch(`${process.env.API_URL}/zobiz/total-count-leave-balance`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'token': token
      },
      cache: 'no-store' // ensures latest data
    })

    if (!res.ok) {
      const errorText = await res.text()

      throw new Error(`Failed to fetch data: ${errorText}`)
    }

    const data = await res.json()

    console.log('Fetched Count Leave Balance Data:', data)

    return data.data // return only branch array
  } catch (error) {
    console.error('Error fetching Leave Balance:', error)
    throw error
  }
}

export const createLeaveBalance = async (formData, token) => {
  try {
    const res = await fetch(
      `${process.env.API_URL}/zobiz/create-leave-balance`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // ✅ MUST
          token: token     // ✅ Better than custom token
        },
        body: JSON.stringify({
          employee: formData.employee,
          leaveType: formData.leaveType,
          year: formData.year,
          allocatedDays: formData.allocatedDays,
          carriedForwardDays: formData.carriedForwardDays,
          manualAdustment: formData.manualAdustment,
          reason: formData.reason
        }),
        cache: 'no-store'
      }
    )

    if (!res.ok) {
      const errorText = await res.text()
      throw new Error(errorText)
    }

    return await res.json()
  } catch (error) {
    console.error('❌ Error creating leave balance:', error)
    throw error
  }
}



export const updateLeaveBalance = async (payload, token) => {
  try {
    if (!token) {
      return {
        success: false,
        message: 'Token missing for updateLeaveBalance'
      }
    }

    console.log('📤 UPDATE LEAVE PAYLOAD:', payload)

    const res = await fetch(
      `${process.env.API_URL}/zobiz/update-leave-balance`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          token // ✅ backend expects token header
        },
        body: JSON.stringify(payload),
        cache: 'no-store'
      }
    )

    let data = {}
    try {
      data = await res.json()
    } catch (err) {
      // backend did not return JSON
    }

    if (!res.ok) {
      return {
        success: false,
        message: data?.message || 'Failed to update employee leave balance'
      }
    }

    console.log('✅ Leave Balance updated successfully:', data)

    return {
      success: true,
      message: data?.message || 'Leave balance updated successfully'
    }
  } catch (error) {
    console.error('❌ Error in updateLeaveBalance:', error)

    return {
      success: false,
      message:
        error?.message ||
        'Something went wrong while updating employee leave balance'
    }
  }
}

export const fetchLeaveBalance = async (token) => {
  try {
    if (!token) throw new Error('Token missing')

    const res = await fetch(`${process.env.API_URL}/zobiz/fetch-leave-balance`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        token
      },
      cache: 'no-store'
    })

    if (!res.ok) {
      const errorText = await res.text()
      throw new Error(errorText)
    }

    const json = await res.json()
    console.log('✅ Leave Balance API:', json)

    // ✅ IMPORTANT
    return json?.data || []

  } catch (error) {
    console.error('❌ Error fetching leave balance:', error)
    return []
  }
}

//NAPSNATS
export const fetchListOfNapsNatsUser = async (status) => {
  try {
    const res = await fetch(`${process.env.API_URL}/zobiz/list-of-napsnats-user?status=${status}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      cache: 'no-store' // ensures latest data
    })

    if (!res.ok) {
      const errorText = await res.text()

      throw new Error(`Failed to fetch user: ${errorText}`)
    }

    const data = await res.json()

    console.log(' Data:', data)

    return data.data // return only branch array
  } catch (error) {
    console.error('Error fetching:', error)
    throw error
  }
}


export const fetchCountNapsNats = async (token) => {
  try {

    if (!token) throw new Error('Token missing for fetchNapsNats')
    console.log("TOKEN", token)

    const res = await fetch(`${process.env.API_URL}/zobiz/total-count-naps-nats`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'token': token
      },
      cache: 'no-store' // ensures latest data
    })

    if (!res.ok) {
      const errorText = await res.text()

      throw new Error(`Failed to fetch data: ${errorText}`)
    }

    const data = await res.json()

    console.log('Fetched Count Naps Nats Data:', data)

    return data.data // return only branch array
  } catch (error) {
    console.error('Error fetching Naps Nats:', error)
    throw error
  }
}

export const createNapsNats = async (formData, token) => {
  try {
    const res = await fetch(
      `${process.env.API_URL}/zobiz/create-naps-nats`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // ✅ MUST
          token: token     // ✅ Better than custom token
        },
        body: JSON.stringify({
          employee: formData.employee,
          napsNatsStatus: formData.napsNatsStatus,
          deductionForThisMonth: formData.deductionForThisMonth,
          amount: formData.amount,
          status: formData.status

        }),
        cache: 'no-store'
      }
    )

    if (!res.ok) {
      const errorText = await res.text()
      throw new Error(errorText)
    }

    return await res.json()
  } catch (error) {
    console.error('❌ Error creating naps nats:', error)
    throw error
  }
}



export const updateNapsNats = async (payload, token) => {
  try {
    if (!token) {
      return {
        success: false,
        message: 'Token missing for updateNapsNats'
      }
    }

    console.log('📤 UPDATE LEAVE PAYLOAD:', payload)

    const res = await fetch(
      `${process.env.API_URL}/zobiz/update-naps-nats`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          token // ✅ backend expects token header
        },
        body: JSON.stringify(payload),
        cache: 'no-store'
      }
    )

    let data = {}
    try {
      data = await res.json()
    } catch (err) {
      // backend did not return JSON
    }

    if (!res.ok) {
      return {
        success: false,
        message: data?.message || 'Failed to update naps/nats'
      }
    }

    console.log('✅ Naps/Nats updated successfully:', data)

    return {
      success: true,
      message: data?.message || 'Naps/Nats updated successfully'
    }
  } catch (error) {
    console.error('❌ Error in updateNapsNats:', error)

    return {
      success: false,
      message:
        error?.message ||
        'Something went wrong while updating naps/nats'
    }
  }
}

export const fetchNapsNats = async (token) => {
  try {
    if (!token) throw new Error('Token missing')

    const res = await fetch(`${process.env.API_URL}/zobiz/fetch-naps-nats`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        token
      },
      cache: 'no-store'
    })

    if (!res.ok) {
      const errorText = await res.text()
      throw new Error(errorText)
    }

    const json = await res.json()
    console.log('✅ Naps/Nats API:', json)

    // ✅ IMPORTANT
    return json?.data || []

  } catch (error) {
    console.error('❌ Error fetching naps/nats:', error)
    return []
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
