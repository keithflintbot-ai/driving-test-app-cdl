# Universal Driving Test Question Generator - Ralph Loop

## How to Use (2-Step Process)

### Step 1: Generate Questions

```
/ralph-loop "Generate 150 universal driving test questions following ALL rules in universal-driving-test-rules.md. These must work in ANY US state. Do NOT duplicate topics from nj-driving-questions.md. Say <promise>150 UNIVERSAL QUESTIONS COMPLETE</promise> when done." --max-iterations 20 --completion-promise "150 UNIVERSAL QUESTIONS COMPLETE"
```

### Step 2: Verify Universal Accuracy

```
/ralph-loop "Verify all questions in universal-driving-questions.md are universally true across all 50 US states. Web search any fact that could vary by state. Fix any state-specific content. Say <promise>ALL UNIVERSAL FACTS VERIFIED</promise> when confirmed." --max-iterations 15 --completion-promise "ALL UNIVERSAL FACTS VERIFIED"
```

---

## Output File

Save questions to: `universal-driving-questions.md`

---

## Required Fields Per Question

```
## Question [NUMBER]: [TOPIC]

**[QUESTION TEXT]?**

A) [Option A]
B) [Option B]
C) [Option C]
D) [Option D]

**Correct Answer:** [LETTER]) [Answer text]
**Correct Index:** [1-4]
**Explanation:** [Why this answer is correct - universal reasoning]
```

---

## CRITICAL: STATE-VARIABLE Topics to AVOID

These topics VARY BY STATE and are covered in state-specific question sets. Do NOT include any questions where the answer depends on state law:

### Speed Limits (varies by state)
- Residential speed limits
- School zone speed limits
- Highway maximum speed limits
- Business district speed limits
- Construction zone speed limits

### Parking Distances (varies by state)
- Distance from fire hydrants
- Distance from stop signs
- Distance from crosswalks
- Distance from railroad crossings
- Distance from fire stations
- Distance from intersections

### Passing Distances (varies by state)
- Bicycle/cyclist passing distance
- Pedestrian passing distance

### Turn Signals (varies by state)
- Required signal distance before turn

### Headlights (varies by state)
- High beam dimming distance
- When headlights are required

### Licensing (varies by state)
- GDL/graduated license restrictions
- Passenger limits for new drivers
- Nighttime driving restrictions
- Permit requirements
- License renewal periods

### Alcohol Limits (varies by state)
- BAC limits (specific numbers)
- Zero tolerance thresholds

### Cell Phone Laws (varies by state)
- Handheld restrictions
- Texting penalties
- Hands-free requirements

### School Buses (varies by state)
- Stopping rules on divided highways
- Required stopping distance from bus

### Required Documents (varies by state)
- What documents must be carried
- Insurance requirements
- Inspection requirements

### Move Over Law Details (varies by state)
- Which vehicles are covered
- Specific required actions

**KEY RULE:** If a question's answer could be different in California vs. Texas vs. New York, it belongs in the STATE questions, not UNIVERSAL questions

---

## Topics TO INCLUDE (Universal concepts - same answer in ALL 50 states)

