# OptimalBlue Bank App - Architecture Diagrams

## 1. System Architecture Overview

```mermaid
graph TB
    subgraph "Client Layer - Port 5173"
        A[React App]
        A1[Vite Dev Server]
        A --> A1
    end
    
    subgraph "Server Layer - Port 3001"
        B[Express API]
        B1[CORS Middleware]
        B2[Body Parser]
        B --> B1
        B --> B2
    end
    
    subgraph "Data Layer"
        C[(SQLite Database)]
        C1[mortgage.db]
        C --> C1
    end
    
    A1 -->|HTTP Requests| B
    B -->|SQL Queries| C
    
    style A fill:#61dafb
    style B fill:#68a063
    style C fill:#003b57
```

## 2. Client-Side Component Architecture

```mermaid
graph TB
    subgraph "React Application"
        Main[main.jsx]
        App[App.jsx]
        Router[React Router]
        
        subgraph "Components"
            Nav[Navbar.jsx]
            Calc[MortgageCalculator.jsx]
        end
        
        subgraph "Routing"
            R1[/ - Home]
            R2[/rates - Rates View]
            R3[/calculators - Calculator View]
        end
        
        subgraph "Assets & Styles"
            CSS[index.css]
            TW[Tailwind CSS]
            Assets[assets/]
        end
    end
    
    Main --> App
    App --> Router
    App --> Nav
    Router --> Calc
    
    R1 -.->|view='all'| Calc
    R2 -.->|view='rates'| Calc
    R3 -.->|view='calculator'| Calc
    
    App --> CSS
    App --> TW
    App --> Assets
    
    style Main fill:#61dafb
    style App fill:#61dafb
    style Nav fill:#4fc3f7
    style Calc fill:#4fc3f7
```

## 3. Server-Side API Architecture

```mermaid
graph TB
    subgraph "Express Server - index.js"
        Server[Express App]
        
        subgraph "Middleware"
            MW1[CORS]
            MW2[Body Parser JSON]
        end
        
        subgraph "API Endpoints"
            EP1[GET /api/rates]
            EP2[POST /api/calculate]
        end
        
        subgraph "Business Logic"
            Logic1[Fetch Rates]
            Logic2[Calculate Payment Formula]
        end
    end
    
    subgraph "Database Module - database.js"
        DB[SQLite3 Connection]
        
        subgraph "Database Operations"
            Init[Initialize DB]
            Create[Create Tables]
            Seed[Seed Data]
        end
        
        subgraph "Schema"
            Table[rates table]
            Fields["id, product_name,<br/>interest_rate, apr,<br/>term_years"]
        end
    end
    
    Server --> MW1
    Server --> MW2
    Server --> EP1
    Server --> EP2
    
    EP1 --> Logic1
    EP2 --> Logic2
    
    Logic1 --> DB
    Logic2 -.->|read-only reference| DB
    
    DB --> Init
    Init --> Create
    Create --> Seed
    Create --> Table
    Table --> Fields
    
    style Server fill:#68a063
    style DB fill:#003b57
    style EP1 fill:#ffa726
    style EP2 fill:#ffa726
```

## 4. Data Flow - Mortgage Rate Retrieval

```mermaid
sequenceDiagram
    participant User
    participant Browser
    participant React as React Component
    participant API as Express API
    participant DB as SQLite Database
    
    User->>Browser: Navigate to /rates
    Browser->>React: Load MortgageCalculator
    React->>React: useEffect() trigger
    React->>API: GET /api/rates
    API->>DB: SELECT * FROM rates
    DB-->>API: Return rows
    API-->>React: JSON response {data: [...]}
    React->>React: setRates(data)
    React-->>Browser: Render rates table
    Browser-->>User: Display mortgage rates
```

## 5. Data Flow - Mortgage Payment Calculation

```mermaid
sequenceDiagram
    participant User
    participant Form as Calculator Form
    participant Component as MortgageCalculator
    participant API as Express API
    participant Logic as Calculation Logic
    
    User->>Form: Enter loan details
    User->>Form: Click "Calculate Payment"
    Form->>Component: handleCalculate(event)
    Component->>Component: setLoading(true)
    Component->>API: POST /api/calculate<br/>{loanAmount, interestRate, loanTermYears}
    API->>Logic: Validate parameters
    alt Valid Input
        Logic->>Logic: Apply formula:<br/>M = P[i(1+i)^n]/[(1+i)^n-1]
        Logic-->>API: {monthlyPayment, totalPayment, totalInterest}
        API-->>Component: 200 OK + JSON
        Component->>Component: setResult(data)
        Component->>Component: setLoading(false)
        Component-->>User: Display results
    else Invalid Input
        Logic-->>API: 400 Error
        API-->>Component: Error response
        Component->>Component: alert(error)
        Component->>Component: setLoading(false)
    end
```

