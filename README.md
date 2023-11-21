# Que comemos

## TODO
- [x] Format week name
- [x] Week days
- [x] Add "Create new meal" in the meals list on the top
- [x] Add Save button to meal selection page
- [x] Implement `selectMeal` for saving a selected meal. It should save the meal when a user clicks on Save button
- [x] Change layout so the meals list is over 100% height. Do not use `justify-between` because it wouldn't work when the list is long.
- [x] Create new / edit meal form
- [x] Redirect if date is not Monday (how to do that without introducing `onRequest`?)
- [x] Redirect to '/' after login (now it stays on login page)
- [ ] Add menu to the header
  - [ ] Add "Create new meal" in the menu
- [ ] `eatFor` -> `daytime`
- [ ] Meal name stays in input after create
- [ ] JS exception during checking guarnicion
- [ ] Add side dish always
- [ ] When custom token is invalid and Firebase token is valid user sees a login button for a while
- [ ] Delete meal
  - Test started, not run yet. Missing adding Remove button in the component
- [ ] Notification about upcoming dinner
- [ ] PWA
- [ ] Installable app in Play Store
- [ ] Tanstack Query
- [ ] Preselect selected food
- [ ] Add a shortcut to add a side dish from the week menu
- [ ] When swapping meals the side-dish stays
- [ ] Add option to remove side-dish
- [x] Make `cy.login` part of `cy.visit`

# Testing on mobile device
- Need to replace every occurrence of 0.0.0.0 or 192.168.1.130 with 192.168.1.130

# Dev notes
- I tried to use `routeAction$` for selecting meal but it's tricky to get the types. The Props needed to accept:
```tsx
onSelect$: PropFunction<
  (values: { mealId: string }) => ReturnType<ActionStore<{success?: boolean | undefined}, null, true>['submit']>
>;
```
And it wasn't possible to get the types correct in the tests. In the end I've decided to use simple action because I don't want to go through the backend to reach Firebase.
- When using `routeLoader$` it fetches server on every page nav even on client navigation. I just want to to te executed for the first server-side fetch and then no.
- I would like to prefetch some Firestore calls but I don't know how to do that.
- I like to `<Slot />` API
- There is `useErrorBoundary()` but it's not documented so I don't know how error boundaries work
- Component tests are intercepting `/api/auth` because this route is used to refresh token. But as we have a fake token in tests we don't need that. Even the route is not accessible because when running component tests we don't have express server running for listening on that path.

## DB seeding
- It's difficult to write tests without knowing what's stored in the database. It would be better to seed the DB in each test separately.
  - When a test mutates the DB the change will stay there for subsequent test

## Initializing emulators
The `connectAuthEmulator` needs to be called directly after `getAuthFirebase`. There was an issue with Cypress that it cannot read ENV variables using `import.meta.env`. That's why I wanted to use a different entry point (`entry.ssr.emul.tsx`) when emulators should be enabled. That way I didn't need to use `import.meta.env` in the code but rather the specific entry point would initialize the emulators.
Cypress E2E tests cannot handle when a tests imports a file that contains reference to an ENV variable using `import.meta.env.`. I want to use rest functions to seed DB that's why I want to import them in the tests.

## Auth
- Login on the web via Firebase (Google provider)
- Call `/api/auth` EP with `idToken` from Firebase
- Stores custom cookie with custom token
- When opening a page the custom token is passed (via cookie) and validated. If it's valid then SSR will return page with user's content.

## Group flow
### Assign group ID to a new user
- [ ] User logs in
- [ ] Execute onCreate hook
  - [ ] Create new group
  - [ ] Assign group id to claims for newly created user
  - [ ] Add demo meals

### Existing user invites new user
- [ ] Menu -> Add group member
- [ ] Input email
  - [ ] Call EP function `/invite`
  - [ ] Search user by email
  - [ ] If exists get it's `groupId`
- [ ] Show pending invitations
---
- [ ] New member accepts the invitation
- [ ] New member can see meals from invited group

### Existing user invites existing user
- [ ] 

## Doubts
- How to fetch data from client directly from Firestore and not to go through the loader on the server?
- How to validate the token on the server and return `groupId`? Any subsequent navigation wouldn't go through the server. I basically want a hook which is executed only on the server when doing SSR.


## Firestore

```json
{
  "/groups": {
    "[groupId]": {
      "/meals": {
        "[id]": {
          "name": "string",
          "eatFor": "lunch"|"dinner"|"side-dish",
          "category": "fish"|"meat",
          "lastEaten": "datetime",
          "forChild": "boolean",
          "withSideDish": "boolean" // If side dish is allowed
        }
      },
      "/weekPlans": {
        "[startDate]": {
          "d0": {
            "lunch|dinner|lunch-side-dish": {
              "icon": ":emoji",
              "category": "string",
              "id": "abc123",
              "name": "duplicated name"
            }
          }
        }
      },
      "users": {
        "[userId]": {
          "name": "string",
          "isPending": "boolean",
        }
      }
    }
  }
}
```
