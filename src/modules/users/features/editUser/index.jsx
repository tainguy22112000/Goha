import Flex from "@/components/flex";
import { Button, Skeleton } from "antd";
import React from "react";
import { useForm } from "antd/lib/form/Form";
import { useNavigate, useParams } from "react-router-dom";
import UserForm from "../../components/userForm";
import useGetUser from "../../services/useGetUser";
import useUpdateUser from "../../services/useUpdateUser";

export default function EditUser() {
  const [form] = useForm();
  const { userId } = useParams();
  const { mutateAsync: updateUser, isLoading: isLoadingUpdate } =
    useUpdateUser();

  const { data: user, isLoading } = useGetUser(userId, {
    enabled: Boolean(userId),
  });

  const navigate = useNavigate();
  const onSubmit = async () => {
    try {
      await form.validateFields();
      const values = form.getFieldsValue();
      await updateUser({ ...values, id: userId });
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
            <h2>Update: {user?.name}</h2>
            <div>
              <Button
                type="primary"
                onClick={onSubmit}
                htmlType="submit"
                loading={isLoading || isLoadingUpdate}
              >
                Submit
              </Button>
            </div>
          </Flex>
        </div>
      </div>
      {isLoading ? (
        <Skeleton />
      ) : (
        <UserForm
          form={form}
          initialValues={user}
          onSubmit={onSubmit}
          isLoading={isLoadingUpdate}
          mode="EDIT"
        />
      )}
    </div>
  );
}
