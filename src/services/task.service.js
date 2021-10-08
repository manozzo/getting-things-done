import formatISO from "date-fns/formatISO";
import axios from "../utils/axios";

let lastDate;

async function getByDate(dataFiltro) {
  lastDate = dataFiltro;
  let dataFiltroFormatada = formatISO(dataFiltro, {
    representation: "date",
  });
  return await axios.get("api/tasks/" + dataFiltroFormatada);
}

async function deleteTask(id) {
  await axios.delete(`api/task/delete/${id}`);

  return await getByDate(lastDate);
}

async function toggleCompleteTask(id) {
  return await axios.post(`api/task/toggle/${id}`);
}

// async function save(obj) {
//   if (obj.id) {route = "rota de editar";
//   else route = "rota de criar";

//   const { data } = await axios.post(route);
//   return data;
// }

export { getByDate, deleteTask, toggleCompleteTask };
