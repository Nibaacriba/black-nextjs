import { GetServerSideProps, NextPage } from "next";
import { ReactNode, useEffect, useState } from "react";
import { Col, Container, Row } from "reactstrap";

interface ApiResponse {
  name: string;
  timeStamp: Date;
  pokemon: string;
}

export const getServerSideProps: GetServerSideProps = async () => {
  const serverSideData: ApiResponse = await fetch(
    `${process.env.NEXT_PUBLIC_APIURL}/api/hello`
  ).then((resp) => resp.json());
  return {
    props: {
      serverSideData,
    },
  };
};

const Dynamic: NextPage = (props: {
  children?: ReactNode;
  serverSideData?: ApiResponse;
}) => {
  const [clientSideData, setClientSideData] = useState<ApiResponse>();

  const fetchData = async () => {
    const data = await fetch("/api/hello").then((resp) => resp.json());
    setClientSideData(data);
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <Container tag="main">
      <h1 className="my-5">Como funcionam as renderizações do Next.js</h1>

      <Row>
        <Col>
          <h3>
            Gerado no servidor: {props?.serverSideData?.timeStamp.toString()}
          </h3>
        </Col>
        <Col>
          <h3>Gerado no servidor: {props?.serverSideData?.pokemon}</h3>
        </Col>

        <Col>
          <h3>Gerado no cliente: {clientSideData?.timeStamp.toString()}</h3>
        </Col>
      </Row>
    </Container>
  );
};

export default Dynamic;
