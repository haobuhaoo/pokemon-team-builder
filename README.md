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
The 4 roles of a team are Physical Attacker, Special Attacker, Physical Defender, and Special Defender. Each Pokemon is probabilistically classified into one of these roles, or into a Balance category if multiple roles are equally viable.

The classification uses a weighted scoring system:
- **Physical Attacker Score:** `Attack * 0.7 + Speed * 0.3`
- **Special Attacker Score:** `Sp.Atk * 0.7 + Speed * 0.3`
- **Physical Defender Score:** `Defense * 0.5 + HP * 0.5`
- **Special Defender Score:** `Sp.Def * 0.5 + HP * 0.5`

The scores are converted to probabilities using exponential normalization (softmax). The Pokemon is assigned to the role with the highest probability. If two or more roles have equal probability, the Pokemon is classified as Balance.

**Assumptions:**
- The classification of each Pokemon is solely based on their Base Stats.
- The weighted coefficients prioritize offensive or defensive stats while accounting for Speed as a secondary factor.
- Balanced Pokemon are tracked separately as they provide flexibility in team composition.

#### **Recommendation**
Recommendation shows the major weakness of the team and imbalances in role distribution.

- **Major Weakness:** When more than half of the team has a weakness to that type.
- **Role Deficiency:** When the team lacks that role and there is no Balance Pokemon in the team.
- **Role Redundancy:** When more than half of the team shares that same role. When detected, it suggests to remove Pokemon in that role that has the lowest corresponding stat.

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
1. **Subjectivity:** The ideal team composition is subjective. Recommendations are provided when role imbalances are detected (e.g. less than 15% of a role and less than 15% balance Pokemon), but this threshold is an arbitrary choice and different playstyles may prefer different compositions.
2. **Scaling Weakness Severity:** Currently, the app treats a Pokemon that has 2x weakness and 4x weakness with the same weight when calculating defenceScore. While the app correctly identifies that the Pokemon is weak to that type, it does not yet penalize the extreme vulnerability of a 4x multiplier more heavily.
3. **Role Classification Nuance:** This model classifies Pokémon based solely on their base stats into four roles: Physical Attacker, Special Attacker, Physical Defender, and Special Defender. However, many competitively viable Pokémon do not fit neatly into these categories. Utility or Support Pokémon (such as Sableye) may have low offensive and defensive stats but provide value through abilities, movepools, and status effects. Since this model only considers base stats, it may not accurately classify such Pokémon.