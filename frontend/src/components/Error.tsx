import { Result, ResultProps } from "antd";
const Error = (props: { message: string; status: ResultProps["status"] }) => {
  return (
    <>
      <Result
        status={props.status}
        title={props.status}
        subTitle="Sorry, something went wrong."
        extra={<span>{props.message}</span>}
      />
    </>
  );
};

export { Error };
