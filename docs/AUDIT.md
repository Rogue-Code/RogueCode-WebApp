# roguecode.in — audit & rebuild plan

Audited on 16 Oct 2026 from the live site (roguecode.in) and its source (`quizapp-main/`).

## 1. What the current site is

- Create React App (React 18) single-page app hosted on Netlify. Every page renders in the browser, so search engines and link previews only see the title "Rogue Code".
- UI built with three overlapping styling systems: Material UI v4 (deprecated), styled-components and Tailwind 3. Redux is installed but only holds one unused flag.
- Backend is Firebase project `rogue-code-portal`: Firebase Auth (email + password), Firestore and Storage. A separate admin app (`roguecode-admin.netlify.app`) writes the data.
- Online compiler is a separate app: `rc-js-compiler.netlify.app`.

## 2. Pages (22 routes)

| Route | Access | What it does |
|---|---|---|
| `/` | public | Landing page + "book a class" form (→ `ClassBooking`) |
| `/login` | public | Email/password login, reset password |
| `/training` | public | Academy marketing page (Python, Java, C …) |
| `/web-dev` | public | Website pricing (Static / Dynamic / E-commerce) + skills |
| `/blogs`, `/blogs/:id` | public | Blog list + post (`Blogs`) |
| `/events`, `/events/:id` | public | Events with categories; "Register" opens an external form link (`Events.formLink`) |
| `/shop`, `/shop/product/:id` | public | Merch (`Products`) — **product page is broken on live** (all fields empty) |
| `/shopping-cart` | public | Cart in localStorage + checkout modal (→ `Orders` + `getOrderMail` cloud function) |
| `/jamboard` | public | tldraw whiteboard, saved in the browser |
| `/home`, `/course` | student | Courses from the student's batches |
| `/course-details/:id` | public (!) | Course tabs: Syllabus, Quizzes, Assignments, PPT, Videos |
| `/course/:id` | student | Same course content (older version of the page) |
| `/course/:id/quiz/:quizId/:quizDocId` | student | Timed quiz |
| `/attempts` | student | Quiz attempt history, pass/fail at 40% |
| `/edit-bio` | student | Student profile (fields lock once filled) |
| `/refer` | student | Refer & earn — one hard-coded link for everyone |
| `/ask`, `/questions/:id` | student | Ask page is an empty header; `/questions/:id` is an old static quiz |

## 3. Firestore data model

- **Students** `{docId, studentName, email, contactNumber, parentsContactNumber, address, collegeName, boardName, bloodGroup, reference, emergencyContactName, emergencyContactNumber, batchIds[]}`
- **Batch** `{docId, batchStudents[], batchCourses[]}` — links students to courses
- **Course** `{courseId, courseTitle, CourseLogo}` with sub-collections
  - `Syllabus {title, syllabus (HTML)}`
  - `Quiz {title, description, questions (count), duration (min), quizId → Quiz}`
  - `Assignment {title, description, marks, submissionDate, file}`
  - `PPT {title, description, link, updatedDate}`
  - `Video {title, link, updatedDate}`
- **Quiz** `{docId, title, duration (sec), questions: [{question, code?, options: {a,b,c,d}, answer}]}`
- **Attempts** `{quizId, quizName, userId, userName, score, quizLength, attempts, date, min, sec}`
- **Products** `{docId, productName, productCode, productCategory, productMRP, discountPrice, stock, productImage, description}`
- **Orders** `{name, email, contactNo, address, status, orderDate, orderId, products[]}`
- **Events** `{docId, eventName, eventDescription, eventCategory, eventDate, registrationDate, eventPoster, formLink}`
- **Blogs** `{blogTitle, blogKeywords, blogAuthor, blogImage, blogDescription (HTML)}`
- **ClassBooking** `{name, email, phone}`

## 4. Problems found

**Security**
1. Login state is just values in localStorage (`userUID`, `email`, `name`, `docId`). Anyone can set these in dev tools and open every "student" page.
2. Quiz answers are downloaded to the browser and scored there — students can read the answers or submit any score.
3. Syllabus and blog HTML is injected with `innerHTML` without sanitising (XSS risk if the admin app is ever compromised).
4. Order prices come from the browser cart, not the database.
5. `/course-details/:id` isn't protected at all.

**Bugs**
6. Product detail page renders empty on live ("Description undefined", empty price).
7. Quiz "time taken" maths is wrong (`quizTime/60 - (minutes+1)` …), and question code snippets never show (reads `quizData[i].code` instead of `questions[i].code`).
8. Attempt number counts *everyone's* attempts at that quiz, not the student's.
9. "Retake test" links to `/{quizName}`, which doesn't exist.
10. Errors surface as browser `alert()`s.

**Content / UX**
11. Events list is full of test entries ("test1", "fcxdbg" …) on the live site.
12. Refer page has lorem ipsum and one shared link.
13. Ask page has no functionality.
14. No mobile layout for the quiz (fixed 20% / 80% split, `100vh`).
15. No SEO: client-rendered, one title for every page, no per-page descriptions.

## 5. Rebuild plan

**Phase 1 — done** (static data, no backend yet)
- New design system, studio site + academy site, mobile menu
- Shop on both sites (`/shop`, `/academy/shop`) with shared cart, size picker, sort/filter, server-priced checkout
- Blog + events with filters, event registration form
- Jamboard (Excalidraw, MIT licence) with multiple named boards
- Login screen
- Every page is pre-rendered for SEO

**Phase 2 — connect Firebase** (needs a Firebase service-account key in `.env.local`)
- Keep the same Firebase project and collections so the admin app keeps working
- Real login: Firebase Auth → secure HTTP-only session cookie verified on the server
- Read products, events, blogs, courses from Firestore on the server
- Save orders, bookings, registrations, contact forms to Firestore

**Phase 3 — student portal, rebuilt**
- Dashboard: my courses, upcoming events, recent attempts
- Course page: syllabus (sanitised), quizzes, assignments, slides, videos
- Quiz engine: timer, question palette, mobile layout, **server-side scoring**, review answers after submitting
- Attempts history with correct per-student attempt counts, best score, retake
- Profile (edit bio) with validation
- Refer & earn with a personal referral code per student

**Phase 4 — new features**
- Ask / doubts forum (questions, answers, upvotes, trainer-verified answers)
- Online payment for shop and course fees (Razorpay)
- Jamboard boards saved to the student's account and shareable with a trainer
- Certificates on course completion
- Event registration stored in Firestore instead of external form links
