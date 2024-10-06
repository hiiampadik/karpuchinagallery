import Layout from "../../components/Layout";
import React from "react";
import {GetStaticPropsContext} from 'next';
import Artist from '@/pages/artist/[slug]';

export default function Exhibition() {


  return (
      <Layout >
          Exhibition
      </Layout>
  )
}

Exhibition.getInitialProps = async (context: GetStaticPropsContext) => {
    return {messages: (await import(`../../public/locales/${context.locale}.json`)).default}
}

