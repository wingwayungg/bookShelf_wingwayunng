import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Button } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// export a create page component
export default function BookDetail(props) {
  let { ISBN_url_parm } = useParams();
  let history = useHistory();
  const [ISBN, setISBN] = useState(ISBN_url_parm || "");
  const [name, setName] = useState("");
  const [authors, setAuthors] = useState("");
  const [short_annotation, setShort_annotation] = useState("");

  const notify = () =>
    toast.success(`${ISBN_url_parm ? "Edit" : "Create"} successfully!`);

  const handleSubmit = () => {
    const data = {
      ISBN: ISBN,
      name: name,
      authors: authors,
      short_annotation: short_annotation,
    };

    fetch(ISBN_url_parm ? `/book/edit/${ISBN_url_parm}` : "book/create/", {
      method: ISBN_url_parm ? "PUT" : "POST",
      body: JSON.stringify(data),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    })
      .then((response) => {
        if (response.status > 400) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        notify();
        history.push(`../list`);
      })
      .catch((error) => {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
      });
  };

  useEffect(() => {
    if (ISBN_url_parm) {
      fetch(`/book/edit/${ISBN_url_parm}`, {
        headers: { "Content-type": "application/json; charset=UTF-8" },
      })
        .then((response) => {
          if (response.status > 400) {
          }
          return response.json();
        })
        .then((data) => {
          setName(data.name);
          setAuthors(data.authors);
          setShort_annotation(data.short_annotation);
        });
    } else {
      // add ISBN Validation for creating Book
      let ISBNArray = "";
      fetch("/book/list")
        .then((response) => response.json())
        .then((data) => {
          ISBNArray = data.map((x) => x.ISBN);
        });

      ValidatorForm.addValidationRule(
        "isISBNExisted",
        (value) => !ISBNArray.includes(Number(value))
      );
    }
  }, []);

  return (
    <div className="content">
      <h1>Book Detail</h1>
      <ValidatorForm onSubmit={handleSubmit}>
        <TextValidator
          className="halfLengthInput"
          placeholder="Please enter ISBN"
          margin="dense"
          label="ISBN*"
          onChange={(e) => setISBN(e.target.value)}
          inputProps={{ maxLength: 13 }}
          name="ISBN"
          value={ISBN}
          InputProps={{
            readOnly: !!ISBN_url_parm,
          }}
          variant={!!ISBN_url_parm ? "filled" : "outlined"}
          {...(!ISBN_url_parm && {
            // validate only when creating
            validators: [
              "required",
              "minNumber:0",
              "matchRegexp:^[0-9]*$",
              "isISBNExisted",
            ],
            errorMessages: [
              "this field is required",
              "value must be non-negative number",
              "value must be non-negative number",
              "this ISBN already exists",
            ],
          })}
        />
        <TextValidator
          className="halfLengthInput"
          placeholder="Please enter the name"
          margin="dense"
          label="Name*"
          onChange={(e) => setName(e.target.value)}
          inputProps={{ maxLength: 100 }}
          name="name"
          value={name}
          variant="outlined"
          validators={["required"]}
          errorMessages={["this field is required"]}
        />
        <TextValidator
          placeholder="If there are more than one authors, please enter the comma (e.g. Anna,Peter) to separate the names."
          margin="dense"
          label="Authors*"
          onChange={(e) => setAuthors(e.target.value)}
          inputProps={{ maxLength: 50 }}
          name="authors"
          value={authors}
          variant="outlined"
          validators={["required"]}
          errorMessages={["this field is required"]}
          fullWidth
        />
        <TextValidator
          placeholder="Please enter a short annotation"
          margin="dense"
          label="Short Annotation"
          onChange={(e) => setShort_annotation(e.target.value)}
          inputProps={{ maxLength: 100 }}
          name="Short Annotation"
          value={short_annotation}
          variant="outlined"
          fullWidth
        />
        <Button
          className="save"
          variant="outlined"
          color="primary"
          type="submit"
        >
          Save
        </Button>
      </ValidatorForm>
    </div>
  );
}
