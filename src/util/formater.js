//format the displayed date
export const formatDate = function(date, local){
  const calcDayPassed = (date1, date2) => Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

  let dayPassed = calcDayPassed(new Date(), date);
  if(dayPassed === 0) return 'TODAY';
  if(dayPassed === 1) return 'YESTERDAY';
  if(dayPassed <= 7) return `${dayPassed} days ago`;

  return new Intl.DateTimeFormat(local).format(date);
}

export const getExpireDate = (duration)=>{
    let dt = new Date();
    let no_of_months = +duration;
    dt.setMonth(dt.getMonth() + no_of_months)
    
    return new Intl.DateTimeFormat(navigator.language,{
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              }).format(dt);
};