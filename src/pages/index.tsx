import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  Form,
  Input,
  Button,
  Col,
  Row,
  Empty,
  Divider,
  message,
  Spin,
} from "antd";

const Index = () => {
  const [asks, setAsks] = useState<string[]>([]);
  const [answer, setAnswer] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const doAsk = (question: string) => {
    const list = [question, ...asks].filter((v, i) => i < 5);
    setAsks(list);

    const anywhere = "https://api.allorigins.win/get?url=";
    const mhxy =
      "https://xyq.gm.163.com/cgi-bin/csa/csa_sprite.py?act=ask&product_name=xyq&question=" +
      question;

    const url = anywhere + encodeURIComponent(mhxy);
    setLoading(true);
    fetch(url, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        const { contents } = data;
        const { result, raw_answer } = JSON.parse(contents);
        if (result === "success") {
          setAnswer(raw_answer);
        } else {
          message.error("请求失败:" + JSON.stringify(data));
        }
      })
      .catch(() => {
        message.error("请求错误");
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
              rules={[{ required: true, message: "可以问我问题" }]}
            >
              <Input placeholder="输入问题" style={{ minWidth: 100 }} />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 6 }}>
              <Button type="primary" htmlType="submit">
                搜索
              </Button>
            </Form.Item>
          </Form>
        </Col>
        <Col span={12}>
          <h4>最近问题 top5</h4>
          <ol>
            {asks.map((entry) => (
              <li key={uuidv4()}>
                <Button
                  type="link"
                  onClick={() => {
                    doAsk(entry);
                  }}
                >
                  {entry}
                </Button>
              </li>
            ))}
          </ol>
          {asks.length === 0 ? <Empty /> : ""}
        </Col>
      </Row>
      <Divider />
      <Spin spinning={loading}>
        <div
          dangerouslySetInnerHTML={{ __html: answer }}
          style={{ backgroundColor: "#fff" }}
        />
        {answer ? "" : <Empty />}
      </Spin>
    </div>
  );
};

export default Index;
