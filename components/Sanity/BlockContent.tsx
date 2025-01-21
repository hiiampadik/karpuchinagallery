import { PortableText, PortableTextComponents } from '@portabletext/react';
import Figure from './Figure';
import styles from './Blocks.module.scss';
import React, { FunctionComponent, ReactNode } from 'react';
import Link from 'next/link';

interface ImageValue {
  asset: any;
  caption?: string;
}

interface LinkValue {
  href: string;
  alt?: string;
}

const components: PortableTextComponents = {
  types: {
    image: ({ value }: { value: ImageValue }) => {
      return (
          <figure>
            <Figure image={value.asset} alt={value.caption || ''} />
            {value.caption ? <figcaption>{value.caption}</figcaption> : null}
          </figure>
      );
    },
  },
  marks: {
    link: ({ children, value }: { children?: ReactNode; value?: LinkValue }) => {
      if (!value?.href) {
        return <>{children}</>; // If no href is provided, just render the children
      }
      return (
          <Link href={value.href}
                target={'_blank'}
                prefetch={false}
          >
            {children}
          </Link>
      );
    },
  },
};

interface BlockContentProps {
  readonly blocks?: any;
}

const BlockContent: FunctionComponent<BlockContentProps> = ({ blocks }) => {
  return <PortableText value={blocks} components={components} />;
};

export default BlockContent;
