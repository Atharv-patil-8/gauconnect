# 🐄 GauConnect

A Progressive Web App (PWA) for Indian dairy farmers, milk collectors, and veterinary services — designed for rural use with offline-first architecture and mobile-first UI.

## Features

### Roles
- **Collector** — Milk collection at Dairy Cooperative Society (DCS) / BMC
- **Dairy Admin** — Rate configuration and permission management
- **Farmer** — Herd management, milk records, health tracking
- **Vet** — Patient records and visit management

### Collector Module (Complete)
- 📷 Scan or browse farmers
- 🐄 Select specific animal (Cow / Buffalo) by registration number
- ⚖️ Enter milk quantity, Fat %, SNF %
- 💰 **Live rate calculation** based on admin-configured rates
- ✅ Confirm and save transaction with receipt
- 🔄 Loop back to scan for next farmer
- 📱 Offline support — transactions queue and sync when online

### Admin Module
- 💹 Configure Cow and Buffalo Fat & SNF rates
- 🔑 Toggle collector permission to edit rates
- 📊 Rate change history

## Tech Stack

- **Angular 21** (zoneless, standalone components, signals)
- **TypeScript 5.9**
- **Vitest** for testing
- **PWA** with service worker for offline support
- **localStorage** for demo persistence

## Development

### Prerequisites
- Node.js 20.19+ or 22.12+ or 24+
- npm 10+

### Setup
```bash
npm install
ng serve
