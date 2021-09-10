import * as React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import { DatePicker, TimePicker } from "@material-ui/lab";
import { formatISO } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";


export default function TaskModal({ open, tarefa, handleClose, onSalvar }) {
  let id = Date.now();
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [data, setData] = useState("");
  const [inicio, setInicio] = useState("");
  const [fim, setFim] = useState("");
  let isComplete = false;

  const onSubmit = () => {
    if ((titulo, descricao, data, inicio, fim) === "") {
      alert("PREENCHA TODOS OS CAMPOS!!!");
    } else {
      onSalvar({
        id,
        titulo,
        descricao,
        data: formatISO(data, { representation:'date' }),
        inicio,
        fim,
        isComplete
      });
      setTitulo("");
      setDescricao("");
      setData("");
      setInicio("");
      setFim("");
    }
  };

  useEffect(() => {
    if (tarefa) {
      setTitulo(tarefa.titulo || "");
      setDescricao(tarefa.descricao || "");
      setData(tarefa.data || "");
      setInicio(tarefa.inicio || "");
      setFim(tarefa.fim || "");
    }
  }, [tarefa]);

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Adicione aqui sua tarefa</DialogTitle>
      <DialogContent>
        <TextField
          sx={{ mt: 2 }}
          autoFocus
          margin="dense"
          id="titulo"
          label="Verbo"
          type="text"
          fullWidth
          variant="standard"
          value={titulo}
          onChange={(titulo) => {
            setTitulo(titulo.target.value);
          }}
        />
        <TextField
          sx={{ my: 3 }}
          margin="dense"
          id="descricao"
          label="Descrição"
          type="text"
          fullWidth
          variant="standard"
          value={descricao}
          onChange={(descricao) => {
            setDescricao(descricao.target.value);
          }}
        />
        <DatePicker
          mask={ptBR}
          label="Data"
          value={data}
          onChange={(newValue) => {
            setData(newValue);
          }}
          renderInput={(params) => <TextField sx={{ mt: 2 }} {...params} />}
        />
        <TimePicker
          label="Início"
          value={inicio}
          onChange={(newValue) => {
            setInicio(newValue);
            console.log(newValue);
          }}
          renderInput={(params) => <TextField sx={{ mt: 2 }} {...params} />}
        />
        <TimePicker
          label="Fim"
          value={fim}
          onChange={(newValue) => {
            setFim(newValue);
          }}
          renderInput={(params) => <TextField sx={{ mt: 2 }} {...params} />}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={onSubmit}>Salvar</Button>
      </DialogActions>
    </Dialog>
  );
}
