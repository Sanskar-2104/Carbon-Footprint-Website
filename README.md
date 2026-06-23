# 🌱 SustainaTrack - Carbon Emission Tracker and Calculator

**Course Assignment: Systems Development and Operations (DevOps Track)** An interactive, full-stack, eco-friendly web-based application designed to track and calculate personal carbon footprints using a quiz-based approach. Built natively on Google Cloud Platform (GCP) following **Green DevOps** infrastructure principles with an automated end-to-end Monorepo CI/CD pipeline.

---
## Project Overview

### Problem Statement
Despite growing awareness around climate change, most individuals lack simple and accessible tools to understand and manage their personal environmental impact. Existing carbon footprint calculators are often overly technical, lengthy, or unengaging, making them difficult for the average user to interact with regularly or meaningfully.

This complexity creates a gap between awareness and action, where users may know climate change is an issue but struggle to identify how their daily habits contribute to it or what steps they can take to improve. There is a clear need for a platform that simplifies carbon tracking, provides actionable insights, and motivates users to adopt sustainable practices through engaging features.

### Proposed Solution
This project offers an interactive, user-friendly platform that calculates an individual's carbon footprint using a simple quiz-based approach. By replacing complex forms with lifestyle-related questions, it delivers accurate emission estimates in an engaging format. The system provides personalized suggestions to help users reduce their environmental impact and includes a point-based reward mechanism to encourage consistent, sustainable behavior. Designed with scalability in mind, the platform is accessible across devices and aims to make carbon tracking practical, informative, and habit-forming.

### Objectives
* **Interactive & User-Friendly:** Replaces complex forms with a quiz-based approach for better user engagement.
* **Gamification for Motivation:** Encourages eco-friendly choices through a point-based reward system and progress tracking.
* **Scalability & Future Expansion:** Built with decoupled microservices capable of integrating advanced logic (e.g., System Dynamics, Fuzzy Logic) and expanding into mobile applications.
* **Encouraging Behavioural Change:** Provides personalized insights to help users adopt sustainable and responsible lifestyle choices.

---

## Technical Architecture & Tech Stack

### System Architecture
The application is structured as a decoupled Monorepo containing two distinct, isolated directory layers for the frontend and backend. They do not cross-contaminate at the repository layer; instead, they integrate exclusively at the runtime environment via secure HTTPS REST API communication.
```text
[ Frontend Browser UI ] ────( HTTPS REST API / CORS Secure )────► [ Express.js API Server ]
(Firebase Hosting Edge)                                            (GCP Cloud Run Container)
│
▼ (Mongoose Schema)
[ MongoDB NoSQL Database ]
```
### Tech Stack
* **Frontend:** React.js, HTML5, CSS3, JavaScript (ES6+)
* **Backend:** Node.js, Express.js
* **Database:** MongoDB
* **Testing:** Jest (Backend Context)
* **Code Quality:** ESLint, Prettier
* **Deployment:** Google Cloud Run (Frontend & Backend), Nginx (Frontend Web Server Container)
* **CI/CD:** GitHub Actions
* **Container Engine & Registry:** Docker, GCP Artifact Registry

### Technology Stack Components
| Component | Technology | Version | Purpose |
| :--- | :--- | :--- | :--- |
| **Runtime (Backend)** | Node.js | 20 LTS | High-performance JavaScript runtime environment for backend services |
| **Backend Framework** | Express.js | Latest | Minimalist web framework for building robust REST API endpoints |
| **Frontend Framework** | React.js | Latest | Component-based client UI framework for interactive quiz management |
| **Database** | MongoDB | Latest | Document-oriented NoSQL database for flexible data storage |
| **ORM / ODM** | Mongoose | Latest | Object Data Modeling library for asynchronous MongoDB environment validation |
| **Web Server (Frontend)** | Nginx | Latest | High-performance HTTP server utilized inside Docker to serve production static assets |
| **Code Linting** | ESLint | Latest | Static code analysis tool for code quality and style enforcement |
| **Code Formatting** | Prettier | Latest | Automated code formatting engine to maintain codebase consistency |
| **Testing Framework** | Jest | Latest | JavaScript automated testing framework used for server backend context |
| **Container Engine** | Docker | Latest | Packages application layers into lightweight, isolated OCI-compliant container images |
| **Container Registry** | GCP Artifact Registry | - | Secure, private build artifact storage platform hosted inside Google Cloud |
| **CI/CD Platform** | GitHub Actions | - | Automated pipeline orchestrator for code validation, building, and deploying |
| **Deployment Platform (FE)** | GCP Cloud Run | Serverless | Managed compute platform that scales frontend container pods automatically |
| **Deployment Platform (BE)** | GCP Cloud Run | Serverless | Fully managed serverless container environment for running backend APIs |
| **System Monitoring** | GCP Cloud Monitoring | Native | Real-time logging, resource utilization tracking, and system saturation diagnostics |

