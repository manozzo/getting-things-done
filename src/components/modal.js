import * as React from "react";
import axios from "../utils/axios";
import {
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField as MuiTextField,
  Button,
} from "@material-ui/core";
import { TextField } from "formik-material-ui";
import { DatePicker, TimePicker } from "@material-ui/lab";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import formatISO from "date-fns/formatISO";

export default function TaskModal({ open, tarefa, handleClose }) {
  const TaskSchema = Yup.object().shape({
    title: Yup.string()
      .min(2, "Too Short!")
      .max(20, "Too Long!")
      .required("Required"),
  });

  const defaultValues = {
    user_id: 1,
    title: "",
    description: "",
    date: null,
    task_start: null,
    task_end: null,
  };

  const onEditTaskValues = {
    user_id: tarefa.user_id,
    title: tarefa.title,
    description: tarefa.description,
    date: tarefa.date,
    task_start: tarefa.task_start,
    task_end: tarefa.task_end,
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Adicione aqui sua tarefa</DialogTitle>
      <DialogContent>
        <Formik
          initialValues={tarefa.id ? onEditTaskValues : defaultValues}
          validationSchema={TaskSchema}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            try {
              let formData = new FormData();
              for (let value in values) {
                if (
                  value === "date" ||
                  value === "task_start" ||
                  value === "task_end"
                ) {
                  formData.append(
                    value,
                    formatISO(values[value], { representation: "complete" })
                  );
                } else {
                  formData.append(value, values[value]);
                }
              }
              let response;
              if (!tarefa.id) {
                await axios.post(`api/task/save`, formData);
              } else {
                await axios.post(`api/task/edit/${tarefa.id}`, formData);
              }
              setSubmitting(false);
              resetForm({});
              handleClose();
            } catch (error) {
              console.error(error);
            }
          }}
        >
          {({ submitForm, isSubmitting, setFieldValue, values }) => (
            <Form>
              <Field
                component={TextField}
                name="title"
                type="text"
                label="Titulo"
                sx={{ mt: 2 }}
              />
              <Field
                component={TextField}
                name="description"
                type="text"
                label="Descrição"
                sx={{ mt: 2 }}
              />
              <DatePicker
                label="Data"
                name={"date"}
                value={values.date}
                onChange={(newValue) => {
                  setFieldValue("date", newValue);
                }}
                renderInput={(params) => (
                  <MuiTextField sx={{ mt: 2 }} {...params} />
                )}
              />
              <TimePicker
                label="Início"
                name={"task_start"}
                value={values.task_start}
                onChange={(newValue) => {
                  setFieldValue("task_start", newValue);
                }}
                renderInput={(params) => (
                  <MuiTextField sx={{ mt: 2 }} {...params} />
                )}
              />
              <TimePicker
                label="Fim"
                name={"task_end"}
                value={values.task_end}
                onChange={(newValue) => {
                  setFieldValue("task_end", newValue);
                }}
                renderInput={(params) => (
                  <MuiTextField sx={{ mt: 2 }} {...params} />
                )}
              />

              <br />
              <Button
                sx={{ mt: 2 }}
                variant="contained"
                color="primary"
                type="submit"
                startIcon={
                  isSubmitting ? (
                    <CircularProgress color="inherit" size="1rem" />
                  ) : null
                }
                disabled={isSubmitting}
                onClick={submitForm}
              >
                Submit
              </Button>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
}
