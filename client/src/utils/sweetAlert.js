import Swal from 'sweetalert2';

// Predefined SweetAlert configurations
const ALERT_MESSAGES = {
  confirmDeletion: {
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "Cancel",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
  },
  deletionSuccess: {
    title: "Deleted!",
    text: "Your item has been removed from the cart.",
    icon: "success",
    confirmButtonText: "OK",
  },
  deletionError: {
    title: "Error!",
    text: "An error occurred while removing the item.",
    icon: "error",
    confirmButtonText: "OK",
  },
};

// Utility function to display SweetAlert
export const showAlert = async (messageKey, customOptions = {}) => {
  const options = ALERT_MESSAGES[messageKey] || {};
  return await Swal.fire({
    ...options,
    ...customOptions, // Allow overriding default options
  });
};
