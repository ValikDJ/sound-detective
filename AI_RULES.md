# AI Rules for "Sound Detective" Application

This document outlines the technical stack and guidelines for using libraries within this React application.

## Tech Stack

*   **React:** The core JavaScript library for building the user interface.
*   **TypeScript:** All code must be written in TypeScript for enhanced type safety, better maintainability, and improved developer experience.
*   **Tailwind CSS:** A utility-first CSS framework used for all styling. All visual aspects should be implemented using Tailwind classes.
*   **shadcn/ui:** A collection of pre-built, customizable UI components built with Radix UI and Tailwind CSS.
*   **Lucide React:** A library providing a set of beautiful, pixel-perfect icons.
*   **Vite:** The build tool used for development and production bundling.
*   **React Router:** (Currently not implemented, but available for future use) The standard library for client-side routing, should be used if multi-page navigation is introduced.
*   **Local Storage:** Used for persisting simple user preferences or application state across sessions.

## Library Usage Rules

*   **Styling:**
    *   **Always** use Tailwind CSS classes for all styling. Avoid writing custom CSS files or inline styles unless absolutely necessary for specific third-party component overrides.
*   **UI Components:**
    *   **Prioritize** using components from `shadcn/ui` for common UI elements (e.g., buttons, modals, inputs, cards).
    *   If a required component is not available in `shadcn/ui` or needs significant custom behavior, create a **new, dedicated component file** in `src/components/`. **Do not modify** the source files of `shadcn/ui` components directly.
*   **Icons:**
    *   **Always** use icons from the `lucide-react` library.
*   **Routing:**
    *   If the application evolves to require multiple distinct pages or views, `react-router-dom` should be implemented. All routes should be defined and managed within `src/App.tsx`.
*   **State Management:**
    *   For component-specific state, use React's built-in `useState` and `useReducer` hooks.
    *   For global application state, consider using React's Context API if a simple solution is sufficient. Avoid over-engineering with complex state management libraries unless explicitly required by new features.
*   **File Structure:**
    *   New React components must be created in `src/components/` in their own dedicated `.tsx` file.
    *   New application pages should reside in `src/pages/`.
    *   Utility functions should be placed in `src/utils/`.
    *   Type definitions should be in `src/types.ts` or a dedicated `src/types/` directory if they become extensive.
    *   Application constants should be defined in `src/constants.ts` or a `src/constants/` directory.