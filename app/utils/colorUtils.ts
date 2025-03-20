// Get color class based on course color
export const getColorClass = (color: string): string => {
  switch (color) {
    case 'blue':
      return 'bg-khan-blue';
    case 'green':
      return 'bg-khan-green';
    case 'purple':
      return 'bg-khan-purple';
    case 'yellow':
      return 'bg-yellow-500';
    default:
      return 'bg-khan-blue';
  }
};

// Get text color class based on course color
export const getTextColorClass = (color: string): string => {
  switch (color) {
    case 'blue':
      return 'text-khan-blue';
    case 'green':
      return 'text-khan-green';
    case 'purple':
      return 'text-khan-purple';
    case 'yellow':
      return 'text-yellow-500';
    default:
      return 'text-khan-blue';
  }
}; 