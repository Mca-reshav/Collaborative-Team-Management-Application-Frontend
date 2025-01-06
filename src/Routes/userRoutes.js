const { baseUrl } = require("../constants/Common.const");

module.exports = {
    login: `${baseUrl}/users/login`,
    register: `${baseUrl}/users/register`,
    list: `${baseUrl}/users/getList`,
    profile: `${baseUrl}/users/profile`,
    update: `${baseUrl}/users/update`
}