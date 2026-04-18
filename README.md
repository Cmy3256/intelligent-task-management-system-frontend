# Intelligent Task Manager System

## Role Track
 [Frontend]

## Tech Stack
-Language: TypeScript, HTML5, CSS3
-Core Framework: Vue 3
-State Management: Pinia
-Other Tools: Vite, `vue-draggable-plus`, Native LocalStorage API
-AI Tool: Gemini

## Features Implemented
- [x] 1.**Core CRUD Operations**: Full support for creating, reading, updating, and deleting tasks.
- [x] 2.**Kanban Experience**: drag-and-drop functionality for reordering within columns and transitioning tasks across different states (Pending / In Progress / Completed).
- [x] 3.**Inline Editing & Quick Actions**: inline edit mode and a one-click completion checkbox right on the task card.
- [x] 4.**Search & Multi-Filter**: Real-time fuzzy search by keyword and conditional filtering by task priority.
- [x] 5.**UI (Glassmorphism)**: semi-transparent frosted glass theme for a unified premium look.
- [x] 6.**Seamless Dark Mode**: One-click ☀️/🌙 toggle for a dark theme, powered by global CSS variables with user preference memory.
- [x] 7.**Drag-and-Drop Lock**: Automatically disables drag-and-drop interactions during active search/filter states to ensure absolute data integrity.

## Setup Instructions

 1.**Live demo**
  Visit the live demo at [https://intelligent-task-management-system-tau.vercel.app/].

 2. **Prerequisites**
   - Ensure you have [Node.js] installed (v18+ recommended).
   - A package manager like `npm` or `pnpm`.

 3. **Installation steps**
   Clone the repository and install dependencies:
   ```bash
   npm install
   ```
 4. **Configuration**
  This is a pure frontend application with no backend dependencies. No .env configuration or database setup is required. All data is managed locally in the browser's LocalStorage.

 5. **Running the application**
  Start the local development server:
  ```bash
  npm run dev
  ```
  Open the provided local URL (usually http://localhost:5173) in your browser. To build for production, run ```bash
  npm run build.
  ```

## API Documentation
 *Note: This project utilizes a serverless architecture. All data flows are managed by Pinia and persisted on the client-side.*

## Design Decisions
 1. **State Management (Pinia):** Opted for Pinia due to its lightweight nature, intuitive Composition API support, and superior TypeScript inference. Actions and derived states (Getters) are centralized, achieving perfect decoupling of the view and data layers.

 2. **UI Architecture (CSS):** Utilizing native CSS features (backdrop-filter) and custom components ensures visual consistency and significantly reduces the bundle size.

 3. **Drag-and-Drop (vue-draggable-plus):** Chosen for its seamless Vue 3 integration and robust API, enabling complex interactions with minimal boilerplate.

## Challenges & Solutions
 1. **State Desync between 3rd-party DOM Manipulation and Vue's Virtual DOM**

 - **Issue:** Dragging cards across columns caused Sortable.js to mutate the DOM directly, conflicting with Pinia's reactive state, leading to cards snapping back to their original positions.

 - **Solution:** Replaced scattered @change event listeners with computed properties using get/set proxies. Upon a drag-and-drop event, the set trap triggers a Pinia action (updateTaskGroup) that performs a deep clone and full-column array overwrite. 
 2. **Data Loss During Filtered Drag-and-Drop**

 - **Issue:** Allowing drag-and-drop while the Kanban board is filtered (e.g., searching for a specific keyword) would cause the underlying array overwrite to permanently delete the temporarily hidden tasks.

 - **Solution:** Implemented a "Safety Lock" mechanism. A derived isFiltering state in the Store acts as a single source of truth. When active, it automatically passes :disabled="true" to the draggable components and displays a warning banner, eliminating any risk of data corruption.

## Future Improvements
 1. **Backend Database Integration**: Migrate from LocalStorage to a robust backend database via RESTful APIs or GraphQL for reliable data persistence and multi-device synchronization.
 2. **Unified Custom Select Components**: Standardize all dropdown menus across the application using the custom-built `CustomSelect` component to ensure absolute UI/UX consistency.
 3. **Advanced UI Micro-interactions**: Further polish the user interface by introducing refined hover effects, micro-animations for buttons, and elevated shadow transitions for task cards to enhance tactile feedback.
 4. **Analytics and Statistics Dashboard**: Implement a comprehensive calculation and statistics module to track task completion rates, productivity trends, and workload distribution using interactive charts.

## Time Spent
  **Approximately 3.5 hours.**