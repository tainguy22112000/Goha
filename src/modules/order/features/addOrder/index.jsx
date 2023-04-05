import Flex from "@/components/flex";
import { Button, Card } from "antd";
import React from "react";
import useCreateOrder from "../../services/useCreateOrder";
import { useForm } from "antd/lib/form/Form";
import { useNavigate } from "react-router-dom";
import OrderForm from "../../components/orderForm";

export default function AddOrder() {
  const [form] = useForm();
  const navigate = useNavigate();

  const { mutateAsync: createUser, isLoading } = useCreateOrder();

  const onSubmit = async () => {
    try {
      await form.validateFields();
      const values = form.getFieldsValue();
      const { confirmPassword, ...payload } = values;
      await createUser({ ...payload });
      navigate("/orders");
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
            <h2>Create order</h2>
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
      <Card>
        <OrderForm form={form} isLoading={isLoading} onSubmit={onSubmit} />
      </Card>
    </div>
  );
}
