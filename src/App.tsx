import { Route, Routes, useLocation, Navigate, Link } from "react-router-dom";
import UserList from "./components/UserList";
import UserProfile from "./components/UserProfile";

function App() {
  const { pathname } = useLocation();
  const content = (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <div>{pathname && <Navigate to="/list" replace={true} />}</div>
          }
        />
        <Route path="list" element={<UserList />} />
        <Route path="profile/:id" element={<UserProfile />} />

        <Route path="*" element={<Navigate to="/list" replace />} />
      </Routes>
    </>
  );

  return content;
}

export default App;
