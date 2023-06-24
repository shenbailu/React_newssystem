/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2021-11-04 05:05:52
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2023-06-24 01:03:25
 * @FilePath: \newssystem\src\views\news\News.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useEffect, useState } from "react";
import {PageHeader,Row,Col,Card,List} from 'antd'
import axios from "axios";
import _ from "lodash";

export default function News() {
  const [list, setList] = useState([]);
  useEffect(() => {
    axios.get("/news?publishState=2&_expand=category").then((res) => {
      console.log(
        Object.entries(_.groupBy(res.data, (item) => item.category.title))
      );
      setList(
        //   console.log(
        Object.entries(_.groupBy(res.data, (item) => item.category.title))
        //   );
      );
    });
  }, []);

  console.log(list);

  return (
    <div
      style={{
        width: "95%",
        margin: "0 auto",
      }}
    >
      <PageHeader
        className="site-page-header"
        title="全球大新闻"
        subTitle="查看新闻"
      />
      <div className="site-card-wrapper">
        <Row gutter={[16, 16]}>
          {list.map((item) => {
            return (
              <Col span={8} key={item[0]}>
                <Card title="Card title" bordered={false} hoverable={true}>
                  <List
                    header={<div>Header</div>}
                    footer={<div>Footer</div>}
                    bordered
                    dataSource={item[1]}
                    pagination={{
                      pageSize: 3,
                    }}
                    renderItem={(data) => (
                      <List.Item>
                        <a href={`#/detail/${data.id}`}>{data.title}</a>
                      </List.Item>
                    )}
                  />
                </Card>
              </Col>
            );
          })}
        </Row>
      </div>
    </div>
  );
}
