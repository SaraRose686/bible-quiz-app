# Bible Quiz Web App
How well do you know the Bible?  Test your Bible Trivia with this quiz web app.

---

Web app created as part of the Bloc Web Developer Track program.

## User experience requirements
* The starting screen should have a button that users can click to start the quiz.
* Users should be prompted through a series of at least 5 multiple choice questions that they can answer.
 * Users should be asked questions 1 after the other.
 * Users should only be prompted with 1 question at a time.
* Users should not be able to skip questions.
* Users should also be able to see which question they're on (for instance, "7 out of 10") and their current score ("5 correct, 2 incorrect").
* Upon submitting an answer, users should:
  * receive textual feedback about their answer. If they were incorrect, they should be told the correct answer.
  * be moved onto the next question (or interact with an element to move on).
* Users should be shown their overall score at the end of the quiz. In other words, how many questions they got right out of the total questions asked.
* Users should be able to start a new quiz.

## Technical requirements
* Render answer choices in a `<form>`.
* Use semantic HTML, along with CSS and jQuery.
* Follow a11y best practices.
* Use responsive design.
* Be fully usable by keyboard (which will be easy enough if you start with a form).

## Grading Rubric
|Objective| 1 | 3 | 5 |
|---|---|---|---|
|**User flow**|Some basic functionality of the app is broken, preventing users from navigating the quiz start to finish.|The flow of the app is clear to users, but allows for some undesirable behaviors like changing returning to previous questions or selecting multiple answers.|The app has a clear user flow from start to finish. Users can navigate from the landing page to the quiz, answering one question at a time, with the option to restart the quiz at the end.|
|**User feedback**|The user recieves inaccurate feedback, or no feedback on their answers. The score or question numbers are inaccurate or missing.|The user receives clear, consistent, accurate feedback on their answers for each question. The current score and question may not be displayed at all times.|The user recieves clear, consistent, and accurate feedback at each of stage of the quiz - their current and final score, which question they're on, whether or not their answer was correct, and what the correct answer was.|
|**Design**|The app loses some basic functionality in 320px viewports, or forces the user to scroll horizontally. The color or font choices make the text difficult to read. The overall appearance of the app seems unfinished.|The app maintains basic functionality across different viewport sizes, starting at a minimum of 320px. Horizontal scrolling does not occur but some elements may look squished or displaced. The student uses colors and font that are readable for most users, but may be difficult for visually impaired users. The overall appearance of the app could use some polish, but doesn't have any glaring issues.|The app displays correctly and maintains basic functionality across different viewport sizes starting at 320px. The student uses high-contrast colors and appropriate font to make the app readable for users (including users who may be visually impaired). The overall appearance of the app is polished and professional. |
|**Accessibility**|The student does not implement a11y best practices. Basic requirements (like setting the lang attribute) are missing or incorrect.|The student attempts to implement a11y best practices, but demonstrates some confusion. Elements and role attributes may be used inappropriately.|The student implements a11y best practices when structuring their HTML. The student set the lang attribute on the HTML element and set the role attribute for any HTML5 sectioning elements. Div elements are used minimally and appropriately. The student uses semantic HTML elements when possible/appropriate. The student set the alt attribute for any images.|
|**Rendering a form**|The student does not render the questions and answer choices in a form, or structures their form in a way that impedes the basic functionality of the app.|The student uses a form to render the questions and answer choices in their app. There may be small errors in the structure of their form, but they don't impede the basic functionality of the app.|The student uses a form to render the questions and answer choices in their app. They group and label inputs appropriately.|
|**JS architecture**|Most of the infrastructure of the app is hard-coded into the HTML. The student's JS code is messy and difficult to read. It may execute with unexpected side effects.|Much of the student's JS code is attached to a single $(document).ready() function, or is otherwise disorganized. The JS executes as expected.|The student's JS code is separated into single-purpose, reusable, clearly named functions.|
