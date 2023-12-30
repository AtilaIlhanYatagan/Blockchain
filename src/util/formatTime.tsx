export const formatTime = (unixTimestamp: number): string => {
    // Create a new JavaScript Date object based on the timestamp
    // multiplied by 1000 so that the argument is in milliseconds, not seconds
    const date = new Date(unixTimestamp * 1000);

    // Hours part from the timestamp
    const hours = date.getHours();

    // Minutes part from the timestamp
    const minutes = `0${date.getMinutes()}`.slice(-2);

    // Seconds part from the timestamp
    const seconds = `0${date.getSeconds()}`.slice(-2);

    // Will display time in 10:30:23 format
    return `${hours}:${minutes}:${seconds}`;
};