## Getting Started

### First, get node modules

```bash
yarn
```

### To run the development server:

```bash
yarn dev
```

### To build for production:

```bash
yarn build
```

### To start:

```bash
yarn start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### To run codeceptJS tests

```bash
yarn codeceptjs:tests
```

.. to run in headless mode

```bash
yarn codeceptjs:headless
```

.. to run the UI app

```bash
yarn codeceptjs:ui
```

### To run Jest test

```bash
yarn jest
```

## Notes

The main idea was to match the main aspect of the default website, and add some to enhance UX.
<<<<<<< HEAD

1- Mobile design done. Test it with codeceptJS

2- Added some design components for Loading and NoResult

3- "Like" button has been set persistent using `localstorage` , if user has an account would communicate with backend it.

4- as said above, added loading and result not found

5- If the url contains an id not present in the fetch response , user redirected to 404 page

6- Default Nextjs 404 page used (not designed a custom one)

7- CSS used and also styled on React code

8- to indicate has been used sometimes the format "object.key" aothers "object["key"]" , the first one was when coding faster the second at begining

9- Preferred to code in JavaScript then TypeScript since was not complicated structure and not risk to mismatch types

10- Done Jest unit test on "LittleCard" component, preferred have more e2e codeceptsJS tests to help me in graphical design at higher and lower screen sizes.

# UPDATE

Going to review the application I found a skill required -> React-Redux, so I added it to keep track of the favourites value and use it when updating state.

## Question :

I added a "click outside results box" method that clears the results when user clicks outside the box with results.

This could be annoying depending on the UX that would be delivered to the user, is it?

Please let me know if it is desired or not, I can avoid it. Thx
