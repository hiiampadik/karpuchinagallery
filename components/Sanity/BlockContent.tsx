// @ts-nocheck
// todo

import { PortableText } from '@portabletext/react'
import Figure from './Figure'
import styles from './Blocks.module.scss'
import { useRouter } from "next/router";
import React, {FunctionComponent} from 'react';
import Link from 'next/link';

const components = {
  types: {
    image: ({ value }) => {
      return (
        <figure >
          <Figure image={value.asset} alt={value.caption}/>
          {value.caption != null ?
                    <figcaption>{value.caption}</figcaption>
                    : ""
          }
        </figure>
      )
    },
  },
  block: {
    small: ({children}) => <div className={styles.small}>{children}</div>,
  },
  marks: {
    link: ({children, value}) => {
      return (
      <Link href={value.href} alt={value.alt}>
        {children}
      </Link>
      )
    },
  },
}

interface BlockContentProps {
  readonly blocks?: any
}

const BlockContent: FunctionComponent<BlockContentProps> = ({ blocks}) => {
  return <PortableText value={blocks} components={components}/>
}

export default BlockContent;