import axios from "axios";

const apiEndpoint = "https://jsonplaceholder.typicode.com/todos";

async function getTodoList() {
  return await axios.get(apiEndpoint);
}

async function createToDo(task) {
  return await axios.post(apiEndpoint, task);
}

async function editToDo(task) {
  return await axios.put(`${apiEndpoint}/${task.id}`, task);
}

export { getTodoList, createToDo, editToDo };
