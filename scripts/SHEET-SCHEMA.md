# Google Sheet Tab Schema — Trust Guard Adjusters

Create one Google Sheet. Set each tab name exactly as shown.
Publish the sheet: File > Share > Publish to web > Entire document > CSV.

---

## Tab: pages

Stores page-level hero and intro copy.

| Column       | Example value                                  | Notes                              |
|--------------|------------------------------------------------|------------------------------------|
| slug         | home                                           | matches route (home, about, etc.)  |
| hero_heading | Stop Letting Your Insurance Company Win        |                                    |
| hero_sub     | Trust Guard fights lowballed and denied claims |                                    |
| hero_cta     | Get a Free Claim Review                        |                                    |
| hero_image   | https://cdn.bunny.net/tga/hero-home.jpg        | Bunny.net CDN URL                  |
| meta_title   | Trust Guard Adjusters — Public Adjuster FL     |                                    |
| meta_desc    | We fight insurance companies on your behalf.   |                                    |

---

## Tab: services

Each row is one service/claim type card.

| Column      | Example value                                | Notes                        |
|-------------|----------------------------------------------|------------------------------|
| id          | wind-damage                                  | unique slug                  |
| title       | Wind & Hurricane Damage                      |                              |
| icon        | wind                                         | icon key (mapped in code)    |
| summary     | We document and fight underpaid wind claims  | ≤ 2 sentences                |
| body        | Full description shown on service detail     | can use \n for line breaks   |
| image       | https://cdn.bunny.net/tga/wind-damage.jpg    |                              |
| sort_order  | 1                                            | integer, lowest first        |

---

## Tab: faq

| Column   | Example value                                           |
|----------|---------------------------------------------------------|
| id       | what-is-public-adjuster                                 |
| question | What is a public adjuster?                              |
| answer   | A public adjuster represents YOU, not the insurer...    |
| category | general  (or: process, fees, claims)                   |
| sort_order | 1                                                     |

---

## Tab: blog_posts

| Column      | Example value                                    |
|-------------|--------------------------------------------------|
| slug        | hurricane-ian-claim-tips                         |
| title       | 5 Steps to File Your Hurricane Ian Claim         |
| excerpt     | If your home was damaged by Ian, here's what...  |
| body        | Full article body (markdown or plain text)       |
| author      | Ryan Donaldson                                   |
| date        | 2024-09-15   (ISO 8601)                          |
| image       | https://cdn.bunny.net/tga/blog/hurricane-ian.jpg |
| category    | Hurricane Claims                                 |
| published   | true                                             |

---

## Tab: testimonials

| Column     | Example value                                           |
|------------|---------------------------------------------------------|
| id         | testimonial-01                                          |
| name       | Maria T.                                                |
| location   | Orlando, FL                                             |
| claim_type | Water Damage                                            |
| quote      | Trust Guard got us $78k more than the initial offer.    |
| stars      | 5                                                       |
| image      | https://cdn.bunny.net/tga/testimonials/maria.jpg        |
| date       | 2024-03-10                                              |
| featured   | true                                                    |

---

## Tab: team

| Column     | Example value                                       |
|------------|-----------------------------------------------------|
| id         | team-01                                             |
| name       | John Smith                                          |
| title      | Licensed Public Adjuster                            |
| bio        | John has 15 years of experience...                  |
| image      | https://cdn.bunny.net/tga/team/john-smith.jpg       |
| license_no | PA123456                                            |
| sort_order | 1                                                   |

---

## Tab: meta

Global site-wide settings.

| Column | Example value                              |
|--------|--------------------------------------------|
| key    | phone                                      |
| value  | (407) 555-0192                             |

Suggested keys: phone, email, address, facebook_url, instagram_url,
                google_reviews_url, license_number, bbb_url
