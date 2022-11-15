# text-roleplay

Tech stack
=
- React
- TypeScript
- Redux
- Firebase
- Ant Design
- moment

Main Goal
=
I wanted to create handy tool for managing tabletop/text role-playing game Fallout PnP (kinda like Dungeons & Dragons). For me and my friends to keep every piece of information about our game on one single website.
[More info about game](https://falloutpnp.fandom.com/wiki/Main_Page)

Basic Features
=
Basic stuff to keep app working
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
  - Any input supports image uploading. Image will be uploaded and returned as link

Character sheet features
=
App behaves like character sheet. To keep information mostly about players and their in-game characters
- Character sheet
  - Special, Skills, Traits, Perks, Health and Armor points, experience, prize skills, and other stats. Everything for full tabletop gameplay
  - Character bio
  - List of perks

What about other features for full tabletop game?
- In basic mode (Character sheet mode) this app only handles character info. But things such as playing surface, tokens, dices throwing, cards, etc. - all this was handled by [Tabletop Simulator](https://store.steampowered.com/app/286160/Tabletop_Simulator/). I was the Dungeon Master and prepared great table for us to play there. But point is, we had this app opened on phones or in browser. Were proved to be useful to plan future in-game actions before we even start to play

Full text mode
=
If your friends too busy to schedule meetings to play together - you can play text games. As was previously said, app supports full text role play experience without need for other apps or websites (mostly).
- Chat
  - Writing, deleting messages
    - no editing on purpose. if In-Character message were sent - action was made. You can't edit it anymore
  - History of messages (lazy loading)
  - Out-Of-Character (OOC) and In-Character (IC) messages
  - Rolling dice
  - Message date
  - Message attaching (admin)
- Inventory and items
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

[Live demo]
=
[(you can see our short play history (pure russian language, sorry)](stcost.github.io/text-roleplay)

Login and Password: `phktybmvrmgoswhcgz@tmmcv.net`

Or you can register new user. Anyway you need permissions to make any changes on website (you can ask me for access by my github email, if you really want to try it out)

Start the project
=
At this point I hope you already know how to use firebase database
1. Clone project
2. Create firebase config in `src/configs/firebase.json`
3 If needed, import database example `firebase_database_example.json`
3. npm i && npm start

Deploy to Github pages
-
You can deploy project to your GitHub Pages
1. Enable `GitHub Pages` for your project
2. In Branch select `master` and `/docs`
3. Run `npm run deploy`.  It will build project, move it to docs, and deploy to master