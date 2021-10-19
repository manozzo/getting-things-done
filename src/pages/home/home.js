import { format, formatISO } from "date-fns";
import useIsMountedRef from "../../utils/useIsMountedRef";
import { useCallback, useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { Icone, Tarefa, TaskModal } from "../../components";
import Button from "@material-ui/core/Button";
import {
  Container,
  Typography,
  Box,
  Paper,
  InputBase,
} from "@material-ui/core";
import { MobileDatePicker } from "@material-ui/lab";
import {
  deleteTask,
  getByDate,
  toggleCompleteTask,
} from "../../services/task.service";

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
    height: "98vh",
    p: 1,
    m: 1,
    boxShadow:
      "-5px 5px 10px rgba(185, 185, 185, 0.2), 5px -5px 10px rgba(185, 185, 185, 0.2), -5px -5px 10px rgba(255, 255, 255, 0.9), 5px 5px 13px rgba(185, 185, 185, 0.9), inset 1px 1px 2px rgba(255, 255, 255, 0.3), inset -1px -1px 2px rgba(185, 185, 185, 0.5)",
  };

  const appHeader = {
    display: "flex",
    alignItems: "flex-end",
    width: "215px",
  };

  const isMountedRef = useIsMountedRef();
  const [toLogin, setToLogin] = useState(false);
  const [open, setOpen] = useState(false);
  const [tarefaSelecionada, setTarefaSelecionada] = useState({});
  const [dataAtual, setDataAtual] = useState(formatISO(new Date(), "d"));
  const [mesAtual, setMesAtual] = useState(new Date().getMonth());
  const [dataFiltro, setDataFiltro] = useState(new Date());
  const [taskList, setTaskList] = useState([]);

  //--------------------Abrir e fechar modal--------------
  const handleOpen = () => {
    setTarefaSelecionada({});
    setOpen(!open);
  };

  const handleClose = () => {
    setOpen(false);
    getTasksByCreatedDate();
  };
  //-------------------------------------------------------

  useEffect(() => {
    setDataAtual(format(dataFiltro, "d"));
    setMesAtual(dataFiltro.getMonth());
  }, [dataFiltro]);

  //-------------- horário da home screen-------------------
  let time = new Date().toLocaleTimeString("pt-BR").slice(0, 5);
  const [horaAtual, setHoraAtual] = useState(time);

  const newTime = () => {
    time = new Date().toLocaleTimeString("pt-BR").slice(0, 5);
    setHoraAtual(time);
  };

  setInterval(newTime, 1000);
  //-------------------------------------------------------------

  //------Filtro que busca na API de acordo com o Date Picker-------
  const getTasksByCreatedDate = useCallback(async () => {
    try {
      const { data } = await getByDate(dataFiltro);

      if (isMountedRef.current) {
        console.table(data);
        setTaskList(data);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMountedRef, dataFiltro]);

  //---------------------------------------------------------------

  useEffect(() => {
    getTasksByCreatedDate();
  }, [getTasksByCreatedDate, dataFiltro]);

  //---------------------------------------------------------------

  const onEditar = (id) => () => {
    const tarefa = taskList.filter((el) => {
      return el.id === id;
    });
    setTarefaSelecionada(tarefa[0]);
    setOpen(true);
  };

  useEffect(() => {
    const token = localStorage.getItem("appToken");
    if (!token) {
      setToLogin(true);
    }
  }, []);

  const onExcluir = (id) => async () => {
    try {
      const { data } = await deleteTask(id);
      setTaskList(data);
    } catch (err) {
      console.error(err);
    }
  };

  const onConcluir = (id) => async () => {
    const tarefa = taskList.findIndex((el) => {
      return el.id === id;
    });

    taskList[tarefa].is_completed = !taskList[tarefa].is_completed;
    setTaskList([...taskList]);

    const { data } = await toggleCompleteTask(id);
    taskList[tarefa] = data;
    console.table(taskList);
    setTaskList([...taskList]);
  };

  if (toLogin) {
    return <Redirect to="/login" />;
  }

  let content = null;
  if (taskList.length === 0) {
    content = (
      <Typography variant="h4" sx={{ mt: 3 }}>
        Não existem tarefas nessa data.
      </Typography>
    );
  } else {
    content = taskList.map((task) => (
      <Tarefa
        task={task}
        key={task.id}
        editar={onEditar(task.id)}
        excluir={onExcluir(task.id)}
        concluir={onConcluir(task.id)}
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
                <MobileDatePicker
                  label="Selecione a data"
                  value={dataFiltro}
                  onChange={(newValue) => {
                    setDataFiltro(newValue);
                  }}
                  renderInput={(params) => (
                    <InputBase
                      sx={{ m: 1, display: "flex" }}
                      {...params}
                    />
                  )}
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
          //onSalvar={onSalvar}
          tarefa={tarefaSelecionada}
        ></TaskModal>
      </Container>
    </Paper>
  );
}
