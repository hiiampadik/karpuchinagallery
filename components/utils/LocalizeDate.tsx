const LocalizedDate = (dateString: string, locale: string) => {
    const date = new Date(dateString)
    return `${date.getDay()}.${date.getMonth()}.${date.getFullYear()}`;

    // const date = new Date(dateString);
    // const formatter = new Intl.DateTimeFormat(locale, {
    //     year: 'numeric',
    //     month: 'short',
    //     day: 'numeric',
    // });
    // return formatter.format(date)
};

export default LocalizedDate

