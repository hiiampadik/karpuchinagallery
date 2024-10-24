const LocalizedDate = (dateString: string, locale: string) => {
    const [year, month, day] = dateString.split('-');
    return `${day}.${month}.${year}`;

    // const date = new Date(dateString);
    // const formatter = new Intl.DateTimeFormat(locale, {
    //     year: 'numeric',
    //     month: 'short',
    //     day: 'numeric',
    // });
    // return formatter.format(date)
};

export default LocalizedDate

