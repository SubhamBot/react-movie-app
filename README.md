# React Movie App

This React application, developed with Vite, allows users to explore detailed information about movies.

## Getting Started

Follow these steps to set up and run the application on your local machine.

### Prerequisites

Ensure that Node.js and npm (or yarn/pnpm) are installed on your system. You can download Node.js from [nodejs.org](https://nodejs.org/).

### Installation

1. **Clone the repository:**

   ```bash
   git clone <repository_url>
   ```

2. **Navigate to the project directory:**

   ```bash
   cd <project_directory>
   ```

3. **Install dependencies:**

   ```bash
   npm install  # or yarn install or pnpm install
   ```

### Configuration

To use this application, you need an API key from The Movie Database (TMDB).

1. **Obtain a TMDB API key:**

   - Visit [https://www.themoviedb.org/](https://www.themoviedb.org/) and create an account if you don’t already have one.
   - Go to your account settings and navigate to the API section.
   - Request an API key (v3 auth). You will need a **Bearer Token (API Read Access Token)**.

2. **Create a .env file:**

   - Copy the contents of `.env.example` to a new file named `.env`:

     ```bash
     cp .env.example .env
     ```

3. **Set the API key:**

   - Open the `.env` file and replace the placeholder value with your actual TMDB Bearer Token:

     ```
     VITE_TMDB_BEARER_TOKEN=<your_tmdb_bearer_token>
     ```

### Running the App

After completing the installation and configuration steps, start the development server:

```bash
npm run dev # or yarn dev or pnpm dev
```

The development server will start, and you can open your browser to the address shown in the terminal (typically http://localhost:5173).

## Design Decisions

### Dynamic Data Fetching

The application leverages TMDB’s API to fetch movie data dynamically, ensuring access to a comprehensive and up-to-date dataset. Key decisions include:

- Fetching genres and movie details dynamically to avoid hardcoding and enhance scalability.
- Utilizing a query-based approach to manage search, filters, and pagination.
- **Debounced Search Queries**: Implemented debouncing to minimize the number of API calls.

### Responsive and User-Friendly Interface

- The app is designed to be responsive, providing an optimal experience on both mobile and desktop devices.
- A clean header layout with search, filters, and favorites functionality ensures intuitive navigation.
- Tailwind CSS is used for styling, ensuring a visually appealing and consistent design.

### Centralized State Management

Filters, search queries, and pagination states are centralized to:

- Simplify API integration.
- Ensure consistent behavior across components.
- Facilitate easier maintenance and future extensions.

### Favorites Feature

- A "Favorites" section allows users to save and quickly access their favorite movies.
- Local storage is used to persist favorite movie data.

## Features Implemented

### Search Functionality

- Users can search for movies by title using a debounced input field.
- Search results are fetched dynamically from the TMDB API.

### Filters

- Filters include:
  - **Year Range**: Specify start and end years for movies.
  - **Rating Range**: Filter movies by minimum and maximum ratings (0 to 10).
  - **Genres**: Dynamically fetched genres allow multiple selections.
- A "Clear Filters" button resets all selected options.

### Favorites Management

- The favorites functionality is accessible via the header.
- Users can quickly view and interact with their favorite movies.

### Infinite Scrolling

- Infinite scrolling of movies enhances performance and user experience.

### Error Handling

- Robust error handling is implemented for API requests.

## Possible Improvements

### UI/UX Enhancements

- **Tooltips**: Add tooltips for filter options and icons.
- **Filter Tags**: Display selected filter options as tags for better visibility.
- **Favorites Preview**: Show a dropdown preview of favorite movies in the header.

### Performance Optimization

- **Caching**: Cache frequently fetched data (e.g., genre list, popular movies) to reduce API requests.
- **Lazy Loading**: Optimize the loading of images and assets to improve performance.

### Error Feedback to Users

- Display user-friendly error messages for failed API requests (e.g., "Failed to load movies. Please try again.").

### Backend Integration

- Implement user authentication for personalized features like favorites and watchlists.
- Save user preferences (e.g., filters, favorites) to a backend for persistence across devices.

### Enhanced Features

- **Sorting Options**: Allow users to sort movies by popularity, rating, release date, etc.
- **Advanced Search**: Include options for searching by cast, crew, or keywords.
- **Watchlist**: Extend the favorites feature to include a separate watchlist.