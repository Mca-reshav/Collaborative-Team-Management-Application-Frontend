const { baseUrl } = require("../constants/Common.const");

module.exports = {
    addProject: `${baseUrl}/project/add`,
    list: `${baseUrl}/project/getList`,
    listActiveMembers: `${baseUrl}/project/getActiveMembers`,
    updateProject: `${baseUrl}/project/update`,
    deleteProject: `${baseUrl}/project/delete`,
    getListSpecific: `${baseUrl}/project/get`
}