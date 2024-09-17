# Inventory Management System

### Author: Fernando Ugarte

## Overview
This **Inventory Management System** is designed to streamline product and inventory management processes. It provides functionality to manage product data, including adding, editing, and deleting products (not implemented yet), as well as viewing detailed product information. The system is composed of a backend API and a frontend user interface, making it a full-stack solution for managing product-related data in an efficient and user-friendly manner.

## Design Justification

### Backend:
The backend was developed using **Node.js** and **Express** to create a flexible, lightweight, and efficient API. Express was chosen for its simplicity in handling HTTP requests, and its modularity fits well with the aim of building a scalable architecture. MSSQL was selected as the database for its robust support of relational data, providing a reliable way to manage structured product information.

By keeping the backend focused on clear, RESTful principles, it allows for easier future integrations with other systems or additional services. The API handles CRUD operations for product management, with unit tests added to ensure the stability of core features.

### Frontend:
The frontend was built using **Angular**, a widely-used framework that promotes a clean separation of concerns through components and services. Angular’s built-in form handling and routing features were essential in building a modular and maintainable user interface. The frontend connects to the backend API, offering a seamless experience for the user to interact with the system.

Angular Material was used for UI components to ensure a consistent and accessible design across the platform. This decision was based on the need for a responsive and user-friendly interface that could adapt to different screen sizes and devices.

## Good Practices Implemented
1. **Separation of Concerns**: The backend and frontend are separated, ensuring each has a clear responsibility. The API is dedicated to data handling, while the frontend is focused on the user interface and experience.
   
2. **Modularity**: The codebase is structured into modules and services, making it easy to maintain and expand. This modular approach supports scalability and encourages code reusability.
   
3. **Environment Configuration**: Environment-specific variables (like API URLs, database credentials) are handled through environment files to make the system adaptable to different setups, whether for development or production.

4. **Error Handling**: Consistent error handling was implemented across the API to manage and log any issues effectively, ensuring the system can gracefully handle unexpected errors.

5. **Unit Testing**: Unit tests were added to the backend using testing frameworks. These tests cover core functionalities of the API to ensure that code changes do not break existing features. This provides a level of confidence when introducing new updates.

6. **Security**: User authentication and session management are handled securely, ensuring that only authorized users can access sensitive parts of the application.

## Conclusion
This Inventory Management System was built with careful consideration of both frontend and backend architecture. It follows good development practices to ensure that it remains maintainable, scalable, and efficient over time.
