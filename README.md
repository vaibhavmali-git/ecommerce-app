# E-Commerce Storefront

A responsive e-commerce web application where one can browse products, filter by category, sort by price, view product details, and manage a shopping cart.

* **GitHub Repository:** https://github.com/vaibhavmali-git/ecommerce-app
* **Live Demo:** https://vaibhav-ecommerce.vercel.app

## How to Set Up and Run the Application

Make sure you have Node.js installed on your computer before starting.

1. Clone the repository to your local machine using git.
2. Open your terminal and navigate into the project folder.
3. Run `npm install` to download all the required project dependencies.
4. Run `npm run dev` to start the local development server.
5. Open your browser and go to `http://localhost:5173` to view the application.

## How to Run and Check Tests

This project uses Playwright for end-to-end testing to verify that the core flows work as expected.

1. Start the local development server by running `npm run dev` in one terminal window and keep it running.
2. Open a second terminal window in the same project folder.
3. If this is your first time using Playwright, run `npx playwright install` to download the required test browsers.
4. Run `npx playwright test` to run all tests in the background. The terminal will report which tests passed or failed.
5. Run `npx playwright test --ui` to open the visual dashboard and watch the tests step through the application.

## Assumptions

- The Platzi Fake Store API is available and reliably serving product and category data.
- The application is accessed on modern browsers that support React hooks and CSS modules.
- Local storage is enabled in the browser, which is needed to persist the shopping cart across page reloads.

## Limitations

- Sorting and pagination happen on the client side because the external API does not support complex server-side sorting. The app fetches all items and sorts them in the browser, which works fine for a few hundred products but would need a backend change if the catalogue grew significantly larger.
- The checkout flow is only a visual representation. Clicking the checkout button shows an alert since there is no real payment gateway or order processing backend connected.

### Known Asset Performance

Product images are served from shared third-party servers through the Platzi Fake Store API. You might notice a slight delay when images load for the first time or when switching between categories. This is a limitation of the external hosting and has nothing to do with the application itself.

## Additional Features

- **Custom User Interface:** The UI was built from scratch using CSS Modules, keeping the design lightweight and consistent without relying on heavy component libraries.
- **URL State Management:** Active filters and sort preferences are saved directly in the URL, so we can bookmark or share a specific view and it will load exactly as they left it.
- **Persistent Shopping Cart:** Cart state is managed through React Context and synced with local storage, so items are not lost on a page refresh or accidental tab close.
- **Micro-Interactions:** Framer Motion handles page transitions and cart interaction animations to keep the experience smooth and responsive.
- **URL Synced Pagination:** Navigation is handled through page numbers tied to the URL. This ensures we can share links to specific pages of the catalogue and maintains a clean interface by preventing infinite scroll fatigue.