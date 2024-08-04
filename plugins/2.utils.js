export default defineNuxtPlugin(nuxtApp => {
    const fds = (date, gmt) => {
        let dateObject = new Date(date);
        let year, month, day;

        try {
            if (!isNaN(dateObject.getTime())) {
                year = dateObject.getFullYear();
                month = ('0' + (dateObject.getMonth() + 1)).slice(-2); // Add 1 because months are zero-indexed
                day = ('0' + dateObject.getDate()).slice(-2); // Get day of the month

                return `${day}-${month}-${year}`;
            } else {
                return '';
            }
        } catch (err) {
            return '';
        }
    };

    return {
        provide: {
            fds,
        }
    }
})