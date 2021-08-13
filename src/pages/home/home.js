import { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { BasicModal, Icone, Tarefa, TaskModal } from "../../components";
import Button from "@material-ui/core/Button";
import { Box, Container } from "@material-ui/core";

export default function Home() {
  const [toLogin, setToLogin] = useState(false);
  const [open, setOpen] = useState(false);
  const [tarefaSelecionada, setTarefaSelecionada] = useState({});
  const [listaTarefas, setListaTarefas] = useState([
    { id: 1, titulo: "study", data: "03/08/2021", descricao: "banana" },
    { id: 2, titulo: "lunch", data: "18/08/2021", descricao: "melão" },
  ]);

  useEffect(() => {
    const token = localStorage.getItem("appToken");
    if (!token) {
      setToLogin(true);
    }
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onExcluir = (index) => () => {
    const tarefa = [...listaTarefas];
    tarefa.splice(index, 1);
    setListaTarefas(tarefa);
  };

  const onEditar = (index) => () => {
    const tarefa = listaTarefas[index];
    setTarefaSelecionada(tarefa);
    setOpen(true);
  };

  const onSalvar = (tarefa) => {
    let novaLista = [];
    if (tarefaSelecionada.id) {
      novaLista = [...listaTarefas];
      const index = listaTarefas.findIndex(
        (el) => el.id === tarefaSelecionada.id
      );
      novaLista[index] = tarefa;
    } else {
      tarefa.id = listaTarefas.length + 1;
      novaLista = [...listaTarefas, tarefa];
    }

    setListaTarefas(novaLista);
    setTarefaSelecionada({});
    setOpen(false);
  };

  if (toLogin) {
    return <Redirect to="/login" />;
  }

  return (
    <>
      <Button variant="contained" type="button" onClick={handleOpen}>
        <Icone name="addTask" />
      </Button>
      <div>
        {listaTarefas.map((tarefa, index) => (
          <Tarefa
            key={tarefa.id}
            titulo={tarefa.titulo}
            data={tarefa.data}
            descricao={tarefa.descricao}
            editar={onEditar(index)}
            excluir={onExcluir(index)}
          ></Tarefa>
        ))}
      </div>
      <TaskModal
        open={open}
        handleClose={handleClose}
        onSalvar={onSalvar}
        tarefa={tarefaSelecionada}
      ></TaskModal>
    </>
  );
}
