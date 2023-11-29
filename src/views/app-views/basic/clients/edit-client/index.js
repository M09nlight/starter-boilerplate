import React, { useEffect, useState } from "react";
import { Form, Button, Input, Row, Col } from "antd";
import { ROW_GUTTER } from "constants/ThemeConstant";
import Flex from "components/shared-components/Flex";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import { useFetching } from "hooks/useFetching";
import Loading from "components/shared-components/Loading";

export function EditClient() {
  const params = useParams();
  const history = useHistory();

  const [client, setClient] = useState();
  const [updateIsLoading, setUpdateIsLoading] = useState(false);

  const [fetchClient, isClientLoading, isError] = useFetching(async () => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/users/${params.id}`
    );
    const data = await response.json();
    setClient(data);
  });

  useEffect(() => {
    fetchClient();
  }, []);

  const handleFormChange = (allValues) => {
    setClient((prevClient) => ({ ...prevClient, ...allValues }));
  };

  const handleSubmit = async () => {
    try {
      setUpdateIsLoading(true);
      await fetch(`https://jsonplaceholder.typicode.com/users/${params.id}`, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(client),
      });
      setTimeout(() => {
        setUpdateIsLoading(false);
        history.push("../../clients/list");
      }, 1000);
    } catch (error) {}
  };

  if (isClientLoading || updateIsLoading) return <Loading cover="content" />;

  return (
    <>
      <Flex
        alignItems="center"
        mobileFlex={false}
        className="text-center text-md-left"
      ></Flex>
      <div className="mt-4">
        <Form
          name="client-info"
          layout="vertical"
          initialValues={client}
          onSubmitCapture={handleSubmit}
          onValuesChange={handleFormChange}
        >
          <Row>
            <Col xs={24} sm={24} md={24} lg={16}>
              <Row gutter={ROW_GUTTER}>
                <Col xs={24} sm={24} md={12}>
                  <Form.Item
                    label="Name"
                    name="name"
                    rules={[
                      {
                        required: true,
                        message: "Please input name!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={12}>
                  <Form.Item
                    label="Username"
                    name="username"
                    rules={[
                      {
                        required: true,
                        message: "Please input username!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={12}>
                  <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                      {
                        required: true,
                        type: "email",
                        message: "Please enter a valid email!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={12}>
                  <Form.Item label="Phone" name="phone">
                    <Input />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={12}>
                  <Form.Item label="Website" name="website">
                    <Input />
                  </Form.Item>
                </Col>
                <div className="w-100 ml-2 mb-2">Address</div>
                <Col xs={24} sm={24} md={12}>
                  <Form.Item label="Street" name={["address", "street"]}>
                    <Input />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={12}>
                  <Form.Item label="Suite" name={["address", "suite"]}>
                    <Input />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={12}>
                  <Form.Item label="City" name={["address", "city"]}>
                    <Input />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={12}>
                  <Form.Item label="Zipcode" name={["address", "zipcode"]}>
                    <Input />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={24}>
                  <Form.Item label="Company" name={["company", "name"]}>
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
              <Button type="primary" htmlType="submit">
                Save Change
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    </>
  );
}

export default EditClient;