---
## Continuous Integration & Deployment (CI/CD)

The project utilizes an automated end-to-end pipeline managed by GitHub Actions (`.github/workflows/deploy-cloudrun.yml`). This configuration enforces strict code validation gates, multi-repo folder separation, and automated serverless container orchestration natively into GCP.

### Pipeline Workflow Design
The pipeline maps out 5 main stages that trigger automatically upon a `git push` event to the `main` branch, provided changes occur within the specified application folders (`frontend/**` or `backend/**`):
```text
[ Developer Local Git Commit ] ──► Stage 1: Local QA Gate (Husky Pre-Commit)
                                                  │ (If Lolos / Pass)
                                                  ▼
[ Remote Git Push to Main ]    ──► Stage 2: Push & Pipeline Trigger (Paths-Filter)
                                                  │
                ┌─────────────────────────────────┴─────────────────────────────────┐
                ▼ (if frontend changes)                                             ▼ (if backend changes)
   Stage 3: Lint & Format Frontend                                     Stage 3: Lint, Audit & Test Backend
                │                                                                   │
                ▼                                                                   ▼
   Stage 4: Build & Push Frontend Image                                Stage 4: Build & Push Backend Image
                │                                                                   │
                ▼                                                                   ▼
   Stage 5: Deploy Frontend to Cloud Run                               Stage 5: Deploy Backend to Cloud Run
                │                                                                   │
                └─────────────────────────────────┬─────────────────────────────────┘
                                                  ▼
                              [ Stage 6 : Live, Operate, and Monitoring ]
                                                  │
                                                  ▼
                                   [ SustainaTrack Live on GCP ]
```

### Project Directory Structure
The architecture is organized as a decoupled Monorepo, separating microservices into specialized core layers while managing global pipeline actions from the project root environment:

