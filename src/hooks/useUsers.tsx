import { useContext } from "react";
import UsersContext from "../context/userProvider";
import { UseUserContextType } from "../context/userProvider";

const useUsers = (): UseUserContextType => {
  return useContext(UsersContext);
};

export default useUsers;
