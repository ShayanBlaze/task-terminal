# 📃 Task Terminal

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![dnd-kit](https://img.shields.io/badge/Drag%20&%20Drop-%40dnd--kit-764ABC?style=for-the-badge)
![Zod](https://img.shields.io/badge/Zod-3E67B1?style=for-the-badge&logo=zod&logoColor=white)

A modern, terminal-inspired task management application built with React and TypeScript. Task Terminal demonstrates a robust frontend architecture using functional components, hooks, and type-safe state management.

![Task Terminal Main Page](https://i.imgur.com/atmiEeZ.png)
_Your first encounter, a mysterious feeling._

## ✨ Features

- **Task Management:** Add, edit, delete, and organize tasks with full CRUD functionality.
- **Completion Tracking:** Toggle tasks between complete and incomplete states.
- **Drag & Drop:** Move tasks seamlessly between "Active" and "Completed" columns using [@dnd-kit](https://dndkit.com/).
- **Priority Levels:** Assign Low, Medium, or High priority to tasks.
- **Persistent Storage:** Tasks are automatically saved to localStorage and restored on reload.
- **Type Safety:** Built entirely with TypeScript for reliability and maintainability.
- **Data Validation:** Uses [Zod](https://zod.dev/) to validate localStorage data and prevent crashes from invalid state.
- **Responsive UI:** Clean, retro terminal-themed interface optimized for all screen sizes.

## 🛠️ Tech Stack

- **Framework:** [React](https://reactjs.org/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **State Management:** React Context API with `useReducer`
- **Drag & Drop:** [@dnd-kit](https://dndkit.com/)
- **Validation:** [Zod](https://zod.dev/)
- **Styling:** CSS (terminal theme)
- **Testing:** [React Testing Library](https://testing-library.com/) & [Jest](https://jestjs.io/)
- **Tooling:** [Create React App](https://create-react-app.dev/)

## 🚀 Getting Started

Follow these steps to set up and run Task Terminal locally.

### Prerequisites

- [Node.js](https://nodejs.org/) (v14.0.0 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. **Clone the repository:**

   ```sh
   git clone https://github.com/your-username/task-terminal.git
   cd task-terminal
   ```

2. **Install dependencies:**
   ```sh
   npm install
   # or
   yarn install
   ```

### 📜 Scripts

- `npm start` — Run the app in development mode ([http://localhost:3000](http://localhost:3000))
- `npm test` — Launch the test runner in watch mode
- `npm run build` — Build the app for production

## 📂 Project Structure

```
src/
├── components/        # Reusable React components
│   ├── ActiveDroppable.tsx
│   ├── CompleteDroppable.tsx
│   ├── GenericList.tsx
│   ├── InputField.tsx
│   ├── PriorityBubble.tsx
│   └── TodoItem.tsx
│
├── helpers/           # Utility functions
│
├── hooks/             # Custom React hooks
│
├── state/             # State management logic
│   ├── schemas.ts     # Zod schemas for validation
│   ├── reducer.ts     # Reducer function
│   ├── reducer.test.ts# Reducer unit tests
│   ├── TodoContext.tsx# React Context for state
│   └── types.ts       # TypeScript types and enums
│
├── App.tsx            # Main application component
├── App.css            # Main stylesheet
└── index.tsx          # Application entry point
```

## 📝 License

This project is licensed under the [MIT License](LICENSE).
