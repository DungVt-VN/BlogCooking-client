export const formatDate = (isoString: string | number | Date) => {
  const date = new Date(isoString);
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

export const formatNumber = (num: number) => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M";
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + "k";
  } else {
    return num.toString();
  }
};

export const calculateTimeAgo = (postDate: string | Date) => {
  const currentDate = new Date();
  const datePosted = new Date(postDate);

  // Calculate difference in milliseconds
  const difference = currentDate.getTime() - datePosted.getTime();

  // Convert difference to seconds
  const seconds = Math.floor(difference / 1000);

  // Define thresholds for different time units
  const minute = 60;
  const hour = minute * 60;
  const day = hour * 24;
  const month = day * 30;

  if (seconds < minute) {
    // Less than a minute ago
    return `${seconds} giây trước`;
  } else if (seconds < hour) {
    // Less than an hour ago
    const minutes = Math.floor(seconds / minute);
    return `${minutes} phút trước`;
  } else if (seconds < day) {
    // Less than a day ago
    const hours = Math.floor(seconds / hour);
    return `${hours} giờ trước`;
  } else if (seconds < month) {
    // Less than a month ago
    const days = Math.floor(seconds / day);
    return `${days} ngày trước`;
  } else {
    // More than a month ago, return the full date
    return datePosted.toLocaleDateString();
  }
};

export function normalizeString(str: string | "") {
  // Chuyển chuỗi sang chữ thường
  let normalized = str.toLowerCase();

  // Bỏ dấu
  normalized = normalized.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  // Bỏ các khoảng trắng thừa
  normalized = normalized.replace(/\s+/g, " ").trim();

  // Nối các từ bằng dấu gạch ngang
  normalized = normalized.replace(/\s/g, "-");

  return normalized;
}
