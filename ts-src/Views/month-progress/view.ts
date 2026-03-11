import {DataViewFile} from '../../types/dataview';

/**
 * Calculates the percentage of the month remaining from a given date.
 */
function monthDaysRemaining(
  date: Date | string,
  includeWeekends: boolean = false,
  showAs: "number" | "percentage" = "number"
): string {
  // Normalize the input date to midnight
  const start = new Date(date);
  start.setHours(0, 0, 0, 0);

  // Find the last day of the month
  const year = start.getFullYear();
  const month = start.getMonth();
  const lastDay = new Date(year, month + 1, 0);
  lastDay.setHours(0, 0, 0, 0);

  // Count weekdays or all days between start and end of the month
  let remainingDays = 0;
  let currentDate = new Date(start);
  while (currentDate <= lastDay) {
    const dayOfWeek = currentDate.getDay();
    if (includeWeekends) {
      remainingDays++;
    } else {
      // Count only weekdays (Monday to Friday)
      if (dayOfWeek >= 1 && dayOfWeek <= 5) {
        remainingDays++;
      }
    }
    currentDate.setDate(currentDate.getDate() + 1);
  }

  // Get total days in the month
  const totalDaysInMonth = getDaysInMonth(year, month);

  // Calculate the percentage of the month remaining
  const percentage = (remainingDays / totalDaysInMonth) * 100;

  // Format the output based on the showAs parameter
  if (showAs === "number") {
    return remainingDays.toString();
  } else if (showAs === "percentage") {
    return `${percentage.toFixed(2)}%`;
  } else {
    throw new Error("Invalid showAs value. Use 'number' or 'percentage'.");
  }
}

/**
 * Helper function to get the number of days in a given month.
 */
function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

// Args passed in via the view function (@see: https://blacksmithgu.github.io/obsidian-dataview/api/code-reference/#dvviewpath-input)
const {
  includeWeekends = true
} = input;

const file: DataViewFile = dv.current().file;
const frontmatter: Record<string, any> = file.frontmatter;

// Validate that the necessary date information is present
if (!frontmatter?.year || !frontmatter?.month || !frontmatter?.date) {
  dv.paragraph("Error: Missing date information in frontmatter. Please ensure 'year', 'month', and 'date' are defined.");
  
} else {
  // Get current date
  const today = new Date(frontmatter.year, frontmatter.month - 1, frontmatter.date);
  
  // Calculate the percentage and number of days remaining
  const percentageRemaining: string = monthDaysRemaining(today, includeWeekends, "percentage");
  const daysRemaining: string = monthDaysRemaining(today, includeWeekends, "number");
  
  // Extract numeric percentage value and invert for progress (elapsed)
  const percentageRemainingValue: number = parseFloat(percentageRemaining);
  const percentageElapsed: number = 100 - percentageRemainingValue;
  const percentageElapsedFormatted: string = percentageElapsed.toFixed(2) + '%';
  
  // Get the month name
  const monthName: string = today.toLocaleString('default', { month: 'long' });
  const year: number = today.getFullYear();
  
  const result = `<div class="month-progress-container">
    <div class="progress-label">Month Progress: ${monthName} ${year}</div>
    <div class="progress-bar-wrapper">
      <div class="custom-progress-bar">
        <div class="progress-bar-fill" style="width: ${percentageElapsed}%">
          ${percentageElapsed >= 20 ? percentageElapsedFormatted : ''}
        </div>
      </div>
      <div class="progress-percentage">${daysRemaining} days</div>
    </div>
  </div>`;

  // @ts-ignore
  return result;
}
