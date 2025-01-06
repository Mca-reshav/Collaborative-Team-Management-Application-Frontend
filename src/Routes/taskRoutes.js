const { baseUrl } = require("../constants/Common.const");

module.exports = {
    getList: `${baseUrl}/task/getList`,
    getKanban: `${baseUrl}/task/kanban`,
    getActiveProject: `${baseUrl}/task/listProjects`,
    createTask: `${baseUrl}/task/add`,
    updateTask: `${baseUrl}/task/update`,
    deleteTask: `${baseUrl}/task/delete`,
    assignTask: `${baseUrl}/task/assignTask`,
    listAvailableUsers: `${baseUrl}/users/listAvailableUsers`,
    getListSpecific: `${baseUrl}/task/get`,
    moveTask: `${baseUrl}/task/move`
}