## 6. Component State Management

```mermaid
graph TB
    subgraph "MortgageCalculator Component State"
        S1[rates: Array]
        S2[formData: Object]
        S3[result: Object/null]
        S4[loading: Boolean]
        
        subgraph "formData Structure"
            F1[loanAmount: 300000]
            F2[interestRate: 6.5]
            F3[loanTermYears: 30]
        end
        
        subgraph "result Structure"
            R1[monthlyPayment]
            R2[totalPayment]
            R3[totalInterest]
        end
    end
    
    subgraph "State Updates"
        U1[useEffect - Fetch rates]
        U2[handleCalculate - Submit form]
        U3[onChange - Update form fields]
        U4[onClick - Select rate from table]
    end
    
    U1 -->|Sets| S1
    U2 -->|Sets| S3
    U2 -->|Toggles| S4
    U3 -->|Updates| S2
    U4 -->|Updates| S2
    
    S2 --> F1
    S2 --> F2
    S2 --> F3
    
    S3 --> R1
    S3 --> R2
    S3 --> R3
    
    style S1 fill:#90caf9
    style S2 fill:#90caf9
    style S3 fill:#90caf9
    style S4 fill:#90caf9
```

## 7. Database Schema & Initialization Flow

```mermaid
graph TB
    subgraph "Database Initialization"
        Start[database.js loaded]
        Connect[Create SQLite Connection]
        Serialize[db.serialize]
        
        subgraph "Table Creation"
            Create[CREATE TABLE IF NOT EXISTS rates]
            Schema["Schema:<br/>id INTEGER PRIMARY KEY<br/>product_name TEXT<br/>interest_rate REAL<br/>apr REAL<br/>term_years INTEGER"]
        end
        
        subgraph "Data Seeding"
            Check[Check if empty]
            Prepare[Prepare statement]
            Insert1[30-Year Fixed: 6.5%, 6.62%]
            Insert2[15-Year Fixed: 5.8%, 5.95%]
            Insert3[5/1 ARM: 6.1%, 6.8%]
            Insert4[FHA 30-Year: 6.0%, 6.9%]
            Finalize[Finalize statement]
        end
        
        Export[Export db module]
    end
    
    Start --> Connect
    Connect --> Serialize
    Serialize --> Create
    Create --> Schema
    Schema --> Check
    Check -->|Empty| Prepare
    Check -->|Has data| Export
    Prepare --> Insert1
    Insert1 --> Insert2
    Insert2 --> Insert3
    Insert3 --> Insert4
    Insert4 --> Finalize
    Finalize --> Export
    
    style Connect fill:#003b57
    style Schema fill:#80deea
    style Insert1 fill:#4db6ac
    style Insert2 fill:#4db6ac
    style Insert3 fill:#4db6ac
    style Insert4 fill:#4db6ac
```

## 8. Routing Architecture

```mermaid
graph LR
    subgraph "React Router Configuration"
        Router[BrowserRouter]
        Routes[Routes Component]
        
        subgraph "Route Definitions"
            R1["Route: /<br/>element: MortgageCalculator<br/>view='all'"]
            R2["Route: /rates<br/>element: MortgageCalculator<br/>view='rates'"]
            R3["Route: /calculators<br/>element: MortgageCalculator<br/>view='calculator'"]
        end
        
        subgraph "View Rendering Logic"
            V1[All View: Calculator + Rates]
            V2[Rates Only View]
            V3[Calculator Only View]
        end
    end
    
    subgraph "Navigation"
        Nav[Navbar Component]
        L1[Link to Home]
        L2[Link to Rates]
        L3[Link to Calculators]
    end
    
    Router --> Routes
    Routes --> R1
    Routes --> R2
    Routes --> R3
    
    R1 --> V1
    R2 --> V2
    R3 --> V3
    
    Nav --> L1
    Nav --> L2
    Nav --> L3
    
    L1 -.->|Navigate| R1
    L2 -.->|Navigate| R2
    L3 -.->|Navigate| R3
    
    style Router fill:#ff6f00
    style Nav fill:#7b1fa2
```

## 9. Build & Development Pipeline

