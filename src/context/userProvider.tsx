

import { createContext, ReactElement, useState } from "react";

export type UserType = {
  gender: string;
  name: {
    title: string;
    first: string;
    last: string;
  };
  location: {
    street: {
      number: number;
      name: string;
    };
    city: string;
    state: string;
    country: string;
    postcode: number;
    coordinates: {
      latitude: string;
      longitude: string;
    };
    timezone: {
      offset: string;
      description: string;
    };
  };
  email: string;
  login: {
    uuid: string;
    username: string;
    password: string;
    salt: string;
    md5: string;
    sha1: string;
    sha256: string;
  };
  dob: {
    date: string;
    age: number;
  };
  registered: {
    date: string;
    age: number;
  };
  phone: string;
  cell: string;
  id: {
    name: string;
    value: string;
  };
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
  nat: string;
};

const initState: UserType[] = [];

interface ApiResponse {
  results: UserType[];
}

interface UserDetails   {
  name?: string;
  email?: string;
  birthday?: string;
  address?: string;
  phone?: string;
  password?: string;
  photoUrl?: string;
}

export const fetchUsers = (
  page: number = 1,
  genderFilter: string | null
): Promise<ApiResponse> => {
  // Fetch users from the API based on the specified page and gender filter
  const apiUrl = `https://randomuser.me/api/?results=${10}&page=${page}&gender=${
    genderFilter || ""
  }`;
  return fetch(apiUrl).then((response) => response.json());
};

export type UseUserContextType = {
  users: UserType[];
  setUsers: React.Dispatch<React.SetStateAction<UserType[]>>;
  fetchUsers: (
    page: number,
    genderFilter: string | null
  ) => Promise<ApiResponse>;
  userDetail: (email:string) => UserDetails;
  gender:string,
  setGender: React.Dispatch<React.SetStateAction<string>>;

};

const initContextState: UseUserContextType = {
  users: [],
  setUsers: () => {},
  fetchUsers: () => Promise.resolve({ results: [] }),
  userDetail: () => {
    // Provide a placeholder implementation for now
    return {
      name: "John Doe", // Replace with default or placeholder values
      email: "johndoe@example.com",
      birthday: "2011-01-01",
      address: "03993k, dd, isl",
      phone: "798729872984",
      password: "98sdjfsjdf",
      photoUrl: "https://randomuser.me/api/portraits/women/88.jpg",
    };
  },
  gender:"all",
  setGender: ()=>{}
};

const UserContext = createContext<UseUserContextType>(initContextState);

type ChildrenType = { children?: ReactElement | ReactElement[] };

export const UsersProvider = ({ children }: ChildrenType): ReactElement => {
  const [users, setUsers] = useState<UserType[]>(initState);
  const [gender, setGender] = useState<string>("all");
  

  const userDetail = (email: string) => {
    const user = users.find((user) => user.email === email);
    

    return {
      name: `${user?.name.title} ${user?.name.first} ${user?.name.last} `,
      email: user?.email,
      birthday: user?.dob.date,
      address: `${user?.location.street.number} ${user?.location.street.name} ${user?.location.city}`,
      phone: user?.phone,
      password: user?.login.password,
      photoUrl: user?.picture?.thumbnail,
    };
  };

  return (
    <UserContext.Provider value={{ users, setUsers, fetchUsers, userDetail, gender, setGender }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
