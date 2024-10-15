const LocalizedDate = (dateString: string, locale: string) => {
    const date = new Date(dateString);
    const formatter = new Intl.DateTimeFormat(locale, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
    return formatter.format(date).replace(/ /g, '\u00A0');
};

export default LocalizedDate