```text
sustainatrack-devops/
├── .github/
│   └── workflows/
│       ├── deploy-azure.yml    # Legacy Azure deployment workflow configuration
│       └── deploy-cloudrun.yml # Core GitHub Actions workflow engine for GCP Cloud Run
├── .husky/
│   └── pre-commit              # Git hook automation script to block faulty commits locally
├── backend/
│   ├── config/
│   │   ├── ConnectDB.js        # MongoDB Atlas database connection handler
│   │   └── nodemailer.js       # Email notification transport service configuration
│   ├── controllers/
│   │   ├── AuthController.js        # User authentication and session handling endpoints
│   │   ├── FootprintController.js   # Core logic for processing carbon emission calculations
│   │   ├── GameController.js        # Gamification features and point calculation handler
│   │   ├── LeaderboardController.js # Logic for aggregation and fetching top user scores
│   │   ├── ServiceController.js     # Standard helper endpoints and system route logic
│   │   └── UserController.js        # Profile management and user metadata operations
│   ├── middleware/
│   │   ├── authMiddleware.js      # Token protection and secure API gateway controller
│   │   ├── rateLimitMiddleware.js # Prevents brute-force API saturation and DDoS attempts
│   │   └── upload.js              # Media file stream processing engine
│   ├── models/
│   │   ├── Bill.js             # Data model schema for user energy/utility invoices
│   │   └── Footprint.js        # Mongoose schema mapping individual footprint records
│   ├── routes/
│   │   ├── authRoute.js         # API endpoints routing for registration and login
│   │   ├── bill.js              # Endpoints for tracking raw energy billing entries
│   │   ├── footprintRoute.js    # Core routes exposing calculator submission actions
│   │   ├── gamificationRoute.js # Endpoints handling dynamic user rewards data
│   │   ├── leaderboardRoutes.js # Fetches regional and global score arrays
│   │   └── userRoute.js         # Profile modification and data route endpoints
│   ├── services/
│   │   ├── CarbonCalculator.js # Standard formula engine for computation activities
│   │   ├── GuestCache.js       # Temporal caching layer for unauthenticated users
│   │   └── geminiService.js    # AI integration logic providing custom reduction recommendations
│   ├── tests/                  # Automated integration and unit testing modules
│   ├── .dockerignore           # Excludes local node_modules and logs from Docker context
│   ├── .env.example            # Distribution template for global environment constants
│   ├── .gitignore              # Files and build targets restricted from remote storage
│   ├── .prettierignore         # Skips designated modules from automatic alignment checks
│   ├── .prettierrc             # Stylistic standardization configuration parameters
│   ├── Dockerfile              # Instructions building the production API environment container
│   ├── Server.js               # Entry point spawning the Express server instance
│   ├── eslint.config.js        # Syntax standardization and programmatic lint gate rules
│   ├── package-lock.json       # Tree ledger tracking deterministic runtime module trees
│   └── package.json            # Deployment orchestration metadata and package scripts
├── frontend/
│   ├── public/
│   │   ├── assets/             # Bundled system styling fonts and external design materials
│   │   ├── favicon.ico         # App instance branding asset file
│   │   ├── index.html          # Core framework execution node injection template
│   │   ├── logo192.png         # Legacy device layout identity icon
│   │   ├── logo512.png         # Target screen identity resource file
│   │   ├── manifest.json       # PWA device interaction and visual specification configuration
│   │   └── robots.txt          # Standard indexing control rules for public search engines
│   ├── src/
│   │   ├── components/
│   │   │   ├── ContentBox/
│   │   │   │   ├── ContentBox.css  # Viewport compartmental styling properties
│   │   │   │   ├── ContentBox.jsx  # Wrapper presentation container element
│   │   │   │   └── ContentBox.test.jsx # Verification test asserting container visibility
│   │   │   ├── Footer/
│   │   │   │   ├── Footer.css      # Bottom bar style layout attributes
│   │   │   │   └── Footer.jsx      # Bottom site informational container component
│   │   │   ├── Navbar/
│   │   │   │   ├── Navbar.css      # Navigation header orientation specifications
│   │   │   │   └── Navbar.jsx      # Top menu navigational anchor framework element
│   │   │   └── Sidebar/
│   │   │       ├── Sidebar.css     # Navigation element spacing layout definitions
│   │   │       └── Sidebar.jsx     # Side contextual links viewport selector layout
│   │   ├── config/
│   │   │   └── api.js              # Environment settings pointing to remote backend addresses
│   │   ├── context/
│   │   │   ├── UserInputContext.jsx      # Cross-component global dynamic user query tracking state
│   │   │   └── UserInputContext.test.jsx # Evaluates input capture boundary correctness
│   │   ├── pages/
│   │   │   ├── About/
│   │   │   │   ├── About.css       # Project scope summary layout configurations
│   │   │   │   └── About.jsx       # Informational context introduction component view
│   │   │   ├── Auth/
│   │   │   │   ├── LoginSignup.css # Input field structure presentation definitions
│   │   │   │   └── LoginSignup.jsx # Combined sign-in and account registration wrapper page
│   │   │   ├── CarbonInfo/
│   │   │   │   ├── CarbonInfo.css  # Presentation alignment rule definitions for climate guides
│   │   │   │   └── CarbonInfo.jsx  # Informational knowledge-base content rendering terminal
│   │   │   ├── Home/
│   │   │   │   ├── Home.css        # Layout structure grid configuration parameters
│   │   │   │   └── Home.jsx        # Core main summary view interface
│   │   │   ├── Profile/
│   │   │   │   ├── Profile.css     # Personal scorecard styling definitions
│   │   │   │   └── Profile.jsx     # View displaying aggregated scores and credentials
│   │   │   └── Redeem/
│   │   │       ├── Redeem.css      # Store interface grid display settings
│   │   │       └── Redeem.jsx      # Points marketplace container view interface
│   │   ├── Electricity.jsx         # Section module calculating electrical footprint assets
│   │   ├── Food.jsx                # Survey section logging food consumption variables
│   │   ├── FootprintProgress.jsx   # Graphing module detailing history progression arrays
│   │   ├── Leaderboard.jsx         # Competitive ranks display board component page
│   │   ├── QuizSection.css         # Calculation steps wrapper styling alignment
│   │   ├── QuizSection.jsx         # Multistep quiz pipeline container coordinator
│   │   ├── Result.jsx              # Summary report screen detailing processed emission weights
│   │   ├── Shopping.jsx            # Dynamic category capturing commercial consumption choices
│   │   ├── Transport.jsx           # Calculation tier analyzing commute mechanics parameters
│   │   ├── App.css                 # Global base theme override declarations
│   │   ├── App.js                  # Operational initialization node managing root page routes
│   │   ├── App.test.js             # General regression shell script verifying screen loads
│   │   ├── index.css               # Framework default visual environment styling rules
│   │   ├── index.js                # Core compiler deployment entry orchestration node
│   │   ├── reportWebVitals.js      # Logs real-time speed scores back to server aggregations
│   │   └── setupTests.js           # Sets up active mocking instances for Jest execution
│   ├── .dockerignore           # Excludes local builds and configurations from frontend container
│   ├── .env.example            # Structural blueprint for frontend base configuration keys
│   ├── .eslintignore           # Excludes deployment artifacts from automated styling checks
│   ├── .eslintrc.json          # Standard linting and syntax parameters for React context
│   ├── .gitignore              # Restricts front modules from entry to version control history
│   ├── .prettierignore         # Directs layout formatting engine to ignore specified files
│   ├── .prettierrc             # Global layout coding formatting blueprint constraints
│   ├── Dockerfile              # Infrastructure configuration for deployment container image
│   ├── nginx.conf              # Nginx configuration delivering static site content
│   ├── package-lock.json       # Tree configuration asset mapping client lock trees
│   ├── package.json            # Target framework specifications and compilation instructions
│   └── server.js               # Web server script routing deployment requests
├── .gitignore                  # Main system file blocking environment vars at root tier
├── README.md                   # System documentation
├── image-1.png                 # Technical system pipeline capture visual item 1
├── image-2.png                 # Technical system pipeline capture visual item 2
├── image-3.png                 # Technical system pipeline capture visual item 3
├── image-4.png                 # Technical system pipeline capture visual item 4
├── image-5.png                 # Technical system pipeline capture visual item 5
├── image-6.png                 # Technical system pipeline capture visual item 6
├── image-7.png                 # Technical system pipeline capture visual item 7
├── image-8.png                 # Technical system pipeline capture visual item 8
├── image-9.png                 # Technical system pipeline capture visual item 9
├── image.png                   # General architectural flow schematic visual item
├── package-lock.json           # Root scope dependency management mapping configuration
└── package.json                # Project workspace initialization configurations
```

