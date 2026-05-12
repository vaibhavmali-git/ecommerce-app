# E-Commerce Storefront

This repository contains the frontend code for a responsive e-commerce web application. It allows users to browse products, filter by category, sort by price, view detailed product information, and manage a shopping cart. 

## How to Set Up and Run the Application

Make sure you have Node.js installed on your computer before starting.

1. Clone the repository to your local machine using git.
2. Open your terminal and navigate into the project folder.
3. Run `npm install` to download all the required project dependencies.
4. Run `npm run dev` to start the local development server.
5. Open your web browser and go to `http://localhost:5173` to view and interact with the application.

## How to Run and Check Tests

This project uses Playwright for end-to-end testing to ensure the core user flows work as expected.

1. Start your local development server by running `npm run dev` in one terminal window. Keep this running.
2. Open a second terminal window in the same project folder.
3. If this is your first time using Playwright on your machine, run `npx playwright install` to download the necessary test browsers.
4. To run the tests silently in the background, run the command `npx playwright test`. The terminal will tell you if the tests passed or failed.
5. For a better visual experience, run `npx playwright test --ui`. This command opens a developer dashboard where you can watch the tests click through the application step by step. 

## Assumptions

* The Platzi Fake Store API is reliably available for fetching the product and category data.
* The application will be accessed on modern web browsers that fully support React hooks and CSS modules.
* Local storage enabled in their web browsers. This is required to save the shopping cart state between page reloads.

## Limitations

* Due to the limitations of the external API regarding complex server-side sorting, the application handles sorting and pagination on the client side. The app fetches the items and sorts them in the browser memory. This works perfectly for catalogues with a few hundred items but would require a dedicated backend update if the store grew to thousands of items.
* The checkout process is only visually represented. Clicking the checkout button will trigger an alert message, as there is no real payment gateway or order processing backend attached to this project.

### Known Asset Performance
The application consumes the Platzi Fake Store API for product data. Please note that the image assets provided by this public API are hosted on shared third-party servers. 

As a result, you may notice a slight delay in image rendering during the initial load or when switching categories. This is a limitation of the external media hosting and not a reflection of the application's internal state management or routing logic.

## Additional Features Implemented

* **Custom User Interface:** The application interface was built from scratch using CSS Modules. It avoids heavy third-party component libraries to maintain a lightweight, clean, and customized design.
* **URL State Management:** Category filters and sorting preferences are automatically synced with the browser URL. This allows users to bookmark or share a specific filtered view, and the exact same layout will load when the link is opened.
* **Persistent Shopping Cart:** The shopping cart uses React Context paired with browser local storage. If a user accidentally refreshes the page or closes the tab, their selected items remain safely in the cart.
* **Micro-Interactions:** The application uses Framer Motion to provide fluid transitions when navigating between pages and smooth visual feedback when items are added to or removed from the cart.

