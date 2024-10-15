import React from 'react';

export const replaceSpaces = (text :string) => {
    return <span dangerouslySetInnerHTML={{__html: text.replace(/ /g, '\u00A0')}}/>
}