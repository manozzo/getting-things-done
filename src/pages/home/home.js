import { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { Icone, Tarefa, TaskModal } from "../../components";
import Button from "@material-ui/core/Button";
import { Container, Typography, Box } from "@material-ui/core";

const meses = [
  "jan",
  "fev",
  "mar",
  "abr",
  "mai",
  "jun",
  "jul",
  "ago",
  "set",
  "out",
  "nov",
  "dez",
];

export default function Home() {
  const [toLogin, setToLogin] = useState(false);
  const [open, setOpen] = useState(false);
  const [tarefaSelecionada, setTarefaSelecionada] = useState({});
  const [dataAtual] = useState(new Date().getDate());
  const [mesAtual] = useState(new Date().getMonth());
  const [listaTarefas, setListaTarefas] = useState([
    {
      id: 1,
      titulo: "study",
      data: "03/08/2021",
      descricao: "banana",
      inicio: "8:00",
      fim: "12:00",
    },
    {
      id: 2,
      titulo: "lunch",
      data: "18/08/2021",
      descricao: "melão",
      inicio: "13:00",
      fim: "14:00",
    },
  ]);

  const [horaAtual, setHoraAtual] = useState(
    `${new Date().getHours()}:${(new Date().getMinutes()) < 10 ? '0'+ new Date().getMinutes() : new Date().getMinutes()}:${(new Date().getSeconds()) < 10 ? '0'+ new Date().getSeconds() : new Date().getSeconds()}`
  );

  // setInterval(() => {
  //   setHoraAtual(horaAtual)
  // }, 1000);

  useEffect(() => {
    if (horaAtual) {
      setHoraAtual(
        `${new Date().getHours()}:${(new Date().getMinutes()) < 10 ? '0'+ new Date().getMinutes() : new Date().getMinutes()}:${(new Date().getSeconds()) < 10 ? '0'+ new Date().getSeconds() : new Date().getSeconds()}`
      );
      // setHoraAtual(
      //   `${new Date().getHours()}:${(new Date().getMinutes()) < 10 ? '0'+ new Date().getMinutes() : new Date().getMinutes()}`
      // );
    }
  }, [horaAtual]);

  useEffect(() => {
    const token = localStorage.getItem("appToken");
    if (!token) {
      setToLogin(true);
    }
  }, []);

  const handleOpen = () => {
    setTarefaSelecionada({});
    setOpen(true);
  };
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
    if (tarefa.inicio) {
      tarefa.inicio = tarefa.inicio.toString().substring(16, 21);
    }
    if (tarefa.fim) {
      tarefa.fim = tarefa.fim.toString().substring(16, 21);
    }
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
      <Box sx={{ display: "flex", alignItems: "flex-end" }}>
        <Typography sx={{ fontWeight: 400, fontSize: 155 }} variant="h1">
          {dataAtual}
        </Typography>
        <Typography
          sx={{ m: 1, opacity: "50%", fontFamily: "Basic" }}
          variant="h4"
        >
          .{meses[mesAtual]}
        </Typography>
      </Box>
      <Box>
        <Box>
          <Typography variant='h2'>{horaAtual}</Typography>
        </Box>
        <Button type="button" onClick={handleOpen}>
          <Icone name="addTask" />
        </Button>
      </Box>
      <Container>
        {listaTarefas.map((tarefa, index) => (
          <Tarefa
            key={tarefa.id}
            titulo={tarefa.titulo}
            inicio={tarefa.inicio}
            fim={tarefa.fim}
            data={tarefa.data}
            descricao={tarefa.descricao}
            editar={onEditar(index)}
            excluir={onExcluir(index)}
          ></Tarefa>
        ))}
      </Container>
      <TaskModal
        open={open}
        handleClose={handleClose}
        onSalvar={onSalvar}
        tarefa={tarefaSelecionada}
      ></TaskModal>
    </>
  );
}
