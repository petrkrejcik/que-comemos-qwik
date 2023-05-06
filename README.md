# Que comemos

## TODO
- [x] Add Save button to meal selection page
- [ ] Implement `selectMeal` for saving a selected meal. It should save the meal when a user clicks on Save button
- [ ] Change layout so the meals list is over 100% height. Do not use `justify-between` because it wouldn't work when the list is long.

# Dev notes
- I tried to use `routeAction$` for selecting meal but it's tricky to get the types. The Props needed to accept:
```tsx
onSelect$: PropFunction<
  (values: { mealId: string }) => ReturnType<ActionStore<{success?: boolean | undefined}, null, true>['submit']>
>;
```
And it wasn't possible to get the types correct in the tests. In the end I've decided to use simple action because I don't want to
go through the backend to reach Firebase.

## Auth
- Login on the web via Firebase (Google provider)
- Call `/auth` EP with `idToken`
- Stores custom cookie with custom token

## Doubts
- How to fetch data from client directly from Firestore and not to go through the loader on the server?