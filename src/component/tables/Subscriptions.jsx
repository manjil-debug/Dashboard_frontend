import { TableBody, TableCell, TableRow,TableHead,Table,TableSortLabel, TableContainer } from '@material-ui/core'
import React from 'react'
import subData from '../../data/subscriptions.json'
import Paper from '@material-ui/core/Paper';

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }
  
  function getComparator(order, orderBy) {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }
  const sortedRowInformation = (rowArray,comparator) => {
      const stabalizedRowArray = rowArray.map((el,index)=>[el,index])
      stabalizedRowArray.sort((a,b)=>{
          const order = comparator(a[0],b[0])
          if(order !==0) return order
          return a[1] - b[1]
      })
      return stabalizedRowArray.map((el)=>el[0])
  }
export default function Subscriptions() {

    const [orderDiretion, setOrderDirection] = React.useState('asc')
    const [valueToOrderBy, setValueToOrderBy] = React.useState('id')

    const handleRequestSort = (event, property) => {
        const isAscending = (valueToOrderBy === property && orderDiretion === 'asc')
        setValueToOrderBy(property)
        setOrderDirection(isAscending ? 'desc' : 'asc')
    }

    const createSortHandler = (property) => (event) =>{
        handleRequestSort(event, property)
    }
    return (
        <div>
            <div>
               <TableContainer component={Paper}>
               <Table>
                <TableHead>
                    <TableRow>
                        <TableCell><TableSortLabel
                         active={valueToOrderBy==="id"}
                         direction={valueToOrderBy === "id" ? orderDiretion : 'asc'}
                         onClick={createSortHandler("id")}>id</TableSortLabel></TableCell>
                        <TableCell><TableSortLabel
                        active={valueToOrderBy==="user_id"}
                        direction={valueToOrderBy === "user_id" ? orderDiretion : 'asc'}
                        onClick={createSortHandler("user_id")}>user id</TableSortLabel></TableCell>
                        <TableCell><TableSortLabel
                        active={valueToOrderBy==="package"}
                        direction={valueToOrderBy === "package" ? orderDiretion : 'asc'}
                        onClick={createSortHandler("package")}>package</TableSortLabel></TableCell>
                        <TableCell><TableSortLabel
                        active={valueToOrderBy==="expires_on"}
                        direction={valueToOrderBy === "expires_on" ? orderDiretion : 'asc'}
                        onClick={createSortHandler("expires_on")}>expiers</TableSortLabel></TableCell>
                    </TableRow>
                </TableHead>
            <TableBody>
            {sortedRowInformation(subData, getComparator(orderDiretion, valueToOrderBy))
                .map((subData, index) => (
                <TableRow key={index}>
                    <TableCell>{subData.id}</TableCell>
                    <TableCell>{subData.user_id}</TableCell>
                    <TableCell>{subData.package}</TableCell>
                    <TableCell>{subData.expires_on}</TableCell>
                </TableRow>      
            ))}
            </TableBody>
            
            </Table>
            </TableContainer>     
                  
        
        </div>
        </div>
    )
}
