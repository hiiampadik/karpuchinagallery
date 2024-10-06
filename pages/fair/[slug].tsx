import Layout from "../../components/Layout";
import React from "react";
import {GetStaticPropsContext} from 'next';
import Artist from '@/pages/artist/[slug]';

export default function Fair() {


  return (
      <Layout >
          Fair
      </Layout>
  )
}

Fair.getInitialProps = async (context: GetStaticPropsContext) => {
    return {messages: (await import(`../../public/locales/${context.locale}.json`)).default}
}

