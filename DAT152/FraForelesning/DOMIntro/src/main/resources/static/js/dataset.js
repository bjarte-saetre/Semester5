const courselement = document.querySelector("p[data-course]");
console.log(courselement);

const course = courselement.dataset.course; // data-course

const topic = courselement.dataset.courseTopic;  // data-topic

courselement.textContent = `Welcome to the ${topic} part of ${course}`;
