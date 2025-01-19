export const getTimelineText = (timeStamp: number): string => {
  const now = Date.now();
  const diffInMs = now - timeStamp;
  const diffInMins = Math.floor(diffInMs / (1000 * 60));
  const diffInHours = Math.floor(diffInMins / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInMins < 1) {
    return 'Just now';
  } else if (diffInMins === 1) {
    return '1 minute ago';
  } else if (diffInMins < 60) {
    return `${diffInMins} minutes ago`;
  } else if (diffInHours === 1) {
    return '1 hour ago';
  } else if (diffInHours < 24) {
    return `${diffInHours} hours ago`;
  } else if (diffInDays === 1) {
    return 'Yesterday';
  } else {
    const date = new Date(timeStamp);
    const options: Intl.DateTimeFormatOptions = {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    };
    return date.toLocaleDateString('en-US', options);
  }
};
