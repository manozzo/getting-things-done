import { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { Icone, Tarefa, TaskModal, Calendar } from "../../components";
import Button from "@material-ui/core/Button";
import { Container, Typography, Box, Paper } from "@material-ui/core";

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
  const [openCalendar, setOpenCalendar] = useState(false);
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

  const paper = {
    p: 1,
    m: 0.5,
    backgroundColor: "#EEECEC",
    boxShadow:
      "-5px 5px 10px rgba(185, 185, 185, 0.2), 5px -5px 10px rgba(185, 185, 185, 0.2), -5px -5px 10px rgba(255, 255, 255, 0.9), 5px 5px 13px rgba(185, 185, 185, 0.9), inset 1px 1px 2px rgba(255, 255, 255, 0.3), inset -1px -1px 2px rgba(185, 185, 185, 0.5)",
  };

  const appHeader = {
    display: "flex",
    alignItems: "center",
    width: "215px",
  };

  // const [horaAtual, setHoraAtual] = useState(
  //   `${new Date().getHours()}:${
  //     new Date().getMinutes() < 10
  //       ? "0" + new Date().getMinutes()
  //       : new Date().getMinutes()
  //   }:${
  //     new Date().getSeconds() < 10
  //       ? "0" + new Date().getSeconds()
  //       : new Date().getSeconds()
  //   }`
  // );

  // setInterval(() => {
  //   setHoraAtual(horaAtual)
  // }, 1000);

  // useEffect(() => {
  //   if (horaAtual) {
  //     setHoraAtual(
  //       `${new Date().getHours()}:${
  //         new Date().getMinutes() < 10
  //           ? "0" + new Date().getMinutes()
  //           : new Date().getMinutes()
  //       }:${
  //         new Date().getSeconds() < 10
  //           ? "0" + new Date().getSeconds()
  //           : new Date().getSeconds()
  //       }`
  //     );
  //   }
  // }, [horaAtual]);

  const [horaAtual, setHoraAtual] = useState(
    `${new Date().getHours()}:${
      new Date().getMinutes() < 10
        ? "0" + new Date().getMinutes()
        : new Date().getMinutes()
    }`
  );

  useEffect(() => {
    if (horaAtual) {
      setHoraAtual(
        `${new Date().getHours()}:${
          new Date().getMinutes() < 10
            ? "0" + new Date().getMinutes()
            : new Date().getMinutes()
        }`
      );
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
    setOpen(!open);
  };

  const handleOpenCalendar = () => {
    setOpenCalendar(!openCalendar);
  };

  const handleClose = () => setOpen(false);

  const handleCloseCalendar = () => setOpenCalendar(false);

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
    <Paper sx={paper}>
      <Container sx={{ p: 0 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={appHeader}>
            <Typography sx={{ fontWeight: 400, fontSize: 140 }} variant="h1">
              {dataAtual}
            </Typography>
            <Typography
              sx={{ m: 1, opacity: "50%", fontFamily: "Basic" }}
              variant="h4"
            >
              .{meses[mesAtual]}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              flexDirection: "column",
              width: "141px",
            }}
          >
            <Box>
              <Typography
                variant="h2"
                sx={{ fontFamily: "Basic", color: "#7D7D7D" }}
              >
                {horaAtual}
              </Typography>
            </Box>
            <Box sx={{ display: "flex" }}>
              <Box
                sx={{
                  boxShadow:
                    "-5px 5px 10px rgba(185, 185, 185, 0.2), 5px -5px 10px rgba(185, 185, 185, 0.2), -5px -5px 10px rgba(255, 255, 255, 0.9), 5px 5px 13px rgba(185, 185, 185, 0.9), inset 1px 1px 2px rgba(255, 255, 255, 0.3), inset -1px -1px 2px rgba(185, 185, 185, 0.5)",
                  m: 1,
                  backgroundColor: "#F4F4F4",
                  borderRadius: "10px",
                  height: "50px",
                  width: "50px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Button type="button" onClick={handleOpen}>
                  <Icone name="addTask" />
                </Button>
              </Box>
              <Box
                sx={{
                  boxShadow:
                    "-5px 5px 10px rgba(185, 185, 185, 0.2), 5px -5px 10px rgba(185, 185, 185, 0.2), -5px -5px 10px rgba(255, 255, 255, 0.9), 5px 5px 13px rgba(185, 185, 185, 0.9), inset 1px 1px 2px rgba(255, 255, 255, 0.3), inset -1px -1px 2px rgba(185, 185, 185, 0.5)",
                  m: 1,
                  backgroundColor: "#F4F4F4",
                  borderRadius: "10px",
                  height: "50px",
                  width: "50px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Button type="button" onClick={handleOpenCalendar}>
                  <Icone name="calendar" />
                </Button>
              </Box>
            </Box>
          </Box>
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
        <Calendar
          open={openCalendar}
          handleClose={handleCloseCalendar}
        ></Calendar>
      </Container>
    </Paper>
  );
}
