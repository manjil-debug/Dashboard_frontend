import React from 'react'
import { TableBody, TableCell, TableRow,TableHead,Table,TableSortLabel,TableContainer,TableFooter,TablePagination} from '@material-ui/core'
import userData from '../../data/users.json'
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import { makeStyles, useTheme } from '@material-ui/core/styles';


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
const useStyles1 = makeStyles((theme) => ({
    root: {
      flexShrink: 0,
      marginLeft: theme.spacing(2.5),
    },
  }));
function TablePaginationActions(props) {
    const classes = useStyles1();
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;
  
    const handleFirstPageButtonClick = (event) => {
      onPageChange(event, 0);
    };
  
    const handleBackButtonClick = (event) => {
      onPageChange(event, page - 1);
    };
  
    const handleNextButtonClick = (event) => {
      onPageChange(event, page + 1);
    };
  
    const handleLastPageButtonClick = (event) => {
      onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };
  
    return (
      <div className={classes.root}>
        <IconButton
          onClick={handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="first page"
        >
          {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
        </IconButton>
        <IconButton
          onClick={handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="next page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </IconButton>
        <IconButton
          onClick={handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="last page"
        >
          {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </div>
    );
  }
export default function Users() {
    const classes = useStyles();
    const [orderDiretion, setOrderDirection] = React.useState('asc')
    const [valueToOrderBy, setValueToOrderBy] = React.useState('id')
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
  

  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };
  
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
            aria-label="enhanced table"
            >
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
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
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
            <TableFooter>
                <TableRow>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 50,100, { label: 'All', value: -1 }]}
                    colSpan={5}
                    count={498}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    SelectProps={{
                        inputProps: { 'aria-label': 'rows per page' },
                        native: true,
                    }}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    ActionsComponent={TablePaginationActions}
                    />
                </TableRow>
            </TableFooter>
            </Table>
            </TableContainer>     
           
        </div>
    )
}
