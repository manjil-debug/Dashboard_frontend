import { TableBody, TableCell, TableRow,TableHead,Table,TableSortLabel, TableContainer,TableFooter,TablePagination } from '@material-ui/core'
import React from 'react'
import subData from '../../data/subscriptions.json'
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import { makeStyles, useTheme } from '@material-ui/core/styles';



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

export default function Subscriptions() {

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
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((subData, index) => (
                <TableRow key={index}>
                    <TableCell>{subData.id}</TableCell>
                    <TableCell>{subData.user_id}</TableCell>
                    <TableCell>{subData.package}</TableCell>
                    <TableCell>{subData.expires_on}</TableCell>
                </TableRow>      
            ))}
            </TableBody>
            <TableFooter>
                <TableRow>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 50,100, { label: 'All', value: -1 }]}
                    colSpan={3}
                    count={300}
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
        </div>
    )
}
