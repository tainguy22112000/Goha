import { Form, Tabs } from "antd";
import React from "react";
import ShipperInformation from "./shipperInformation";

export default function OrderForm({ form, initialValues }) {
  return (
    <>
      <Form
        layout="vertical"
        form={form}
        name="advanced_search"
        className="ant-advanced-search-form"
        initialValues={{
          heightUnit: "cm",
          widthUnit: "cm",
          weightUnit: "kg",
        }}
      >
        <div className="container">
          <Tabs
            defaultActiveKey="1"
            style={{ marginTop: 30 }}
            items={[
              {
                label: "General",
                key: "1",
                children: <ShipperInformation />,
              },
              // {
              //   label: "Variation",
              //   key: "2",
              //   children: <VariationField />,
              // },
              // {
              //   label: "Shipping",
              //   key: "3",
              //   children: <ShippingField />,
              // },
            ]}
          />
        </div>
      </Form>
    </>
  );
}
