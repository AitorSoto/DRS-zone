# F1 Web Application

This project is an interactive web application focused on Formula 1, allowing users to explore information about circuits, drivers, and other F1-related data.

## Features

- **Circuit Search and Pagination:** Users can search for specific circuits and navigate through pages of results.
- **Circuit Details:** By clicking on a circuit, users can access detailed information about it.
- **Interactive Chat with AI:** An integrated chat allows users to interact with a local AI to obtain additional information.
- **F1-Inspired Design:** The interface has a modern and stylized design, inspired by the colors and aesthetics of Formula 1.

## Dependencies

- React
- React Router
- useDebounce hook
- React Markdown

## Setup

1.  Clone the repository:

    ```bash
    git clone https://github.com/AitorSoto/DRS-zone
    cd DRS-zone
    ```

2.  Install dependencies:

    ```bash
    pnpm install
    ```

## Important Notes

- **Data Source:** This application relies on data fetched from the [F1API](https://github.com/AitorSoto/F1API) repository. Ensure that the API is running and accessible for the application to function correctly.
- **AI Chat Endpoint:** The chat functionality requires a local AI endpoint to be running at `http://localhost:3001/mcp`. Since this requires a locally hosted AI, this feature may not be functional out-of-the-box.

## Running the Application

1.  Start the application:

    ```bash
    pnpm run dev
    ```

2.  Open your browser and navigate to `http://localhost:5174` to view the application.

## Additional Information

Feel free to contribute to this project by submitting pull requests or opening issues for bug fixes and feature requests.
