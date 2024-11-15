# Lab 3: React(Props) - Representation & Querying

This lab involves building upon previous React applications to implement props-based data handling and querying using components.

## Exercise 1: Setting up Git Repository

**Create a Git Repository:** First, create a folder for your React project and initialize it as a Git repository using `git init`. This will allow you to track changes to your project and collaborate effectively.

```bash
git init
```

Stage all files and create the first commit:

```bash
git add .
git commit -m "Initial commit"
```

After staging and committing, rename the default branch to `main` (since Git now uses `main` as the default branch name for new repositories):

```bash
git branch -M main
```

Finally, push the repository to GitHub by linking it to a remote GitHub repository:

```bash
git remote add origin <your-github-repo-url>
git push -u origin main
```

## Exercise 2: Creating New Components

In the last lab, we created a React application with client-side routing and a Bootstrap navigation bar. If you didn’t finish last week’s lab, you can clone the final solution from the following repository:  
[GitHub Repository - Lab Two](https://github.com/Data-Rep-MERN-Application/lab_two)

### Task 1:
Add two new function components named `Read` and `Create` to your application. Each component should have an `h3` tag with a message indicating the component (e.g., "Hello from the Read component"). Update the navigation bar to include links to these components.

### Task 2:
In the `Read` component, add a constant variable that holds the following JSON data for movies:

```json
[
  {
    "Title": "Avengers: Infinity War",
    "Year": "2018",
    "imdbID": "tt4154756",
    "Type": "movie",
    "Poster": "https://m.media-amazon.com/images/M/MV5BMjMxNjY2MDU1OV5BMl5BanBnXkFtZTgwNzY1MTUwNTM@._V1_SX300.jpg"
  },
  {
    "Title": "Captain America: Civil War",
    "Year": "2016",
    "imdbID": "tt3498820",
    "Type": "movie",
    "Poster": "https://m.media-amazon.com/images/M/MV5BMjQ0MTgyNjAxMV5BMl5BanBnXkFtZTgwNjUzMDkyODE@._V1_SX300.jpg"
  },
  {
    "Title": "World War Z",
    "Year": "2013",
    "imdbID": "tt0816711",
    "Type": "movie",
    "Poster": "https://m.media-amazon.com/images/M/MV5BNDQ4YzFmNzktMmM5ZC00MDZjLTk1OTktNDE2ODE4YjM2MjJjXkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_SX300.jpg"
  }
]
```

Pass this data to a new `Movies` component and display it.

### Task 3:
Add another functional component named `MovieItem`. This component will be responsible for rendering individual movie details. Use the `map()` function in the `Movies` component to iterate through the movie array and pass each movie as props to the `MovieItem` component.

---

### **Detailed Explanation: Props**

In React, **props** (short for properties) are a mechanism for passing data from a parent component to a child component. This allows components to be dynamic and reusable. The parent component passes values to the child component, which can then use that data to render dynamic content.

For example, in the `Read` component, the movie data is passed to the `Movies` component via props:

```javascript
<Movies myMovies={data} />
```

Here, `myMovies` is the prop name, and the `data` is the value being passed. Inside the `Movies` component, we access this data via `props.myMovies`:

```javascript
function Movies(props) {
  return props.myMovies.map((movie) => (
    <MovieItem mymovie={movie} key={movie.imdbID} />
  ));
}
```

The `Movies` component now passes the `movie` data down to the `MovieItem` component as another prop called `mymovie`:

```javascript
<MovieItem mymovie={movie} key={movie.imdbID} />
```

Props allow for clear communication between components, keeping components modular and reusable. The key thing to remember about props is that they are **read-only**. A component receiving props should not modify them but can use them for rendering.

---

### **Detailed Explanation: useEffect() Hook**

The `useEffect()` hook is one of React's most important hooks for handling side effects in functional components. A side effect is anything that affects something outside the scope of the function being executed, such as data fetching, subscriptions, or manually changing the DOM.

In this lab, `useEffect()` is used to log props to the console whenever the component mounts or updates:

```javascript
useEffect(() => {
  console.log("Movies:", props.myMovies);
}, []);
```

### Key points about `useEffect()`:

1. **Runs after render:**  
   By default, `useEffect()` runs after every render. If no dependency array is provided (like `[]`), it will execute after every render cycle of the component.

2. **Dependency array:**  
   If you provide a dependency array as the second argument to `useEffect()`, it will only run if the values in that array change. For example, to only run the effect when `props.myMovies` changes, we could write:

   ```javascript
   useEffect(() => {
     console.log("Movies:", props.myMovies);
   }, [props.myMovies]);
   ```

3. **Cleanup:**  
   `useEffect()` can return a cleanup function, which is run when the component unmounts or before the next effect is executed. This is useful for cleaning up subscriptions or resetting state:

   ```javascript
   useEffect(() => {
     const subscription = someAPICall();
     
     return () => {
       subscription.unsubscribe(); // Cleanup when component unmounts
     };
   }, []);
   ```

### Example with `useEffect` in the `MovieItem` Component:

```javascript
import { useEffect } from "react";
import Card from 'react-bootstrap/Card';

function MovieItem(props) {
  useEffect(() => {
    console.log("Movie Item:", props.mymovie);
  }, [props.mymovie]); // Only run this effect when the mymovie prop changes

  return (
    <div>
      <Card>
        <Card.Header>{props.mymovie.Title}</Card.Header>
        <Card.Body>
          <blockquote className="blockquote mb-0">
            <img src={props.mymovie.Poster} alt={props.mymovie.Title} />
            <footer>{props.mymovie.Year}</footer>
          </blockquote>
        </Card.Body>
      </Card>
    </div>
  );
}

export default MovieItem;
```

In this example, every time the `mymovie` prop changes (which happens when new movie data is passed), the `useEffect()` hook logs the new movie details to the console.

---

## Exercise 3: Adding Bootstrap Cards

Enhance the `MovieItem` component by using [React Bootstrap Cards](https://react-bootstrap.github.io/docs/components/cards). You can follow the card structure from the official React Bootstrap documentation.

**Expected Output:**  
Each movie item should be displayed as a card with the movie title as the header, the poster image in the body, and the year at the footer.

---
### Summary of Learning

By completing these exercises, students should have gained the following knowledge and skills related to React:

1. **Understanding and Utilizing Props**: 
   - You have learned how to pass data between components using props, a core concept in React. This includes how to render data dynamically and handle child-to-parent communication.

2. **Component Creation and Modularity**: 
   - You have created reusable function components (`Read`, `Create`, and `MovieItem`), helping you understand the modular design principles of React.

3. **Rendering Data from JSON**:
   - You practiced rendering data dynamically from a JSON object within your `Read` component, gaining insight into handling and displaying API responses or local data.

4. **State Management and Side Effects**:
   - You were introduced to the `useEffect` hook, learning how to manage side effects in function components, such as fetching or updating data when certain props change.

By solving these problems, you’ve gained foundational knowledge in React that will help you build more complex and dynamic web applications in the future.
