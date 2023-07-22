import { Menu as Antmenu } from "antd";
const Menu = (props: { user: boolean }) => {
  return (
    <>
      <Antmenu
        style={{ marginBottom: "1rem" }}
        mode="horizontal"
        items={[
          {
            key: "index",
            label: <a href="/">Home</a>,
          },
          {
            key: props.user ? "dashboard" : "login",
            label: props.user ? (
              <a href="/dashboard">Dashboard</a>
            ) : (
              <a href="/login">Login</a>
            ),
          },
        ]}
      />
    </>
  );
};
export default Menu;
