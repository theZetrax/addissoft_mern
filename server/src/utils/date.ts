/**
 * Helper function to convert javascript object to
 * html date string.
 *
 * @param {string | Date} date Date to be converted.
 * @returns {string}
 */
const toHtmlDateString = (date: string | Date): string => {
    let dateObj: Date = typeof date === 'string' ? new Date(date) : date;

    const yearString = dateObj.getFullYear();
    const monthString = dateObj.getMonth().toString().padStart(2, '0');
    const dayString = dateObj.getDay().toString().padStart(2, '0');

    return `${yearString}-${monthString}-${dayString}`;
};

export { toHtmlDateString };
