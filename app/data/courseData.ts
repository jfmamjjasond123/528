import { Course } from '@/app/types/course';

// Mock course data
export const courses: Record<string, Course> = {
  '1': {
    id: 1,
    title: 'Algebra Basics',
    color: 'blue',
    modules: [
      {
        id: 1,
        title: 'Introduction to Algebra',
        description: 'Basic concepts and notation',
        progress: 100,
        lessons: [
          {
            id: 1,
            title: 'What is Algebra?',
            type: 'video',
            duration: '10 min',
            completed: true,
            videoUrl: 'https://www.youtube.com/embed/NybHckSEQBI',
            content: 'This introductory video explains what algebra is and why it\'s important.'
          },
          {
            id: 2,
            title: 'Algebraic Expressions',
            type: 'lesson',
            duration: '15 min',
            completed: true,
            content: `
              <h2>Algebraic Expressions</h2>
              <p>An algebraic expression is a mathematical phrase that can contain ordinary numbers, variables (like x or y), and operators (like add, subtract, multiply, and divide).</p>
              <p>Examples of algebraic expressions:</p>
              <ul>
                <li>2x + 3</li>
                <li>a² - b²</li>
                <li>7xyz</li>
                <li>(p + q) / r</li>
              </ul>
              <h3>Terms and Coefficients</h3>
              <p>A term is a single mathematical expression. It may be a single number, variable, or a product of numbers and variables.</p>
              <p>A coefficient is the number part of a term with a variable.</p>
              <p>For example, in the expression 3x² + 5x - 7:</p>
              <ul>
                <li>3x² is a term, and 3 is the coefficient</li>
                <li>5x is a term, and 5 is the coefficient</li>
                <li>-7 is a term (a constant term)</li>
              </ul>
              <h3>Combining Like Terms</h3>
              <p>Like terms are terms that have the same variables with the same exponents.</p>
              <p>For example: 3x and 5x are like terms, but 3x and 5y are not like terms.</p>
              <p>We can simplify expressions by combining like terms:</p>
              <p>3x + 5x = 8x</p>
              <p>2x² - x² = x²</p>
            `
          },
          {
            id: 3,
            title: 'Quiz: Basic Concepts',
            type: 'quiz',
            duration: '10 min',
            completed: true,
            questions: [
              {
                id: 1,
                question: 'Which of the following is an algebraic expression?',
                options: ['2 + 3 = 5', '2x + 3', 'x = 10', 'x² = 25'],
                correctAnswer: 1
              },
              {
                id: 2,
                question: 'What is the coefficient of x in the expression 5x - 7?',
                options: ['5', '7', '-7', 'x'],
                correctAnswer: 0
              },
              {
                id: 3,
                question: 'What is the result of combining like terms in 3x + 4y + 2x - y?',
                options: ['9xy', '5x + 3y', '3y', '5x - 3y'],
                correctAnswer: 1
              }
            ]
          }
        ],
      },
      {
        id: 2,
        title: 'Linear Equations',
        description: 'Solving equations with one variable',
        progress: 66,
        lessons: [
          {
            id: 4,
            title: 'One-Step Equations',
            type: 'video',
            duration: '12 min',
            completed: true,
            videoUrl: 'https://www.youtube.com/embed/Qyd_v3DGzTM',
            content: 'This video teaches you how to solve equations that require one operation to isolate the variable.'
          },
          {
            id: 5,
            title: 'Two-Step Equations',
            type: 'lesson',
            duration: '18 min',
            completed: true,
            content: `
              <h2>Two-Step Equations</h2>
              <p>A two-step equation is an algebraic equation that takes two steps to solve:</p>
              <ol>
                <li>Use addition or subtraction to isolate the variable term</li>
                <li>Use multiplication or division to isolate the variable</li>
              </ol>
              <h3>Example 1</h3>
              <p>Solve for x: 3x + 5 = 20</p>
              <ol>
                <li>Subtract 5 from both sides: 3x = 15</li>
                <li>Divide both sides by 3: x = 5</li>
              </ol>
              <h3>Example 2</h3>
              <p>Solve for y: 4y - 7 = 9</p>
              <ol>
                <li>Add 7 to both sides: 4y = 16</li>
                <li>Divide both sides by 4: y = 4</li>
              </ol>
              <p>Remember, whatever operation you perform on one side of the equation, you must perform on the other side as well to maintain equality.</p>
            `
          },
          {
            id: 6,
            title: 'Multi-Step Equations',
            type: 'video',
            duration: '15 min',
            completed: false,
            videoUrl: 'https://www.youtube.com/embed/9ITsXICV2u0',
            content: 'This video explains how to solve more complex equations that require multiple steps.'
          },
          {
            id: 7,
            title: 'Practice Problems',
            type: 'exercise',
            duration: '20 min',
            completed: false,
            content: `
              <h2>Practice Problems</h2>
              <p>Solve the following equations:</p>
              <ol>
                <li>2x + 3 = 7</li>
                <li>3y - 5 = 10</li>
                <li>4z + 2 = 10</li>
                <li>5a - 3 = 12</li>
                <li>2(b + 3) = 10</li>
                <li>3(c - 1) + 2 = 11</li>
                <li>7 - 2d = 3</li>
                <li>4(e + 2) - 3 = 13</li>
              </ol>
              <p>For each problem, show your work and check your answer by substituting back into the original equation.</p>
            `
          }
        ],
      }
    ]
  },
  // Add more courses with lessons as needed
}; 