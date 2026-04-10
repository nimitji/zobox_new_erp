
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Chip from '@mui/material/Chip'
import IconButton from '@mui/material/IconButton'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'

const HiringListTable = ({ tableData }) => {
  return (
    <TableContainer component={Paper} sx={{ borderRadius: 3 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Job Title</TableCell>
            <TableCell>Department</TableCell>
            <TableCell>Experience</TableCell>
            <TableCell>Salary</TableCell>
            <TableCell>Status</TableCell>
            <TableCell align='center'>Actions</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {tableData?.map(row => (
            <TableRow key={row.id}>
              <TableCell>{row.jobTitle}</TableCell>
              <TableCell>{row.department}</TableCell>
              <TableCell>{row.experience}</TableCell>
              <TableCell>{row.salary}</TableCell>

              <TableCell>
                <Chip label={row.status} color={row.status === 'Open' ? 'success' : 'default'} />
              </TableCell>

              <TableCell align='center'>
                <IconButton color='primary'>
                  <EditIcon />
                </IconButton>
                <IconButton color='error'>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default HiringListTable
