# Event App

## Components:

* Header
* SearchInput
* CategoryList
* CategoryChip
* EventCard
* BottomNav
* DetailsScreen
* ProfileScreen

## Features:

* Navigation between screens
* Event list
* Event details screen
* Profile screen

## Screenshots

![Home](./screenshots/home.png)
![Details](./screenshots/details.png)
![Profile](./screenshots/profile.png)

# Cross Assignment 4 — Navigation

##  Опис

Мобільний застосунок на React Native з реалізованою навігацією.
Реалізовано Stack та Tab навігацію, додано переходи між екранами та передачу даних через navigation.navigate і route.params.
---

##  Навігація

- Stack Navigation:
  - Home → Details

- Tab Navigation:
  - Home
  - Profile

---

##  Передача даних

Перехід на екран деталей з передачею об'єкта:

```js
navigation.navigate('Details', { event });

Отримання даних:

const event = route.params?.event;

