# Fair Assignment System

A web-based implementation of the **Bogomolnaia-Moulin algorithm** for fair, envy-free assignments. This system provides a modern, interactive interface for making fair assignments in groups, replacing the need for a LINE Bot with a beautiful HTML website.

## 🌟 Features

- **Fair Assignment Algorithm**: Implements the proven Bogomolnaia-Moulin algorithm
- **Modern Web Interface**: Beautiful, responsive design with smooth animations
- **Real-time Updates**: Live status tracking and progress indicators
- **Interactive Rankings**: Easy-to-use ranking system for participants
- **Visual Results**: Probability distributions with animated progress bars
- **Randomized Assignments**: Fair final assignments using randomized rounding
- **Mobile Responsive**: Works perfectly on desktop, tablet, and mobile devices

## 🎯 How It Works

The system implements the **Bogomolnaia-Moulin algorithm** from market design theory, which:

1. **Collects preferences** from all group members
2. **Simulates an "eating" process** where everyone consumes their top choices simultaneously
3. **Generates probability distributions** for fair assignments
4. **Provides concrete assignments** through randomized rounding

This ensures:
- ✅ **Strategy-proof**: No one can manipulate the outcome
- ✅ **Ordinally efficient**: No Pareto improvements possible
- ✅ **Envy-free**: No one prefers someone else's assignment

## 🚀 Quick Start

1. **Open the Website**: Simply open `index.html` in any modern web browser
2. **Enter Items**: Type the items you want to assign (comma-separated)
3. **Add Participants**: Add all participants who will be ranking items
4. **Submit Rankings**: Each participant ranks the items using numbers
5. **Run Algorithm**: Click to see fair probability distributions
6. **Get Assignments**: Generate final randomized assignments

## 📖 Usage Guide

### Step 1: Setup Session
- Enter items to assign (e.g., "Research, Writing, Presentation")
- Click "Start Assignment Session"

### Step 2: Add Participants
- Add all participants who will be ranking items
- Participants can be added or removed as needed

### Step 3: Submit Rankings
- For each participant, rank items using numbers separated by commas
- **Example**: "3,1,2" means:
  - Item 3 is 1st choice
  - Item 1 is 2nd choice  
  - Item 2 is 3rd choice

### Step 4: Run Algorithm
- Click "Run Algorithm" to see fair probability distributions
- Each participant gets probability percentages for each item

### Step 5: Get Final Assignments
- Click "Make Final Assignments" for randomized results
- Each participant gets exactly one item

## 🎨 Interface Features

### Modern Design
- **Gradient Backgrounds**: Beautiful purple gradient theme
- **Card-based Layout**: Clean, organized sections
- **Smooth Animations**: Hover effects and transitions
- **Responsive Design**: Works on all screen sizes

### Interactive Elements
- **Real-time Validation**: Input validation with helpful error messages
- **Progress Indicators**: Visual status updates throughout the process
- **Animated Progress Bars**: Probability distributions with smooth animations
- **Modal Help System**: Comprehensive instructions accessible via help button

### User Experience
- **Step-by-step Guidance**: Clear progression through the assignment process
- **Status Tracking**: Live updates on current session state
- **Error Prevention**: Input validation prevents common mistakes
- **Easy Reset**: Start new sessions with one click

## 🔧 Technical Implementation

### Frontend Technologies
- **HTML5**: Semantic markup for accessibility
- **CSS3**: Modern styling with Flexbox and Grid
- **JavaScript ES6+**: Class-based architecture with modern features
- **Font Awesome**: Beautiful icons throughout the interface

### Algorithm Implementation
- **Pure JavaScript**: No external dependencies for the core algorithm
- **Object-Oriented Design**: Clean, maintainable code structure
- **Event-Driven Architecture**: Responsive user interactions
- **Data Validation**: Comprehensive input checking and error handling

### Browser Compatibility
- **Modern Browsers**: Chrome, Firefox, Safari, Edge (latest versions)
- **Mobile Support**: iOS Safari, Chrome Mobile, Samsung Internet
- **No Internet Required**: Works completely offline

## 📊 Example Session

```
Items: Research, Writing, Presentation

Participants: Alice, Bob, Charlie

Rankings:
- Alice: 3,1,2 (Presentation 1st, Research 2nd, Writing 3rd)
- Bob: 1,3,2 (Research 1st, Presentation 2nd, Writing 3rd)  
- Charlie: 2,1,3 (Writing 1st, Research 2nd, Presentation 3rd)

Results:
- Alice: Research 33.3%, Writing 0.0%, Presentation 66.7%
- Bob: Research 66.7%, Writing 0.0%, Presentation 33.3%
- Charlie: Research 0.0%, Writing 100.0%, Presentation 0.0%

Final Assignments:
- Alice → Presentation
- Bob → Research  
- Charlie → Writing
```

## 🎯 Use Cases

- **Task Assignment**: Assigning project tasks, chores, or responsibilities
- **Resource Allocation**: Distributing limited resources fairly
- **Role Assignment**: Assigning roles in events or activities
- **Study Group Formation**: Creating balanced study groups
- **Event Planning**: Assigning event responsibilities
- **Committee Formation**: Fair committee assignments
- **Room Assignment**: Assigning rooms or spaces

## 🔬 Algorithm Details

### Bogomolnaia-Moulin Algorithm

The algorithm simulates a "eating" process:

1. **Simultaneous Eating**: Everyone starts eating their top choice at rate 1
2. **Item Exhaustion**: When an item is fully consumed, people switch to their next choice
3. **Probability Calculation**: Each person's probability for an item equals the time they spent eating it
4. **Fairness Guarantees**: The resulting probabilities are strategy-proof and envy-free

### Mathematical Properties

- **Strategy-proof**: No participant can benefit from misreporting preferences
- **Ordinally efficient**: No Pareto improvements exist
- **Envy-free**: No participant prefers another's assignment
- **Equal treatment**: All participants are treated equally by the algorithm

## 🚀 Getting Started

### Prerequisites
- Any modern web browser (Chrome, Firefox, Safari, Edge)
- No server setup required - runs entirely in the browser

### Installation
1. Download all files to a folder
2. Open `index.html` in your web browser
3. Start using the fair assignment system!

### File Structure
```
fair-assignment-system/
├── index.html          # Main HTML file
├── styles.css          # CSS styling
├── script.js           # JavaScript implementation
└── README.md           # This documentation
```

## 🤝 Contributing

Contributions are welcome! Here are some ways you can help:

- **Bug Reports**: Report any issues you encounter
- **Feature Requests**: Suggest new features or improvements
- **Code Improvements**: Submit pull requests for code enhancements
- **Documentation**: Help improve the documentation
- **Testing**: Test on different browsers and devices

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **Bogomolnaia & Moulin**: For developing the original algorithm
- **Font Awesome**: For the beautiful icons
- **Google Fonts**: For the Inter font family
- **CSS Gradient**: For the beautiful background gradients

## 📞 Support

If you have any questions or need help:

1. Check the help modal in the application (click the ? button)
2. Review this README file
3. Open an issue on the project repository

---

**Enjoy making fair assignments! 🎉** 