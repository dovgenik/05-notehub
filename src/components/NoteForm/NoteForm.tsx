import css from "./NoteForm.module.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { createNote } from "../../services/noteService";
import type { AddNote } from "../../types/note.ts";

const initialValues = {
  title: "",
  content: "",
  tag: "Todo",
};

const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  content: Yup.string().required("Content is required"),
  tag: Yup.string().required("Tag is required"),
});

interface FormValues {
  title: string;
  content: string;
  tag: string;
}

interface NoteFormProps {
  closeForm: () => void;
}

export default function NoteForm({ closeForm }: NoteFormProps) {

  const handleSubmit = (values: FormValues, actions: any) => {
    console.log("Submitted values:", values);

    mutationAdd.mutate(values);
    actions.resetForm();
    closeForm();
  };

  const queryClients = useQueryClient();

  const mutationAdd = useMutation({
    mutationFn: (val: AddNote) => createNote(val),
    onSuccess: () => {
      queryClients.invalidateQueries({ queryKey: ["noteQueryKey"] });
    },
  });







  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className={css.form}>
          <div className={css.formGroup}>
            <label htmlFor="title">Title</label>
            <Field id="title" name="title" type="text" className={css.input} />
            <ErrorMessage name="title" component="span" className={css.error} />
          </div>

          <div className={css.formGroup}>
            <label htmlFor="content">Content</label>
            <Field
              id="content"
              name="content"
              as="textarea"
              rows="8"
              className={css.textarea}
            />
            <ErrorMessage
              name="content"
              component="span"
              className={css.error}
            />
          </div>

          <div className={css.formGroup}>
            <label htmlFor="tag">Tag</label>
            <Field id="tag" name="tag" as="select" className={css.select}>
              <option value="Todo">Todo</option>
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
              <option value="Meeting">Meeting</option>
              <option value="Shopping">Shopping</option>
            </Field>
            <ErrorMessage name="tag" component="span" className={css.error} />
          </div>

          <div className={css.actions}>
            <button
              type="button"
              className={css.cancelButton}
              onClick={() => closeForm()}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={css.submitButton}
              disabled={isSubmitting}
            >
              Create note
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