### Traffic Signs & Signals (15+ questions)
- Pennant-shaped signs (no passing zone)
- Pentagon-shaped signs (school zone/crossing)
- Circular signs (railroad advance warning)
- Crossbuck signs (railroad crossing)
- Fluorescent yellow-green signs (pedestrian/school/bike)
- Blue signs (motorist services - food, gas, lodging)
- Brown signs (recreation/cultural areas)
- Green signs (direction/distance/destinations)
- Orange signs (construction/work zones)
- Red circle with slash (prohibition)
- Flashing yellow lights (proceed with caution)
- Flashing yellow arrows (turn with caution)
- Green arrow signals (protected turn)
- Red arrow signals (no turn)
- Pedestrian signal meanings (walk/don't walk/countdown)
- Lane use control signals

### Lane Markings (10+ questions)
- Double solid yellow lines (no passing either direction)
- Broken yellow line (passing permitted)
- Yellow line on your side solid (no passing for you)
- Shared center left-turn lanes (two-way left turn)
- White dashed lines (lane changes OK)
- Edge lines (white on right, yellow on left)
- Crosshatch/diagonal markings (buffers, no driving)
- Bike lane markings
- HOV lane markings and diamonds
- Rumble strips purpose

### Vehicle Operation (15+ questions)
- Proper mirror adjustment technique
- Hand position on steering wheel
- Push-pull steering vs hand-over-hand
- ABS braking technique (steady pressure)
- Non-ABS braking technique (threshold/pumping)
- Proper backing up technique (look over shoulder)
- Three-point turn procedure
- U-turn safety considerations
- Parallel parking steps
- Angle/diagonal parking technique
- Starting on a hill (uphill and downhill)
- Proper use of cruise control
- When NOT to use cruise control
- Engine braking / downshifting
- Proper acceleration techniques

### Stopping Distance & Speed (10+ questions)
- Factors affecting stopping distance
- Reaction distance vs braking distance
- Speed and stopping distance relationship (squared)
- Effect of road conditions on stopping
- Effect of vehicle weight on stopping
- Effect of tire condition on stopping
- Two-second rule application
- Increasing following distance conditions

### Road Types & Situations (15+ questions)
- Controlled vs uncontrolled intersections
- T-intersections right-of-way
- Traffic circles (different from roundabouts)
- One-way street identification
- Wrong-way driving prevention
- HOV lane rules and purpose
- Express/toll lane entry/exit
- Mountain driving (downhill braking, uphill power)
- Curves and speed reduction
- Rural road hazards (animals, farm equipment)
- Urban driving challenges
- Residential area awareness
- Parking lot safety
- Alley driving
- Driveways and backing out

### Sharing the Road (15+ questions)
- Large truck stopping distance comparison
- Passing large trucks safely (which side)
- Following large trucks (can they see you?)
- Wide turns by trucks and buses
- Slow-moving vehicle emblem (orange triangle)
- Farm equipment on roads
- Horse-drawn vehicles
- Funeral procession etiquette
- Yielding to buses re-entering traffic
- Pedestrians with white canes
- Pedestrians using guide dogs
- Pedestrians in wheelchairs
- Joggers and runners
- Moped and scooter awareness
- Electric vehicle silence awareness

### Night Driving (10+ questions)
- Reduced visibility distances
- Overdriving headlights
- Avoiding interior light glare
- Dashboard brightness adjustment
- Oncoming headlight glare recovery
- Fatigue more common at night
- Animal activity at night (deer, etc.)
- Judging distances at night
- Pedestrian visibility at night
- Reflective clothing importance

### Weather & Environmental (15+ questions)
- Driving through standing water dangers
- Flooded road rule (turn around, don't drown)
- Black ice identification and locations
- Bridge/overpass ice warning
- Snow-covered road techniques
- Reduced visibility in snow
- Strong wind effects on vehicles
- High-profile vehicle wind sensitivity
- Dust storm response (pull off, lights off)
- Smoke on roadway response
- Sun glare handling techniques
- Wet leaves on road surface
- Gravel road driving
- Driving in earthquakes (pull over, stay in car)

### Vehicle Safety & Maintenance (15+ questions)
- Tire tread depth indicator/penny test
- Proper tire inflation importance
- Uneven tire wear meanings
- Brake warning light meaning
- Check engine light response
- Temperature gauge warning
- Oil pressure warning
- Battery/charging warning
- Airbag safety (distance from steering wheel)
- Side mirror vs rearview mirror use
- Cracked windshield dangers
- Wiper blade condition
- Headlight/taillight checks
- Turn signal functionality
- Horn testing

### Defensive Driving Concepts (15+ questions)
- SIPDE process (Search, Identify, Predict, Decide, Execute)
- Smith System five principles
- Scanning technique (eyes moving)
- Space cushion all around vehicle
- Escape route planning
- Point of no return at intersections
- Stale green light concept
- Covering the brake
- Predicting other driver actions
- Aggressive driver characteristics
- Road rage triggers and avoidance
- Tailgater response strategies
- Left lane courtesy/passing lane
- Eye contact with other drivers
- Anticipating lane changes of others

### Emergency Situations (15+ questions)
- Tire blowout response (grip wheel, ease off gas)
- Front tire blowout vs rear tire blowout
- Stuck accelerator response (shift to neutral)
- Steering failure response
- Hood flies up (look through gap/out window)
- Vehicle fire response (pull over, evacuate)
- Brake fade from overheating
- Wet brakes drying technique
- Power steering failure
- Headlight failure at night
- Running off pavement recovery
- Animal in road response
- Crash scene safety (turn off ignition)
- When to move a crash victim (fire/danger only)
- Reporting a crash requirements

### Impairment & Fitness to Drive (10+ questions)
- Fatigue warning signs (yawning, drifting)
- Drowsy driving countermeasures
- Microsleep dangers
- Carbon monoxide poisoning symptoms
- Prescription drug label warnings
- Over-the-counter drug effects (antihistamines)
- Combining medications dangers
- Emotional state affecting driving
- Illness effects on driving
- Vision requirements for driving
- Age-related driving changes

### Special Vehicles & Situations (10+ questions)
- Motorcycles splitting lanes (awareness)
- Motorcycles in bad weather
- Large vehicle air brakes
- Trailer towing considerations
- RV driving differences
- Emergency vehicle right-of-way
- Police traffic direction signals
- Flaggers at work zones
- Crossing guard signals
- Funeral procession lights

---

## THE 18 RULES (Base Rules + Universal Rules)

### Content Rules (5)

| # | Rule | Example Violation |
|---|------|-------------------|
| 1 | No dollar amounts | "The fine is $150" |
| 2 | No insurance X/Y/Z format | "15/30/5 coverage" |
| 3 | No point values | "You will receive 4 points" |
| 4 | No exact jail times | "Up to 6 months in jail" |
| 5 | No state-specific values | Distances, limits, ages that vary by state |

### Uniqueness Rules (3)

| # | Rule | Description |
|---|------|-------------|
| 6 | No >80% similarity | Each question must be distinct from all others |
| 7 | Max 3 questions per concept | E.g., max 3 about any single topic |
| 8 | No state-variable topics | Must not include topics that vary by state (listed above) |

### Answer Balance Rules (3)

| # | Rule | Description |
|---|------|-------------|
| 9 | Length balance | Correct answer must NOT be >40% longer than average of wrong answers |
| 10 | No giveaway qualifiers | Don't put "always"/"never" only in the correct answer |
| 11 | Position distribution | 37-38 each of A, B, C, D (totaling 150) |

### Format Rules (4)

| # | Rule | Description |
|---|------|-------------|
| 12 | Question punctuation | Every question must end with ? |
| 13 | All fields present | Question, Options A-D, CorrectAnswer, CorrectIndex, Explanation |
| 14 | Letter/Index match | If answer is A, CorrectIndex must be 1; B=2, C=3, D=4 |
| 15 | Consistent time format | Use AM/PM format throughout (not 24-hour) |

### Style Rules (2)

| # | Rule | Description |
|---|------|-------------|
| 16 | No repetition | Don't repeat the question stem in the answers |
| 17 | Similar answer lengths | All 4 options should be roughly the same length |

### Accuracy Rules (1)

| # | Rule | Description |
|---|------|-------------|
| 18 | Universal accuracy | Must be TRUE in all 50 US states - no state-specific facts |

---

## ⛔ MANDATORY VALIDATION BEFORE PROMISE ⛔

**YOU MUST RUN THESE VALIDATION CHECKS BEFORE OUTPUTTING THE COMPLETION PROMISE.**
**DO NOT OUTPUT THE PROMISE UNTIL ALL CHECKS PASS.**

### Step 1: Run These Bash Commands

```bash
# Count questions
echo "Question count:" && grep -c "^## Question" universal-driving-questions.md

# Count answer distribution
echo "A answers:" && grep -c "Correct Answer:\*\* A)" universal-driving-questions.md
echo "B answers:" && grep -c "Correct Answer:\*\* B)" universal-driving-questions.md
echo "C answers:" && grep -c "Correct Answer:\*\* C)" universal-driving-questions.md
echo "D answers:" && grep -c "Correct Answer:\*\* D)" universal-driving-questions.md

# Check for prohibited content
echo "Dollar amounts:" && grep -c '\$[0-9]' universal-driving-questions.md || echo "0"
echo "Point values:" && grep -ci '[0-9] points' universal-driving-questions.md || echo "0"
echo "Jail times:" && grep -ci 'months in jail\|years in jail' universal-driving-questions.md || echo "0"
```

**Expected Output:**
- Question count: 150
- A answers: 37 or 38
- B answers: 37 or 38
- C answers: 37 or 38
- D answers: 37 or 38
- Dollar amounts: 0
- Point values: 0
- Jail times: 0

### Step 2: Run This Python Validation (REQUIRED)

```python
python3 << 'EOF'
import re

with open('universal-driving-questions.md', 'r') as f:
    content = f.read()

questions = re.split(r'---\s*\n\s*## Question \d+:', content)[1:]
issues = []

for i, q in enumerate(questions, 1):
    options = re.findall(r'^([A-D])\) (.+)$', q, re.MULTILINE)
    if len(options) != 4:
        continue

    correct = re.search(r'\*\*Correct Answer:\*\* ([A-D])\)', q)
    if not correct:
        continue

    correct_letter = correct.group(1)
    correct_len = len([o[1] for o in options if o[0] == correct_letter][0])
    wrong_lens = [len(o[1]) for o in options if o[0] != correct_letter]
    avg_wrong = sum(wrong_lens) / 3

    # Rule 9: Length balance - correct answer must NOT be >40% longer than avg wrong
    if correct_len > avg_wrong * 1.4:
        issues.append(f"Q{i}: Correct answer too long ({correct_len} chars vs avg wrong {avg_wrong:.0f}, max allowed {avg_wrong*1.4:.0f})")

    # Rule 10: Giveaway qualifiers - "always/never/only/all" should not ONLY appear in correct answer
    correct_text = [o[1].lower() for o in options if o[0] == correct_letter][0]
    wrong_texts = [o[1].lower() for o in options if o[0] != correct_letter]
    for qual in ['always', 'never', 'only', 'all']:
        if qual in correct_text and not any(qual in w for w in wrong_texts):
            issues.append(f"Q{i}: Giveaway qualifier '{qual}' only in correct answer")
            break

if issues:
    print(f"❌ VALIDATION FAILED - {len(issues)} issues found:")
    for issue in issues[:25]:
        print(f"  - {issue}")
    if len(issues) > 25:
        print(f"  ... and {len(issues) - 25} more issues")
    print("\n⛔ DO NOT OUTPUT PROMISE - FIX ALL ISSUES FIRST")
else:
    print("✅ VALIDATION PASSED - All length and qualifier checks OK")
    print("✅ You may now output the completion promise")
EOF
```

### Step 3: Verify Letter/Index Matching

```python
python3 << 'EOF'
import re
with open('universal-driving-questions.md', 'r') as f:
    content = f.read()
matches = re.findall(r'\*\*Correct Answer:\*\* ([A-D])\).*?\n\*\*Correct Index:\*\* (\d+)', content)
mapping = {'A': '1', 'B': '2', 'C': '3', 'D': '4'}
errors = [f"Q{i+1}: Letter {l} should have index {mapping[l]}, but got {idx}" for i, (l, idx) in enumerate(matches) if mapping[l] != idx]
if errors:
    print(f"❌ VALIDATION FAILED - {len(errors)} letter/index mismatches:")
    for e in errors: print(f"  - {e}")
    print("\n⛔ DO NOT OUTPUT PROMISE - FIX MISMATCHES FIRST")
else:
    print(f"✅ All {len(matches)} letter/index pairs match correctly")
EOF
```

### Step 4: Check for Similar Questions

```python
python3 << 'EOF'
import re
with open('universal-driving-questions.md', 'r') as f:
    content = f.read()
questions = re.findall(r'\*\*(.+\?)\*\*', content)
similar = []
for i, q1 in enumerate(questions):
    for j, q2 in enumerate(questions):
        if i >= j: continue
        w1, w2 = set(q1.lower().split()), set(q2.lower().split())
        sim = len(w1 & w2) / len(w1 | w2) if w1 | w2 else 0
        if sim > 0.8:
            similar.append(f"Q{i+1} vs Q{j+1}: {sim*100:.0f}% similar")
if similar:
    print(f"❌ VALIDATION FAILED - {len(similar)} question pairs are >80% similar:")
    for s in similar: print(f"  - {s}")
    print("\n⛔ DO NOT OUTPUT PROMISE - REWRITE SIMILAR QUESTIONS")
else:
    print("✅ No questions exceed 80% similarity")
EOF
```

### ⚠️ PROMISE RULES - READ CAREFULLY

1. **ALL FOUR VALIDATION STEPS MUST SHOW ✅** before outputting the promise
2. If ANY step shows ❌, you MUST fix all issues and re-run ALL validations
3. Do NOT output `<promise>` until EVERY check shows "✅ VALIDATION PASSED"
4. A mental checklist is NOT sufficient - you MUST run the actual validation code
5. **COMMON MISTAKE**: Outputting the promise after only checking count/distribution - you MUST also validate answer lengths and qualifiers

---

## Validation Checklist (Reference Only - Use Commands Above)

### Count Verification
- [ ] Exactly 150 questions
- [ ] Count A answers = 37 or 38
- [ ] Count B answers = 37 or 38
- [ ] Count C answers = 37 or 38
- [ ] Count D answers = 37 or 38
- [ ] Total A+B+C+D = 150

### Content Verification
- [ ] No dollar amounts anywhere
- [ ] No insurance formats anywhere
- [ ] No point values anywhere
- [ ] No jail times anywhere
- [ ] No state-specific distances/limits/ages
- [ ] No references to specific states

### Uniqueness Verification
- [ ] No two questions >80% similar
- [ ] No concept appears >3 times
- [ ] No overlap with state-variable topics (speed limits, distances, BAC, GDL, etc.)

### Answer Balance Verification
- [ ] No correct answer >40% longer than wrong answer average
- [ ] No "always/never" giveaways (qualifier only in correct answer)

### Format Verification
- [ ] All questions end with ?
- [ ] All fields present for each question (Question, A-D, Answer, Index, Explanation)
- [ ] CorrectIndex matches CorrectAnswer letter
- [ ] Time format consistent (AM/PM)

### Style Verification
- [ ] No question stem repeated in answers
- [ ] Answer lengths balanced per question

### Accuracy Verification
- [ ] All facts universally true in all 50 states
- [ ] Spelling correct
- [ ] Grammar correct

---

## Letter to Index Mapping

| Letter | Index |
|--------|-------|
| A | 1 |
| B | 2 |
| C | 3 |
| D | 4 |

---

## Distribution Target

For 150 questions:
- A answers: 37-38
- B answers: 37-38
- C answers: 37-38
- D answers: 37-38
- Total: 150

Suggested category distribution:
- Traffic Signs & Signals: ~20 questions
- Lane Markings: ~10 questions
- Vehicle Operation: ~15 questions
- Stopping Distance & Speed: ~10 questions
- Road Types & Situations: ~15 questions
- Sharing the Road: ~15 questions
- Night Driving: ~10 questions
- Weather & Environmental: ~15 questions
- Vehicle Safety & Maintenance: ~15 questions
- Defensive Driving: ~15 questions
- Emergency Situations: ~15 questions
- Impairment & Fitness: ~10 questions
- Special Vehicles: ~10 questions

---

## Example Question (Properly Formatted)

```
## Question 47: Traffic Signs

**What does a pennant-shaped sign indicate?**

A) School zone ahead
B) Railroad crossing ahead
C) No passing zone
D) Construction area ahead

**Correct Answer:** C) No passing zone
**Correct Index:** 3
**Explanation:** The pennant shape is used exclusively for no passing zone signs, warning drivers that passing is prohibited in that area.
```

---

## Version

- Created: 2026-01-01
- Rules: 18 (base rules + universal rules)
- Questions: 150
- Scope: Universal (all 50 US states)
- Excludes: All state-variable topics (covered in state-specific question sets)
