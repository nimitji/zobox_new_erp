'use client'
import { useState } from 'react'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { exportCSV, exportExcel, exportPDF, copyToClipboard ,printTable} from '../../utils/exportUtils'

const ExportButton = ({ filteredData }) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => setAnchorEl(event.currentTarget)
  const handleClose = () => setAnchorEl(null)

  const columns = ['fullName', 'username', 'role', 'status', 'billing']

  return (
    <>
      <Button
        color='secondary'
        variant='tonal'
        startIcon={<i className='tabler-upload' />}
        onClick={handleClick}
      >
        Export
      </Button>
      {/* <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem onClick={() => { window.print(); handleClose() }}>Print</MenuItem>
        <MenuItem onClick={() => { exportCSV(filteredData); handleClose() }}>CSV</MenuItem>
        <MenuItem onClick={() => { exportExcel(filteredData); handleClose() }}>Excel</MenuItem>
        <MenuItem onClick={() => { exportPDF(filteredData, columns); handleClose() }}>PDF</MenuItem>
        <MenuItem onClick={() => { copyToClipboard(filteredData); handleClose() }}>Copy</MenuItem>
      </Menu> */}
        <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
       
        <MenuItem onClick={() => { exportCSV(filteredData); handleClose() }}>CSV</MenuItem>
        <MenuItem onClick={() => { exportExcel(filteredData); handleClose() }}>Excel</MenuItem>
     
      </Menu>
    </>
  )
}

export default ExportButton
