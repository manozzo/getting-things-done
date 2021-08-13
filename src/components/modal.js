import * as React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  TextField,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import { DatePicker } from "@material-ui/lab";

export default function TaskModal({
  open,
  tarefa,
  handleClose,
  onSalvar,
}) {
  const [titulo, setTitulo] = useState("");
  const [data, setData] = useState("");
  const [descricao, setDescricao] = useState("");

  const onSubmit = () => {
    onSalvar({
      titulo,
      data,
      descricao,
    });
    setTitulo("");
    setData("");
    setDescricao("");
  };

  useEffect(() => {
    if (tarefa) {
      setTitulo(tarefa.titulo || "");
      setData(tarefa.data || "");
      setDescricao(tarefa.descricao || "");
    }
  }, [tarefa]);
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogContent>
        <DialogContentText>Adicione aqui sua tarefa</DialogContentText>
        <TextField
          sx={{my: 5}}
          autoFocus
          margin="dense"
          id="name"
          label="Título da tarefa"
          type="text"
          fullWidth
          variant="standard"
          value={titulo}
          onChange={titulo => {
            setTitulo(titulo.target.value)
          }}
        />
        <TextField
          sx={{my: 2}}
          margin="dense"
          id="name"
          label="Descrição"
          type="text"
          fullWidth
          variant="standard"
          value={descricao}
          onChange={descricao => {
            setDescricao(descricao.target.value)
          }}
        />
        <DatePicker
          label="Data"
          value={data}
          onChange={(newValue) => {
            setData(newValue.toString());
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={onSubmit}>Salvar</Button>
      </DialogActions>
    </Dialog>
  );
}
