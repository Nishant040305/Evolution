/**
 * Groups views by a specified time scale (day, month, year, hour, or minute).
 *
 * @param {Array} views - An array of views with timestamps (ISO string or time strings like HH:mm).
 * @param {string} scale - The time scale to group by: "day", "month", "year", "hour", or "minute".
 * @returns {Object} An object containing `labels` (x-axis labels) and `data` (counts for each time group).
 */
export const groupViewsByTime = (views, scale) => {
  const groupedData = {};

  // Helper function to convert time string to a Date object
  const convertTimeToDate = (timeString) => {
    const [hours, minutes] = timeString.split(':').map(Number);
    const now = new Date(); // Get today's date
    now.setHours(hours, minutes, 0, 0); // Set the time to the given hours and minutes
    return now;
  };

  // Iterate over each view to group by time scale
  views.forEach((view) => {
    let timestamp;

    // Determine if the view is an ISO string or a time string
    if (typeof view === 'string' && view.includes('T')) {
      // ISO string (e.g., 2024-11-09T13:29:23.228Z)
      timestamp = new Date(view);
    } else {
      // Time string in HH:mm format
      timestamp = convertTimeToDate(view);
    }

    // Ensure the timestamp is valid
    if (isNaN(timestamp)) {
      console.error(`Invalid time value: ${view}`);
      return; // Skip invalid values
    }

    let key;

    // Generate grouping key based on the selected time scale
    switch (scale) {
      case 'day':
        key = timestamp.toISOString().split('T')[0]; // YYYY-MM-DD
        break;
      case 'month':
        key = `${timestamp.getFullYear()}-${String(
          timestamp.getMonth() + 1
        ).padStart(2, '0')}`; // YYYY-MM
        break;
      case 'year':
        key = `${timestamp.getFullYear()}`; // YYYY
        break;
      case 'hour':
        key = `${timestamp.toISOString().split('T')[0]} ${String(
          timestamp.getHours()
        ).padStart(2, '0')}`; // YYYY-MM-DD HH
        break;
      case 'minute':
        key = `${timestamp.toISOString().split('T')[0]} ${String(
          timestamp.getHours()
        ).padStart(2, '0')}:${String(timestamp.getMinutes()).padStart(2, '0')}`; // YYYY-MM-DD HH:mm
        break;
      default:
        key = timestamp.toISOString().split('T')[0]; // Default to day grouping
    }

    // Count the number of views for each key
    if (!groupedData[key]) {
      groupedData[key] = 0;
    }
    groupedData[key]++;
  });

  // Convert grouped data to arrays for chart rendering
  const labels = Object.keys(groupedData);
  const data = Object.values(groupedData);

  return { labels, data };
};
