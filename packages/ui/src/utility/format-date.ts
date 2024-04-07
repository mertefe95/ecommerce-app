import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

const formatDate = (date, shouldOnlyReturnDate = true) => {
  if (shouldOnlyReturnDate && date) {
    return dayjs.utc(date).format('DD-MM-YYYY');
  } else if (!shouldOnlyReturnDate && date) {
    return dayjs.utc(date).format('DD-MM-YYYY HH:mm:ss');
  } else {
    return '';
  }
};

export default formatDate;