```mermaid
graph TB
    subgraph "Development Environment"
        subgraph "Client Development"
            C1[npm run dev]
            C2[Vite Dev Server]
            C3[Hot Module Replacement]
            C4[Port 5173]
        end
        
        subgraph "Server Development"
            S1[npm run dev]
            S2[Nodemon]
            S3[Auto-restart on changes]
            S4[Port 3001]
        end
        
        subgraph "VS Code Tasks"
            T1[Task: Run Server]
            T2[Task: Run Client]
            T3[Task: Run App]
        end
    end
    
    subgraph "Production Build"
        B1[npm run build]
        B2[Vite Build Process]
        B3[Optimized Bundle]
        B4[Static Assets]
    end
    
    C1 --> C2
    C2 --> C3
    C3 --> C4
    
    S1 --> S2
    S2 --> S3
    S3 --> S4
    
    T1 --> S1
    T2 --> C1
    T3 --> T1
    T3 --> T2
    
    B1 --> B2
    B2 --> B3
    B3 --> B4
    
    style C2 fill:#646cff
    style S2 fill:#68a063
    style T3 fill:#007acc
```

## 10. Technology Stack Overview

```mermaid
graph TB
    subgraph "Frontend Stack"
        FE1[React 19.2.0]
        FE2[React Router DOM 7.9.6]
        FE3[Vite 7.2.2]
        FE4[Tailwind CSS 4.1.17]
        FE5[ESLint]
    end
    
    subgraph "Backend Stack"
        BE1[Node.js]
        BE2[Express 5.1.0]
        BE3[SQLite3 5.1.7]
        BE4[CORS 2.8.5]
        BE5[Body Parser 2.2.0]
        BE6[Nodemon 3.1.11]
    end
    
    subgraph "Development Tools"
        DEV1[VS Code]
        DEV2[Tasks Configuration]
        DEV3[Git]
    end
    
    subgraph "Architecture Pattern"
        ARCH[3-Tier Architecture]
        L1[Presentation Layer]
        L2[Application Layer]
        L3[Data Layer]
    end
    
    FE1 --> L1
    FE2 --> L1
    FE3 --> L1
    FE4 --> L1
    
    BE1 --> L2
    BE2 --> L2
    BE4 --> L2
    BE5 --> L2
    
    BE3 --> L3
    
    ARCH --> L1
    ARCH --> L2
    ARCH --> L3
    
    style FE1 fill:#61dafb
    style BE2 fill:#68a063
    style BE3 fill:#003b57
    style ARCH fill:#ff9800
```

## 11. API Contract Specification

```mermaid
graph TB
    subgraph "API Endpoints"
        subgraph "GET /api/rates"
            EP1_REQ[Request: None]
            EP1_RES["Response: 200 OK<br/>{<br/>  message: 'success',<br/>  data: [<br/>    {id, product_name,<br/>     interest_rate, apr,<br/>     term_years}<br/>  ]<br/>}"]
            EP1_ERR["Error: 400<br/>{error: message}"]
        end
        
        subgraph "POST /api/calculate"
            EP2_REQ["Request Body:<br/>{<br/>  loanAmount: number,<br/>  interestRate: number,<br/>  loanTermYears: number<br/>}"]
            EP2_RES["Response: 200 OK<br/>{<br/>  monthlyPayment: string,<br/>  totalPayment: string,<br/>  totalInterest: string<br/>}"]
            EP2_ERR["Error: 400<br/>{error: message}"]
        end
    end
    
    EP1_REQ --> EP1_RES
    EP1_REQ -.-> EP1_ERR
    EP2_REQ --> EP2_RES
    EP2_REQ -.-> EP2_ERR
    
    style EP1_RES fill:#66bb6a
    style EP2_RES fill:#66bb6a
    style EP1_ERR fill:#ef5350
    style EP2_ERR fill:#ef5350
```

## 12. Deployment & Execution Flow

```mermaid
graph TB
    subgraph "Application Startup"
        Start[Start Application]
        
        subgraph "Server Initialization"
            S1[Load database.js]
            S2[Initialize SQLite]
            S3[Create tables]
            S4[Seed data if needed]
            S5[Load Express app]
            S6[Apply middleware]
            S7[Register routes]
            S8[Start listening on port 3001]
        end
        
        subgraph "Client Initialization"
            C1[Start Vite dev server]
            C2[Load index.html]
            C3[Execute main.jsx]
            C4[Render App.jsx]
            C5[Initialize Router]
            C6[Mount components]
            C7[Serve on port 5173]
        end
        
        Ready[Application Ready]
    end
    
    Start --> S1
    S1 --> S2
    S2 --> S3
    S3 --> S4
    S4 --> S5
    S5 --> S6
    S6 --> S7
    S7 --> S8
    
    Start --> C1
    C1 --> C2
    C2 --> C3
    C3 --> C4
    C4 --> C5
    C5 --> C6
    C6 --> C7
    
    S8 --> Ready
    C7 --> Ready
    
    style Start fill:#4caf50
    style Ready fill:#4caf50
    style S8 fill:#68a063
    style C7 fill:#646cff
```
