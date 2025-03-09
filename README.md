# Boundless Contribution Guide

## Introduction
Welcome to the **Boundless** project! Boundless is a crowdfunding platform built on the **Stellar blockchain**, using **Soroban smart contracts** to facilitate transparent and decentralized project funding. This document outlines how to contribute to the project, including setting up your development environment, best practices, and contribution guidelines.

## Table of Contents
1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [Getting Started](#getting-started)
4. [How to Contribute](#how-to-contribute)
5. [Code Standards & Best Practices](#code-standards--best-practices)
6. [Smart Contract Development](#smart-contract-development)
7. [Testing](#testing)
8. [Deployment & CI/CD](#deployment--cicd)
9. [Reporting Issues](#reporting-issues)
10. [Community & Support](#community--support)

---

## 1. Project Overview
Boundless enables users to create, support, and manage projects in a decentralized and trustless manner. **Key features include:**
- User Authentication (email & social login, KYC verification)
- Project Creation & Discovery
- Voting & Feedback Mechanism
- Crowdfunding via Stellar Wallets
- Milestone-Based Fund Releases

## 2. Technology Stack
### Backend:
- **Next.js API Routes** (for server-side logic)
- **Prisma ORM** (for database interactions)
- **PostgreSQL** (for storage)
- **Stellar SDK** (for blockchain interactions)

### Frontend:
- **Next.js (App Router)** (for the main web application)
- **Shadcn** (for UI development)
- **Tailwind CSS** (for styling)
- **Zustand** (for state management)

### Infrastructure:
- **Vercel** (for frontend hosting & deployment)
- **Docker** (for containerization)
- **GitHub Actions** (for CI/CD pipelines)

## 3. Getting Started
### Prerequisites
Before contributing, ensure you have the following installed:
- **Node.js** & **npm**
- **Docker** (for containerized development)
- **PostgreSQL** (for database setup)
- **Rust** & **Soroban CLI** (for smart contract development)
- **Git** (for version control)

### Setup
1. **Fork the repository https://github.com/0xdevcollins/boundless and clone your fork:**
   ```sh
   git clone https://github.com/YOUR_USERNAME/boundless.git
   cd boundless
   ```
2. **Install dependencies:**
   ```sh
   npm install
   ```
3. **Set up environment variables:**
   Create a `.env.local` file based on `.env.example` and configure database, Stellar, and authentication settings.
4. **Start development server:**
   ```sh
   npm run dev
   ```

---

## 4. How to Contribute
### 1. Fork & Clone the Repository
- Fork the repository to your GitHub account.
- Clone it locally using:
  ```sh
  git clone https://github.com/YOUR_USERNAME/boundless.git
  ```

### 2. Create a Feature Branch
- Use descriptive branch names:
  ```sh
  git checkout -b feature/add-user-profile
  ```

### 3. Make Changes & Commit
- Follow the coding standards (see next section).
- Commit with meaningful messages:
  ```sh
  git commit -m "feat: added user profile section"
  ```

### 4. Push Changes & Create a Pull Request (PR)
- Push your branch:
  ```sh
  git push origin feature/add-user-profile
  ```
- Create a pull request on GitHub and describe your changes.

### 5. Review & Merge
- Maintainers will review your PR and request changes if necessary.
- Once approved, it will be merged.

---

## 5. Code Standards & Best Practices
- Use **ESLint & Prettier** for formatting.
- Follow **Conventional Commits** (`feat:`, `fix:`, `chore:`, etc.).
- Use **TypeScript**.
- Keep functions modular and reusable.

---

## 6. Smart Contract Development
Boundless uses **Soroban smart contracts** for funding and milestone tracking.
### Key Contracts:
1. `create_project(project_id, creator_address, metadata_uri, funding_target, milestone_count)`
2. `vote_project(project_id, vote_value)`
3. `fund_project(project_id, amount)`
4. `release_milestone(project_id, milestone_number)`
5. `refund(project_id)`

### Developing Smart Contracts
1. **Install Soroban CLI:**
   https://developers.stellar.org/docs/build/smart-contracts/getting-started/setup
2. **Write a new contract in Rust:**
   - Place it under `contracts/` directory.
   - Example structure:
     ```rust
     #[soroban_sdk::contract]
     pub struct ProjectContract;
     ```
3. **test & Build:**
   ```sh
   cargo test
   cargo build
   ```

---

## 7. Testing
- **Test smart contracts:**
  ```sh
  cargo test
  ```

---

## 8. Deployment & CI/CD
Boundless uses **GitHub Actions** for deployment.
### Deployment Steps:
1. **Push to `main` branch**
2. **GitHub Actions** runs tests & builds the project
3. **Vercel** automatically deploys frontend
4. **Backend updates** are deployed manually

---

## 9. Reporting Issues
Found a bug? Have a feature request? Open an **issue** on GitHub:
- Go to [Issues](https://github.com/0xdevcollins/boundless/issues)
- Provide clear details & screenshots (if applicable).

---

## 10. Community & Support
### Join Our Channels:
- **Discord:** [Join Here](https://discord.gg/juUmBmwC3s)
- **GitHub Discussions:** [Boundless Discussions](https://github.com/0xdevcollins/boundless/discussions)
- **Twitter:** [Follow @boundless_fi](https://x.com/boundless_fi)

---

Thank you for contributing to Boundless! 🚀

