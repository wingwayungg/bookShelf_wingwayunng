import React, { useEffect, useState } from "react";
import { Button } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// export a create page component
export default function BookDetail(props) {
  const [ISBN, setISBN] = useState("");
  const [name, setName] = useState("");
  const [authors, setAuthors] = useState("");
  const [short_annotation, setShort_annotation] = useState("");

  const notify = () =>
    toast.success((props.editingISBN ? "Edit" : "Create") + " successfully!");

  const handleSubmit = () => {
    const data = {
      ISBN: ISBN,
      name: name,
      authors: authors,
      short_annotation: short_annotation,
    };

    fetch(
      props.editingISBN ? "book/edit/" + props.editingISBN : "book/create/",
      {
        method: props.editingISBN ? "PUT" : "POST",
        body: JSON.stringify(data),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      }
    )
      .then((response) => {
        if (response.status === 400) {
            throw new Error("Duplicated ISBN");
        }
        if (response.status > 400) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        notify();
        props.handleBookSaved(true);
      })
      .catch((error) => {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
      });
  };

  useEffect(() => {
    if (props.editingISBN) {
      fetch("book/edit/" + props.editingISBN, {
        headers: { "Content-type": "application/json; charset=UTF-8" },
      })
        .then((response) => {
          if (response.status > 400) {
          }
          return response.json();
        })
        .then((data) => {
          setISBN(data.ISBN);
          setName(data.name);
          setAuthors(data.authors);
          setShort_annotation(data.short_annotation);
        });
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
            readOnly: !!props.editingISBN,
          }}
          variant={!!props.editingISBN ? "filled" : "outlined"}
          validators={["required", 'minNumber:0', 'matchRegexp:^[0-9]*$']}
          errorMessages={["this field is required", "value must be non-negative number", "value must be non-negative number"]}
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
        <Button className="save" variant="outlined" color="primary" type="submit">
          Save
        </Button>
      </ValidatorForm>
    </div>
  );
}