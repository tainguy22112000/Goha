import Flex from "@/components/flex";
import { Button } from "antd";
import React from "react";
import useCreateUser from "../../services/useCreateUser";
import { useForm } from "antd/lib/form/Form";
import { useNavigate } from "react-router-dom";
import UserForm from "../../components/userForm";

export default function AddUser() {
  const [form] = useForm();
  const navigate = useNavigate();

  const { mutateAsync: createUser, isLoading } = useCreateUser();

  const onSubmit = async () => {
    try {
      await form.validateFields();
      const values = form.getFieldsValue();
      const { confirmPassword, ...payload } = values;
      await createUser({ ...payload });
      navigate("/users");
    } catch (error) {
      console.log({ error });
    }
  };

  return (
    <div>
      <div className="border-bottom page-header-alt mb-4">
        <div className="container">
          <Flex
            className="py-2"
            mobileFlex={false}
            justifyContent="between"
            alignItems="center"
          >
            <h2>Create user</h2>
            <div>
              <Button
                type="primary"
                onClick={onSubmit}
                htmlType="submit"
                loading={isLoading}
              >
                Submit
              </Button>
            </div>
          </Flex>
        </div>
      </div>
      <UserForm form={form} isLoading={isLoading} onSubmit={onSubmit} />
    </div>
  );
}
