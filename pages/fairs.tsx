'use client'
import Layout from '../components/Layout';
import {GetStaticPropsContext} from 'next';

export default function Fairs() {

    return (
        <Layout>
            <div >
                Fairs
            </div>
        </Layout>
    );
}

export async function getStaticProps(context: GetStaticPropsContext) {
    return {
        props: {
            // You can get the messages from anywhere you like. The recommended
            // pattern is to put them in JSON files separated by locale and read
            // the desired one based on the `locale` received from Next.js.
            messages: (await import(`../public/locales/${context.locale}.json`)).default
        }
    };
}