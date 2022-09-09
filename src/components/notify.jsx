import toast from 'react-hot-toast';
/**
 * Notify() is a function that takes in a type and a message and displays a toast
 * notification based on the type and message passed in.
 */
const notify = (type, message) => {
  const options = {
    duration: 2500,
    position: 'top-center',
    // Change colors of success/error/loading icon
    iconTheme: {
      primary: '#6366f1',
      secondary: '#fff',
    },
    // Aria
    ariaProps: {
      role: 'status',
      'aria-live': 'polite',
    },
  };
  switch (type) {
    case 'success': {
      toast.success(message, options);
      break;
    }
    case 'loading': {
      toast.loading(message, options);
      break;
    }
    case 'error': {
      toast.error(message, options);
      break;
    }
    default: {
      toast(message, {
        ...options,
        icon: '😅',
      });
    }
  }
};

export default notify;
