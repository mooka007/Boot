function calculateAverage(grades) {
  let sum = 0;
  for (let i = 0; i < grades.length; i++) {
    sum += grades[i]; 
  }
  return sum / grades.length; 
}

function showResult(average) {
  console.log(`Average grade: ${average.toFixed(1)}`);
  if (average > 65) {
    console.log("You passed!");
  } else {
    console.log("You failed and must repeat the course.");
  }
}

// 3. Main function
function findAvg(gradesList) {
  const avg = calculateAverage(gradesList); // Step 1
  showResult(avg); // Step 2
}

// Example Usage
const grades = [80, 75, 60];
findAvg(grades);