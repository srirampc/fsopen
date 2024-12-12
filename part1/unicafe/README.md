# Full Stack Open Exercises 1.6 to 1.11 : cafe

[Problem Statement](https://fullstackopen.com/en/part1/a_more_complex_state_debugging_react_apps#exercises-1-6-1-14)

> 1.6: unicafe step 1
> Like most companies, the student restaurant of the University of Helsinki Unicafe collects feedback from its customers. Your task is to implement a web application for collecting customer feedback. There are only three options for feedback: good, neutral, and bad.

> The application must display the total number of collected feedback for each category. 

> Note that your application needs to work only during a single browser session. Once you refresh the page, the collected feedback is allowed to disappear.

> 1.7: unicafe step 2
Expand your application so that it shows more statistics about the gathered feedback: the total number of collected feedback, the average score (good: 1, neutral: 0, bad: -1) and the percentage of positive feedback.

> average and percentage positive screenshot feedback

> 1.8: unicafe step 3

> Refactor your application so that displaying the statistics is extracted into its own Statistics component. The state of the application should remain in the App root component.

> Remember that components should not be defined inside other components.

> 1.9: unicafe step 4
> Change your application to display statistics only once feedback has been gathered.

> 1.10: unicafe step 5
> Let's continue refactoring the application. Extract the following two components:

> Button handles the functionality of each feedback submission button.
> StatisticLine for displaying a single statistic, e.g. the average score.
> To be clear: the StatisticLine component always displays a single statistic, meaning that the application uses multiple components for rendering all of the statistics:


> The application's state should still be kept in the root App component.

> 1.11*: unicafe step 6
> Display the statistics in an HTML table, so that your application looks roughly like this:

> Remember to keep your console open at all times. If you see this warnings in your console, then perform the necessary actions to make the warning disappear. Try pasting the error message into a search engine if you get stuck.

> Make sure that from now on you don't see any warnings in your console!

