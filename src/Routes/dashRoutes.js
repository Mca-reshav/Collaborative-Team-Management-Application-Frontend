const { baseUrl } = require("../constants/Common.const");

module.exports = {
    getMemberCount: `${baseUrl}/dashboard/membersCount`,
    getTaskCount: `${baseUrl}/dashboard/tasksCount`,
    getProjectCount: `${baseUrl}/dashboard/projectsCount`,
    seeActivity: `${baseUrl}/dashboard/seeActivity`,
    closeToDueDate: `${baseUrl}/dashboard/upcomingTask`,
    recentActivity: `${baseUrl}/dashboard/recentActivity`,
}