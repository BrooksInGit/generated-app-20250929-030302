# ClarityGrid

An intelligent web application that transforms PDF spec sheets into an interactive, sortable comparison table using a simple drag-and-drop interface.

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/BrooksInGit/generated-app-20250929-030302)

## About The Project

ClarityGrid is a sophisticated B2B decision-making tool designed to eliminate the manual, error-prone process of comparing complex product specifications from PDF documents. The application provides a clean, minimalist, and intuitive single-page interface where users can drag and drop up to three competitor spec sheets.

On the backend, a Cloudflare Worker processes these PDFs, intelligently extracts tabular data, and normalizes disparate field names using a synonym map (e.g., mapping 'Throughput' and 'req/s' to a single, consistent metric). The result is a beautifully rendered, interactive, and sortable web table that presents a side-by-side comparison of the products, drastically reducing analysis time and accelerating purchasing decisions.

## Key Features

- **Simple Drag-and-Drop Interface:** Upload up to three PDF spec sheets with ease.
- **Intelligent Data Extraction:** Automatically parses and extracts tabular data from PDFs.
- **Feature Normalization:** Smartly groups similar features with different names (e.g., "Throughput" vs. "req/s").
- **Interactive Comparison Table:** View a clean, side-by-side comparison of all products.
- **Client-Side Sorting:** Instantly sort the data by any feature to find the best option.
- **Export to CSV:** Download the comparison data for offline analysis or reporting.
- **High-Performance Backend:** Built on Cloudflare Workers for fast and scalable processing.

## Technology Stack

- **Frontend:**
  - [React](https://reactjs.org/)
  - [Vite](https://vitejs.dev/)
  - [Tailwind CSS](https://tailwindcss.com/)
  - [shadcn/ui](https://ui.shadcn.com/)
  - [Framer Motion](https://www.framer.com/motion/)
  - [Zustand](https://zustand-demo.pmnd.rs/) for state management
  - [React Dropzone](https://react-dropzone.js.org/) for file uploads
- **Backend:**
  - [Cloudflare Workers](https://workers.cloudflare.com/)
  - [Hono](https://hono.dev/)
- **Data Parsing:**
  - [pdf-parse](https://www.npmjs.com/package/pdf-parse) (on the worker)
  - [Papaparse](https://www.papaparse.com/) (for CSV export)

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later)
- [Bun](https://bun.sh/) package manager

### Installation

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/your-username/clarity_grid.git
    cd clarity_grid
    ```

2.  **Install dependencies:**
    ```sh
    bun install
    ```

3.  **Configure Environment Variables:**
    Create a `.dev.vars` file in the root of the project for local development. Wrangler will automatically load this file.

    ```ini
    # .dev.vars
    # No specific variables are required for the base functionality in Phase 1
    # This file is ready for future secrets or configurations
    ```

## Development

To run the application locally, which starts both the Vite frontend and the Wrangler dev server for the worker, use the following command:

```sh
bun dev
```

This will open the application in your default browser, typically at `http://localhost:3000`. The frontend will hot-reload on changes, and the worker will restart automatically.

## Usage

1.  Navigate to the application homepage.
2.  Drag and drop 2 or 3 PDF specification sheets into the designated upload zones.
3.  Once at least two files are uploaded, the "Generate Comparison" button will become active.
4.  Click the button to start the analysis.
5.  View the results in the interactive table. Click on column headers to sort the data.
6.  Click "Export to CSV" to download the data.
7.  Click "Start New Comparison" to reset the application.

## Deployment

This project is designed for seamless deployment to Cloudflare.

1.  **Build the application:**
    The deployment script automatically handles the build process.

2.  **Deploy to Cloudflare:**
    Run the deploy command. This will build the frontend assets, bundle the worker, and deploy everything to your Cloudflare account.

    ```sh
    bun deploy
    ```

Alternatively, you can deploy directly from your GitHub repository with a single click.

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/BrooksInGit/generated-app-20250929-030302)

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.