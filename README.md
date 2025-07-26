# Discord Finance Bot 💰

A comprehensive Discord bot built with Node.js and the Eris library, featuring an extensive economy system with Arabic language support. This bot provides various financial games, investment simulations, and administrative customization options for Discord servers.

## ✨ Key Features

- **Complete Economy System** - Full-featured financial management with credits, loans, and transactions
- **Interactive Canvas Graphics** - Beautiful SVG-based images with customizable colors and themes
- **Arabic Language Support** - Native Arabic commands and interface
- **Multiple Mini-Games** - Dice games, luck games, investment simulations, and trading
- **Advanced Admin Panel** - Extensive customization options for server administrators
- **MongoDB Integration** - Persistent data storage with user profiles and server settings
- **Cooldown System** - Anti-spam protection with configurable cooldowns
- **Built with Eris** - Faster and more efficient than discord.js
- **Canvas Image Generation** - Dynamic user profile cards and game result images

## 🎮 Game Commands

### Financial Games
- **قروشي** (`دراهمي`, `فلوسي`, `مالي`, `رصيد`, `رصيدي`) - Check your balance with a beautiful profile card
- **راتب** (`راتبي`, `الراتب`) - Claim daily salary with random job assignments
- **نرد** (`النرد`, `dice`, `dise`) - Dice gambling game with betting options
- **حظ** (`حظي`) - Luck-based reward game
- **بخشيش** (`بخشيشي`) - Random tip/reward system

### Investment & Trading
- **استثمار** (`الاستثمار`, `ستثمار`, `استثمر`) - Investment simulation with profit/loss charts
- **تداول** (`اتداول`) - Trading system with market fluctuations
- **قرض** (`اقرضني`, `القرض`) - Loan system for borrowing money
- **سداد** (`تسديد`, `سدد`) - Loan repayment system
- **نهب** (`سرقه`, `زرف`) - Robbery system with risk/reward mechanics

### Information & Leaderboards
- **توب** (`حرامية`, `حراميه`) - Richest players leaderboard or top robbers leaderboard
- **وقت** (`الوقت`, `اوقات`) - Check command cooldowns

## 🔧 Admin Commands

### Server Configuration
- **+setbank** - Set the designated economy channel
- **+setlog** - Configure logging channel for transactions
- **+manager** (`+مدير`) - Add/remove bot administrators

### Feature Toggles
- **+togembed** (`+togimage`, `+togrobbery`, `+togtransactions`, `+togloan`) - Toggle various bot features

### Customization
- **+color1** (`+color2`, `+tcolor`, `+ecolor`) - Set theme colors (hex format)

### Economy Settings
- **+loanamount** (`+loana`) - Configure maximum loan amount ($500-$1,000,000)
- **+loantime** (`+loant`) - Set loan duration (in minutes)
- **+robper** - Set robbery success percentage (0.0-1.0)
- **+setimage** - Configure custom background images

## 📦 Installation

### Prerequisites
- [Node.js](https://nodejs.org/) (v16.0.0 or higher)
- [MongoDB](https://www.mongodb.com/) (local or cloud instance)
- Discord Bot Token

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/al7arthy/DiscordFinanceBot.git
   cd discord-finance-bot
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure the bot**
   - Edit `config.json` and add your bot credentials:
   ```json
   {
       "token": "YOUR_BOT_TOKEN",
       "guild": "YOUR_GUILD_ID",
       "owners": ["YOUR_USER_ID"]
   }
   ```

4. **Start MongoDB**
   - Ensure MongoDB is running on `localhost:27017`
   - Or modify the connection string in `index.js` for your setup

5. **Run the bot**
   ```bash
   node index.js
   ```

## 🛠️ Configuration

### Environment Setup
1. **Discord Bot Setup**
   - Create a bot at [Discord Developer Portal](https://discord.com/developers/applications)
   - Copy the bot token to `config.json`
   - Enable necessary intents (Server Members Intent recommended)

2. **Guild Configuration**
   - Add your Discord server ID to the `guild` field in `config.json`
   - Add owner user IDs to the `owners` array

3. **Database Setup**
   - Install MongoDB locally or use MongoDB Atlas
   - Default connection: `mongodb://localhost:27017/LancerStore`
   - Modify connection string in `index.js` if needed

### Bot Permissions
Ensure your bot has the following permissions:
- Send Messages
- Embed Links
- Attach Files
- Read Message History
- Use External Emojis
- Manage Messages (optional, for cleanup)

## 📚 Dependencies

### Core Dependencies
- **eris** (^0.17.2) - Discord API library
- **mongoose** (^8.4.1) - MongoDB object modeling
- **canvas** (^2.11.2) - Image generation and manipulation
- **mongoose-bignumber** (^2.0.0) - BigNumber support for large currency values
- **mongoose-long** (^0.8.0) - Long number support

### Utility Dependencies
- **date-fns** (^3.6.0) - Date manipulation utilities
- **numeral** (^2.0.6) - Number formatting
- **svg2img** (^1.0.0-beta.2) - SVG to image conversion

## 🎨 Customization

### Visual Themes
- Customize colors using admin commands (`+color1`, `+color2`, `+tcolor`)
- Upload custom background images for profile cards
- Modify SVG templates in command files for different designs

### Game Balance
- Adjust reward amounts in individual command files
- Configure cooldown timers for each game
- Set minimum/maximum betting amounts

### Localization
- All user-facing messages are in Arabic
- Easy to modify text strings in command files
- Admin commands use English prefixes with Arabic responses

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Ahmad Alharthy**
- Developer of *ErisBank Discord Bot*
- Built with ❤️ using Node.js and Eris

## ⚠️ Disclaimer

This is a base template that you can use to expand the bot (which means it is not finished), and it is free for anyone to use. The bot is designed for entertainment purposes and should not be used for real financial transactions.

## 🔮 Future Features

- [ ] Marriage system expansion
- [ ] Shop and inventory system
- [ ] More complex trading algorithms
- [ ] Multi-language support
- [ ] Web dashboard for server management
- [ ] Advanced statistics and analytics

---

**⭐ If you found this project helpful, please consider giving it a star!**
