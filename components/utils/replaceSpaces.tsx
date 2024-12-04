import React from 'react';

export const replaceSpaces = (text :string) => {
    const isSmallScreen = window.matchMedia('(max-width: 500px)').matches;
    const spaceChar = isSmallScreen ? ' ' : '\u00A0';
    return <span dangerouslySetInnerHTML={{ __html: text.replace(/ /g, spaceChar) }} />;
}

export const replaceSpacesBeforeOneCharacterWord = (text :string) => {
    return <span dangerouslySetInnerHTML={{__html: text.replace(/\s([a-zA-Z]{1})\s/g, ' $1&nbsp;')}}/>
}