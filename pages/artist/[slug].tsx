import Layout from "../../components/Layout";
import React from "react";

export default function Artist() {


  return (
      <Layout >
        Artist
      </Layout>
  )
}

Artist.getInitialProps = () => {
  return { initialUser: {}, key: Number(new Date()) }
}

