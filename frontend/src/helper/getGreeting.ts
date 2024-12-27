import { greetingsList } from './greetingsList';

// get greeting
export function getGreeting() {
  const currentHour = new Date().getHours();
  if (currentHour >= 5 && currentHour < 12) return greetingsList.GOOD_MORNING;
  if (currentHour >= 12 && currentHour < 17) return greetingsList.GOOD_AFTERNOON;
  if (currentHour >= 17 && currentHour < 21) return greetingsList.GOOD_EVENING;
  return greetingsList.GOOD_NIGHT;
}

// next update time
export function nextUpdateTime() {
  const now = new Date();
  const nextHour = new Date();
  nextHour.setHours(now.getHours() + 1, 0, 0, 0); // next hour start
  return nextHour.getMilliseconds() - now.getMilliseconds();
}
