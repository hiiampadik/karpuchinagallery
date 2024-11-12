const LocalizedDate = (dateString: string, locale: string) => {
    const date = new Date(dateString)
    return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;

    // const date = new Date(dateString);
    // const formatter = new Intl.DateTimeFormat(locale, {
    //     year: 'numeric',
    //     month: 'short',
    //     day: 'numeric',
    // });
    // return formatter.format(date)
};

export default LocalizedDate