### CI/CD Pipeline Overview

The automation framework coordinates individual environment setups into an integrated delivery pipe:
* **Isolation:** Frontend and backend builds execute in isolated runner sandboxes to prevent deployment cross-contamination.
* **Resource Efficiency (Green DevOps):** Utilizes paths-filtering rules to isolate processing limits. If a push only modifies the backend codebase, the entire frontend packaging job is completely skipped, saving significant remote computational processing hours and data center electricity.

### GitHub Actions Workflows

The operational runtime workflow is mapped across automated jobs driven by remote infrastructure automation logs:
* **`detect-changes`:** Triggered via `dorny/paths-filter@v3`. Analyzes the commit diff matrix. In live staging trials, it successfully outputted `Filter backend = true` and `Filter frontend = false` upon server changes, cleanly forcing a Succeeded block in 8 seconds.
* **`lint`:** A quality check job completing in 14 seconds. Automatically runs clean dependency chains (`npm ci`) and formats style scopes concurrently.
* **`test`:** Spawns isolated testing servers leveraging advanced module execution wrappers to ensure logic correctness.
* **`deploy-backend` / `deploy-frontend`:** Initiates isolated environment builders (`google-github-actions/setup-gcloud@v2`), logs into secure container nodes, and delivers the live code instance safely to the target cluster ecosystem.

### Code Quality Check 
#### ESLint Formatting
Enforces coding best practices, catches dead code parameters, and checks architectural integrity before code reaches cloud clusters:
* **Backend:** Regulated by `eslint.config.js` to assert safe handling of asynchronous API database request streams.
* **Frontend:** Evaluated via `.eslintrc.json` (integrated with `.eslintignore`) to catch broken component states, missing prop types, or unmapped React hooks.
#### Prettier Formatting
Codebase visual layout uniformity is checked automatically via Prettier configurations (`.prettierrc` and `.prettierignore`):
* Validates styling parameters including explicit trailing commas, strict single-quote rules, and standardized indentation properties.
* Remote runner testing pipelines invoke `prettier --check .` to systematically scan the repository, logging an explicit pass verification message: *"All matched files use Prettier code style!"*.
#### Pre-Commit Hooks (Husky) 
To block broken code at the earliest hulu of development, a local quality gate script is managed inside `.husky/pre-commit`:
* **Mechanics:** Intercepts the local `git commit` command flow directly on the developer's workstation before sending files to remote servers.
* **Action:** Triggers the local lint verification and formatting test commands. If syntax errors are caught, Husky marks a Gagal (Fail) condition, terminating the commit execution block locally until the developer resolves the errors.
  
