import React from 'react'
import { TableBody, TableCell, TableRow,TableHead,Table,TableSortLabel,TableContainer} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import userData from '../../data/users.json'
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
});
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
export default function Users() {
    const classes = useStyles();
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
            <TableContainer component={Paper}>
            <Table className={classes.table}
            aria-labelledby="tableTitle"
            size= 'small' 
            aria-label="enhanced table">
            <TableHead>
                <TableRow>
                        <TableCell><TableSortLabel 
                        active={valueToOrderBy==="id"}
                        direction={valueToOrderBy === "id" ? orderDiretion : 'asc'}
                        onClick={createSortHandler("id")}
                        >id
                        </TableSortLabel></TableCell>
                        <TableCell><TableSortLabel
                        active={valueToOrderBy==="first_name"}
                        direction={valueToOrderBy === "first_name" ? orderDiretion : 'asc'}
                        onClick={createSortHandler("first_name")}
                        >
                        First name</TableSortLabel></TableCell>
                        <TableCell><TableSortLabel
                        active={valueToOrderBy==="last_name"}
                        direction={valueToOrderBy === "last_name" ? orderDiretion : 'asc'}
                        onClick={createSortHandler("last_name")}>Last name</TableSortLabel></TableCell>
                        <TableCell><TableSortLabel
                        active={valueToOrderBy==="username"}
                        direction={valueToOrderBy === "username" ? orderDiretion : 'asc'}
                        onClick={createSortHandler("username")}>username</TableSortLabel></TableCell>
                        <TableCell><TableSortLabel
                        active={valueToOrderBy==="email"}
                        direction={valueToOrderBy === "email" ? orderDiretion : 'asc'}
                        onClick={createSortHandler("email")}>email</TableSortLabel></TableCell>
                        <TableCell><TableSortLabel
                        active={valueToOrderBy==="active"}
                        direction={valueToOrderBy === "active" ? orderDiretion : 'asc'}
                        onClick={createSortHandler("active")}>active</TableSortLabel></TableCell>
                        <TableCell><TableSortLabel
                        active={valueToOrderBy==="address"}
                        direction={valueToOrderBy === "address" ? orderDiretion : 'asc'}
                        onClick={createSortHandler("address")}>address</TableSortLabel></TableCell>
                        <TableCell><TableSortLabel
                        active={valueToOrderBy==="country"}
                        direction={valueToOrderBy === "country" ? orderDiretion : 'asc'}
                        onClick={createSortHandler("country")}>country</TableSortLabel></TableCell>
                        <TableCell><TableSortLabel
                        active={valueToOrderBy==="join_date"}
                        direction={valueToOrderBy === "join_date" ? orderDiretion : 'asc'}
                        onClick={createSortHandler("join_date")}>join date</TableSortLabel></TableCell>
                </TableRow>
                </TableHead>
            <TableBody>
                {sortedRowInformation(userData, getComparator(orderDiretion, valueToOrderBy))
                .map((userData, index) => (
                <TableRow key={index}>
                    <TableCell>{userData.id}</TableCell>
                    <TableCell>{userData.first_name}</TableCell>
                    <TableCell>{userData.last_name}</TableCell>
                    <TableCell>{userData.username}</TableCell>
                    <TableCell>{userData.email}</TableCell>
                    <TableCell>{userData.active}</TableCell>
                    <TableCell>{userData.address}</TableCell>
                    <TableCell>{userData.country}</TableCell>
                    <TableCell>{userData.join_date}</TableCell>
                </TableRow>
            ))}
            </TableBody>
            
            </Table>
            </TableContainer>     
           
        </div>
    )
}
