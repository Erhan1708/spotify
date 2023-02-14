import Head from 'next/head';
import React, { FC } from 'react';

type PageContainerProps = {
    title?: string,
    description?: string,
    keywords?: string
}

const PageContainer:FC<PageContainerProps> = ({title, description, keywords}) => {
    return (
        <Head>
            <title>{title || 'Музыккальная площадка'}</title>
            <meta name="description" content={`Музыкальная площадка. Здесь каждый может оставить свой трек и стать знаменитым.` + description}/>
            <meta name="robots" content="index, follow"/>
            <meta name="keywords" content={keywords || "Музыка, треки, артисты"}/>
            <meta name="viewport" content="width=device-width, initial-scale=1"/>
         </Head>
    );
};

export default PageContainer;