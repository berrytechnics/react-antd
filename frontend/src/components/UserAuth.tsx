const UserAuth = {
  login: async (email: string, password: string) => {
    const response = await fetch("/login", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    const data = await response.json();
    if (data.error) throw new Error(data.error);
    return data.token;
  },
  logout: async () => {
    return true;
  },
  regiser: async (name: string, email: string, password: string) => {
    const response = await fetch("/register", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
      }),
    });
    const data = await response.json();
    if (data.status === "error") throw new Error(data.error);
    return data;
  },
  validateToken: async () => {
    return true;
  },
};
export default UserAuth;
