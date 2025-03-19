export const isNumeric = (value: string): boolean => {
    return /^\d+$/.test(value); // Checks if the string contains only numbers
  };
  
  export const validateMeetingData = (
    title: string,
    startDate: string,
    startTime: string,
    endDate: string,
    endTime: string
  ): string | null => {
    if (!title.trim()) return "Agenda Title is required.";
  
    const now = new Date();
    now.setSeconds(0, 0); // Remove seconds/milliseconds to match input values
  
    const selectedStartDateTime = new Date(`${startDate}T${startTime}`);
    const selectedEndDateTime = new Date(`${endDate}T${endTime}`);
  
    if (selectedStartDateTime.getTime() < now.getTime()) {
      return "Start date and time cannot be in the past.";
    }
  
    if (selectedEndDateTime.getTime() <= selectedStartDateTime.getTime()) {
      return "End time must be after the start time.";
    }
  
    return null; // No errors
  };
  
  
 // Function to calculate duration
export const calculateDuration = (startDate: string, startTime: string, endDate: string, endTime: string): string => {
  const start = new Date(`${startDate}T${startTime}`);
  const end = new Date(`${endDate}T${endTime}`);

  const diffMs = end.getTime() - start.getTime();
  const diffMinutes = Math.floor(diffMs / (1000 * 60));

  const days = Math.floor(diffMinutes / (60 * 24));
  const hours = Math.floor((diffMinutes % (60 * 24)) / 60);
  const minutes = diffMinutes % 60;

  let durationStr = "";
  if (days > 0) durationStr += `${days} day${days > 1 ? "s" : ""} `;
  if (hours > 0) durationStr += `${hours} hour${hours > 1 ? "s" : ""} `;
  if (minutes > 0) durationStr += `${minutes} min`;

  return durationStr.trim();
};

  
  export const formatDateTime = (date: string, time: string): string => {
    const dateObj = new Date(`${date}T${time}`);
    return dateObj.toLocaleString("en-GB", { 
      day: "2-digit", 
      month: "2-digit", 
      year: "2-digit", 
      hour: "2-digit", 
      minute: "2-digit",
      hour12: false 
    });
  };

// Function to auto-calculate end time
export const calculateEndTime = (startDate: string, startTime: string) => {
  const startDateTime = new Date(`${startDate}T${startTime}`);
  startDateTime.setMinutes(startDateTime.getMinutes() + 30); // Add 30 minutes

  const formattedEndDate = startDateTime.toISOString().split("T")[0];
  const formattedEndTime = startDateTime.toTimeString().split(" ")[0].slice(0, 5);

  return { endDate: formattedEndDate, endTime: formattedEndTime };
};
