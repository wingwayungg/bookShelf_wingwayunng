import React, { useEffect, useState } from "react";
// @material-ui
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Button } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";

// toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const useStyles = makeStyles((theme) => ({
  searchCriteria: {
    border: "1px solid grey",
    borderRadius: "5px",
    padding: "10px",
    marginBottom: "20px",
    "& > *": {
      margin: theme.spacing(1),
      "&:last-child": {
        width: "80%",
      },
    },
  },
  table: {
    minWidth: 650,
  },
  noData:{
    color: "gray",
    marginTop: "10px",
    fontSize: "30px",
    textAlign: "center"
  }
}));

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

// export a bookList page component
export default function BookList(props) {
  const classes = useStyles();

  const [items, setItem] = useState([]);

  const [searchISBN, setSearchISBN] = useState("");
  const [searchName, setSearchName] = useState("");
  const [searchAuthors, setSearchAuthors] = useState("");
  const [searchAnnotation, setSearchAnnotation] = useState("");

  const searchBookList = () => {
    fetch(
      "book/list?ISBN=" +
        searchISBN +
        "&name=" +
        searchName +
        "&authors=" +
        searchAuthors +
        "&short_annotation=" +
        searchAnnotation
    )
      .then((response) => {
        if (response.status > 400) {
          // return this.setState(() => {
          // });
        }
        console.log("response: ", response);
        return response.json();
      })
      .then((data) => {
        setItem(data);
      });
  };

  const deleteBook = (ISBN) => {
    fetch("book/delete/" + ISBN, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.status > 400) {
        }
        console.log("response: ", response);
        // return response.json();
        return;
      })
      .then((data) => {
        setItem(items.filter((item) => item.ISBN !== ISBN));
      });
  };

  const editBook = (ISBN) => {
    props.handleBookEdit(ISBN);
  };

  useEffect(() => {
    searchBookList();
  }, [searchISBN, searchName, searchAuthors, searchAnnotation]);

  return (
    <div className="content">
      <h1> Book List</h1>
      <div className={classes.searchCriteria}>
        <h6> Search Criteria: </h6>
        <TextField
          id="outlined-ISBN"
          label="ISBN"
          margin="dense"
          variant="outlined"
          onChange={(e) => setSearchISBN(e.target.value)}
        />
        <TextField
          id="outlined-Name"
          label="Name"
          margin="dense"
          variant="outlined"
          onChange={(e) => setSearchName(e.target.value)}
        />
        <br />
        <TextField
          id="outlined-Authors"
          label="Authors"
          margin="dense"
          variant="outlined"
          onChange={(e) => setSearchAuthors(e.target.value)}
        />
        <TextField
          id="outlined-Annotation"
          label="Annotation"
          variant="outlined"
          margin="dense"
          fullWidth
          onChange={(e) => setSearchAnnotation(e.target.value)}
        />
      </div>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableCell>ISBN</StyledTableCell>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Authors</StyledTableCell>
              <StyledTableCell>Annotation</StyledTableCell>
              <StyledTableCell align="right">&nbsp;</StyledTableCell>
              <StyledTableCell align="right">&nbsp;</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.ISBN}>
                <TableCell component="th" scope="row">
                  {item.ISBN}
                </TableCell>
                <TableCell component="th" scope="row">
                  {item.name}
                </TableCell>
                <TableCell style={{ textTransform: "uppercase" }}>
                  {item.authors}
                </TableCell>
                <TableCell>{item.short_annotation}</TableCell>
                <TableCell align="right">
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => editBook(item.ISBN)}
                  >
                    edit
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => deleteBook(item.ISBN)}
                  >
                    delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {!items.length && (<div className={classes.noData}> No data to show</div>)}
      <ToastContainer hideProgressBar autoClose={1000} />
    </div>
  );
}
