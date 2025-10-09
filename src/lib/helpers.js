// Check if string is a valid number
export const isNumber = (string) => {
  // Check if input is string
  if (typeof string !== "string") return false;

  // Check if string is empty or only whitespace
  if (string.trim() === "") return false;

  // Use Number() and isNaN() to check validity
  return !isNaN(Number(string));
};

export const countSpecificCharacter = (text, char) => {
  return text.split(char).length - 1;
};

export const countExactMatches = (text, target) => {
  return (
    text?.match(
      new RegExp(target.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g")
    ) || []
  ).length;
};

export const extractNumbers = (text = "") => {
  return text?.replace(/\D/g, "");
};

export const formatUzPhone = (input) => {
  const d = String(input).replace(/\D/g, "");
  const m = d.match(/^998(\d{2})(\d{3})(\d{2})(\d{2})$/);
  return m ? `+998 (${m[1]}) ${m[2]}-${m[3]}-${m[4]}` : null;
};

export const formatMinutes = (mins = 0, math = "floor") => {
  if (!mins) return "0 minutes";

  const formattedMins = Math[math](mins.toFixed(1));
  const hours = Math.floor(formattedMins / 60);
  const minutes = formattedMins % 60;

  if (hours && minutes) return `${hours} hour ${minutes} minutes`;
  if (hours) return `${hours} hour`;
  return `${minutes} minutes`;
};

export const getLetterByIndex = (index) => String.fromCharCode(65 + index);
