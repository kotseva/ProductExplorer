📱 ✨ProductExplorer

A React Native mobile application for browsing, filtering, and favoriting products from the [DummyJSON](https://dummyjson.com) catalog. Built with a **Clean Architecture** approach that separates domain logic from framework concerns through repository interfaces, use cases, and a context-based presentation layer.

## ✨ Features

- **Product Catalog** — Browse products in a two-column grid with thumbnails, prices, brands, and discount badges.
- **Category Filtering** — Filter the catalog by product category using a horizontally scrollable chip bar.
- **Infinite Scroll** — Paginated loading that automatically fetches more products as the user scrolls.
- **Pull-to-Refresh** — Swipe down to reload the product list.
- **Product Details** — Tap a product to view a full-screen detail page with an image carousel, ratings, stock info, reviews, and description.
- **Favorites** — Toggle a heart icon on any product to save it as a favorite; favorites persist across app restarts via AsyncStorage.
- **Skeleton Loading** — Animated placeholder cards shown while data is being fetched.
- **Light & Dark Theme** — Automatic theme support based on device appearance settings.

## 🏗️ Architecture

The project follows **Clean Architecture** principles, organized into three layers:

```
┌─────────────────────────────────────────────────┐
│                  Presentation                   │
│   Screens · Components · Hooks · Context/Store  │
├─────────────────────────────────────────────────┤
│                    Domain                       │
│         Use Cases · Repository Interfaces       │
├─────────────────────────────────────────────────┤
│                     Data                        │
│   ApiProductRepository · AsyncStorageFavorites  │
│          productService · fetch client          │
└─────────────────────────────────────────────────┘
```

### 🎯 Key Design Decisions


| Decision                                      | Rationale                                                                                                                                             |
| --------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Context + `useReducer`** over Redux/Zustand | The app has two small, well-scoped state slices. A lightweight built-in solution avoids extra dependencies and is easier to reason about.             |
| **Native `fetch`** over Axios                 | DummyJSON needs only simple GET requests. A minimal `apiGet` wrapper keeps the bundle small and avoids third-party HTTP library overhead.             |
| **AsyncStorage for favorites**                | Favorites are a small list of integer IDs. AsyncStorage is sufficient and ships with a trivial API; a database would be over-engineering.             |
| **Use cases as classes**                      | Each use case has a single `execute()` method, making dependencies explicit via the constructor and keeping business logic isolated from React hooks. |
| **No Expo**                                   | The project uses the React Native CLI for full native module control and a leaner dependency tree.                                                    |


---

## 📂 Project Structure

```
src/
├── api/                   # HTTP client and API service functions
│   ├── client.ts
│   └── productService.ts
├── components/            # Reusable UI components
│   ├── CategoryChip.tsx
│   ├── CategoryFilter.tsx
│   ├── DetailRow.tsx
│   ├── FavoriteButton.tsx
│   ├── ImageCarousel.tsx
│   ├── ProductCard.tsx
│   ├── ProductCardSkeleton.tsx
│   └── ProductInfo.tsx
├── hooks/                 # Custom React hooks
│   ├── useFavorites.ts
│   ├── useProducts.ts
│   └── useThemeColors.ts
├── repositories/          # Interfaces + concrete implementations
│   ├── ProductRepository.ts
│   ├── FavoritesRepository.ts
│   ├── ApiProductRepository.ts
│   └── AsyncStorageFavoritesRepository.ts
├── screens/               # Full-page screen components
│   ├── MainScreen.tsx
│   └── ProductDetailsScreen.tsx
├── store/                 # Context providers and reducers
│   ├── ProductsContext.tsx
│   ├── FavoritesContext.tsx
│   ├── productsReducer.ts
│   └── favoritesReducer.ts
├── theme/                 # Colors, spacing, and typography tokens
│   ├── colors.ts
│   └── constants.ts
├── types/                 # TypeScript type definitions
│   ├── product.ts
│   └── navigation.ts
└── __tests__/             # Unit and integration tests
    ├── client.test.ts
    ├── productService.test.ts
    ├── productsReducer.test.ts
    ├── favoritesReducer.test.ts
    ├── useFavorites.test.tsx
    ├── MainScreen.test.tsx
    ├── ProductDetailsScreen.test.tsx
    └── fixtures.ts
```

## 🛠️ Tech Stack


| Concern          | Technology                                       |
| ---------------- | ------------------------------------------------ |
| Framework        | React Native 0.84                                |
| Language         | TypeScript                                       |
| Navigation       | React Navigation (native stack)                  |
| State Management | React Context + `useReducer`                     |
| HTTP             | Native `fetch`                                   |
| Local Storage    | `@react-native-async-storage/async-storage`      |
| API              | [DummyJSON](https://dummyjson.com/docs/products) |


## 🚀 Getting Started

> Make sure you have completed the [React Native environment setup](https://reactnative.dev/docs/set-up-your-environment) before proceeding.

### 📦 Install dependencies

```sh
npm install
```

For iOS, install CocoaPods:

```sh
bundle install
bundle exec pod install
```

### ▶️ Run the app

Start the Metro bundler:

```sh
npm start
```

Then, in a separate terminal:

```sh
# Android
npm run android

# iOS
npm run ios
```

## 🧪 Testing

### Unit Tests

Run the unit and integration tests with Jest:

```sh
npm test
```

### E2E Tests (Detox)

The project includes end-to-end tests powered by [Detox](https://wix.github.io/Detox/) that exercise real user flows against a running app on a simulator/emulator.

**Test suite:** `e2e/productFavorites.test.js`


| Test                          | What it verifies                                                                                                             |
| ----------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| Product catalog on launch     | App boots, product grid and header render                                                                                    |
| Add to favorites from details | Tap product → details screen opens → tap heart → state switches to favorited → navigate back → card reflects favorited state |
| Toggle favorite from card     | Favorite from card → open details → verify propagated → unfavorite from details → verify removed → navigate back             |


#### Prerequisites

1. Complete the [React Native environment setup](https://reactnative.dev/docs/set-up-your-environment).
2. For iOS, make sure you have an **iPhone 17 Pro** simulator available (configured in `.detoxrc.js`).
3. For Android, create a **Pixel_3a_API_30_x86** AVD (or update `.detoxrc.js` to match your emulator).
4. You can manually set other devices

#### Build the test app

```sh
# iOS
npx detox build --configuration ios.sim.debug

# Android
npx detox build --configuration android.emu.debug
```

#### Run the tests

Start Metro in a separate terminal first (`npm start`), then:

```sh
# iOS
npx detox test --configuration ios.sim.debug

# Android
npx detox test --configuration android.emu.debug
```

> Each test launches a fresh app instance with cleared data (`delete: true`) so that persisted favorites from previous tests never leak across runs.

