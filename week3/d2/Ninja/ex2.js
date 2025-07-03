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

function findAvg(gradesList) {
  const avg = calculateAverage(gradesList); 
  showResult(avg); 
}

const grades = [80, 75, 60];
findAvg(grades);