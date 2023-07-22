import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import { Form, Input, Button, Row, Col, Skeleton, Switch } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faAt,
  faLock,
  faLockOpen,
} from "@fortawesome/free-solid-svg-icons";
import { useCookies } from "react-cookie";
import UserAuth from "../components/UserAuth";

const Login = () => {
  // const navigate = useNavigate();
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(true);
  const [newUser, setNewUser] = useState(false);
  const [, setCookies] = useCookies(["token"]);
  const registerUser = async () => {
    const data = await UserAuth.regiser(
      form.getFieldValue("name"),
      form.getFieldValue("email"),
      form.getFieldValue("password")
    );
    console.log(data);
  };
  const loginUser = async () => {
    const token = await UserAuth.login(
      form.getFieldValue("email"),
      form.getFieldValue("password")
    );
    setCookies("token", token, {
      path: "/",
      secure: false,
    });
  };

  useEffect(() => {
    setIsLoading(false);
  }, []);

  // useEffect(() => {
  //   navigate("/dashboard");
  // }, [cookies, navigate]);

  return isLoading ? (
    <>
      <Row>
        <Col span={12} offset={6}>
          <Skeleton active></Skeleton>
        </Col>
      </Row>
    </>
  ) : (
    <>
      <Form
        form={form}
        name={newUser ? "register" : "login"}
        onFinish={newUser ? registerUser : loginUser}
      >
        <Row>
          <Col span={12} offset={6}>
            <Row>
              <h1>{newUser ? "Register" : "Login"}</h1>
            </Row>
            <Row>
              <Switch
                style={{ marginBottom: "1rem" }}
                onChange={setNewUser}
                unCheckedChildren="Register"
                checkedChildren="Register"
              />
            </Row>
            {newUser && (
              <Form.Item
                rules={[
                  { required: true, message: "Name is required!" },
                  { max: 255, message: "Name has too many characters!" },
                ]}
                name="name"
              >
                <Input
                  placeholder="Name"
                  style={{ marginBottom: "1rem" }}
                  prefix={<FontAwesomeIcon icon={faUser}></FontAwesomeIcon>}
                  type="text"
                ></Input>
              </Form.Item>
            )}
            <Form.Item
              rules={[
                { required: true, message: "Email is required!" },
                { type: "email", min: 1, max: 255 },
                { whitespace: false },
              ]}
              name="email"
            >
              <Input
                placeholder="Email"
                style={{ marginBottom: "1rem" }}
                prefix={<FontAwesomeIcon icon={faAt}></FontAwesomeIcon>}
                type="email"
              ></Input>
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Password is required!" },
                { min: 8, message: "Password must be at least 8 characters" },
              ]}
            >
              <Input.Password
                placeholder="Password"
                style={{ marginBottom: "1rem" }}
                prefix={<FontAwesomeIcon icon={faLock} />}
              ></Input.Password>
            </Form.Item>

            {newUser && (
              <Form.Item
                rules={[
                  {
                    validator: (rule: any, value: any, cb: any) => {
                      console.debug(JSON.stringify(rule));
                      try {
                        if (
                          !value ||
                          form.getFieldValue("password") !== value
                        ) {
                          throw new Error("Passwords do not match!");
                        }
                      } catch (err) {
                        cb(err);
                      }
                    },
                  },
                ]}
                name="password2"
              >
                <Input.Password
                  placeholder="Confirm Password"
                  style={{ marginBottom: "1rem" }}
                  prefix={<FontAwesomeIcon icon={faLockOpen} />}
                ></Input.Password>
              </Form.Item>
            )}
          </Col>
        </Row>
        <Row>
          <Col span={4} offset={15}>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                // onClick={newUser ? registerUser : loginUser}
              >
                {newUser ? "Register" : "Login"}
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export { Login };
