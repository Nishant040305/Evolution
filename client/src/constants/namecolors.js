export const generateUserColor = (userId) => {
    const colors = [
      "rgb(255, 99, 132)",  // Red
      "rgb(54, 162, 235)",  // Blue
      "rgb(255, 159, 64)",  // Orange
      "rgb(75, 192, 192)",  // Turquoise
      "rgb(153, 102, 255)", // Purple
      "rgb(255, 159, 64)",  // Peach
      "rgb(255, 205, 86)",  // Yellow
      "rgb(54, 162, 235)",  // Sky Blue
      "rgb(255, 99, 132)",  // Hot Pink
      "rgb(75, 192, 192)",  // Soft Blue
      "rgb(255, 87, 34)",   // Deep Orange
      "rgb(233, 30, 99)",   // Pink
      "rgb(139, 195, 74)",  // Light Green
      "rgb(33, 150, 243)",  // Blue
      "rgb(156, 39, 176)",  // Purple
    ];
  
    // Improved Hash function using FNV-1a hash
    const fnv1aHash = (str) => {
      let hash = 2166136261; // FNV-1a offset basis
      for (let i = 0; i < str.length; i++) {
        hash ^= str.charCodeAt(i);
        hash += (hash << 1) + (hash << 4) + (hash << 7) + (hash << 8) + (hash << 24);
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
  
    console.log(userId, hash, colors[colorIndex]); // Debugging line
  
    return colors[colorIndex];
  };
  