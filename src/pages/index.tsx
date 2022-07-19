import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

import { Form, Input, Button, Col, Row, Empty, Divider } from "antd";

const Index = () => {
  const [asks, setAsks] = useState<string[]>([]);

  const doAsk = (question: string) => {
    const list = [question, ...asks].filter((v, i) => i < 10);
    setAsks(list);
    // todo

    const url =
      "https://xyq.gm.163.com/cgi-bin/csa/csa_sprite.py?act=ask&product_name=xyq&question=";
    fetch(url + question, {
      credentials: "include",
      mode: "cors",
      referrerPolicy: "no-referrer",
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((resp) => resp.json)
      .then((data) => {
        console.log(data);
      });
  };

  const submit = (values: any) => {
    doAsk(values.question);
  };

  useEffect(() => {
    (window as any).reask = doAsk;
  }, []);
  return (
    <div>
      <Row>
        <Col span={12}>
          <Form labelCol={{ span: 6 }} onFinish={submit}>
            <Form.Item
              label="问题"
              name="question"
              rules={[{ required: true, message: "输入问题" }]}
            >
              <Input placeholder="输入问题" style={{ width: 400 }} />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 6 }}>
              <Button type="primary" htmlType="submit">
                搜索
              </Button>
            </Form.Item>
          </Form>
        </Col>
        <Col span={12}>
          <h4>最近问题 top10</h4>
          <ol>
            {asks.map((entry) => (
              <li key={uuidv4()}>{entry}</li>
            ))}
          </ol>
          {asks.length === 0 ? <Empty /> : ""}
        </Col>
      </Row>
      <Divider />
      <div id="detail" style={{ backgroundColor: "#fff" }}>
        <Empty />
      </div>
    </div>
  );
};

export default Index;
