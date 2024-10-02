import Layout from "../../components/Layout";
import React from "react";

export default function Exhibition() {


  return (
      <Layout >
          Exhibition
      </Layout>
  )
}

Exhibition.getInitialProps = () => {
  return { initialUser: {}, key: Number(new Date()) }
}

