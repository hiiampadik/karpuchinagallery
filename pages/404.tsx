import Layout from '../components/Layout';
import React from 'react';
import {useRouter} from 'next/router';

export default function NotFound() {
    const router = useRouter();

    return (
        <Layout title={'Page Not Found'}>
            <section>
                <h2>
                    {router.locale === 'cs' ?
                        `Tato stránka neexistuje!`
                        :
                        `Page Not Found!`
                    }
                </h2>
            </section>
        </Layout>
    );
}
