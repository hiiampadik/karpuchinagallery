import React from 'react';

export const replaceSpaces = (text :string) => {
    return <span dangerouslySetInnerHTML={{__html: text.replace(/ /g, '\u00A0')}}/>
}

export const replaceSpacesBeforeOneCharacterWord = (text :string) => {
    return <span dangerouslySetInnerHTML={{__html: text.replace(/\s([a-zA-Z]{1})\s/g, ' $1&nbsp;')}}/>
}