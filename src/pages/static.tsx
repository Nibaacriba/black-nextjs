import { GetServerSideProps, GetStaticProps, NextPage } from "next";
import { ReactNode, useEffect, useState } from "react";
import { Col, Container, Row } from "reactstrap";

interface ApiResponse {
  name: string;
  timeStamp: Date;
  pokemon: string;
}

export const getStaticProps: GetStaticProps = async () => {
  const staticData = await fetch(
    `${process.env.NEXT_PUBLIC_APIURL}/api/hello`
  ).then((resp) => resp.json());

  return {
    props: {
      staticData,
    },
  };
};

const Static: NextPage = (props: {
  children?: ReactNode;
  staticData?: ApiResponse;
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
          <h3>Gerado estaticamente durante o build</h3>
          <h2>{props?.staticData?.timeStamp?.toString()}</h2>
        </Col>

        <Col>
          <h3>Gerado no cliente: {clientSideData?.timeStamp.toString()}</h3>
        </Col>
      </Row>
    </Container>
  );
};

export default Static;
