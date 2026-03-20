# **Pokemon Team Builder**

## **Overview**
Pokemon Team Builder is a web application for building and evaluating a Pokemon team. Users can select Pokemon from the PokeAPI database, build a team of up to 6 Pokemon, and get insights into team type coverage, defensive vulnerabilities, role distribution and simple composition recommendations.

---

### **Architecture**
The application is built using React with TypeScript and Material-UI for the frontend. As PokeAPI is a public API, no custom backend is required. The app uses Axios for HTTP requests, and follows a component-based architecture:

- **Components:** Reusable UI components for displaying Pokemon information, search functionality, and team analysis.
- **Services:** API integration with PokeAPI for fetching Pokemon data.
- **Utils:** Reusable helper functions for analysis and data formatting.
- **Entities:** TypeScript interfaces defining data structures for Pokemon and types.

---

### **Approach**
The team analysis consists of 4 parts: Coverage, Defence, Role Distribution and Recommendation.

**Assumptions:**
- The types of the team is taken solely from the typing(s) of each Pokemon in the team. For example, Charizard contributes both its Fire and Flying type to the team even though it has access to moves of other types like Dragon.

#### **Coverage**
Coverage represents the total number of Pokemon on the team that are super effective against each type. This is aggregated against the team size -- higher numbers indicates stronger offensive pressure against that specific type.

#### **Defence**
Defence comprises of 3 aspects: Weakness (2x damage), Resistance (0.5x damage), and Immunity (0x damage). An aggregate score is given for each type based on how the team defend against the type. It is aggregated against the team size -- higher numbers indicates the team is weaker against that specific type. The formula used is:
```bash
defenceScore = (weak * W_factor) + (resist * R_factor) + (immune * I_factor);
where W_factor = 1, R_factor = -0.5, I_factor = -1
```

**Assumptions:**
- The weights of each aspect is taken to prioritize the importance of weakness of the team. These weights can be manually adjusted to obtain an optimal calculation of the score.

#### **Role Distribution**
The 4 roles of a team are Physical Attacker, Special Attacker, Physical Defender, and Special Defender. A single Pokemon may be classified under more than 1 role.

- **Physical Attacker:** Attack >= 110 and Attack > Sp.Atk
- **Special Attacker:** Sp.Atk >= 110 and Sp.Atk > Attack
- **Physical Defender:** Defence >= 130 and Attack < 100 and Sp.Atk < 100
- **Special Defender:** Sp.Def >= 130 and Attack < 100 and Sp.Atk < 100

**Assumptions:**
- The classification of each Pokemon is solely based on their Base Stats.
- The classification scores are taken such that majority of the Pokemon can be correctly classified to their correct role. However, there may be some Pokemon that fall through the cracks of the classification which results in an unoptimal classification. The scores can be manually fine tuned to obtained an optimal classification result.

#### **Recommendation**
Recommendation shows the major weakness of the team and imbalances in role distribution.

- **Major Weakness:** When more than half of the team has a weakness to that type.
- **Role Deficiency:** When the team lacks that role.
- **Role Redundancy:** When more than half of the team shares that same role.

---

### **Getting Started**

#### **Prerequisites**
- Node.js (version 16 or higher)
- npm or yarn package manager

#### **Installation**
1. Clone the repository:
```bash
git clone https://github.com.haobuhaoo/pokemon-team-builder.git
cd pokemon-team-builder
```

2. Install dependencies:
```bash
npm install
```

#### **Running the App**
To start the development server:
```bash
npm run dev
```
This will start and open the app in your default browser at `https://localhost:5173`.

---

### **Testing**
Tests are located in the `test` directory and cover components, utilities, and key functionalities.

#### **Run Tests**
1. Run all tests once:
```bash
npm test
```
This executes the entire test suite and provides a summary of passed/failed tests.

2. Run specific test files:
```bash
npm test -- <test-file-path>
```
For example: `npm test -- test/components/pokemonDisplay.test.tsx`

#### **Test Structure**
- `components`: Tests for React components.
- `utils`: Tests for utility functions.
- `mockups`: Mock data structures used in testing.

---

### **Challenges and Limitations**
1. **Subjectivity:** The ideal team composition is subjective.These recommendations assume an optimal team should include at least 1 Pokemon in each of the four roles.
2. **Scaling Weakness Severity:** Currently, the app treats a Pokemon that has 2x weakness and 4x weakness with the same weight when calculating defenceScore. While the app correctly identifies that the Pokemon is weak to that type, it does not yet penalize the extreme vulnerability of a 4x multiplier more heavily.
3. **Role Classification Nuance:** Classifying Pokemon purely based on their Base Stats is challenging. "Support" or "Utility" Pokemon (like Sableye) often lack high offensive or defensive stats but are still competitively viable. These niche cases may fall outside the role definitions used.