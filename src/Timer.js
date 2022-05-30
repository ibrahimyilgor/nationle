import { useEffect, useState } from 'react';

import l from './Languages/language';

const useCountdown = (datee, lang) => {
  const countDownDate = new Date(datee.getFullYear(), datee.getMonth(), datee.getDate(), 23, 59, 59)

  const [countDown, setCountDown] = useState(
    countDownDate - new Date().getTime()
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCountDown(countDownDate - new Date())
    }, 1000);

    return () => clearInterval(interval);
  }, [countDownDate]);

  return getReturnValues(countDown,lang);
};

const getReturnValues = (countDown,lang) => {
  // calculate time left
  if (countDown < 0){
    return [l(lang,"nextNationleIsReady")];
  }
  const days = Math.floor(countDown / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((countDown % (1000 * 60)) / 1000);

  return [days, hours, minutes, seconds];
};

export { useCountdown };