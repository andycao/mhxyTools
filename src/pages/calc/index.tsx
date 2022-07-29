import React, { useState, useMemo } from "react";
import { Form, InputNumber, Tabs, Row, Col, Button, Space } from "antd";

const { TabPane } = Tabs;

const magicX = {
  dmgValue: 0.25,
  mValue: 0.7,
  lValue: 0.4,
  tValue: 0.3,
  nValue: 0.2,
  miValue: 0,
  accValue: 0,
};
const nerX = {
  dmgValue: 0.16,
  mValue: 0,
  lValue: 0,
  tValue: 0,
  nValue: 0,
  miValue: 0.6,
  accValue: 0,
};

const physicsXianX = {
  dmgValue: 1,
  mValue: 0,
  lValue: 0.57,
  tValue: 0,
  nValue: 0,
  miValue: 0,
  accValue: 0.3333,
};
const physicsRenX = {
  dmgValue: 1,
  mValue: 0,
  lValue: 0.67,
  tValue: 0,
  nValue: 0,
  miValue: 0,
  accValue: 0.3333,
};
const physicsMoX = {
  dmgValue: 1,
  mValue: 0,
  lValue: 0.77,
  tValue: 0,
  nValue: 0,
  miValue: 0,
  accValue: 0.3333,
};

const Index = () => {
  const [value, setValue] = useState<string>();
  const [price, setPrice] = useState<number>(0);

  const onFinish = (values: any) => {
    const {
      dmg = 0,
      dmgValue = 0,
      l = 0,
      lValue = 0,
      m = 0,
      mValue = 0,
      mi = 0,
      miValue = 0,
      n = 0,
      nValue = 0,
      t = 0,
      tValue = 0,
      acc = 0,
      accValue = 0,
      price,
    } = values;
    const ans =
      dmg * dmgValue +
      acc * accValue +
      l * lValue +
      m * mValue +
      mi * miValue +
      n * nValue +
      t * tValue;

    setValue(ans.toFixed(4));
    if (price) {
      setPrice(price);
    }
  };

  const [form] = Form.useForm();

  const unitPrice = useMemo(() => {
    const ans = Number(value) / Number(price);
    return ans;
  }, [price, value]);

  return (
    <div>
      <h1>常用计算器</h1>
      <Tabs>
        <TabPane tab="武器" key="1">
          <h3>武器价值</h3>
          <div style={{ margin: 10 }}>
            <h4>常用系数</h4>
            <Space>
              <Button
                onClick={() => {
                  form.setFieldsValue(magicX);
                }}
              >
                法系
              </Button>
              <Button
                onClick={() => {
                  form.setFieldsValue(nerX);
                }}
              >
                固伤
              </Button>
              <Button
                onClick={() => {
                  form.setFieldsValue(physicsXianX);
                }}
              >
                物理 仙
              </Button>
              <Button
                onClick={() => {
                  form.setFieldsValue(physicsRenX);
                }}
              >
                物理 人
              </Button>
              <Button
                onClick={() => {
                  form.setFieldsValue(physicsMoX);
                }}
              >
                物理 魔
              </Button>
            </Space>
          </div>
          <Row>
            <Col span={8}>
              <Form
                form={form}
                labelCol={{ span: 8 }}
                onFinish={onFinish}
                initialValues={{
                  ...magicX,
                }}
              >
                <Row>
                  <Col span={12}>
                    <Form.Item label="伤害" name="dmg">
                      <InputNumber />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="系数" name="dmgValue">
                      <InputNumber />
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={12}>
                    <Form.Item label="命中" name="acc">
                      <InputNumber />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="系数" name="accValue">
                      <InputNumber />
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={12}>
                    <Form.Item label="魔" name="m">
                      <InputNumber />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="系数" name="mValue">
                      <InputNumber />
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={12}>
                    <Form.Item label="力" name="l">
                      <InputNumber />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="系数" name="lValue">
                      <InputNumber />
                    </Form.Item>
                  </Col>
                </Row>

                <Row>
                  <Col span={12}>
                    <Form.Item label="体" name="t">
                      <InputNumber />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="系数" name="tValue">
                      <InputNumber />
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={12}>
                    <Form.Item label="耐" name="n">
                      <InputNumber />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="系数" name="nValue">
                      <InputNumber />
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={12}>
                    <Form.Item label="敏" name="mi">
                      <InputNumber />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="系数" name="miValue">
                      <InputNumber />
                    </Form.Item>
                  </Col>
                </Row>
                <Form.Item label="价格" name="price">
                  <InputNumber />
                </Form.Item>
                <Button htmlType="submit" type="primary">
                  计算
                </Button>
              </Form>
            </Col>
            <Col span={8}>
              <h3>价值：</h3>
              <div>{value}</div>
              <h3>价格：</h3>
              <div>{price}</div>
              <h3>单价:</h3>
              <div>{unitPrice}</div>
            </Col>
          </Row>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default Index;
