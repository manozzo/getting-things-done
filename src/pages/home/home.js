import { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { Icone, Tarefa, TaskModal } from "../../components";
import Button from "@material-ui/core/Button";
import {
  Container,
  Typography,
  Box,
  Paper,
  TextField,
} from "@material-ui/core";
import { DatePicker } from "@material-ui/lab";

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
  const paper = {
    height: "100vh",
    p: 1,
    m: 0.5,
    backgroundColor: "#EEECEC",
    boxShadow:
      "-5px 5px 10px rgba(185, 185, 185, 0.2), 5px -5px 10px rgba(185, 185, 185, 0.2), -5px -5px 10px rgba(255, 255, 255, 0.9), 5px 5px 13px rgba(185, 185, 185, 0.9), inset 1px 1px 2px rgba(255, 255, 255, 0.3), inset -1px -1px 2px rgba(185, 185, 185, 0.5)",
  };

  const appHeader = {
    display: "flex",
    alignItems: "flex-end",
    width: "215px",
  };

  const [toLogin, setToLogin] = useState(false);
  const [open, setOpen] = useState(false);
  const [tarefaSelecionada, setTarefaSelecionada] = useState({});
  const [dataAtual] = useState(new Date().getDate());
  const [mesAtual] = useState(new Date().getMonth());
  const [dataFiltro, setDataFiltro] = useState(new Date());
  const [listaTarefas, setListaTarefas] = useState([
    {
      id: 1,
      titulo: "study",
      descricao: "banana",
      data: "03/08/2021",
      inicio: "8:00",
      fim: "12:00",
    },
    {
      id: 2,
      titulo: "lunch",
      descricao: "melão",
      data: "10/08/2021",
      inicio: "13:00",
      fim: "14:00",
    },
    {
      id: 3,
      titulo: "play",
      descricao: "ronaldo",
      data: "17/08/2021",
      inicio: "15:00",
      fim: "16:00",
    },
  ]);

  const [listaFiltrada, setListaFiltrada] = useState(listaTarefas);

  let time = new Date().toLocaleTimeString("pt-BR").slice(0, 5);
  const [horaAtual, setHoraAtual] = useState(time);

  const newTime = () => {
    time = new Date().toLocaleTimeString("pt-BR").slice(0, 5);
    setHoraAtual(time);
  };

  setInterval(newTime, 1000);

  useEffect(() => {
    let dataFiltroString = dataFiltro.toLocaleDateString("pt-BR");
    let lista = listaTarefas.filter((el) => {
      return el.data === dataFiltroString;
    });
    setListaFiltrada(lista);
    console.table(listaTarefas);
  }, [dataFiltro, listaTarefas]);

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

  const handleClose = () => setOpen(false);

  const onExcluir = (id) => () => {
    const tarefaExcluida = listaTarefas.filter((el) => {
      return el.id === id;
    });
    let listaExcluida = listaTarefas.filter((el) => el !== tarefaExcluida[0]);
    setListaTarefas(listaExcluida);
  };

  const onEditar = (id) => () => {
    const tarefa = listaTarefas.filter((el) => {
      return el.id === id;
    });
    setTarefaSelecionada(tarefa[0]);
    setOpen(true);
  };

  const onSalvar = (tarefa) => {
    if (tarefa.data) {
      tarefa.data = tarefa.data.toLocaleDateString("pt-BR");
    }
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
      tarefa.id = Date.now();
      novaLista = [...listaTarefas, tarefa];
    }
    setListaTarefas(novaLista);
    setTarefaSelecionada({});
    setOpen(false);
  };

  if (toLogin) {
    return <Redirect to="/login" />;
  }

  let content = null;
  if (listaFiltrada.length === 0) {
    content = (
      <Typography variant="h4" sx={{ mt: 3 }}>
        Não existem tarefas nessa data.
      </Typography>
    );
  } else {
    content = listaFiltrada.map((tarefa) => (
      <Tarefa
        key={tarefa.id}
        titulo={tarefa.titulo}
        descricao={tarefa.descricao}
        data={tarefa.data}
        inicio={tarefa.inicio}
        fim={tarefa.fim}
        editar={onEditar(tarefa.id)}
        excluir={onExcluir(tarefa.id)}
      ></Tarefa>
    ));
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
              width: "250px",
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
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <DatePicker
                  label="Selecione a data"
                  value={dataFiltro}
                  onChange={(newValue) => {
                    setDataFiltro(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
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
                <Button type="button" onClick={handleOpen}>
                  <Icone name="addTask" />
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
        <Container>{content}</Container>
        <TaskModal
          open={open}
          handleClose={handleClose}
          onSalvar={onSalvar}
          tarefa={tarefaSelecionada}
        ></TaskModal>
      </Container>
    </Paper>
  );
}
