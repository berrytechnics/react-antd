import { Login as LoginComponent } from "../components/Login";
import Menu from "../components/Menu";
const Login = () => {
  return (
    <>
      <Menu user={false} />
      <LoginComponent />
    </>
  );
};

export { Login };
