import httpService from "../httpService";
const employeesEndpoint = "employees/";

const EmployeesService = {
  getAll: async () => {
    const { data } = await httpService.get(employeesEndpoint);
    return data;
  },
};
export default EmployeesService;
