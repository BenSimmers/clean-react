# Clean React

```mermaid
graph TD
    A[TodoPage Component] --> B[SmartTodos Component]
    B --> C[useTodos Hook]
    C --> D[Redux Store]
    D --> E[Reducers & Actions]
    E --> F[State Updates]
    D --> G[Async Thunks]
    G --> H[API Calls]
    B --> I[Todo Components]
    I --> J[UI Rendering]
```