import { Row, Col, Avatar } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import Menu from "../components/Menu";
const Dashboard: React.FC = () => {
  return (
    <>
      <Menu user={true} />
      <Row>
        <Col span={2} offset={11}>
          <Avatar size={64} icon={<FontAwesomeIcon icon={faUser} />}></Avatar>
          <br />
          <h5 style={{ textAlign: "center" }}>Username</h5>
        </Col>
      </Row>
    </>
  );
};

export { Dashboard };
