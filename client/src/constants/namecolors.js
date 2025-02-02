export const generateUserColor = (userId) => {
  const colors = [
    'rgb(255, 99, 132)', // Red (Good contrast)
    'rgb(54, 162, 235)', // Blue (Good contrast)
    'rgb(255, 159, 64)', // Orange (Good contrast)
    'rgb(0, 128, 128)', // Dark Turquoise (Better contrast)
    'rgb(255, 180, 0)', // Darker Yellow (Better contrast)
    'rgb(255, 87, 34)', // Deep Orange (Good contrast)
    'rgb(233, 30, 99)', // Pink (Good contrast)
    'rgb(139, 195, 74)', // Light Green (Good contrast)
    'rgb(33, 150, 243)', // Blue (Good contrast)
    'rgb(156, 39, 176)', // Purple (Good contrast)
    'rgb(200, 0, 0)', // Dark Red (High contrast)
    'rgb(0, 77, 64)', // Dark Teal (Replaces gray, high contrast)
    'rgb(153, 102, 255)', // Purple (Good contrast)
  ];
  // Improved Hash function using FNV-1a hash
  const fnv1aHash = (str) => {
    let hash = 2166136261; // FNV-1a offset basis
    for (let i = 0; i < str.length; i++) {
      hash ^= str.charCodeAt(i);
      hash +=
        (hash << 1) + (hash << 4) + (hash << 7) + (hash << 8) + (hash << 24);
      hash &= 0xffffffff; // Force it to be 32-bit
    }
    return hash >>> 0; // Ensure positive value
  };

  // Ensure userId is a string
  if (!userId || typeof userId !== 'string') {
    return colors[0]; // Fallback if userId is invalid
  }

  // Generate hash from userId
  const hash = fnv1aHash(userId);

  // Get a color index from the hash value
  const colorIndex = hash % colors.length;

  return colors[colorIndex];
};
