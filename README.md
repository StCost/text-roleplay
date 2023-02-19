# text-roleplay

Tech Stack
---
- React
- TypeScript
- Redux
- Firebase
- Ant Design
- Moment

Main Goal
---
I wanted to create a handy tool for managing the tabletop/text role-playing game Fallout PnP (similar to Dungeons & Dragons). The goal was to keep every piece of information about our game in one place on a single website. [More information about the game can be found here](https://falloutpnp.fandom.com/wiki/Main_Page).

Basic Features
---
The app has some basic features to keep it working:
- Registration
- Login
- Password reset
- List of all users
  - User nickname
  - Avatar
  - Last activity
  - Online, AFK, Offline status
  - Changing UI size (for in-game tablets)
  - Push Notifications
  - Any input supports image uploading. Images will be uploaded and returned as a link
  - Build date in the top-left corner

Character Sheet Features
---
The app behaves like a character sheet, helping to keep information about players and their in-game characters:
- Character sheet
  - Special, Skills, Traits, Perks, Health and Armor points, experience, prize skills, and other stats. Everything for full tabletop gameplay
  - Character bio
  - List of perks

What About Other Features for Full Tabletop Game?
---
In the basic mode (Character sheet mode), this app only handles character information. However, things such as playing surfaces, tokens, dice throwing, cards, etc. were all handled by [Tabletop Simulator](https://store.steampowered.com/app/286160/Tabletop_Simulator/). I was the Dungeon Master and prepared a great table for us to play there. The point is, we had this app opened on phones or in browsers. It was useful to plan future in-game actions before we even started to play.

Full Text Mode
---
If your friends are too busy to schedule meetings to play together, you can play text games. As previously mentioned, the app supports a full text role-play experience without the need for other apps or websites (mostly).
- Chat
  - Writing, deleting messages
    - No editing on purpose. If an In-Character message was sent, the action was made. You can't edit it anymore.
  - History of messages (lazy loading)
  - Out-Of-Character (OOC) and In-Character (IC) messages
  - Rolling dice
  - Message date
  - Message attaching (admin)
- Inventory and Items
  - List of in-game items
  - Creating, editing, deleting, hiding, validating items
  - Inventory for storing items (including their quantity)
  - Items have info such as:
    - Name
    - Price
    - Weight
    - Description
    - Picture
    - Damage (effect)
    - Magazine capacity
  - Items pagination
  - Item dropping into chat
  - Picking up items from chat
  - Giving items to someone specific
  - Inactive item in chat is faded out
- Character
  - Status (limbs state, health, armor points, etc.)
  - Own Inventory
  - Notes
    - Can be shown or hidden to all users

Live demo
=
[(you can see our short play history (pure russian language, sorry)](https://stcost.github.io/text-roleplay)

Login and Password: `phktybmvrmgoswhcgz@tmmcv.net`

Or you can register new user. Anyway you need permissions to make any changes on website (you can ask me for access by my github email, if you really want to try it out)

Start the project
=
At this point I hope you already know how to use firebase database
1. Clone project
2. Create firebase config in `src/configs/firebase.json`
3. If needed, import database example `firebase_database_example.json`
4. `npm i && npm start`

Deploy to Github pages
-
You can deploy project to your GitHub Pages
1. Enable `GitHub Pages` for your project
2. In Branch select `master` and `/docs`
3. Run `npm run deploy`.  It will build project, move it to docs, and deploy to master