### Cloud Deployment Environments
The production workspace securely coordinates separate application runtime container entities natively inside the Google Cloud Platform (GCP) architecture:
#### Container Security Strategy
All code layers are isolated within Docker engines. The frontend container utilizes a high-performance Nginx static layout asset platform (`nginx.conf`) to maximize delivery speeds while pruning away bloated development modules (`npm ci --omit=dev`) to compress production file sizes.
#### Fully Managed Cloud Run Infrastructure
* **`sustainatrack-backend`:** Hosts Node.js API container nodes inside the `asia-southeast1` (Jakarta) region. Configured with rigorous operational resource constraint boundaries (`--memory=512Mi`) to prevent computing over-provisioning.
* **`sustainatrack-frontend`:** Manages interactive client web layouts inside the same regional infrastructure, capped at strict boundaries (`--memory=256Mi`) to optimize active data center power limits.
#### Database Target Integration
The computational engine connects securely to a cloud-managed **MongoDB** cluster environment. Database authorization parameters, access tokens, and API secret environments are dynamically injected at runtime via encrypted environment keys (`MONGO_URI`, `GEMINI_API_KEY`) using automated GitHub Actions Secrets allocation keys.

---

## Operational Pipeline Execution Proof (Live Log Validation) 

During verification tests running on active GitHub runner nodes, the automated delivery pipe returned 100% successful regression outcomes:

* **Automated Unit Tests Success:** Spatially executed backend modules successfully completed 10 standalone regression test suites (`PASS tests/CarbonCalculator.test.js` and `PASS tests/authMiddleware.test.js`).
* **Test Statement Coverage:** The calculation engine achieved an absolute **100% Statements Coverage Index** across core business code assets (`middleware/authMiddleware.js` and `services/CarbonCalculator.js`).
* **Production Live Release:** Remote server deployment commands executed successfully, outputting live service verification receipts:
  > *Service [sustainatrack-backend] revision [sustainatrack-backend-00029-pcj] has been deployed and is serving 100 percent of traffic.*

## Implementation and Platform Design
### Information Delivery Methods
- **Data Input**: Users input data in categories such as Shopping, Transport, Electricity, and Food.
- **Backend Processing**: Node.js processes inputs, calculates emissions, and ensures seamless communication between the frontend and database.

### Carbon Emission Categories and Reduction Awareness
- **Categories**: Shopping, Transport, Electricity, and Food.
- **Emission Impact**: Each category educates users on the environmental impact and offers reduction strategies (e.g., sustainable transport options, energy-efficient practices).
- **User-Focused Content**: The platform tailors information based on user inputs, encouraging sustainable behavior and helping users make informed decisions.

### Interactive Calculations and Gamification
- **Real-Time Calculations**: Users receive real-time feedback on their carbon footprint.
- **Gamification**: Points are awarded for sustainable actions, motivating continued participation.
- **Result Breakdown**: Detailed insights into carbon emissions by category are displayed, allowing users to track progress and visualize their environmental impact.

### Verification
- **Data Accuracy**: The platform includes validation mechanisms to ensure the accuracy of user inputs and calculated carbon footprints. 
- **User Feedback**: The platform allows users to report discrepancies or errors in the data, ensuring continuous improvement of the system.
- **Testing**: Testing tools are used for API testing to verify smooth communication between the frontend and backend, ensuring data integrity and reliability.

---

## 🚀 How to Run This Project
1. Clone this Repository
2. Start the Frontend
```bash
cd frontend
npm install
npm start
```
3. Start the Backend
```bash
cd backend
npm install
npm run dev
```

⚠️ Make sure Node.js and npm are installed on your system.  
💡 Run frontend and backend files in two different terminals.

---

## 💻Platform Screenshots
![Home Page](image.png)

![Login Page](image-1.png)

![Shopping Section](image-2.png)

![Transport Section](image-3.png)

![Electricity Section](image-4.png)

![Food Section](image-5.png)

![Result Section](image-6.png)

![Congratulations Page](image-7.png)

![Redeem Page](image-8.png)

![Profile Page](image-9.png)

---

## 🤝 Conclusion
This project transforms climate awareness into actionable steps through an engaging, data-driven carbon tracking system. With gamification, personalized insights, and real-time feedback, it motivates users to adopt sustainable habits. Technically robust and scalable, the platform is well-suited for individuals, institutions, and large-scale sustainability initiatives.

## 📄 License
Course assignment - ES234632 Pengembangan Sistem dan Operasi
Last Updated: 31 May 2025
