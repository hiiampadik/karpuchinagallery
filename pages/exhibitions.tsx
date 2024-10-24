'use client'
import Layout from '../components/Layout';
import {GetStaticPropsContext} from 'next';
import {useRouter} from 'next/router';
import {useFetchExhibitions} from '@/api/useSanityData';
import styles from '@/styles/exhibitions.module.scss';
import React, {useMemo} from 'react';
import {Exhibition} from '@/api/classes';
import ExhibitionItem from '@/components/Layout/ExhibitionItem';

export default function Exhibitions() {
    const router = useRouter();
    const {data: exhibitions} = useFetchExhibitions(router.locale ?? 'cs')

    const groupedExhibitionsByYear = useMemo(() => {
        if (!exhibitions){
            return []
        }
        const exhibitionsByYear: { [key: number]: Exhibition[] } = {};

        exhibitions.forEach(exhibition => {
            const year = new Date(exhibition.StartDate).getFullYear();
            if (!exhibitionsByYear[year]) {
                exhibitionsByYear[year] = [];
            }
            exhibitionsByYear[year].push(exhibition);
        });
        return Object.entries(exhibitionsByYear)
            .map(([year, exhibitions]) => ({
                year: parseInt(year),
                exhibitions: exhibitions.sort((a, b) => {
                    const dateA = new Date(a.StartDate).getTime();
                    const dateB = new Date(b.StartDate).getTime();
                    return dateB - dateA;
                }),
            }))
            .sort((a, b) => b.year - a.year);
    }, [exhibitions])


    return (
        <Layout>
            {groupedExhibitionsByYear.map((group) => (
                <div key={group.year} className={styles.exhibitionYear}>
                    <h1>{group.year}</h1>
                    <div className={styles.exhibitionsContainer}>
                        {group.exhibitions.map((exhibition => {
                            return (
                                <ExhibitionItem exhibition={exhibition} key={exhibition.Id} useH2={true} />
                            )
                        }))}
                    </div>
                </div>
            ))}

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