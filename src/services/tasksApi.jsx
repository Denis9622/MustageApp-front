import axios from "axios";

const API_URL = "http://localhost:5000/api/tasks";

export const fetchTasksApi = (params) => axios.get(API_URL, { params });
export const addTaskApi = (task) => axios.post(API_URL, task);
export const updateTaskApi = (id, task) => axios.put(`${API_URL}/${id}`, task);
export const deleteTaskApi = (id) => axios.delete(`${API_URL}/${id}`);