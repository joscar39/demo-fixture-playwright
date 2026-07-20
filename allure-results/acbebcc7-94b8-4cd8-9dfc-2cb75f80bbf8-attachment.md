# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: login.spec.ts >> FLujo de autenticacion >> Login éxitos con credenciales dadas @Smoke @auth
- Location: e2e\specs\login.spec.ts:14:9

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByRole('heading', { name: 'Account Details and Order History' })
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByRole('heading', { name: 'Account Details and Order History' })

```

```yaml
- banner:
  - search:
    - button "Submit"
    - textbox "Search"
  - navigation:
    - link "Search":
      - /url: /search
    - link "About Us":
      - /url: /pages/about-us
    - link "Log In":
      - /url: /account/login
    - link "Sign up":
      - /url: /account/register
  - link "My Cart (0)":
    - /url: "#"
  - link "Check Out":
    - /url: /cart
  - heading "Sauce Demo" [level=1]:
    - link "Sauce Demo":
      - /url: /
      - img "Sauce Demo"
  - heading "Just a demo site showing off what Sauce can do." [level=3]
- navigation:
  - list:
    - listitem:
      - link "Home":
        - /url: /
    - listitem:
      - link "Catalog":
        - /url: /collections/all
    - listitem:
      - link "Blog":
        - /url: /blogs/news
    - listitem:
      - link "About Us":
        - /url: /pages/about-us
    - listitem:
      - link "Wish list":
        - /url: "#sauce-show-wish-list"
    - listitem:
      - link "Refer a friend":
        - /url: "#sauce-show-refer-friend"
  - link:
    - /url: http://www.facebook.com/shopify
  - link:
    - /url: http://www.twitter.com/sauce_io
  - link:
    - /url: http://www.instagram.com/shopify
  - link:
    - /url: http://www.pinterest.com/chrisjhoughton/awesome-facebook-integration/
  - link:
    - /url: /blogs/news.atom
- link "Home":
  - /url: /
- text: —
- link "Login":
  - /url: /account/login
- heading "Customer Login" [level=1]
- text: Email Address
- textbox "Email Address": joscar@yopmail.com
- text: Password
- textbox "Password": Aa123456.
- paragraph:
  - link "Forgot your password?":
    - /url: "#"
- button "Sign In"
- contentinfo:
  - navigation:
    - heading "Footer" [level=2]
    - link "Search":
      - /url: /search
    - link "About Us":
      - /url: /pages/about-us
  - heading "About Us" [level=2]
  - paragraph:
    - strong:
      - text: This is a demo site created for
      - link "Sauce":
        - /url: http://sauceapp.io
    - text: ", an awesome new way to make your Shopify site social. Sauce allows you to let customers to share what they purchase to their friends, and see what their friends have purchased or \"wanted\" on your store."
  - img "We accept Amex"
  - img "We accept Visa"
  - img "We accept Mastercard"
  - text: Copyright © 2026 Sauce Demo.
  - link "Shopping Cart by Shopify":
    - /url: https://www.shopify.co.uk/tour/shopping-cart?utm_campaign=poweredby&utm_medium=shopify&utm_source=onlinestore
  - text: .
  - navigation:
    - link "Search":
      - /url: /search
    - link "About Us":
      - /url: /pages/about-us
- img "Protected by hCaptcha"
- text: Protected by hCaptcha
- list:
  - listitem:
    - link "Privacy":
      - /url: https://hcaptcha.com/privacy
  - listitem:
    - text: ·
    - link "Terms":
      - /url: https://hcaptcha.com/terms
```

```
Tearing down "context" exceeded the test timeout of 30000ms.
```